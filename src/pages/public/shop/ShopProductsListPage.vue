<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import TelegramShopProductItem from 'components/public/shop/TelegramShopProductItem.vue';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';
import { useTelegramShopService } from 'src/services/useTelegramShopService';

const { queries: { getShopProducts } } = useTelegramShopService();
const route = useRoute();
const { data: products, isPending, isError } = getShopProducts(route.params.shopId as string);
// const products = ref<IProduct[]>([]);
const showOutOfOrderDialog = ref(false);

function closeWebApp() {
  window.Telegram.WebApp.close();
}

watch(isError, (err) => {
  showOutOfOrderDialog.value = err;
})

// onMounted(async () => {
//   try {
//     await getShopProductsPaginatedResponse();
//   } catch (err) {
//     showOutOfOrderDialog.value = true;
//   }
// });
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
    <template v-if="isPending">
      <base-loading-spinner :loading="isPending"></base-loading-spinner>
    </template>
    <template v-else-if="products && products.items.length > 0">
      <div class="row" v-for="product in products.items" :key="product.id">
        <telegram-shop-product-item :product="product" />
      </div>
    </template>
    <template v-else> محصولی برای نمایش وجود ندارد. </template>
  </q-page>
</template>

<style scoped></style>
