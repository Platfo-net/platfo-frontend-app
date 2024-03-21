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
  <q-card bordered flat>
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
</template>

<style scoped></style>
