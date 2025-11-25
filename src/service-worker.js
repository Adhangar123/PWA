self.addEventListener('sync', event => {
  if (event.tag === 'sync-farmers') {
    event.waitUntil(notifyClientsToSync());
  }
});

async function notifyClientsToSync() {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  for (const client of clients) {
    client.postMessage({ type: 'SYNC_PENDING' });
  }
}
