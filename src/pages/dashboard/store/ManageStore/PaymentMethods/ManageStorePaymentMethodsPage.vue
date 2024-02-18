<script setup lang="ts">
import BaseLoadingSpinner from 'src/components/common/BaseLoadingSpinner.vue';
import usePaymentMethodsService from 'src/services/usePaymentMethodsService';
import { useRoute, useRouter } from 'vue-router';

/** COMPONENT COMPOSABLES */
const route = useRoute();
const router = useRouter();
const paymentMethodsService = usePaymentMethodsService()
/************************ */

/** COMPONENT STATE */
const { data, isLoading } = paymentMethodsService.queries.getAll(route.params.storeId as string);
const { mutate } = paymentMethodsService.mutations.changeIsActive(route.params.storeId as string);
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
      <q-card-section>
        <div class="text-h5">روش های پرداخت</div>
      </q-card-section>
      <q-card-section v-for="group in data" :key="group.title">
        <q-card flat>
          <q-card-section>
            <div class="text-h6">{{ group.title }}</div>
          </q-card-section>
          <q-card-section v-if="group.items.length">
            <div class="row q-col-gutter-md">
              <div v-for="item in group.items" :key="item.id"  class="col-12 col-md-4">
                <div class="flex row justify-end q-my-md"><q-btn size="sm" :color="item.is_active ? 'negative' : 'positive'" :label="item.is_active ? 'غیر فعال کن' : 'فعال کن'" @click="mutate({ id: item.id, is_active: item.is_active })"></q-btn></div>
                <q-card :class="item.is_active ? 'q-hoverable cursor-pointer' : 'bg-grey-2'" :v-ripple="item.is_active" flat bordered @click="() => item.is_active ? router.push({ name: 'ManageStorePaymentMethodEditPage', params: { paymentMethodId: item.id } }) : ''">
                  <q-card-section>{{ item.title }}</q-card-section>
                  <q-card-section>وضعیت: <q-badge :color="item.is_active ? 'green' : 'red'" :label="item.is_active ? 'فعال' : 'غیر فعال'"></q-badge></q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
</template>

<style scoped></style>
