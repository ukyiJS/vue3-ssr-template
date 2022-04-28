import { Request, Response } from 'express';
import createApp from './app';
import useConfig from './store/config';
import { Config } from './types/ssr';

export default async (req: Request, res: Response, conf: Config) => {
  const postCreateStore = async () => {
    const config = useConfig();
    config.$patch({ ...conf });
  };

  const { app, router, store, head } = await createApp({
    serverResponse: res,
    postCreateStore,
  });

  return { app, router, store, head };
};
