<script setup lang="ts">
import { useMeta } from 'quasar';
import { useRoute } from 'vue-router';
const route = useRoute();
useMeta(() => ({
  title: route.meta.title as string,
}))
</script>

<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
