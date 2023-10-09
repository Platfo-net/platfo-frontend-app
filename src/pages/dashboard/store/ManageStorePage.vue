<script setup lang="ts">
import BreadCrumbs from 'components/BreadCrumbs.vue';
import { useApi } from 'src/composables/use-api';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IShop } from 'components/models';
import StoreManagementProductsPanel from 'components/dashboard/store-page/StoreManagementProductsPanel.vue';
import StoreManagementBasicInformationPanel from 'components/dashboard/store-page/StoreManagementBasicInformationPanel.vue';
const route = useRoute();
const { api, loading } = useApi();

const shop = ref<IShop>();

const tab = ref('basics');

const getProducts = async () => {
  const res = await api.get(`/shop/products/${route.params.storeId}/all`);
};

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
    <template v-if="loading"><q-inner-loading :showing="loading">
        <q-spinner-dots size="50px" color="accent" /> </q-inner-loading></template>
    <template v-else-if="shop">
      <div class="row items-center q-mb-lg justify-between">
        <div class="col">
          <div class="text-h5">Manage Shop</div>
        </div>
        <q-btn color="accent" icon="chevron_left" :to="{ name: 'StoreListPage' }" label="Go Back"></q-btn>
      </div>
      <q-tabs class="q-mb-md" v-model="tab" align="left" active-bg-color="accent" active-color="white"
        indicator-color="primary">
        <q-tab name="basics" label="Basic Information"></q-tab>
        <q-tab name="products" label="Products"></q-tab>
        <!--        <q-tab name="orders" label="Orders"></q-tab>-->
      </q-tabs>
      <q-tab-panels v-model="tab">
        <q-tab-panel name="basics" class="q-pa-none">
          <q-card class="q-pa-none" bordered square flat>
            <store-management-basic-information-panel :title="shop.title" :category="shop.category"
              :description="shop.description" />
          </q-card>
        </q-tab-panel>
        <q-tab-panel name="products" class="q-pa-none">
          <store-management-products-panel />
        </q-tab-panel>
        <q-tab-panel name="orders" class="q-pa-none">
          <q-card class="q-pa-lg" bordered square flat>
            <div class="text-h6">Orders</div>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </template>
    <template v-else>FUCK</template>
  </q-page>
</template>

<style scoped></style>
