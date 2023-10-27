<script setup lang="ts">
import CreateStoreStepper from 'components/dashboard/store-page/CreateStoreStepper.vue';
import LayoutBreadCrumbs from 'components/BreadCrumbs.vue';
</script>

<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-lg justify-between">
      <LayoutBreadCrumbs />
    </div>
    <div class="row items-center q-mb-lg justify-between">
      <div class="text-h5">
        {{ $t('pages.panel.dashboard.createNewStorePage.title') }}
      </div>
      <q-btn
        color="accent"
        icon="chevron_left"
        :to="{ name: 'StoreListPage' }"
        :label="$t('general.goBack')"
      ></q-btn>
    </div>
    <CreateStoreStepper />
  </q-page>
</template>

<style scoped></style>
