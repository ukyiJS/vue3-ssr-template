import { defineStore } from 'pinia';

export interface SeoState {
  title: string
  description: string
  robots: string
}

export default defineStore('seo', {
  state: ():SeoState => ({
    title: 'Vue3 SSR App',
    description: '',
    robots: '',
  }),
});
