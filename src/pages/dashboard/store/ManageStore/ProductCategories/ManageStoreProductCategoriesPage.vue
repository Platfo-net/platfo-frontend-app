<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { useProductCategoriesService } from 'src/services/useProductCategoriesService';
import { useRoute } from 'vue-router';

/** COMPONENT COMPOSABLES */
const categoriesService = useProductCategoriesService();
const route = useRoute();
/************************ */

/** COMPONENT STATE */
const { data: categories, isPending } = categoriesService.queries.getAll(
  route.params.storeId as string
);
const columns = [
  { name: 'title', label: 'عنوان', field: 'title', align: 'left' },
  {
    name: 'image_url',
    label: 'عکس دسته بندی',
    field: 'image_url',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'عملیات',
    field: 'actions',
    align: 'left',
  },
];
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <div class="q-my-md">
    <q-table
      ref="tableRef"
      class="sticky-last-col"
      title="دسته بندی محصولات"
      bordered
      flat
      separator="cell"
      :rows="categories || []"
      :columns="columns as QTableColumn[]"
      row-key="name"
      :loading="isPending">
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="دسته بندی جدید"
          icon="add"
          flat
          :to="{ name: 'ManageStoreProductCategoryCreatePage' }"></q-btn>
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
              :to="`product-categories/${props.row.id}/edit`"
              label="ویرایش"></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style scoped></style>
