<script setup lang="ts">
import TomanSymbol from 'src/components/common/TomanSymbol.vue';
import { useShopService } from 'src/services/useShopService';
import { generateChartOptionsSeries, getDaysFromNow } from 'src/utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


/** COMPONENT COMPOSABLES */
const shopService = useShopService();
const route = useRoute();
/************************ */

/** COMPONENT STATE */

const { data: chartData, isFetching } = shopService.queries.getDashboardCharts(route.params.storeId as string);
const { data: shopCredit } = shopService.queries.getShopCredit(
  route.params.storeId as string
);
const { data: shopPlans } = shopService.queries.getAllPlans();
const { mutateAsync } = shopService.mutations.extendShopPlan(route.params.storeId as string);
const showPlans = ref<boolean>(false);
const redirectingToPg = ref<boolean>(false);


/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */
const handleExtendBtn = async (planId: string) => {
  const { payment_url } = await mutateAsync(planId);
  showPlans.value = false;
  redirectingToPg.value = true;
  window.location.assign(payment_url);
}
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-dialog v-model="redirectingToPg" persistent >
    <q-card>
      <q-card-section class="flex column full-width justify-center items-center text-body1">
        <div>در حال انتقال به صفحه پرداخت.</div>
        <div>لطفاً شکیبا باشید...</div>
        <q-circular-progress class="q-my-md" indeterminate size="md" color="primary"></q-circular-progress>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog full-width v-model="showPlans" >
    <q-card>
      <q-card-section class="text-h6">
        پلن ها
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4" v-for="plan in shopPlans" :key="plan.id">
            <div class="q-mb-md">
              <q-card v-if="plan.is_active">
                <q-card-section style="border-bottom: 1px solid #e2e2e2;">
                  {{ plan.title }}
                </q-card-section>
                <q-card-section>
                  میزان اعتبار: {{ plan.extend_days }} روز
                </q-card-section>
                <q-card-section>
                  قیمت: {{ plan.original_price }} <toman-symbol :size="16"></toman-symbol>
                </q-card-section>
                <q-card-section>
                  <q-btn @click="handleExtendBtn(plan.id)" color="primary" class="full-width">افزودن اعبتار</q-btn>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-card flat bordered class="full-width q-mb-md">
    <q-card-section class="text-h6 text-bold">
      دسترسی سریع
    </q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <router-link :to="{ name: 'ManageStoreBasicInformation' }"  style="text-decoration: none; color: var(--default);" class="col-12 col-md-4">
          <q-card flat bordered v-ripple class="q-hoverable cursor-pointer">
            <span class="q-focus-helper"></span>
            <q-card-section>اطلاعات پایه</q-card-section>
          </q-card>
        </router-link>
        <router-link :to="{ name: 'ManageStoreProducts' }"  style="text-decoration: none; color: var(--default);" class="col-12 col-md-4">
          <q-card flat bordered v-ripple class="q-hoverable cursor-pointer ">
            <span class="q-focus-helper"></span>
            <q-card-section>لیست محصولات</q-card-section>
          </q-card>
        </router-link>
        <router-link :to="{ name: 'ManageStoreOrdersListPage' }"  style="text-decoration: none; color: var(--default);" class="col-12 col-md-4">
          <q-card flat bordered v-ripple class="q-hoverable cursor-pointer ">
            <span class="q-focus-helper"></span>
            <q-card-section>لیست سفارش ها</q-card-section>
          </q-card>
        </router-link>
      </div>
    </q-card-section>
  </q-card>
  <q-card bordered flat class="q-mb-md">
    <q-card-section class="text-h6 text-bold">
      وضعیت ۳۰ روز گذشته
    </q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-4">
          <q-card bordered flat class="bg-primary text-white">
            <q-inner-loading :showing="isFetching">
              <q-spinner></q-spinner>
            </q-inner-loading>
            <q-card-section class="text-h6">
              تعداد سفارش ها
            </q-card-section>
            <q-card-section class="text-h4">
              {{ chartData?.monthlyData.orders_total_count || 0 }}
            </q-card-section>
            <q-card-section class="bg-white">
              <apexchart type="area" v-bind="generateChartOptionsSeries('monthly-order-count', chartData?.monthlyData.orders_count_per_day || [], 'سفارش ها')"></apexchart>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card bordered flat class="bg-primary text-white">
            <q-inner-loading :showing="isFetching">
              <q-spinner></q-spinner>
            </q-inner-loading>
            <q-card-section class="text-h6">
              مجموع سفارش ها
            </q-card-section>
            <q-card-section class="text-h4">
              {{ chartData?.monthlyData.orders_total_amount || 0}} <toman-symbol color="white" :size="24"></toman-symbol>
            </q-card-section>
            <q-card-section class="bg-white">
              <apexchart type="area" v-bind="generateChartOptionsSeries('monthly-order-amount', chartData?.monthlyData.orders_amount_per_day || [], 'سفارش ها')"></apexchart>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-md-4">
          <q-card bordered flat class="bg-primary text-white">
            <q-inner-loading :showing="isFetching">
              <q-spinner></q-spinner>
            </q-inner-loading>
            <q-card-section class="text-h6">
              میانگین سفارش ها
            </q-card-section>
            <q-card-section class="text-h4">
              {{ chartData?.monthlyData.orders_total_average || 0 }} <toman-symbol color="white" :size="24"></toman-symbol>
            </q-card-section>
            <q-card-section class="bg-white">
              <apexchart type="area" v-bind="generateChartOptionsSeries('monthly-order-average', chartData?.monthlyData.orders_average_per_day || [], 'سفارش ها')"></apexchart>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <q-card bordered flat>
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="text-h6 flex column">اعتبار حساب</div>
        <q-btn color="dark" flat @click="showPlans = true" :disable="getDaysFromNow(new Date(shopCredit?.expires_at as string)) > 7">
          افزودن اعتبار
          <q-tooltip class="bg-primary" v-if="getDaysFromNow(new Date(shopCredit?.expires_at as string)) > 7">
            به اندازه کافی اعتبار دارید
          </q-tooltip>
          ‍</q-btn>
      </div>
    </q-card-section>
    <q-card-section class="flex column justify-center full-width items-center q-my-md">
      <div class="text-h4">
        {{ getDaysFromNow(new Date(shopCredit?.expires_at as string)) || 0 }} روز باقیمانده
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
