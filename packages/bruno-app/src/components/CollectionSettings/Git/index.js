import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  IconAlertTriangle,
  IconArrowDown,
  IconArrowUp,
  IconCloudDownload,
  IconCloudUpload,
  IconFolder,
  IconGitBranch,
  IconHistory,
  IconLink,
  IconRefresh,
  IconStars
} from '@tabler/icons';
import toast from 'react-hot-toast';
import StatusBadge from 'ui/StatusBadge';
import { clearGitChangeMarkers } from 'providers/ReduxStore/slices/collections';
import StyledWrapper from './StyledWrapper';

const getFileState = (rawStatus) => {
  const status = rawStatus === '?' ? 'A' : rawStatus;

  switch (status) {
    case 'A':
    case 'added':
      return { label: 'Nuevo', tone: 'success' };
    case 'D':
    case 'deleted':
      return { label: 'Eliminado', tone: 'danger' };
    case 'R':
    case 'renamed':
      return { label: 'Renombrado', tone: 'info' };
    default:
      return { label: 'Actualizado', tone: 'warning' };
  }
};

const getSyncSourceLabel = (source) => {
  switch (source) {
    case 'auto-pull':
      return 'Auto Pull';
    case 'force-pull':
      return 'Force Pull';
    default:
      return 'Pull';
  }
};

const formatSyncMessage = (result, defaultMessage) => {
  const changes = result?.changedFiles?.length || 0;
  if (!changes) {
    return defaultMessage;
  }

  return `${defaultMessage} con ${changes} cambio${changes !== 1 ? 's' : ''}`;
};

const Git = ({ collection }) => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState(null);
  const [uncommitted, setUncommitted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmForcePull, setConfirmForcePull] = useState(false);
  const [commitDialog, setCommitDialog] = useState(false);
  const [commitMessage, setCommitMessage] = useState('');
  const [changedFiles, setChangedFiles] = useState([]);

  const syncHistory = collection.gitSyncHistory || [];
  const pendingBadges = collection.gitChangeMarkers || [];

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
        success: (result) => {
          loadInfo();
          return formatSyncMessage(result, 'Pull completado');
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
          loadInfo();
          return msg || 'Push completado exitosamente';
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
        success: (result) => {
          loadInfo();
          return formatSyncMessage(result, 'Colección sincronizada con el remoto');
        },
        error: (err) => `Error en force pull: ${err?.message || 'desconocido'}`
      }
    );
  };

  const formatRemoteUrl = (url) => {
    if (!url) return null;
    return url.replace(/\/\/[^@]+@/, '//***@');
  };

  if (loading) {
    return <StyledWrapper className="git-shell empty-state">Cargando información del repositorio...</StyledWrapper>;
  }

  if (!info) {
    return <StyledWrapper className="git-shell empty-state">No se pudo obtener información del repositorio.</StyledWrapper>;
  }

  return (
    <StyledWrapper className="git-shell">
      <section className="page-header">
        <div className="page-title-block">
          <p className="eyebrow">Sincronización inteligente</p>
          <h3>{info.repoName || collection.name}</h3>
          <p className="hero-text">
            Un resumen claro de lo que llegó desde el remoto, lo que sigue pendiente localmente y las novedades que todavía no has revisado.
          </p>
        </div>

        <div className="header-badges">
          <StatusBadge status={pendingBadges.length ? 'info' : 'muted'} size="sm" radius="full">
            {pendingBadges.length ? `${pendingBadges.length} por revisar` : 'Todo revisado'}
          </StatusBadge>
          <StatusBadge status={uncommitted.length ? 'success' : 'muted'} size="sm" radius="full">
            {uncommitted.length} local{uncommitted.length !== 1 ? 'es' : ''}
          </StatusBadge>
          <p className="header-actions-hint" aria-hidden="true">
            Acciones de sincronización en la tarjeta de estado, debajo de las métricas.
          </p>
        </div>
      </section>

      <section className="top-grid">
        <section className="hero-card summary-card">
          <div className="section-header compact-header">
            <div>
              <h4>Estado del repositorio</h4>
              <p>Lo esencial para saber si debes traer cambios, subirlos o revisar novedades.</p>
            </div>
          </div>

          <div className={`summary-banner ${info.behind > 0 ? 'warning' : info.ahead > 0 ? 'success' : 'muted'}`}>
            <IconStars size={16} strokeWidth={1.8} />
            <span>
              {info.behind > 0
                ? `Hay ${info.behind} commit${info.behind !== 1 ? 's' : ''} pendientes por bajar del remoto.`
                : info.ahead > 0
                  ? `Hay ${info.ahead} commit${info.ahead !== 1 ? 's' : ''} listos para subir al remoto.`
                  : 'La rama local está alineada con el remoto.'}
            </span>
          </div>

          <div className="metrics-grid">
            <div className="metric-card metric-card--ahead">
              <span className="metric-label">Ahead</span>
              <strong className="metric-value">{info.ahead}</strong>
            </div>
            <div className="metric-card metric-card--behind">
              <span className="metric-label">Behind</span>
              <strong className="metric-value">{info.behind}</strong>
            </div>
            <div className="metric-card metric-card--locales">
              <span className="metric-label">Locales</span>
              <strong className="metric-value">{uncommitted.length}</strong>
            </div>
            <div className="metric-card metric-card--pendientes">
              <span className="metric-label">Pendientes</span>
              <strong className="metric-value">{pendingBadges.length}</strong>
            </div>
          </div>

          {!confirmForcePull && !commitDialog && (
            <div className="git-sync-actions">
              <p className="git-sync-actions-label">Sincronizar</p>
              <div className="git-sync-actions-buttons" role="toolbar" aria-label="Acciones Git">
                <button type="button" className="git-sync-btn git-sync-btn--pull" onClick={handlePull}>
                  <IconCloudDownload size={14} strokeWidth={1.75} />
                  <span>Pull</span>
                </button>
                <button type="button" className="git-sync-btn git-sync-btn--push" onClick={handlePushClick}>
                  <IconCloudUpload size={14} strokeWidth={1.75} />
                  <span>Push</span>
                </button>
                <button
                  type="button"
                  className="git-sync-btn git-sync-btn--force"
                  onClick={() => setConfirmForcePull(true)}
                  title="Descarta cambios locales y sincroniza con el remoto"
                >
                  <IconAlertTriangle size={14} strokeWidth={1.75} />
                  <span>Force</span>
                </button>
                <button
                  type="button"
                  className="git-sync-btn git-sync-btn--refresh"
                  onClick={loadInfo}
                  aria-label="Refrescar información del repositorio"
                  title="Refrescar"
                >
                  <IconRefresh size={15} strokeWidth={1.65} />
                </button>
              </div>
            </div>
          )}

          <div className="repo-details technical-panel">
            <div className="detail-row">
              <span className="detail-label">Rama</span>
              <div className="detail-value">
                <IconGitBranch size={14} strokeWidth={1.6} />
                <span>{info.branch || 'Sin rama detectada'}</span>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label">Remoto</span>
              <div className="detail-value detail-path" title={formatRemoteUrl(info.remoteUrl)}>
                <IconLink size={14} strokeWidth={1.6} />
                <span>{formatRemoteUrl(info.remoteUrl) || 'Sin remoto configurado'}</span>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label">Ruta local</span>
              <div className="detail-value detail-path" title={info.gitRootPath}>
                <IconFolder size={14} strokeWidth={1.6} />
                <span>{info.gitRootPath}</span>
              </div>
            </div>
          </div>

          <div className="signal-row signal-row-hero">
            <StatusBadge status={info.ahead > 0 ? 'success' : 'muted'} size="sm" radius="full">
              <IconArrowUp size={11} strokeWidth={2} />
              {info.ahead} ahead
            </StatusBadge>
            <StatusBadge status={info.behind > 0 ? 'warning' : 'muted'} size="sm" radius="full">
              <IconArrowDown size={11} strokeWidth={2} />
              {info.behind} behind
            </StatusBadge>
          </div>
        </section>
      </section>

      <section className="bottom-grid">
        <section className="section-card">
          <div className="section-header">
            <div>
              <h4>Historial reciente</h4>
              <p>Lo último que entró por `auto-pull`, `pull` manual o `force pull`.</p>
            </div>
            {pendingBadges.length > 0 && (
              <button className="action-button subtle" onClick={() => dispatch(clearGitChangeMarkers({ collectionUid: collection.uid }))}>
                Limpiar marquillas
              </button>
            )}
          </div>

          {syncHistory.length ? (
            <div className="history-list scroll-area">
              {syncHistory.map((entry) => (
                <div key={entry.id} className="history-row">
                  <div className="history-meta">
                    <div className="history-title-row">
                      <div className="history-title">
                        <IconHistory size={14} strokeWidth={1.7} />
                        <span>{getSyncSourceLabel(entry.source)}</span>
                      </div>
                      <StatusBadge status={entry.hasChanges ? 'info' : 'muted'} size="xs" radius="full">
                        {entry.changedFiles?.length || 0} cambio{(entry.changedFiles?.length || 0) !== 1 ? 's' : ''}
                      </StatusBadge>
                    </div>
                    <p className="technical-text">{new Date(entry.pulledAt).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                  </div>

                  {entry.changedFiles?.length ? (
                    <div className="file-list compact-list file-list-divided">
                      {entry.changedFiles.slice(0, 8).map((file) => {
                        const state = getFileState(file.status);
                        return (
                          <div key={`${entry.id}-${file.absolutePath}`} className="file-row inline-row">
                            <StatusBadge status={state.tone} size="xs" radius="full">
                              {state.label}
                            </StatusBadge>
                            <span className="file-path" title={file.collectionRelativePath}>{file.collectionRelativePath}</span>
                          </div>
                        );
                      })}
                      {entry.changedFiles.length > 8 && (
                        <p className="subtle">Y {entry.changedFiles.length - 8} cambio(s) más...</p>
                      )}
                    </div>
                  ) : (
                    <p className="subtle">No llegaron archivos nuevos en esta sincronización.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="subtle">Todavía no hay pulls registrados en esta sesión.</p>
          )}
        </section>

        <section className="section-card">
          <div className="section-header">
            <div>
              <h4>Cambios locales</h4>
              <p>Archivos pendientes antes de hacer `push`.</p>
            </div>
            {uncommitted.length > 0 && (
              <StatusBadge status="success" size="sm" radius="full">
                {uncommitted.length} pendiente{uncommitted.length !== 1 ? 's' : ''}
              </StatusBadge>
            )}
          </div>

          {uncommitted.length ? (
            <div className="file-list compact-scroll scroll-area file-list-divided">
              {uncommitted.map((file, index) => {
                const state = getFileState(file.status);
                return (
                  <div key={`${file.path}-${index}`} className="file-row inline-row">
                    <StatusBadge status={state.tone} size="xs" radius="full">
                      {state.label}
                    </StatusBadge>
                    <span className="file-path" title={file.path}>{file.path}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-block">
              <p className="subtle">No hay cambios locales sin commitear.</p>
            </div>
          )}
        </section>
      </section>

      {confirmForcePull && (
        <section className="section-card tone-warning">
          <div className="section-header">
            <div>
              <h4>Confirmar Force Pull</h4>
              <p>Esto descartará todo lo local y reemplazará la colección con `origin/{info.branch}`.</p>
            </div>
          </div>

          <div className="actions-row">
            <button onClick={handleForcePull} className="action-button warning">
              Sí, descartar y actualizar
            </button>
            <button onClick={() => setConfirmForcePull(false)} className="action-button neutral">
              Cancelar
            </button>
          </div>
        </section>
      )}

      {commitDialog && (
        <section className="section-card tone-info">
          <div className="section-header">
            <div>
              <h4>Preparar commit antes del push</h4>
              <p>Vas a subir cambios locales; aquí se ve exactamente qué archivos van a entrar.</p>
            </div>
          </div>

          {changedFiles.length > 0 && (
            <div className="file-list compact-list">
              {changedFiles.map((file, index) => {
                const state = getFileState(file.status);
                return (
                  <div key={`${file.path}-${index}`} className="file-row">
                    <StatusBadge status={state.tone} size="xs" radius="full">
                      {state.label}
                    </StatusBadge>
                    <span className="file-path" title={file.path}>{file.path}</span>
                  </div>
                );
              })}
            </div>
          )}

          <label className="input-label" htmlFor="git-commit-message">Mensaje del commit</label>
          <input
            id="git-commit-message"
            type="text"
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && commitMessage.trim()) {
                handlePush(commitMessage.trim());
              }
            }}
            className="commit-input"
            placeholder="Mensaje del commit..."
            autoFocus
          />

          <div className="actions-row">
            <button
              onClick={() => handlePush(commitMessage.trim() || commitMessage)}
              disabled={!commitMessage.trim()}
              className="action-button primary"
            >
              Commitear y subir
            </button>
            <button onClick={() => setCommitDialog(false)} className="action-button neutral">
              Cancelar
            </button>
          </div>
        </section>
      )}
    </StyledWrapper>
  );
};

export default Git;
