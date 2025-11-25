import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// Register the service worker with auto update
serviceWorkerRegistration.register({
  onUpdate: registration => {
    console.log('SW update available', registration);
  }
});

// Listen for messages from SW (SYNC trigger)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data && event.data.type === 'SYNC_PENDING') {
      // You can trigger a client-side sync routine here if needed
      window.dispatchEvent(new Event('SYNC_PENDING'));
    }
  });
}
