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
          />
        </q-tabs>
      </q-toolbar>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref<string>('products');
</script>
