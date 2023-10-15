<script setup lang="ts">
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import {onMounted, reactive, ref} from 'vue';
import { useRoute } from 'vue-router';
import {IPaymentMethod, IProduct} from "components/models";
import ProductItem from "components/dashboard/store-page/ProductItem.vue";
import PaymentMethodItem from "components/dashboard/store-page/PaymentMethodItem.vue";
import {IPaginatedResponse} from "src/composables/types";

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

const createNewPaymentMethod = async () => {
  try {
    await api.post<IProduct>('/shop/payment-methods', paymentMethodModel);
    notify.success('Created new payment method');
    await getPaymentMethods();
    addItem.value = false;
  } catch (err) {
    console.error(err);
    notify.error(err.message);
  }
}

const paymentMethodModel = reactive<Partial<IPaymentMethod>>({
  title: '',
  description: '',
  shop_id: route.params.storeId as string,
});

const deletePaymentMethod = async (paymentMethodId: string) => {
  try {
    await api.delete(`/shop/payment-methods/${paymentMethodId}`);
    notify.success('Delete payment method success');
    await getPaymentMethods();
  } catch (err) {
    console.error(err);
    notify.error(err.message);
  }
}

</script>

<template>
    <q-card class="q-pa-lg" bordered flat>
        <q-card-section>
            <div class="row justify-between items-center q-mb-md">
                <div class="text-h6">Payment Configuration</div>
              <q-btn :icon="addItem ? 'expand_less' : 'expand_more'" label="New" size="sm" color="primary"
                     @click="addItem = !addItem" />
            </div>
          <q-card v-show="addItem" class="q-pa-md full-width" bordered square flat>
            <q-form @submit.prevent="createNewPaymentMethod">
              <q-input class="q-mb-lg" square filled v-model="paymentMethodModel.title" label="Title *" color="accent" lazy-rules
                       dense :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]" />
              <q-input class="q-mb-lg" dense square filled type="textarea" v-model="paymentMethodModel.description"
                       label="Description *" lazy-rules color="accent" :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]" />
              <div class="row q-gutter-md items-center">
                <q-btn @click="addItem = false" color="negative" icon="close" label="cancel" size="sm"></q-btn>
                <q-btn type="submit" color="primary" icon="check" label="Add" size="sm"
                       :disable="!paymentMethodModel.title?.length || !paymentMethodModel.description?.length"></q-btn>
              </div>
            </q-form>
          </q-card>
        </q-card-section>
      <q-card-section>
        <template v-if="loading">
          <q-inner-loading :showing="loading"  >
            <q-spinner-dots size="md"/>
          </q-inner-loading>
        </template>
        <template v-else-if="!paymentMethods.length">
          <p class="q-pa-none q-ma-none">
            No payment methods currently registered. <a href="#" @click="addItem = true">Add a new payment method</a>
          </p>
        </template>
        <template v-else>
          <div class="row q-gutter-sm">
            <template v-for="(pm, idx) in paymentMethods" :key="idx">
              <PaymentMethodItem :paymentMethod="pm" show-edit show-delete :delete-fn="deletePaymentMethod" />
            </template>
          </div>
        </template>
      </q-card-section>
    </q-card>
</template>
