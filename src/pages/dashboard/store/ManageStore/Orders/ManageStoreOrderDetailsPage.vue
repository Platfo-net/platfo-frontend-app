<script setup lang="ts">
import { useRoute } from 'vue-router';

/** COMPONENT COMPOSABLES */
const route = useRoute();
/************************ */

/** COMPONENT STATE */

/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <div>Order Details page</div>
  <div>{{ route.params.storeId }} {{ route.params.orderId }}</div>
</template>

<style scoped></style>
