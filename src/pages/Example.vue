<script setup lang="ts">
import useSeo from '@/store/seo';

const seo = useSeo();
seo.$patch({ title: 'Example' });
</script>

<template>
  <div example>
    <h1>Hello World 🚀</h1>
  </div>
</template>

<style lang="scss"></style>
