<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { useOrdersService } from 'src/services/useOrdersService';
import { OrderStatusEnum, TablePaginationType } from 'src/types';
import { onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT COMPOSABLES */
const ordersService = useOrdersService();
const route = useRoute();
/************************ */

/** COMPONENT STATE */
const tableRef = ref();
const pagination = ref<TablePaginationType>({
  rowsNumber: 0,
  page: 1,
  rowsPerPage: 20,
});
const { data: ordersList, isFetching } = ordersService.queries.getAll(route.params.storeId as string, pagination);
const columns = [
  { name: 'order_number', label: 'شماره سفارش', field: 'order_number', align: 'left' },
  { name: 'status', label: 'وضعیت', field: 'status', align: 'left' },
  { name: 'total_amount', label: 'مجموع سفارش', field: 'total_amount', align: 'left' },
  { name: 'created_at', label: 'تاریخ ثبت', field: 'created_at', align: 'left' },
  { name: 'first_name', label: 'نام', field: 'first_name', align: 'left' },
  { name: 'last_name', label: 'نام خانوادگی', field: 'last_name', align: 'left' },
  { name: 'phone_number', label: 'شماره تماس', field: 'phone_number', align: 'left' },
  { name: 'city', label: 'شهر', field: 'city', align: 'left' },
  { name: 'shipment_method', label: 'روش ارسال', field: 'shipment_method', align: 'left' },
  { name: 'payment_method', label: 'روش پرداخت', field: 'payment_method', align: 'left' },
  {
    name: 'actions',
    label: 'عملیات',
    field: 'actions',
    align: 'left',
  },
];
/****************** */


/** COMPONENT FUNCTIONS */
async function tableOnRequestHandler(_props: any) {
  pagination.value.page = _props.pagination.page;
  pagination.value.rowsPerPage = _props.pagination.rowsPerPage;
  pagination.value.rowsNumber = ordersList.value?.pagination.total_count as number;
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
      title="سفارش ها"
      bordered
      flat
      separator="cell"
      :rows="ordersList?.items"
      :columns="columns as QTableColumn[]"
      row-key="name"
      :loading="isFetching"
      @request="tableOnRequestHandler"
      v-model:pagination="pagination"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div>
            <q-btn
              dense
              size="sm"
              flat
              :to="`orders/${props.row.id}/view-details`"
              label="جزئیات"
            ></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style scoped></style>
