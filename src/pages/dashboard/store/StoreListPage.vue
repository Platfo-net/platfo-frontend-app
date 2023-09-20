<script setup lang="ts">
import StoreList from 'components/dashboard/store-page/StoreList.vue';
</script>

<template>
  <q-page class="q-pa-md">
    <div class="row justify-between items-center q-mb-lg">
      <div class="text-h5">My Stores</div>
      <q-btn
        color="accent"
        :to="{ name: 'CreateStorePage' }"
        label="Create new store"
      ></q-btn>
    </div>
    <StoreList />
  </q-page>
</template>

<style scoped></style>
