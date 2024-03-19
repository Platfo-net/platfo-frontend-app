<script setup lang="ts">
import { ref } from 'vue';


/** COMPONENT COMPOSABLES */

/************************ */

/** COMPONENT STATE */
const options = ref<ApexCharts.ApexOptions>({
  chart: {
    id: 'vuechart-example',
    toolbar: {
      show: false,
    },
    fontFamily: 'VazirMatn'
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
  },
})
const series = ref<ApexAxisChartSeries>([{
  name: 'series-1',
  data: [30, 40, 45, 50, 49, 60, 70, 91]
}])
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-card flat bordered class="full-width q-mb-md">
    <q-card-section>
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
  <q-card flat bordered>
    <q-card-section>عملکرد</q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <apexchart type="bar" :options="options" :series="series"></apexchart>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
