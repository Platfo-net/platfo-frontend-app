<script setup lang="ts">
import BaseLoadingSpinner from 'src/components/common/BaseLoadingSpinner.vue';
import TomanSymbol from 'src/components/common/TomanSymbol.vue';
import { useNotify } from 'src/composables/use-notify';
import { useOrdersService } from 'src/services/useOrdersService';
import { OrderStatusEnum } from 'src/types';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

/** COMPONENT COMPOSABLES */
const route = useRoute();
const notify = useNotify();
/************************ */

/** COMPONENT STATE */
const newOrderStatus = ref<OrderStatusEnum | undefined>();
const showChangeStatusDialog = ref<boolean>(false);

const { data, isLoading, isError, error, refetch } = useOrdersService().queries.getOneById(route.params.orderId as string);
const { data: ordersStatusList, isLoading: isOrdersStatusLoading } = useOrdersService().queries.getOrderStatusList();
const { data: updateOrderStatusResponse, mutateAsync, isPending: isPendingUpdateOrderStatus } = useOrdersService().mutations.updateOrderStatus(route.params.orderId as string);
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */
const changeOrderStatusHandler = async () => {
  try {
    await mutateAsync(newOrderStatus.value as OrderStatusEnum);
    notify.success("عملیات با موفقیت انجام شد");
    showChangeStatusDialog.value = false;
    refetch();
  } catch {
    notify.error("خطایی در انجام عملیات رخ داد.");
  }
}
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-dialog v-model="showChangeStatusDialog" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section class="flex row justify-between items-center">
        <div class="text-h5">تغییر وضعیت سفارش</div>
        <q-btn icon="close" flat round @click="showChangeStatusDialog = false"></q-btn>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <div>برای تغییر وضعیت سفارش، یکی از گزینه های زیر را انتخاب کنید:</div>
      </q-card-section>
      <q-form v-mo @submit="changeOrderStatusHandler">
        <q-card-section>
          <q-select v-model="newOrderStatus" outlined dense label="وضعیت سفارش" :loading="isOrdersStatusLoading"
            lazy-rules :options="ordersStatusList?.map(({ title: { fa }, value }) => ({ label: fa, value }))" emit-value
            map-options :rules="[(val: OrderStatusEnum) => (val && val.length > 0) || 'لطفاً گزینه ای را انتخاب کنید']">
          </q-select>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions>
          <q-btn color="positive" label="اعمال تغییر" type="submit" :loading="isPendingUpdateOrderStatus"></q-btn>
          <q-btn color="negative" label="انصراف" @click="showChangeStatusDialog = false"
            :disable="isPendingUpdateOrderStatus"></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  <q-card flat bordered class="relative-position">
    <div v-if="isError" style="position: absolute; left: 0; top: 100px; z-index: 1;"
      class="flex column items-center justify-center full-width">
      <div class="q-my-md text-h5 q-mx-lg" style="font-weight: bold;">
        خطایی در دریافت اطلاعات سفارش رخ داد. لطفا با پشتیبانی تماس بگیرید.
      </div>
    </div>
    <base-loading-spinner :loading="isLoading"></base-loading-spinner>
    <q-card-section class="flex row justify-between">
      <div class="text-h5">جزئیات سفارش | {{ route.query.order_number }}</div>
      <q-btn color="black" label="بازگشت" :to="{ name: 'ManageStoreOrdersListPage' }"></q-btn>
    </q-card-section>
    <div :style="isError ? 'filter: blur(4px)' : ''">
      <q-card-section>
        <div class="row q-my-md">
          <div class="col-12">
            <q-card flat bordered>
              <q-card-section>
                <div class="flex row justify-between items-center">
                  <div class="flex row items-center" style="gap: 15px;">
                    <div class="text-h6">وضعیت سفارش</div>
                    <div>{{ data?.status }}</div>
                  </div>
                  <q-btn color="orange" label="تغییر وضعیت سفارش" flat @click="showChangeStatusDialog = true"></q-btn>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-md-4 col-12">
            <q-card flat bordered style="height: 500px; max-height: 500px; overflow-y: auto;">
              <q-card-section>
                <div class="text-h6">اطلاعات کاربر</div>
              </q-card-section>
              <q-card-section><q-input dense disable outlined label="نام"
                  :model-value="data?.first_name"></q-input></q-card-section>
              <q-card-section><q-input dense disable outlined label="نام خانوادگی"
                  :model-value="data?.last_name"></q-input></q-card-section>
              <q-card-section><q-input dense disable outlined label="شماره تماس"
                  :model-value="data?.phone_number"></q-input></q-card-section>
              <q-card-section><q-input dense disable outlined label="ایمیل"
                  :model-value="data?.email"></q-input></q-card-section>
            </q-card>
          </div>
          <div class="col-md-4 col-12">
            <q-card flat bordered style="height: 500px; max-height: 500px; overflow-y: auto;">
              <q-card-section>
                <div class="text-h6">اطلاعات ارسال</div>
              </q-card-section>
              <q-card-section><q-input dense disable outlined label="روش ارسال"
                  :model-value="data?.shipment_method"></q-input></q-card-section>
              <q-card-section><q-input dense disable outlined label="استان"
                  :model-value="data?.state"></q-input></q-card-section>
              <q-card-section><q-input dense disable outlined label="شهر"
                  :model-value="data?.city"></q-input></q-card-section>
              <q-card-section><q-input type="textarea" dense disable outlined label="آدرس محل سکونت"
                  :model-value="data?.address"></q-input></q-card-section>
              <q-card-section><q-input dense disable outlined label="کد پستی"
                  :model-value="data?.postal_code"></q-input></q-card-section>
            </q-card>
          </div>
          <div class="col-md-4 col-12">
            <q-card flat bordered style="height: 500px; max-height: 500px; overflow-y: auto;">
              <q-card-section>
                <div class="text-h6">اطلاعات پرداخت</div>
              </q-card-section>
              <q-card-section><q-input dense disable outlined label="نوع پرداخت"
                  :model-value="data?.payment_method"></q-input></q-card-section>
              <q-card-section><q-input dense disable outlined label="وضعیت پرداخت"
                  :model-value="data?.status"></q-input></q-card-section>
              <q-card-section><q-input type="textarea" dense disable outlined label="قابل پرداخت"
                  :model-value="data?.total_amount"></q-input></q-card-section>
              <q-card-section><q-input dense disable outlined label="کد پستی"
                  :model-value="data?.postal_code"></q-input></q-card-section>
            </q-card>
          </div>
          <div class="col-12">
            <q-table flat bordered title="اقلام سفارش" :columns="[
              { name: 'image', field: 'image', label: 'عکس محصول', align: 'left' },
              { name: 'title', field: 'product_title', label: 'عنوان کالا', align: 'left' },
              { name: 'variant_title', field: 'variant_title', label: 'عنوان ورینت', align: 'left' },
              { name: 'count', field: 'count', label: 'تعداد سفارش شده', align: 'left' },
              { name: 'price', field: 'price', label: 'قیمت واحد', align: 'left' },
              { name: 'total', field: 'total', label: 'مجموع', align: 'left' },
            ]" :rows="data?.items" row-key="name">
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
    </div>
  </q-card>
</template>

<style scoped></style>
