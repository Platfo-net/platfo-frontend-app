<template>
    <q-page class="q-pa-md">
        <template v-if="loading">
            <base-loading-spinner loading></base-loading-spinner>
        </template>
        <template v-if="categories.length > 0">
            <div class="row q-col-gutter-md">
                <div class="col-12" v-for="{ id, title, image, image_url } in categories" :key="id">
                    <telegram-shop-category-item :id="id" :title="title" :image="image" :image_url="image_url"></telegram-shop-category-item>
                </div>
            </div>
        </template>
    </q-page>
</template>

<script setup lang="ts">
import BaseLoadingSpinner from 'src/components/common/BaseLoadingSpinner.vue';
import { IProductCategory } from 'src/components/models';
import TelegramShopCategoryItem from 'src/components/public/shop/TelegramShopCategoryItem.vue';
import { useTelegramShopService } from 'src/services/useTelegramShopService';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const { loading, queries: { getShopCategories } } = useTelegramShopService();
const categories = ref<IProductCategory[]>([]);
const route = useRoute();

onMounted(async () => {
    categories.value = await getShopCategories(route.params.shopId as string);
})
</script>

<style scoped>

</style>