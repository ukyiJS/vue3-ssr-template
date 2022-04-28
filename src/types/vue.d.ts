/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';

  const component: ReturnType<DefineComponent>;
  export default component;
}
