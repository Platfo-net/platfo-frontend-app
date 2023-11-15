<script setup lang="ts">
defineProps<{
  loading: boolean;
}>();
</script>

<template>
  <q-inner-loading :showing="loading">
    <q-spinner></q-spinner>
    <div class="q-my-md">
      {{ $t('general.gettingData') }}
    </div>
  </q-inner-loading>
</template>

<style scoped></style>
