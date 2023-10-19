<template>
  <q-layout class="font-vazir" view="lHh Lpr lFf" dir="rtl">
    <q-footer elevated>
      <q-toolbar>
        <q-tabs v-model="tab" align="center" class="full-width">
          <q-route-tab
            name="products"
            icon="home"
            label="محصولات"
            :to="{ name: 'ShopProductsListPage' }"
            exact
          />
          <q-route-tab
            name="shoppingCart"
            icon="shopping_cart"
            label="سبد خرید"
            :to="{ name: 'ShopShoppingCartPage' }"
            exact
          >
            <q-badge
              v-if="shoppingCart.totalItems() > 0"
              rounded
              floating
              color="accent"
              text-color="white"
              :label="shoppingCart.totalItems()"
            />
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useShoppingCart } from 'stores/shopping-cart-store';

const tab = ref<string>('products');

const shoppingCart = useShoppingCart();

onMounted(() => {
  const telegramScript = document.createElement('script');
  telegramScript.setAttribute(
    'src',
    'https://telegram.org/js/telegram-web-app.js'
  );
  document.head.appendChild(telegramScript);
});
</script>
