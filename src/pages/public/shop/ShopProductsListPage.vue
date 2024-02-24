<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import TelegramShopProductItem from 'components/public/shop/TelegramShopProductItem.vue';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';
import { useTelegramShopService } from 'src/services/useTelegramShopService';
import { PaginationType } from 'src/types';
import { QTableColumn } from 'quasar';
import { useQuery } from '@tanstack/vue-query';

// const { queries: { getShopProducts } } = useTelegramShopService();

const tableRef = ref();

const pagination = ref<PaginationType>({
  rowsNumber: 0,
  page: 1,
  rowsPerPage: 5,
});

const telegramShopService = useTelegramShopService();
const route = useRoute();
const { data: products, isFetching, refetch, isError, isPending } = useQuery({
  queryFn: async () => await telegramShopService.queries.getShopProductsRaw(
    route.params.shopId as string,
    { page: pagination.value.page, page_size: pagination.value.rowsPerPage }
  ),
  queryKey: ['shop-product-list']
});

// watch(isSuccess, () => {
//   pagination.value.rowsNumber = products.value?.pagination. as number;
// })

// const products = ref<IProduct[]>([]);
const showOutOfOrderDialog = ref(false);

function closeWebApp() {
  window.Telegram.WebApp.close();
}

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

watch(isError, (err) => {
  showOutOfOrderDialog.value = err;
})
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */
// onMounted(async () => {
//   tableRef.value.requestServerInteraction();
// });
// onMounted(async () => {
//   try {
//     await getShopProductsPaginatedResponse();
//   } catch (err) {
//     showOutOfOrderDialog.value = true;
//   }
// });
</script>

<template>
  <q-page class="q-pa-md">
    <q-dialog maximized persistent v-model="showOutOfOrderDialog">
      <q-card class="bg-primary">
        <div
          class="flex column full-width full-height items-center justify-center"
        >
          <q-card-section>
            <q-icon name="link_off" color="white" size="xl"></q-icon>
            <p class="text-white">{{ $t('general.shopOutOfReach') }}</p>
            <q-btn
              color="white"
              text-color="black"
              :label="$t('general.backToBot')"
              @click="closeWebApp"
            ></q-btn>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
    <template v-if="isPending">
      <base-loading-spinner :loading="isPending"></base-loading-spinner>
    </template>
    <template v-else-if="products && products.items.length > 0">
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
      </q-table>
      <div class="row justify-center q-my-md">
        <q-pagination
          @update:model-value="(page) => {
            pagination.page = page;
            refetch()
          }"
          v-model="pagination.page"
          color="primary"
          :max="products.pagination.total_pages"
          :max-pages="3"
          size="md"
        />
      </div>
    </template>
    <template v-else> محصولی برای نمایش وجود ندارد. </template>
  </q-page>
</template>

<style scoped></style>
