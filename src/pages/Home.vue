<script setup lang="ts">
import { computed, onServerPrefetch } from 'vue';
import useUserStore from '@/store/user';

const user = useUserStore();
const name = computed(() => user.name);

onServerPrefetch(() => {
  user.$patch({ name: 'ukyi-ssr' });
});
</script>

<template>
  <div home>
    <img alt="Vue logo" src="@/assets/logo.png" />
    <h1>{{ name }}</h1>
    <router-link to="/example">Example</router-link>
  </div>
</template>

<style lang="scss"></style>
