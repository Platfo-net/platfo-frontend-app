<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { QTableColumn } from 'quasar';
import BaseLoadingSpinner from 'src/components/common/BaseLoadingSpinner.vue';
import NothingToShowImg from 'src/components/public/shop/NothingToShowImg.vue';
import TelegramShopProductItem from 'src/components/public/shop/TelegramShopProductItem.vue';
import { useTelegramShopService } from 'src/services/useTelegramShopService';
import { PaginationType, ProductType } from 'src/types';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const pagination = ref<PaginationType>({
  rowsNumber: 0,
  page: 1,
  rowsPerPage: 5,
});

const telegramShopService = useTelegramShopService();
const route = useRoute();
const { data: products, isPending, isFetching, refetch } = useQuery({
    queryFn: async () => telegramShopService.queries.getShopCategoryProductsRaw(
        route.params.shopId as string,
        route.params.categoryId as string,
        { page: pagination.value.page, page_size: pagination.value.rowsPerPage }
    ),
    queryKey: ['shop-category-products', { shopId: route.params.shopId, categoryId: route.params.categoryId, page: pagination.value.page }]
});
// const products = ref<ProductType[]>([]);
const isTableShop = ref(route.query.table ? true : false)

const columns = [
  { name: 'title', label: 'عنوان', field: 'title', align: 'left' },
  {
    name: 'image_url',
    label: 'عکس محصول',
    field: 'image_url',
    align: 'left',
  },
  {
    name: 'category',
    label: 'دسته بندی محصول',
    field: 'category',
    align: 'left',
  },
  {
    name: 'price',
    label: 'قیمت',
    field: 'price',
    align: 'left',
  },
  {
    name: 'created_at',
    label: 'تاریخ ایجاد',
    field: 'created_at',
    align: 'left',
  },
  {
    name: 'updated_at',
    label: 'تاریخ به روز رسانی',
    field: 'updated_at',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'عملیات',
    field: 'actions',
    align: 'left',
  },
];
</script>

<template>
    <q-header class="bg-white shadow-1 q-pa-sm">
        <q-toolbar>
            <q-toolbar-title class="text-black">{{ route.query.categoryTitle }}</q-toolbar-title>
            <q-space></q-space>
            <q-btn  round :to="isTableShop ? {name: 'ShopTableCategoriesPage', query: {
                table: route.query.table
            } } : { name: 'ShopCategoriesPage' }" icon="chevron_left" text-color="primary"></q-btn>
        </q-toolbar>
    </q-header>
    <q-page class="q-pa-md">
        <template v-if="isPending">
            <base-loading-spinner :loading="isPending"></base-loading-spinner>
        </template>
        <template v-else>
            <q-table
                grid
                class="sticky-last-col"
                bordered
                flat
                separator="cell"
                :rows="products?.items"
                :columns="columns as QTableColumn[]"
                row-key="name"
                :loading="isFetching"
                hide-pagination
            >
                <template v-slot:loading>
                <q-inner-loading showing color="primary" />
                </template>
                <template v-slot:item="props">
                    <telegram-shop-product-item :product="props.row" />
                </template>
                <template v-slot:no-data>
                    <div class="fullscreen flex column justify-center items-center" style="z-index: 0;">
                        <div style="max-width: 320px;" class="text-center">
                            <nothing-to-show-img></nothing-to-show-img>
                            <h5 class="text-bold">محصولی یافت نشد</h5>
                            <q-btn color="primary" :to="isTableShop ? {name: 'ShopTableCategoriesPage', query: {
                                table: route.query.table
                            } } : {name: 'ShopCategoriesPage'}">بازگشت</q-btn>
                        </div>
                    </div>
                </template>
            </q-table>
            <div class="row justify-center q-my-md">
                <q-pagination
                    @update:model-value="(page) => {
                        pagination.page = page;
                        refetch()
                    }"
                    v-model="pagination.page"
                    color="primary"
                    :max="products?.pagination.total_pages as number"
                    :max-pages="3"
                    size="md"
                />
            </div>
        </template>
    </q-page>
</template>
