<script setup lang="ts">
import { useShoppingCart } from 'stores/shopping-cart-store';
import TelegramShopCartItem from 'components/public/shop/TelegramShopCartItem.vue';
import { useRoute } from 'vue-router';
const { params } = useRoute();
const shoppingCart = useShoppingCart();
</script>

<template>
  <q-page class="q-pa-md">
    <template
      v-if="!Object.keys(shoppingCart.get().items[params.shopId]).length"
    >
      <p>شما محصولی را به سبد خرید خود اضافه نکردید</p>
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
