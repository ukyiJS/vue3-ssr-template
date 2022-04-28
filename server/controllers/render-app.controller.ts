import { renderHeadToString } from '@vueuse/head';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'vue/server-renderer';
import { CreateAppFunction } from '@/types/ssr';
import { appConf } from '../utils/config';
import Logger from '../utils/logger';
import render from '../utils/render';

const resolve = (...paths: string[]) => path.join(process.cwd(), ...paths);
const manifest = __non_webpack_require__('../ssr-manifest.json');

const templateIndexHtml = fs.readFileSync(resolve('dist', 'index.html')).toString();
const externalStyles = fs.readFileSync(resolve('dist', manifest['app.css'])).toString();

const appPath = resolve('dist', manifest['app.js']);
const createApp: CreateAppFunction = __non_webpack_require__(appPath).default;

export default async (req: Request, res: Response) => {
  try {
    const { app, router, store, head } = await createApp(req, res, appConf);

    await router.push(req.originalUrl);
    await router.isReady();

    const html = await renderToString(app);
    const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(head);

    const indexHtml = render(
      req,
      res,
      templateIndexHtml,
      htmlAttrs,
      headTags,
      bodyAttrs,
      externalStyles,
      store,
      html,
    );

    return res.status(res.statusCode || 200).set({ 'Content-Type': 'text/html' }).send(indexHtml);
  } catch (e) {
    const error = e as Error;
    Logger.error('Server Error', error.message, error.stack);

    return res.status(500).set({ 'Content-Type': 'text/html' }).send('Server Error');
  }
};
