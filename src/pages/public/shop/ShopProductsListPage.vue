<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useApi } from 'src/composables/use-api';
import { IPaginatedResponse } from 'src/composables/types';
import { IProduct } from 'components/models';
import { onMounted, ref } from 'vue';
import TelegramShopProductItem from 'components/public/shop/TelegramShopProductItem.vue';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';

const route = useRoute();
const { api, loading } = useApi();
const products = ref<IProduct[]>([]);
const showOutOfOrderDialog = ref(false);
const getShopProductsPaginatedResponse = async () => {
  const { data } = await api.get<IPaginatedResponse<IProduct>>(
    `/shop/products/telegram/${route.params.shopId}/all`
  );
  products.value = data.items;
};

const initData = ref({});
const initDataUnsafe = ref({});

function closeWebApp() {
  window.Telegram.WebApp.close();
}

function getInitData() {
  initData.value = window.Telegram.WebApp.initData;
}

function getInitDataUnsafe() {
  initDataUnsafe.value = window.Telegram.WebApp.initDataUnsafe;
}

const errorTg = ref();

onMounted(async () => {
  try {
    await getShopProductsPaginatedResponse();
  } catch (err) {
    showOutOfOrderDialog.value = true;
  }

  try {
    getInitData();
    getInitDataUnsafe();
  } catch (err) {
    errorTg.value = err;
  }
});
</script>

<template>
  <q-page class="q-pa-md">
    <q-dialog maximized persistent v-model="showOutOfOrderDialog">
      <q-card class="bg-primary">
        <div
          class="flex column full-width full-height items-center justify-center"
        >
          <q-card-section>
            <q-icon name="link_off" color="white" size="xl"></q-icon>
            <p class="text-white">{{ $t('general.shopOutOfReach') }}</p>
            <q-btn
              color="white"
              text-color="black"
              :label="$t('general.backToBot')"
              @click="closeWebApp"
            ></q-btn>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
    <template v-if="loading">
      <base-loading-spinner loading></base-loading-spinner>
    </template>
    <template v-else-if="products.length > 0">
      <div class="row" v-for="product in products" :key="product.id">
        <telegram-shop-product-item :product="product" />
      </div>
    </template>
    <template v-else> محصولی برای نمایش وجود ندارد. </template>

    <div>initData:</div>
    <div>
      <pre><code>{{initData}}</code></pre>
    </div>
    <div>initDataUnsafe:</div>
    <div>
      <pre><code>{{initDataUnsafe}}</code></pre>
    </div>
    <div>Error:</div>
    <div>
      <pre><code>{{errorTg}}</code></pre>
    </div>
  </q-page>
</template>

<style scoped></style>
