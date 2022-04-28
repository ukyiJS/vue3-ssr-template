import { Response } from 'express';
import { RouteRecordRaw } from 'vue-router';
import example from './example';
import home from './home';
import notFound from './notFound';

export default (serverResponse?: Response): RouteRecordRaw[] => [
  home(),
  example(),
  notFound(serverResponse),
];
