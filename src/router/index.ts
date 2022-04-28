import { Response } from 'express';
import { createMemoryHistory, createRouter, createWebHistory, useRouter as initRouter } from 'vue-router';
import { isServerSide } from '@/utils/context';
import getRoutes from './routes';

export default (serverResponse?: Response) => {
  const router = createRouter({
    history: isServerSide() ? createMemoryHistory() : createWebHistory(),
    routes: getRoutes(serverResponse),
  });

  router.beforeEach((to, from, next) => {
    next();
  });

  return router;
};

export const useRouter = () => {
  const router = initRouter();

  return router;
};
