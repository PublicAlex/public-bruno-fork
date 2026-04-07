import { useState, useEffect } from 'react';
import {
  IconGitBranch,
  IconCloudDownload,
  IconCloudUpload,
  IconAlertTriangle,
  IconLink,
  IconFolder,
  IconArrowUp,
  IconArrowDown,
  IconRefresh
} from '@tabler/icons';
import toast from 'react-hot-toast';

const Git = ({ collection }) => {
  const [info, setInfo] = useState(null);
  const [uncommitted, setUncommitted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmForcePull, setConfirmForcePull] = useState(false);
  const [commitDialog, setCommitDialog] = useState(false);
  const [commitMessage, setCommitMessage] = useState('');
  const [changedFiles, setChangedFiles] = useState([]);

  const loadInfo = () => {
    if (!collection.pathname) return;
    setLoading(true);
    Promise.allSettled([
      window.ipcRenderer.invoke('renderer:git-get-repo-info', { collectionPath: collection.pathname }),
      window.ipcRenderer.invoke('renderer:git-get-status', { collectionPath: collection.pathname })
    ])
      .then(([repoResult, statusResult]) => {
        setInfo(repoResult.status === 'fulfilled' ? repoResult.value : null);
        setUncommitted(statusResult.status === 'fulfilled' ? (statusResult.value?.files || []) : []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadInfo();
  }, [collection.pathname]);

  const handlePull = () => {
    toast.promise(
      window.ipcRenderer.invoke('renderer:git-pull', { collectionPath: collection.pathname }),
      {
        loading: 'Haciendo git pull...',
        success: () => {
          loadInfo(); return 'Pull completado exitosamente';
        },
        error: (err) => `Error en pull: ${err?.message || 'desconocido'}`
      }
    );
  };

  const handlePushClick = async () => {
    try {
      const status = await window.ipcRenderer.invoke('renderer:git-get-status', {
        collectionPath: collection.pathname
      });
      if (!status.isClean) {
        setChangedFiles(status.files || []);
        setCommitMessage(`Actualización ${new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' })}`);
        setCommitDialog(true);
      } else {
        setChangedFiles([]);
        handlePush(null);
      }
    } catch {
      setChangedFiles([]);
      handlePush(null);
    }
  };

  const handlePush = (message) => {
    setCommitDialog(false);
    toast.promise(
      window.ipcRenderer.invoke('renderer:git-commit-and-push', {
        collectionPath: collection.pathname,
        commitMessage: message
      }),
      {
        loading: 'Subiendo cambios...',
        success: (msg) => {
          loadInfo(); return msg || 'Push completado exitosamente';
        },
        error: (err) => `Error en push: ${err?.message || 'desconocido'}`
      }
    );
  };

  const handleForcePull = () => {
    setConfirmForcePull(false);
    toast.promise(
      window.ipcRenderer.invoke('renderer:git-force-pull', { collectionPath: collection.pathname }),
      {
        loading: 'Descartando cambios locales y actualizando...',
        success: () => {
          loadInfo(); return 'Colección sincronizada con el remoto';
        },
        error: (err) => `Error en force pull: ${err?.message || 'desconocido'}`
      }
    );
  };

  // Shorten a remote URL for display (hide token if present)
  const formatRemoteUrl = (url) => {
    if (!url) return null;
    // Hide access tokens in HTTPS URLs (https://TOKEN@github.com/...)
    return url.replace(/\/\/[^@]+@/, '//***@');
  };

  if (loading) {
    return <div className="px-2 py-4 text-sm text-gray-400">Cargando información del repositorio...</div>;
  }

  if (!info) {
    return <div className="px-2 py-4 text-sm text-gray-400">No se pudo obtener información del repositorio.</div>;
  }

  return (
    <div className="px-2 py-4">

      {/* Repo info card */}
      <div className="mb-4 rounded border p-3 flex flex-col gap-2 text-sm">

        {/* Repo name */}
        {info.repoName && (
          <div className="flex items-center gap-2">
            <IconFolder size={14} strokeWidth={1.5} className="flex-shrink-0 text-gray-400" />
            <span className="font-semibold">{info.repoName}</span>
          </div>
        )}

        {/* Branch */}
        <div className="flex items-center gap-2">
          <IconGitBranch size={14} strokeWidth={1.5} className="flex-shrink-0 text-gray-400" />
          <span>{info.branch || 'Sin rama detectada'}</span>
          {(info.ahead > 0 || info.behind > 0) && (
            <span className="flex items-center gap-1 ml-1 text-xs text-gray-400">
              {info.ahead > 0 && (
                <span className="flex items-center gap-0.5 text-green-600">
                  <IconArrowUp size={11} strokeWidth={2} />{info.ahead}
                </span>
              )}
              {info.behind > 0 && (
                <span className="flex items-center gap-0.5 text-orange-500">
                  <IconArrowDown size={11} strokeWidth={2} />{info.behind}
                </span>
              )}
            </span>
          )}
        </div>

        {/* Remote URL */}
        {info.remoteUrl && info.remoteUrl !== 'origin' && (
          <div className="flex items-start gap-2">
            <IconLink size={14} strokeWidth={1.5} className="flex-shrink-0 mt-0.5 text-gray-400" />
            <span className="text-xs text-gray-500 break-all">{formatRemoteUrl(info.remoteUrl)}</span>
          </div>
        )}

        {/* Local path */}
        <div className="flex items-start gap-2">
          <IconFolder size={14} strokeWidth={1.5} className="flex-shrink-0 mt-0.5 text-gray-400" />
          <span className="text-xs text-gray-400 break-all">{info.gitRootPath}</span>
        </div>
      </div>

      {/* Status line */}
      {info.ahead === 0 && info.behind === 0 && (
        <p className="text-xs text-gray-400 mb-1">Tu rama está al día con el remoto.</p>
      )}
      {info.behind > 0 && (
        <p className="text-xs text-orange-500 mb-1">
          {info.behind} commit{info.behind !== 1 ? 's' : ''} por detrás del remoto — haz Pull para actualizar.
        </p>
      )}
      {info.ahead > 0 && (
        <p className="text-xs text-green-600 mb-1">
          {info.ahead} commit{info.ahead !== 1 ? 's' : ''} por delante del remoto — haz Push para subir.
        </p>
      )}

      {/* Uncommitted changes */}
      {uncommitted.length > 0 && (
        <div className="mb-3 mt-1">
          <p className="text-xs text-green-600 font-medium mb-1">
            {uncommitted.length} archivo{uncommitted.length !== 1 ? 's' : ''} con cambios sin commitear — presiona Git Push para guardar todo.
          </p>
          <div className="max-h-28 overflow-y-auto rounded border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-2 py-1">
            {uncommitted.map((f, i) => {
              const status = f.status === '?' ? 'A' : f.status;
              const label = status === 'A' ? 'Added' : status === 'D' ? 'Deleted' : 'Modified';
              const color = status === 'D' ? '#ef4444' : status === 'A' ? '#16a34a' : '#ca8a04';
              return (
                <div key={i} className="flex items-center gap-1.5 py-0.5">
                  <span className="text-xs font-semibold flex-shrink-0 w-16" style={{ color }}>
                    {label}
                  </span>
                  <span className="text-xs font-mono text-green-800 dark:text-green-300 truncate" title={f.path}>
                    {f.path}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {uncommitted.length === 0 && <div className="mb-3" />}

      {/* Action buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setConfirmForcePull(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded border border-yellow-500 text-yellow-600 hover:opacity-80 transition-opacity"
          title="Descarta cambios locales y sincroniza con el remoto"
        >
          <IconAlertTriangle size={14} strokeWidth={1.5} />
          Force Pull
        </button>
        <button
          onClick={handlePull}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded border hover:opacity-80 transition-opacity"
        >
          <IconCloudDownload size={14} strokeWidth={1.5} />
          Git Pull
        </button>
        <button
          onClick={handlePushClick}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded border hover:opacity-80 transition-opacity"
        >
          <IconCloudUpload size={14} strokeWidth={1.5} />
          Git Push
        </button>
        <button
          onClick={loadInfo}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded border hover:opacity-80 transition-opacity"
          title="Refrescar información"
        >
          <IconRefresh size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Force pull confirmation */}
      {confirmForcePull && (
        <div className="mt-4 p-3 rounded border border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20">
          <p className="text-sm font-medium mb-1">¿Confirmar Force Pull?</p>
          <p className="text-xs text-gray-500 mb-3">
            Esto descartará <strong>todos los cambios locales</strong> en esta colección y la sincronizará
            con <code>origin/{info.branch}</code>. Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleForcePull}
              className="px-3 py-1 text-xs rounded bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
            >
              Sí, descartar y actualizar
            </button>
            <button
              onClick={() => setConfirmForcePull(false)}
              className="px-3 py-1 text-xs rounded border hover:opacity-80 transition-opacity"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Commit message dialog */}
      {commitDialog && (
        <div className="mt-4 p-3 rounded border bg-blue-50 dark:bg-blue-900/20">
          <p className="text-sm font-medium mb-2">Hay cambios sin commitear</p>

          {changedFiles.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">
                Archivos a commitear ({changedFiles.length}):
              </p>
              <div className="max-h-36 overflow-y-auto rounded border border-blue-200 dark:border-blue-700 bg-white dark:bg-gray-900 px-2 py-1">
                {changedFiles.map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 py-0.5">
                    <span
                      className="font-bold text-xs w-3 flex-shrink-0"
                      style={{
                        color:
                          f.status === 'D'
                            ? '#ef4444'
                            : f.status === 'A' || f.status === '?'
                              ? '#16a34a'
                              : '#ca8a04'
                      }}
                    >
                      {f.status === '?' ? 'A' : f.status}
                    </span>
                    <span className="text-xs font-mono text-gray-700 dark:text-gray-300 truncate" title={f.path}>
                      {f.path}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500 mb-2">Mensaje del commit:</p>
          <input
            type="text"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && commitMessage.trim()) handlePush(commitMessage.trim()); }}
            className="w-full px-2 py-1.5 text-sm rounded border mb-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
            placeholder="Mensaje del commit..."
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={() => handlePush(commitMessage.trim() || commitMessage)}
              disabled={!commitMessage.trim()}
              className="px-3 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-40"
            >
              Commitear y subir
            </button>
            <button
              onClick={() => setCommitDialog(false)}
              className="px-3 py-1 text-xs rounded border hover:opacity-80 transition-opacity"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Git;
