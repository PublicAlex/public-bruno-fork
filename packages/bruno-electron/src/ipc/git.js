const { ipcMain } = require('electron');
const {
  cloneGitRepository,
  pullGitChanges,
  pushGitChanges,
  forcePullGitChanges,
  canPush,
  stageChanges,
  commitChanges,
  getCollectionGitRootPath,
  getCurrentGitBranch,
  getCollectionGitRepoUrl,
  getAheadBehindCount
} = require('../utils/git');
const simpleGit = require('simple-git');
const { createDirectory, removeDirectory } = require('../utils/filesystem');

const registerGitIpc = (mainWindow) => {
  ipcMain.handle('renderer:clone-git-repository', async (event, { url, path, processUid }) => {
    let directoryCreated = false;
    try {
      await createDirectory(path);
      directoryCreated = true;
      await cloneGitRepository(mainWindow, { url, path, processUid });
      return 'Repository cloned successfully';
    } catch (error) {
      if (directoryCreated) {
        await removeDirectory(path);
      }
      return Promise.reject(error);
    }
  });

  ipcMain.handle('renderer:git-pull', async (event, { collectionPath }) => {
    const gitRootPath = getCollectionGitRootPath(collectionPath);
    if (!gitRootPath) return Promise.reject(new Error('No se encontró un repositorio git en esta colección'));

    const currentBranch = await getCurrentGitBranch(gitRootPath);
    const processUid = `pull-${Date.now()}`;
    await pullGitChanges(mainWindow, {
      gitRootPath,
      processUid,
      remote: 'origin',
      remoteBranch: currentBranch,
      strategy: '--no-rebase'
    });
    return 'Pull completado';
  });

  ipcMain.handle('renderer:git-push', async (event, { collectionPath }) => {
    const gitRootPath = getCollectionGitRootPath(collectionPath);
    if (!gitRootPath) return Promise.reject(new Error('No se encontró un repositorio git en esta colección'));

    const git = simpleGit(gitRootPath);
    const currentBranch = (await git.revparse(['--abbrev-ref', 'HEAD'])).trim();
    await git.push('origin', currentBranch, ['--set-upstream']);
    return 'Push completado';
  });

  ipcMain.handle('renderer:git-can-push', async (event, { collectionPath }) => {
    const gitRootPath = getCollectionGitRootPath(collectionPath);
    if (!gitRootPath) return false;
    try {
      return await canPush(gitRootPath);
    } catch {
      return false;
    }
  });

  ipcMain.handle('renderer:git-has-repo', async (event, { collectionPath }) => {
    const gitRootPath = getCollectionGitRootPath(collectionPath);
    return !!gitRootPath;
  });

  ipcMain.handle('renderer:git-has-uncommitted', async (event, { collectionPath }) => {
    const gitRootPath = getCollectionGitRootPath(collectionPath);
    if (!gitRootPath) return false;
    try {
      const git = simpleGit(gitRootPath);
      const status = await git.status();
      return !status.isClean();
    } catch {
      return false;
    }
  });

  ipcMain.handle('renderer:git-commit-and-push', async (event, { collectionPath, commitMessage }) => {
    const gitRootPath = getCollectionGitRootPath(collectionPath);
    if (!gitRootPath) return Promise.reject(new Error('No se encontró un repositorio git en esta colección'));

    const git = simpleGit(gitRootPath);
    const status = await git.status();
    const hasUncommitted = !status.isClean();

    if (hasUncommitted) {
      await git.add('.');
      await git.commit(commitMessage || `Actualización ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`);
    }

    const currentBranch = (await git.revparse(['--abbrev-ref', 'HEAD'])).trim();
    await git.push('origin', currentBranch, ['--set-upstream']);
    return hasUncommitted ? 'Cambios commiteados y subidos exitosamente' : 'Push completado';
  });

  ipcMain.handle('renderer:git-force-pull', async (event, { collectionPath }) => {
    await forcePullGitChanges(collectionPath);
    return 'Force pull completado';
  });

  ipcMain.handle('renderer:git-get-branch', async (event, { collectionPath }) => {
    const gitRootPath = getCollectionGitRootPath(collectionPath);
    if (!gitRootPath) return null;
    try {
      return await getCurrentGitBranch(gitRootPath);
    } catch {
      return null;
    }
  });

  ipcMain.handle('renderer:git-get-repo-info', async (event, { collectionPath }) => {
    const gitRootPath = getCollectionGitRootPath(collectionPath);
    if (!gitRootPath) return null;

    const [branch, remoteUrl, aheadBehind] = await Promise.allSettled([
      getCurrentGitBranch(gitRootPath),
      getCollectionGitRepoUrl(gitRootPath),
      getAheadBehindCount(gitRootPath)
    ]);

    const url = branch.status === 'fulfilled' ? remoteUrl.value : null;

    // Extract a friendly repo name from the URL (last path segment without .git)
    let repoName = null;
    try {
      const rawUrl = remoteUrl.status === 'fulfilled' ? remoteUrl.value : null;
      if (rawUrl && rawUrl !== 'origin') {
        repoName = rawUrl.replace(/\.git$/, '').split(/[/:]/).pop();
      }
    } catch {}

    return {
      branch: branch.status === 'fulfilled' ? branch.value : null,
      remoteUrl: remoteUrl.status === 'fulfilled' ? remoteUrl.value : null,
      repoName,
      ahead: aheadBehind.status === 'fulfilled' ? aheadBehind.value.ahead : 0,
      behind: aheadBehind.status === 'fulfilled' ? aheadBehind.value.behind : 0,
      gitRootPath
    };
  });
};

module.exports = registerGitIpc;
