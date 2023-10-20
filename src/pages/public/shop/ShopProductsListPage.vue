<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useApi } from 'src/composables/use-api';
import { IPaginatedResponse } from 'src/composables/types';
import { IProduct } from 'components/models';
import { onMounted, ref } from 'vue';
import TelegramShopProductItem from 'components/public/shop/TelegramShopProductItem.vue';

const route = useRoute();
const { api, loading } = useApi();
const products = ref<IProduct[]>([]);
const getShopProductsPaginatedResponse = async () => {
  const { data } = await api.get<IPaginatedResponse<IProduct>>(
    `/shop/products/${route.params.shopId}/telegram-shop`
  );
  products.value = data.items;
};

onMounted(async () => {
  await getShopProductsPaginatedResponse();
});
</script>

<template>
  <q-page class="q-pa-md">
    <template v-if="loading">
      <q-inner-loading :showing="loading">
        <q-spinner-dots size="md" />
      </q-inner-loading>
    </template>
    <template v-else-if="products.length > 0">
      <div class="row" v-for="product in products" :key="product.id">
        <telegram-shop-product-item :product="product" />
      </div>
    </template>
    <template v-else> محصولی برای نمایش وجود ندارد. </template>
  </q-page>
</template>

<style scoped></style>
