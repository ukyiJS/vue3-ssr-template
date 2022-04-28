import { Component } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { ROUTE, Routes } from '../constants';

const view = (name: Routes): Component => () => import(/* webpackChunkName: "home" */ `../../pages/${name}.vue`);

export default (): RouteRecordRaw => ({
  path: '',
  name: ROUTE.HOME,
  component: view(ROUTE.HOME),
});
