<script setup lang="ts">
import { ITelegramShopProductItemProps } from 'components/models';
// import TomanSymbol from 'src/components/common/TomanSymbol.vue';
// import { useShoppingCart } from 'stores/shopping-cart-store';
import TelegramShopProductTypeItem from './TelegramShopProductTypeItem.vue';
import TelegramShopVariantTypeItem from './TelegramShopVariantTypeItem.vue';
import { ref } from 'vue';
const props = defineProps<ITelegramShopProductItemProps>();
// const shoppingCart = useShoppingCart();
const hasVariants = ref<boolean>(props.product.variants.length ? true : false);
</script>

<template>
  <!-- hasVariants: {{ hasVariants }} -->
  <q-card class="col-12 q-mb-md" bordered flat style="border-radius: 7px;">
    <div class="flex column q-pa-md">
      <div class="flex row" style="flex-wrap: nowrap;">
        <div class="full-width">
          <q-img style="border-radius: 4px; overflow: hidden; width: 100px; height: 100px; object-fit: cover;"
            :src="product.image_url" fit="cover" />
        </div>
        <div class="flex column full-width q-pa-sm">
          <div>{{ product.title }}</div>
          <div class="flex row q-my-sm">
            <q-icon name="category" color="primary"></q-icon>
            <small class="q-ml-sm">{{ product.category?.title || 'بدون دسته بندی' }}</small>
          </div>
        </div>
      </div>
      <div v-if="!hasVariants" class="flex row justify-between items-center q-py-md q-px-sm">
        <telegram-shop-product-type-item :product="product" />
      </div>
      <div v-else v-for="(variant, idx) in props.product.variants" :key="variant.id" class="q-mb-md" :style="idx % 2 == 0 ? 'border-bottom: 1px solid #e2e2e2;' : ''"  >
        <telegram-shop-variant-type-item :product="product" :variant="variant" />
      </div>
    </div>
  </q-card>
</template>

<style scoped></style>
