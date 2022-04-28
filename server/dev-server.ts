import express from 'express';
import { join } from 'path';
import { createServer } from 'vite';
import renderDevAppController from './controllers/render-dev-app.controller';
import { appConf } from './utils/config';
import Logger from './utils/logger';

(async () => {
  const root = process.cwd();
  const port = appConf.context.port ?? 3000;

  const app = express();
  const vite = await createServer({
    root,
    logLevel: 'info',
    configFile: join(root, 'build/vite.dev-server.js'),
    server: { middlewareMode: 'ssr' },
  });

  app.use(vite.middlewares);
  app.use('*', (req, res) => renderDevAppController(req, res, vite));

  app.listen(port, '0.0.0.0', () => Logger.startServer(port));
})();
