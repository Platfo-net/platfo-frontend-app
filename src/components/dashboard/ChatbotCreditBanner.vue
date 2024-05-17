<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useApi } from 'src/composables/use-api';
import { useChatbotService } from 'src/services/useChatbotService';
import {
  ChatbotCreditSubscriptionTransactionResponse,
  ChatbotCreditType,
} from 'src/types';
import { reactive, ref } from 'vue';

/** COMPONENT COMPOSABLES */
const chatbotService = useChatbotService();
const platfoApi = useApi();
const $q = useQuasar();
/************************ */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT STATE */
const { data: chatbotCredit, isLoading: chatbotCreditIsLoading } =
  chatbotService.credit.queries.getChatbotCredit();
const showPaymentDialog = ref<boolean>(false);
const buyCreditModel = reactive<ChatbotCreditType>({
  amount: 5000,
  currency: 'IRT',
});
const isPayingLoading = ref(false);
/****************** */

/** COMPONENT FUNCTIONS */
const handleFormSubmit = async () => {
  try {
    isPayingLoading.value = true;
    const buyResponse =
      await platfoApi.api.get<ChatbotCreditSubscriptionTransactionResponse>(
        '/chatbot-credit/buy',
        {
          params: {
            ...buyCreditModel,
          },
        }
      );
    const paymentResponse = await platfoApi.api.get<{
      redirect_url: string;
    }>('/chatbot-credit/' + buyResponse.data.uuid + '/pay');
    $q.notify({
      color: 'teal-1',
      textColor: 'teal',
      message: 'در حال انتقال به صفحه پرداخت',
    });
    setTimeout(() => {
      window.location.assign(paymentResponse.data.redirect_url);
    }, 2000);
  } catch (err) {
    $q.notify({
      color: 'red-1',
      textColor: 'red',
      message: err.message as string,
    });
  }
};
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-dialog v-model="showPaymentDialog">
    <q-card flat bordered style="min-width: 325px">
      <q-card-section
        class="text-body1"
        style="border-bottom: 1px solid #e2e2e2"
        >افزایش اعتبار</q-card-section
      >
      <q-card-section>
        <q-form @submit.prevent="handleFormSubmit">
          <q-input
            label="میزان اعتبار"
            v-model="buyCreditModel.amount"
            outlined
            type="number"
            min="5000"
            suffix="تومان"
            class="q-mb-md"></q-input>
          <q-btn
            class="full-width"
            color="blue-1"
            text-color="blue"
            unelevated
            label="پرداخت"
            type="submit"
            :loading="isPayingLoading"></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-banner class="q-my-md rounded-borders" style="border: 1px solid #e2e2e2">
    <template v-if="chatbotCreditIsLoading">
      <q-linear-progress
        size="2px"
        color="blue"
        indeterminate></q-linear-progress>
    </template>
    <div v-else class="flex row justify-between items-center q-py-sm">
      <!-- <template v-if="chatbotCredit"> -->
      <div class="flex row items-center">
        <div class="text-body1">اعتبار حساب</div>
        <q-badge
          outline
          class="q-mx-md text-body2"
          :color="chatbotCredit?.amount as number < 10000 ? 'red' : 'teal'"
          :label="
            Intl.NumberFormat('fa-IR').format(chatbotCredit?.amount || 0) + ' ت'
          "></q-badge>
      </div>
      <q-btn
        color="blue-1"
        text-color="blue"
        unelevated
        label="افزایش"
        @click="showPaymentDialog = true"></q-btn>
    </div>
  </q-banner>
</template>

<style scoped></style>
