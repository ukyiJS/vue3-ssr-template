import compression from 'compression';
import express from 'express';
import { appConf } from './utils/config';
import Logger from './utils/logger';
import renderAppController from './controllers/render-app.controller';
import assetsMiddleware from './middlewares/assets.middleware';
import robotsMiddleware from './middlewares/robots.middleware';
import securityMiddleware from './middlewares/security.middleware';

(() => {
  const app = express();
  const port = appConf.context.port ?? 3000;

  app.use(compression());
  app.use(securityMiddleware);
  app.use(assetsMiddleware);
  app.use(robotsMiddleware);
  app.use('*', renderAppController);

  app.listen(port, '0.0.0.0', () => Logger.startServer(port));
})();
