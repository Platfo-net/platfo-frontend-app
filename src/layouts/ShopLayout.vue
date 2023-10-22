<template>
  <q-layout class="font-vazir" view="lHh Lpr lFf" dir="rtl">
    <q-footer elevated>
      <q-slide-transition v-show="tab === 'shoppingCart' && shoppingCart.totalItems() > 0">
        <div class="flex row q-pa-md items-center justify-between bg-accent">
          <q-btn @click="closeWebApp" label="ثبت سفارش TEST" color="white" text-color="dark" />
          <div class="flex column">
            <div>جمع سبد خرید</div>
            <div>{{ Intl.NumberFormat('fa', {
              currency: 'IRR', style:'currency'}).format(shoppingCart.totalCartAmount()) }}</div>
          </div>
        </div>
      </q-slide-transition>
      <q-toolbar class="q-mt-sm">
        <q-tabs v-model="tab" align="center" class="full-width" dense narrow-indicator shrink>
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
              color="red"
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

function closeWebApp() {
  window.Telegram.WebApp.close();
}

onMounted(() => {
  const telegramScript = document.createElement('script');
  telegramScript.setAttribute(
    'src',
    'https://telegram.org/js/telegram-web-app.js'
  );
  document.head.appendChild(telegramScript);
});
</script>
