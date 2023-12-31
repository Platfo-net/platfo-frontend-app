<script setup lang="ts">
import BreadCrumbs from 'components/BreadCrumbs.vue';
</script>

<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-lg justify-between bg-white q-pa-md rounded-borders"
      style="border: 1px solid #e1e1e1;">
      <BreadCrumbs />
    </div>
    <div class="row items-center q-mb-lg justify-between">
      <div class="col">
        <div class="text-h5">
          {{ $t('pages.panel.dashboard.manageStorePage.title') }}
        </div>
      </div>
      <q-btn color="accent" icon="chevron_left" :to="{ name: 'StoreListPage' }" :label="$t('general.goBack')"></q-btn>
    </div>
    <q-tabs class="q-mb-md" align="left" active-bg-color="black" active-color="white" indicator-color="primary">
      <q-route-tab :to="{ name: 'ManageStoreBasicInformation' }"
        :label="$t('pages.panel.dashboard.manageStorePage.tabs.basic')"></q-route-tab>
      <q-route-tab :to="{ name: 'ManageStoreProducts' }"
        :label="$t('pages.panel.dashboard.manageStorePage.tabs.products')"></q-route-tab>
      <q-route-tab :to="{ name: 'ManageStorePaymentMethods' }" :label="$t('pages.panel.dashboard.manageStorePage.tabs.paymentConfiguration')
        "></q-route-tab>
      <q-route-tab :to="{ name: 'ManageStoreProductCategories' }" :label="$t('pages.panel.dashboard.manageStorePage.tabs.productCategories')
        "></q-route-tab>
      <q-route-tab :to="{ name: 'ManageStoreShippingMethods' }" :label="$t('pages.panel.dashboard.manageStorePage.tabs.shipmentMethods')
        "></q-route-tab>
    </q-tabs>
    <router-view />
  </q-page>
</template>

<style scoped></style>
