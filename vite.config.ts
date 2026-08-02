import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Listen on 0.0.0.0 so LAN devices (192.168.x.x) can access the dev server.
    host: true,
    port: 5173,
    hmr: true,
    watch: {
      // The project lives on a mounted filesystem, where inotify events are
      // unreliable — poll instead so HMR reliably picks up file changes.
      usePolling: true,
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
