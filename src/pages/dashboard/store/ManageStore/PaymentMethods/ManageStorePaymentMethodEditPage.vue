<script setup lang="ts">
import BaseLoadingSpinner from 'src/components/common/BaseLoadingSpinner.vue';
import { useNotify } from 'src/composables/use-notify';
import usePaymentMethodsService from 'src/services/usePaymentMethodsService';
import { PaymentMethodDetailType, PaymentMethodInformationFields } from 'src/types';
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/** COMPONENT COMPOSABLES */
const route = useRoute();
const router = useRouter();
const notify = useNotify();
/************************ */

/** COMPONENT STATE */
const { data, isLoading } = usePaymentMethodsService().queries.getById(route.params.paymentMethodId as string);
const upsertModel = reactive<Record<string, string | number>>({
  ...data.value?.information as Record<string, string | number>
});
const { mutateAsync } = usePaymentMethodsService().mutations.updateInformation(route.params.paymentMethodId as string);
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */
function camelize(str?: string) {
  if (str)
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  return '';
}
function getInformationFields(data?: PaymentMethodDetailType) {
  if (data)
    return Object.keys(data.information_fields);
  return []
}
async function handleSubmit() {
  try {
    await mutateAsync({
      id: route.params.paymentMethodId as string,
      newInformation: upsertModel as unknown as PaymentMethodInformationFields,
    });
    notify.success('ویرایش موفقیت آمیز بود')
    router.replace({ name: 'ManageStorePaymentMethods' });
  } catch {
    notify.error('خطایی در ویرایش رخ داد. لطفاَ به پشتیبانی اعلام کنید.');
  }
}
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */
watch(data, (d) => Object.assign(upsertModel, d?.information));
/******************************* */
</script>

<template>
  <q-form @submit="handleSubmit">
    <q-card flat bordered>
      <base-loading-spinner :loading="isLoading"></base-loading-spinner>
      <q-card-section class="flex row justify-between items-center">
        <div class="text-h5">ویرایش روش پرداخت | {{ data ? $t(`general.paymentMethods.${camelize(data.title)}`): '' }}</div>
        <q-btn color="dark" :to="{ name: 'ManageStorePaymentMethods' }" label="بازگشت"></q-btn>
      </q-card-section>
      <template v-if="getInformationFields(data).length">
        <q-card-section>
          <div class="flex row q-col-gutter-md">
              <div class="col-md-4 col-12" v-for="field in getInformationFields(data)" :key="field">
                <q-input outlined dense v-model="upsertModel[field]" :label="data?.information_fields[field].title"></q-input>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-btn type="submit" label="اعمال تغییرات" color="positive"></q-btn>
          </q-card-section>
      </template>
      <template v-else>
        <q-card-section>بدون نیاز به تنظیم</q-card-section>
      </template>
      <!-- <q-card-section dir="ltr">
        <pre><code>{{ data }}</code></pre>
      </q-card-section> -->
      </q-card>
    </q-form>
</template>

<style scoped></style>
