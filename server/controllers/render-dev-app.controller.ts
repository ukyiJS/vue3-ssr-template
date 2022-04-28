import { renderHeadToString } from '@vueuse/head';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { ModuleNode, ViteDevServer } from 'vite';
import { renderToString } from 'vue/server-renderer';
import { CreateAppFunction, Render } from '@/types/ssr';
import { appConf } from '../utils/config';
import Logger from '../utils/logger';

export default async (req: Request, res: Response, vite: ViteDevServer) => {
  const url = req.originalUrl;

  try {
    let template = fs.readFileSync(path.join(process.cwd(), 'public/index.html'), 'utf8');
    template = await vite.transformIndexHtml(url, template);

    const createApp: CreateAppFunction = (await vite.ssrLoadModule('src/entry-server.ts')).default;
    const render: Render = (await vite.ssrLoadModule('server/utils/render.ts')).default;
    const collectCssUrls = (modules: Set<ModuleNode>, styles: Map<string, string>) => modules.forEach(mod => {
      if (mod.file?.endsWith('.css') || /\?vue&type=style/.test(mod.id ?? '')) styles.set(mod.url, mod.ssrModule?.default);
      if (mod.importedModules?.size) collectCssUrls(mod.importedModules, styles);
    });

    const { app, router, store, head } = await createApp(req, res, appConf);

    await router.push(url);
    await router.isReady();

    const html = await renderToString(app);
    const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(head);

    const styles = new Map();
    const modules = vite.moduleGraph.idToModuleMap;
    collectCssUrls(new Set([...modules.values()]), styles);

    const devStyles = [...styles.values()].join('\n');
    const indexHtml = render(req, res, template, htmlAttrs, headTags, bodyAttrs, devStyles, store, html);

    return res.status(200).set({ 'Content-Type': 'text/html' }).send(indexHtml);
  } catch (e: unknown) {
    const error = e as Error;
    vite.ssrFixStacktrace(error);
    Logger.error(error.name, error.message, error.stack);

    return res.status(200).send(error.stack);
  }
};
