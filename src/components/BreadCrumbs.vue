<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <div
    class="row items-center q-mb-lg justify-between bg-white q-pa-md rounded-borders"
    style="border: 1px solid #e1e1e1"
    v-if="route.meta.breadcrumbs"
  >
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-for="bc in route.meta.breadcrumbs"
        :label="$t(bc.label)"
        :to="bc.to"
        :key="bc.label"
      />
    </q-breadcrumbs>
  </div>
</template>

<style scoped></style>
