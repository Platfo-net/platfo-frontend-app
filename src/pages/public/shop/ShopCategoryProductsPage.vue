<template>
    <q-header class="bg-white shadow-1 q-pa-sm">
        <q-toolbar>
            <q-toolbar-title class="text-black">{{ route.query.categoryTitle }}</q-toolbar-title>
            <q-space></q-space>
            <q-btn  round :to="{name: 'ShopCategoriesPage'}" icon="chevron_left" text-color="orange"></q-btn>
        </q-toolbar>
    </q-header>
    <q-page class="q-pa-md">
        <template v-if="isPending">
            <base-loading-spinner :loading="isPending"></base-loading-spinner>
        </template>
        <template v-else>
            <template v-if="products.length > 0">
                <div class="row" v-for="product in products" :key="product.id">
                    <telegram-shop-product-item :product="product" />
                </div>
            </template>
            <template v-else>
                <div class="fullscreen flex column justify-center items-center" style="z-index: 0;">
                    <div style="max-width: 320px;" class="text-center">
                        <nothing-to-show-img></nothing-to-show-img>
                        <h5 class="text-bold">محصولی یافت نشد</h5>
                        <q-btn color="orange" :to="{name: 'ShopCategoriesPage'}">بازگشت</q-btn>
                    </div>
                </div>
            </template>
        </template>
    </q-page>
</template>

<script setup lang="ts">
import BaseLoadingSpinner from 'src/components/common/BaseLoadingSpinner.vue';
import NothingToShowImg from 'src/components/public/shop/NothingToShowImg.vue';
import TelegramShopProductItem from 'src/components/public/shop/TelegramShopProductItem.vue';
import { useTelegramShopService } from 'src/services/useTelegramShopService';
import { ProductType } from 'src/types';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const { queries } = useTelegramShopService();
const route = useRoute();
const { data: response, isPending } = queries.getShopCategoryProducts(route.params.shopId as string, route.params.categoryId as string);
const products = ref<ProductType[]>([]);

watch(response, (res) => {
  console.log(response);
  products.value = res?.items as ProductType[];
});

// onMounted(async () => {
//     const data = await queries.getShopCategoryProducts(route.params.shopId as string, route.params.categoryId as string);
//     products.value = data.items;
// });
</script>

<style scoped>

</style>
