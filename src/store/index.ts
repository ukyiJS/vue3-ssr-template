import { createPinia } from 'pinia';
import { isServerSide } from '@/utils/context';
import useConfig from './config';
import useSeo from './seo';
import useUser from './user';

export default () => {
  const pinia = createPinia();

  if (isServerSide()) {
    useUser(pinia);
    useSeo(pinia);
    useConfig(pinia);
  }

  return pinia;
};
