import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/auto-icons'],
  outDir: 'output',
  vite: () => ({
    esbuild: {
      jsx: 'automatic',
      jsxImportSource: 'preact',
    },
  }),
  manifest: {
    name: 'JSON View',
    description: 'Pretty-print browser-rendered application/json responses.',
    permissions: ['storage'],
  },
});
