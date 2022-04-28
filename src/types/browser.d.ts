/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare let window: Window;

declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}
