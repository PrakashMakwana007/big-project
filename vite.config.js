import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'use-sync-external-store': path.resolve(rootDir, 'src/shims/useSyncExternalStore.js'),
      'use-sync-external-store.js': path.resolve(rootDir, 'src/shims/useSyncExternalStore.js'),
      'use-sync-external-store/shim': path.resolve(rootDir, 'src/shims/useSyncExternalStore.js'),
      'use-sync-external-store/shim.js': path.resolve(rootDir, 'src/shims/useSyncExternalStore.js'),
      'use-sync-external-store/shim/with-selector': path.resolve(rootDir, 'node_modules/use-sync-external-store/shim/with-selector.js'),
      'use-sync-external-store/shim/with-selector.js': path.resolve(rootDir, 'node_modules/use-sync-external-store/shim/with-selector.js'),
      'use-sync-external-store/with-selector': path.resolve(rootDir, 'node_modules/use-sync-external-store/with-selector.js'),
      'use-sync-external-store/with-selector.js': path.resolve(rootDir, 'node_modules/use-sync-external-store/with-selector.js'),
    },
  },
  optimizeDeps: {
    include: [
      'use-sync-external-store',
      'react-is',
      'prop-types',
      'es-toolkit/compat/get',
      'es-toolkit/compat/uniqBy',
      'es-toolkit/compat/sortBy',
      'es-toolkit/compat/isPlainObject',
      'es-toolkit/compat/throttle',
      'es-toolkit/compat/omit',
      'es-toolkit/compat/maxBy',
      'es-toolkit/compat/sumBy',
      'es-toolkit/compat/range',
      'es-toolkit/compat/last',
      'es-toolkit/compat/minBy',
    ],
    exclude: ['recharts', 'recharts/es6/index.js'],
  },
  server: {
    port: 5173,
    // Proxy all /api requests to the Express backend — no CORS issues in dev
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})