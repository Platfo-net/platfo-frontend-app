<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <template v-if="route.meta.breadcrumbs">
    <q-breadcrumbs>
      <q-breadcrumbs-el v-for="bc in route.meta.breadcrumbs" :label="$t(bc.label)" :to="bc.to" :key="bc.label" />
    </q-breadcrumbs>
  </template>
</template>

<style scoped></style>
