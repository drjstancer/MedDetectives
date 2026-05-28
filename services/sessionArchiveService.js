const ARCHIVE_KEY = 'meddetectives-session-archives';

export function archiveSession(session, metadata = {}) {
  const archives = getArchivedSessions();

  archives.push({
    ...session,
    archiveMetadata: metadata,
    archivedAt: new Date().toISOString()
  });

  localStorage.setItem(
    ARCHIVE_KEY,
    JSON.stringify(archives)
  );
}

export function getArchivedSessions() {
  return JSON.parse(localStorage.getItem(ARCHIVE_KEY) || '[]');
}
