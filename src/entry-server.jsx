import { PlasmicRemoteChangeWatcher } from '@plasmicapp/watcher';
import renderHydrogen from '@shopify/hydrogen/entry-server';

import App from './App.server';
import { PLASMIC } from './plasmic-init';

export default renderHydrogen(App, () => {
  // Custom hook
});
if (process.env.NODE_ENV !== "production" && typeof window === "undefined") {
  console.log("Subscribing to Plasmic changes...");
  const opts = PLASMIC.__internal.opts;
  const watcher = new PlasmicRemoteChangeWatcher({
    projects: opts.projects,
    host: opts.host,
  });

  const clearCache = (projectId) => {
    console.log(
      `Detected update to ${projectId}; clearing cache: ${new Date().toISOString()}`
    );
    PLASMIC.clearCache();
  };

  watcher.subscribe({
    onUpdate: (projectId) => {
      if (opts.preview) {
        clearCache(projectId);
      }
    },
    onPublish: (projectId) => {
      if (!opts.preview) {
        clearCache(projectId);
      }
    }
  });
}