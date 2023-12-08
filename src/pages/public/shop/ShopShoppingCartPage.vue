<script setup lang="ts">
import { useShoppingCart } from 'stores/shopping-cart-store';
import TelegramShopCartItem from 'components/public/shop/TelegramShopCartItem.vue';
import { useRoute } from 'vue-router';
import CartEmptyImg from './CartEmptyImg.vue';
const { params } = useRoute();
const shoppingCart = useShoppingCart();
</script>

<template>
  <q-page class="q-pa-md">
    <template
      v-if="!Object.keys(shoppingCart.get().items[params.shopId]).length"
    >
      <div class="fullscreen flex column justify-center items-center" style="z-index: 0;">
        <div style="max-width: 320px;" class="text-center">
          <cart-empty-img></cart-empty-img>
          <h5 class="text-bold">سبد خرید شما خالی است</h5>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        v-for="shoppingCartItem in shoppingCart.get().items[params.shopId]"
        :key="shoppingCartItem.product.id"
      >
        <telegram-shop-cart-item :product="shoppingCartItem.product" />
      </div>
    </template>
  </q-page>
</template>

<style scoped></style>
