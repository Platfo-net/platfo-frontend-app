<script setup lang="ts">
import { useShoppingCart } from 'stores/shopping-cart-store';
import TelegramShopCartItem from 'components/public/shop/TelegramShopCartItem.vue';
import { useRoute } from 'vue-router';
import CartEmptyImg from 'src/components/public/shop/CartEmptyImg.vue';
// const { params } = useRoute();
// const shoppingCart = useShoppingCart();
const shopCart = useShoppingCart().get();
</script>

<template>
  <q-page class="q-pa-md">
    <template
      v-if="!shopCart.items.length"
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
        v-for="item in shopCart.items"
        :key="item.product.id + item.variant?.id"
      >
        <telegram-shop-cart-item :item="item" />
      </div>
    </template>
  </q-page>
</template>

<style scoped></style>
