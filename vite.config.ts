import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

// The demo is intentionally static so the same artifact can be served by
// GitHub Pages. The application itself does not need a server runtime.
export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  server: {
    host: '127.0.0.1',
    watch:
      process.env.CODEX_SANDBOX === 'seatbelt'
        ? { useFsEvents: false, usePolling: true }
        : undefined,
  },
  plugins: [vinext()],
});
