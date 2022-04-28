import { HeadClient } from '@vueuse/head';
import { Request, Response } from 'express';
import { Pinia } from 'pinia';
import { App } from 'vue';
import { Router } from 'vue-router';

export interface CreateApp {
  app: App;
  router: Router;
  store: Pinia;
  head: HeadClient;
}

export type CreateAppFunction = (req: Request, res: Response, conf: Config) => Promise<CreateApp>;

export interface ConfigContext {
  environment: string;
  port: number;
}

export interface ConfigThirdPartyScript {
  id?: string;
  uri?: string;
  body?: string;
  node: 'head' | 'body';
  defer?: boolean;
  async?: boolean;
}

export interface Internationalization {
  languages: string[];
  defaultCountry: string;
  defaultLanguage: string;
}

export interface CacheControl {
  pages: Record<string, number>;
  static: Record<string, number>;
}

export interface Config {
  context: ConfigContext;
  assetsDir: string;
  headers: Record<string, string>;
  internationalization: Internationalization;
  cacheControl: CacheControl;
  thirdPartyScripts?: ConfigThirdPartyScript[];
}

export type Render = (req: Request, res: Response, templateHtml: string, htmlAttrs: string, headTags: string, bodyAttrs: string, styles: string, store: Pinia, appHtml: string) => string;
