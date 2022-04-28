import { Pinia } from 'pinia';
import createApp from './app';

const postCreateStore = async (store?: Pinia) => {
  const initialState = window.__INITIAL_STATE__;
  if (initialState && store) store.state.value = initialState;

  delete window.__INITIAL_STATE__;
};

(async () => {
  const { app, router } = await createApp({ postCreateStore });
  await router.isReady();

  app.mount('#app', true);
})();
