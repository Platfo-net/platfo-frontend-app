<template>
  <q-layout class="font-vazir" view="lHh Lpr lFf">
    <q-footer bordered elevated class="bg-white">
      <q-slide-transition
        v-show="tab === 'shoppingCart' && shoppingCart.totalItems() > 0"
      >
        <shopping-cart-checkout-ribbon />
      </q-slide-transition>
      <q-toolbar class="q-mt-sm">
        <q-tabs
          v-model="tab"
          align="center"
          class="full-width"
          dense
          narrow-indicator
          shrink
          active-color="primary"
          content-class="text-black"
          indicator-color="transparent"
        >
          <q-route-tab
            name="products"
            icon="home"
            label="محصولات"
            :to="{ name: 'ShopProductsListPage' }"
            :ripple="false"
          />
          <q-route-tab
            name="categories"
            icon="category"
            label="دسته بندی"
            :to="{ name: 'ShopCategoriesPage' }"
            :ripple="false"
          />
          <q-route-tab
            name="shoppingCart"
            icon="shopping_cart"
            label="سبد خرید"
            :to="{ name: 'ShopShoppingCartPage' }"
            :ripple="false"
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
    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { setCssVar, getCssVar } from 'quasar'
import { onMounted, ref } from 'vue';
import { useShoppingCart } from 'stores/shopping-cart-store';
import ShoppingCartCheckoutRibbon from 'pages/public/shop/ShoppingCartCheckoutRibbon.vue';
import { useRoute } from 'vue-router';
import { ShopInformationType } from 'src/types';
import { useApi } from 'src/composables/use-api';
import { useTelegramShopStore } from 'src/stores/telegram-shop-store';

const tab = ref<string>('products');
const { api } = useApi();

const shoppingCart = useShoppingCart();
const route = useRoute()
const telegramShopStore = useTelegramShopStore();

const getShopInformation = async (shopId: string) => {
  const response = await api.get<ShopInformationType>(`/shop/shop/telegram/info/${shopId}`)
  return response.data;
}



onMounted(async () => {
  const telegramScript = document.createElement('script');
  telegramScript.setAttribute(
    'src',
    'https://telegram.org/js/telegram-web-app.js'
  );
  document.head.appendChild(telegramScript);
  const shopInformation = await getShopInformation(route.params.shopId as string);
  telegramShopStore.setTheme({
    color: shopInformation.color_code,
  });
  setCssVar('primary', shopInformation.color_code);
});
</script>

<style lang="scss">
</style>
