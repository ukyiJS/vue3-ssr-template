import { defineStore } from 'pinia';
import { Config } from '@/types/ssr';

export type ConfigState = Config;

export default defineStore('config', {
  state: (): ConfigState => ({
    context: {
      environment: '',
      port: 0,
    },
    assetsDir: '',
    headers: {},
    cacheControl: {
      pages: {},
      static: {},
    },
    internationalization: {
      defaultLanguage: '',
      defaultCountry: '',
      languages: [],
    },
    thirdPartyScripts: [],
  }),
});
