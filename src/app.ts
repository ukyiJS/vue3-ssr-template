import { createHead } from '@vueuse/head';
import { Response } from 'express';
import { Pinia } from 'pinia';
import { createSSRApp } from 'vue';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';

interface CreateAppArgs {
  serverResponse?: Response;
  postCreateStore: (store?: Pinia) => Promise<void>;
}

export default async ({ serverResponse, postCreateStore }: CreateAppArgs) => {
  const app = createSSRApp(App);

  const store = createStore();
  app.use(store);
  await postCreateStore(store);

  const router = createRouter(serverResponse);
  app.use(router);

  const head = createHead();
  app.use(head);

  app.config.globalProperties = {
    ...app.config.globalProperties,
  };

  return { app, router, store, head };
};
