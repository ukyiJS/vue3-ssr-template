import { Component } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { ROUTE, Routes } from '../constants';

const view = (name: Routes): Component => () => import(/* webpackChunkName: "example" */ `../../pages/${name}.vue`);

export default (): RouteRecordRaw => ({
  path: '/example',
  name: ROUTE.EXAMPLE,
  component: view(ROUTE.EXAMPLE),
});
