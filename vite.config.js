import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), {
    name: 'cabinet-dev-routes',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const base = server.config.base.replace(/\/$/, '');
        const path = (req.url || '').slice(base.length);
        if (/^\/(student|admin|login)(\/|\?|$)/.test(path) && req.headers.accept?.includes('text/html')) req.url = `${base}/cabinet/index.html`;
        next();
      });
    },
  }],
  build: {rollupOptions: {input: {landing: 'index.html', cabinet: 'cabinet/index.html'}}},
});
