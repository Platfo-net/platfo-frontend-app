<script setup lang="ts">
import { useShoppingCart } from 'stores/shopping-cart-store';

const shoppingCart = useShoppingCart();
function closeWebApp() {
  window.Telegram.WebApp.close();
}
</script>

<template>
  <div class="flex row q-pa-md items-center justify-between bg-accent">
    <q-btn
      @click="closeWebApp"
      label="ثبت سفارش TEST"
      color="white"
      text-color="dark"
    />
    <div class="flex column">
      <div>جمع سبد خرید</div>
      <div>
        {{
          Intl.NumberFormat('fa', {
            currency: 'IRR',
          }).format(shoppingCart.totalCartAmount())
        }}
        ریال
      </div>
    </div>
  </div>
</template>

<style scoped></style>
