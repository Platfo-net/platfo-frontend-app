<script setup lang="ts">
defineProps<{
  loading: boolean;
}>();
</script>

<template>
  <q-inner-loading :showing="loading">
    <div class="flex column items-center justify-center">
      <q-spinner></q-spinner>
      <div class="q-my-md">
        {{ $t('general.gettingData') }}
      </div>
    </div>
  </q-inner-loading>
</template>

<style scoped></style>
