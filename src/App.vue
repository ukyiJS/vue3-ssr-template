<template>
  <router-view />
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import useSeo from './store/seo';

const seo = useSeo();

useHead({
  title: computed(() => seo.title),
  htmlAttrs: { lang: 'ko' },
  meta: [
    { name: 'description', content: computed(() => seo.description) },
  ],
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
