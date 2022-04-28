import { Response } from 'express';
import { Component } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { ROUTE, Routes } from '../constants';

const view = (name: Routes): Component => () => import(/* webpackChunkName: "notFound" */ `../../pages/${name}.vue`);

export default (serverResponse?: Response): RouteRecordRaw => ({
  path: '/:pathMatch(.*)*',
  name: ROUTE.NOT_FOUND,
  beforeEnter: (to, from, next) => {
    if (serverResponse) serverResponse.status(404);
    next();
  },
  component: view(ROUTE.NOT_FOUND),
});
