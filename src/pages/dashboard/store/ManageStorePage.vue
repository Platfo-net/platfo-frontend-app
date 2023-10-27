<script setup lang="ts">
import BreadCrumbs from 'components/BreadCrumbs.vue';
import { useApi } from 'src/composables/use-api';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IShop } from 'components/models';
import StoreManagementProductsPanel from 'components/dashboard/store-page/StoreManagementProductsPanel.vue';
import StoreManagementBasicInformationPanel from 'components/dashboard/store-page/StoreManagementBasicInformationPanel.vue';
import StoreManagementPaymentMethodsPanel from 'src/components/dashboard/store-page/StoreManagementPaymentMethodsPanel.vue';
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
        <q-tab
          name="basics"
          :label="$t('pages.panel.dashboard.manageStorePage.tabs.basic')"
        ></q-tab>
        <q-tab
          name="products"
          :label="$t('pages.panel.dashboard.manageStorePage.tabs.products')"
        ></q-tab>
        <q-tab
          name="payment-config"
          :label="
            $t(
              'pages.panel.dashboard.manageStorePage.tabs.paymentConfiguration'
            )
          "
        ></q-tab>
      </q-tabs>
      <q-tab-panels v-model="tab">
        <q-tab-panel name="basics" class="q-pa-none">
          <store-management-basic-information-panel
            :title="shop.title"
            :category="shop.category"
            :description="shop.description"
          />
        </q-tab-panel>
        <q-tab-panel name="products" class="q-pa-none">
          <store-management-products-panel />
        </q-tab-panel>
        <q-tab-panel name="payment-config" class="q-pa-none">
          <StoreManagementPaymentMethodsPanel />
        </q-tab-panel>
      </q-tab-panels>
    </template>
    <template v-else>FUCK</template>
  </q-page>
</template>

<style scoped></style>
