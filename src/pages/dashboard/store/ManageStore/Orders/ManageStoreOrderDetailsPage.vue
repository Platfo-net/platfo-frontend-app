<script setup lang="ts">
import BaseLoadingSpinner from 'src/components/common/BaseLoadingSpinner.vue';
import TomanSymbol from 'src/components/common/TomanSymbol.vue';
import { useOrdersService } from 'src/services/useOrdersService';
import { useRoute } from 'vue-router';

/** COMPONENT COMPOSABLES */
const route = useRoute();
/************************ */

/** COMPONENT STATE */
const { data, isLoading } = useOrdersService().queries.getOneById(route.params.orderId as string);
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-card flat bordered>
    <base-loading-spinner :loading="isLoading"></base-loading-spinner>
    <q-card-section class="flex row justify-between">
      <div class="text-h5">جزئیات سفارش | {{ route.query.order_number }}</div>
      <q-btn color="black" label="بازگشت" :to="{name: 'ManageStoreOrdersListPage'}"></q-btn>
    </q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-md-4 col-12">
          <q-card flat bordered style="height: 500px; max-height: 500px; overflow-y: auto;">
            <q-card-section><div class="text-h6">اطلاعات کاربر</div></q-card-section>
            <q-card-section><q-input dense disable outlined label="نام" :model-value="data?.first_name"></q-input></q-card-section>
            <q-card-section><q-input dense disable outlined label="نام خانوادگی" :model-value="data?.last_name"></q-input></q-card-section>
            <q-card-section><q-input dense disable outlined label="شماره تماس" :model-value="data?.phone_number"></q-input></q-card-section>
            <q-card-section><q-input dense disable outlined label="ایمیل" :model-value="data?.email"></q-input></q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-12">
          <q-card flat bordered style="height: 500px; max-height: 500px; overflow-y: auto;">
            <q-card-section><div class="text-h6">اطلاعات ارسال</div></q-card-section>
            <q-card-section><q-input dense disable outlined label="روش ارسال" :model-value="data?.shipment_method"></q-input></q-card-section>
            <q-card-section><q-input dense disable outlined label="استان" :model-value="data?.state"></q-input></q-card-section>
            <q-card-section><q-input dense disable outlined label="شهر" :model-value="data?.city"></q-input></q-card-section>
            <q-card-section><q-input type="textarea" dense disable outlined label="آدرس محل سکونت" :model-value="data?.address"></q-input></q-card-section>
            <q-card-section><q-input dense disable outlined label="کد پستی" :model-value="data?.postal_code"></q-input></q-card-section>
          </q-card>
        </div>
        <div class="col-md-4 col-12">
          <q-card flat bordered style="height: 500px; max-height: 500px; overflow-y: auto;">
            <q-card-section><div class="text-h6">اطلاعات پرداخت</div></q-card-section>
            <q-card-section><q-input dense disable outlined label="نوع پرداخت" :model-value="data?.payment_method"></q-input></q-card-section>
            <q-card-section><q-input dense disable outlined label="وضعیت پرداخت" :model-value="data?.status"></q-input></q-card-section>
            <q-card-section><q-input type="textarea" dense disable outlined label="قابل پرداخت" :model-value="data?.total_amount"></q-input></q-card-section>
            <q-card-section><q-input dense disable outlined label="کد پستی" :model-value="data?.postal_code"></q-input></q-card-section>
          </q-card>
        </div>
        <div class="col-12">
          <q-table flat bordered title="اقلام سفارش" :columns="[
            { name: 'image', field: 'image', label: 'عکس محصول', align: 'left' },
            { name: 'title', field: 'title', label: 'عنوان کالا', align: 'left' },
            { name: 'count', field: 'count', label: 'تعداد سفارش شده', align: 'left' },
            { name: 'price', field: 'price', label: 'قیمت واحد', align: 'left' },
            { name: 'total', field: 'total', label: 'مجموع', align: 'left' },
          ]" :rows="data?.items"  row-key="name">
            <template v-slot:body-cell-image="props">
              <q-td :props="props">
                <div style="z-index: 2">
                  <q-img style="max-width: 50px" :src="props.value" />
                </div>
              </q-td>
            </template>
            <template v-slot:body-cell-total="props">
              <q-td :props="props">
              {{ Intl.NumberFormat('fa-IR', {
                  currency: 'IRT'
                }).format(props.row.price * props.row.count) }} <toman-symbol :size="16"></toman-symbol>
              </q-td>
            </template>
            <template v-slot:body-cell-price="props">
              <q-td :props="props">
                {{ Intl.NumberFormat('fa-IR', {
                  currency: 'IRT'
                }).format(props.row.price) }} <toman-symbol :size="16"></toman-symbol>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
