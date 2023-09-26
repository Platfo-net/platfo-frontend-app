<script setup lang="ts">
import BreadCrumbs from 'components/BreadCrumbs.vue';
import { useApi } from 'src/composables/use-api';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IShop } from 'components/models';
const route = useRoute();
const { api, loading } = useApi();

const shop = ref<IShop>();

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
          <div class="text-h5">Manage Shop</div>
          <div class="text-caption text-grey">{{ shop.title }}</div>
        </div>
        <q-btn
          color="accent"
          icon="chevron_left"
          :to="{ name: 'StoreListPage' }"
          label="Go Back"
        ></q-btn>
      </div>
      <code>{{ JSON.stringify(shop) }}</code></template
    >
    <template v-else>FUCK</template>
  </q-page>
</template>

<style scoped></style>
