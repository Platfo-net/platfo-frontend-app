<script setup lang="ts">
import BreadCrumbs from 'components/BreadCrumbs.vue';
import { useApi } from 'src/composables/use-api';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IShop } from 'components/models';
const route = useRoute();
const { api, loading } = useApi();

const shop = ref<IShop>();

const tab = ref('basics');

onBeforeMount(() => {
  api
    .get(`/shop/shop/${route.params.storeId}`)
    .then((r) => (shop.value = r.data));
});
</script>

<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-lg justify-between">
      <BreadCrumbs />
    </div>
    <template v-if="loading"
      ><q-inner-loading :showing="loading">
        <q-spinner-dots size="50px" color="accent" /> </q-inner-loading
    ></template>
    <template v-else-if="shop">
      <div class="row items-center q-mb-lg justify-between">
        <div class="col">
          <div class="text-h5">
            {{ $t('pages.panel.dashboard.manageStorePage.title') }}
          </div>
        </div>
        <q-btn
          color="accent"
          icon="chevron_left"
          :to="{ name: 'StoreListPage' }"
          :label="$t('general.goBack')"
        ></q-btn>
      </div>
      <q-tabs
        class="q-mb-md"
        v-model="tab"
        align="left"
        active-bg-color="black"
        active-color="white"
        indicator-color="primary"
      >
        <q-route-tab
          :to="{ name: 'ManageStoreBasicInformation' }"
          :label="$t('pages.panel.dashboard.manageStorePage.tabs.basic')"
        ></q-route-tab>
        <q-route-tab
          :to="{ name: 'ManageStoreProducts' }"
          :label="$t('pages.panel.dashboard.manageStorePage.tabs.products')"
        ></q-route-tab>
        <q-route-tab
          :to="{ name: 'ManageStorePaymentMethods' }"
          :label="
            $t(
              'pages.panel.dashboard.manageStorePage.tabs.paymentConfiguration'
            )
          "
        ></q-route-tab>
      </q-tabs>
      <router-view />
    </template>
    <template v-else>{{ $t('general.platfoSystemError') }} </template>
  </q-page>
</template>

<style scoped></style>
