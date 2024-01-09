<script setup lang="ts">
import { useProductsService } from 'src/services/useProductsService';
import { onMounted, ref } from 'vue';
import { ProductType } from 'src/types';
import { useRoute } from 'vue-router';
import TomanSymbol from 'components/common/TomanSymbol.vue';

/** COMPONENT COMPOSABLES */
const productsService = useProductsService();
const route = useRoute();
/************************ */

/** COMPONENT STATE */
const tableRef = ref();
const products = ref<ProductType[]>([]);
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
const pagination = ref<PaginationType>({
  rowsNumber: 0,
  page: 1,
  rowsPerPage: 20,
});
/****************** */

/** COMPONENT DEFINES */
type PaginationType = {
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
};
/******************** */

/** COMPONENT FUNCTIONS */
async function tableOnRequestHandler(_props: any) {
  await loadData();
  pagination.value.page = _props.pagination.page;
  pagination.value.rowsPerPage = _props.pagination.rowsPerPage;
  // pagination.value.rowsNumber = _props.pagination.rowsNumber;
}
async function loadData() {
  const paginatedResponse = await productsService.queries.getAll(
    route.params.storeId as string,
    { page: pagination.value.page, page_size: pagination.value.rowsPerPage }
  );
  pagination.value.rowsNumber = paginatedResponse.pagination.total_count;
  products.value = paginatedResponse.items;
}
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */
onMounted(async () => {
  tableRef.value.requestServerInteraction();
});
/******************************* */
</script>

<template>
  <div class="q-my-md">
    <q-table
      ref="tableRef"
      class="sticky-last-col"
      title="محصولات"
      bordered
      flat
      separator="cell"
      :rows="products"
      :columns="columns"
      row-key="name"
      :loading="productsService.loading.value"
      @request="tableOnRequestHandler"
      v-model:pagination="pagination"
    >
      <template v-slot:top-right>
        <q-btn color="primary" label="محصول جدید" icon="add" flat></q-btn>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:body-cell-image_url="props">
        <q-td :props="props">
          <div style="z-index: 2">
            <q-img style="max-width: 50px" :src="props.value" />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-price="props">
        <q-td :props="props">
          <div>
            {{
              Intl.NumberFormat('fa', {
                currency: 'IRT',
              }).format(props.value)
            }}
            <toman-symbol :size="16"></toman-symbol>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-category="props">
        <q-td :props="props">
          {{ props.value.title }}
        </q-td>
      </template>
      <template v-slot:body-cell-created_at="props">
        <q-td :props="props">
          {{ new Date(props.value).toLocaleDateString() }}
        </q-td>
      </template>
      <template v-slot:body-cell-updated_at="props">
        <q-td :props="props">
          {{ new Date(props.value).toLocaleDateString() }}
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div>
            <q-btn
              dense
              size="sm"
              flat
              :to="`products/${props.row.id}`"
              label="ویرایش"
            ></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style lang="sass">
.sticky-last-col

  thead tr:last-child th:last-child
    /* bg color is important for th; just specify one */
    background-color: antiquewhite

  td:last-child
    background-color: antiquewhite

  th:last-child,
  td:last-child
    position: sticky
    right: 0
    z-index: 1
</style>
