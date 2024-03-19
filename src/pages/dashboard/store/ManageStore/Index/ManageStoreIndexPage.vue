<script setup lang="ts">
import { ApexOptions } from 'apexcharts';
import TomanSymbol from 'src/components/common/TomanSymbol.vue';
import { useShopService } from 'src/services/useShopService';
import { useRoute } from 'vue-router';


/** COMPONENT COMPOSABLES */
const shopService = useShopService();
const route = useRoute();
/************************ */

/** COMPONENT STATE */

const { data: chartData, isFetching } = shopService.queries.getDashboardCharts(route.params.storeId as string);

/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */
const generateChartOptionsSeries = (chartId: string, data: { date: Date, value: number }[], seriesName: string): {
  options: ApexOptions,
  series: ApexAxisChartSeries,
} => ({
  options: {
    chart: {
      id: chartId,
      toolbar: {
        show: false,
      },
      fontFamily: 'VazirMatn'
    },
    xaxis: {
      categories: data.map(x => new Date(x.date).toLocaleDateString('fa-IR')),
      offsetY: 50,
      offsetX: -40,
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false
    },
  },
  series: [{
    data: data.map(x => x.value),
    name: seriesName,
  }]
});
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-card flat bordered class="full-width q-mb-md">
    <q-card-section class="text-h6">
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
  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12 col-md-4">
      <q-card bordered flat class="bg-primary text-white">
        <q-inner-loading :showing="isFetching">
          <q-spinner></q-spinner>
        </q-inner-loading>
        <q-card-section class="text-h6">
          تعداد سفارش های امروز
        </q-card-section>
        <q-card-section class="text-h4">
          {{ chartData?.dialyData.today_orders_count || 0 }}
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-4">
      <q-card bordered flat class="bg-primary text-white">
        <q-inner-loading :showing="isFetching">
          <q-spinner></q-spinner>
        </q-inner-loading>
        <q-card-section class="text-h6">
          مجموع سفارش های امروز
        </q-card-section>
        <q-card-section class="text-h4">
          {{ chartData?.dialyData.today_orders_sum || 0}} <toman-symbol color="white" :size="24"></toman-symbol>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-4">
      <q-card bordered flat class="bg-primary text-white">
        <q-inner-loading :showing="isFetching">
          <q-spinner></q-spinner>
        </q-inner-loading>
        <q-card-section class="text-h6">
          میانگین سفارش های امروز
        </q-card-section>
        <q-card-section class="text-h4">
          {{ chartData?.dialyData.today_orders_average || 0 }} <toman-symbol color="white" :size="24"></toman-symbol>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="row q-col-gutter-md">
    <div class="col-md-4">
      <q-card bordered flat>
        <q-inner-loading  :showing="isFetching">
          <q-spinner></q-spinner>
        </q-inner-loading>
          <q-card-section class="text-body2">
            تعداد سفارش های ۳۰ روز اخیر
          </q-card-section>
          <q-card-section>
            <apexchart type="area" v-bind="generateChartOptionsSeries('monthly-order-count', chartData?.monthlyData.orders_count || [], 'سفارش ها')"></apexchart>
          </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4">
      <q-card bordered flat>
        <q-inner-loading :showing="isFetching">
          <q-spinner></q-spinner>
        </q-inner-loading>
          <q-card-section class="text-body2">
            مجموع سفارش های ۳۰ روز اخیر
          </q-card-section>
          <q-card-section>
            <apexchart type="area" v-bind="generateChartOptionsSeries('monthly-order-amount', chartData?.monthlyData.orders_amount || [], 'سفارش ها')"></apexchart>
          </q-card-section>
      </q-card>
    </div>
    <div class="col-md-4">
      <q-card bordered flat>
        <q-inner-loading :showing="isFetching">
          <q-spinner></q-spinner>
        </q-inner-loading>
          <q-card-section class="text-body2">
            میانگین سفارش های ۳۰ روز اخیر
          </q-card-section>
          <q-card-section>
            <apexchart type="area" v-bind="generateChartOptionsSeries('monthly-order-average', chartData?.monthlyData.orders_average || [], 'سفارش ها')"></apexchart>
          </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style scoped></style>
