<script setup lang="ts">
import StoreList from 'components/dashboard/store-page/StoreList.vue';
import LayoutBreadCrumbs from 'components/BreadCrumbs.vue';
</script>

<template>
  <q-page class="q-pa-md">
    <LayoutBreadCrumbs />

    <div class="row justify-between items-center q-mb-lg">
      <div class="text-h5">
        {{ $t('pages.panel.dashboard.storeListPage.title') }}
      </div>
      <q-btn
        color="dark"
        :to="{ name: 'CreateStorePage' }"
        :label="$t('pages.panel.dashboard.storeListPage.createNewStore')"
      ></q-btn>
    </div>
    <StoreList />
  </q-page>
</template>

<style scoped></style>
