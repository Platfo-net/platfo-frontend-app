<script setup lang="ts">
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IPaymentMethod, IProduct } from 'components/models';
import PaymentMethodItem from 'components/dashboard/store-page/PaymentMethodItem.vue';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';

const { api, loading } = useApi();
const route = useRoute();
const notify = useNotify();

const paymentMethods = ref<IPaymentMethod[]>([]);

const getPaymentMethods = async () => {
  const response = await api.get<IPaymentMethod[]>(
    `/shop/payment-methods/${route.params.storeId}/all`
  );
  paymentMethods.value = response.data;
};

onMounted(async () => {
  await getPaymentMethods();
});

const addItem = ref(false);

// const createNewPaymentMethod = async () => {
//   try {
//     await api.post<IProduct>('/shop/payment-methods', paymentMethodModel);
//     notify.success('Created new payment method');
//     await getPaymentMethods();
//     addItem.value = false;
//   } catch (err) {
//     console.error(err);
//     notify.error(err.message);
//   }
// }

// ^^^^ Commented this function for later use. Creating new
// payment method is not needed.

// const paymentMethodModel = reactive<Partial<IPaymentMethod>>({
//   title: '',
//   description: '',
//   shop_id: route.params.storeId as string,
// });

const deletePaymentMethod = async (paymentMethodId: string) => {
  try {
    await api.delete(`/shop/payment-methods/${paymentMethodId}`);
    notify.success('Delete payment method success');
    await getPaymentMethods();
  } catch (err) {
    console.error(err);
    notify.error(err.message);
  }
};
</script>

<template>
  <q-card class="q-pa-lg" bordered flat>
    <q-card-section>
      <div class="row justify-between items-center q-mb-md">
        <div class="text-h6">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.title'
            )
          }}
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <template v-if="loading">
        <base-loading-spinner :loading="loading"></base-loading-spinner>
      </template>
      <template v-else-if="!paymentMethods.length">
        <p class="q-pa-none q-ma-none">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.messages.noPaymentMethodRegistered'
            )
          }}
          <a href="#" @click="addItem = true">{{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.messages.addNewPaymentMethod'
            )
          }}</a>
        </p>
      </template>
      <template v-else>
        <div class="row q-gutter-sm">
          <template v-for="(pm, idx) in paymentMethods" :key="idx">
            <PaymentMethodItem
              :paymentMethod="pm"
              show-edit
              :delete-fn="deletePaymentMethod"
            />
          </template>
        </div>
      </template>
    </q-card-section>
  </q-card>
</template>
