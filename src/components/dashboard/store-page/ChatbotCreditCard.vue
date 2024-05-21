<script setup lang="ts">
import { useChatbotService } from 'src/services/useChatbotService';

/** COMPONENT COMPOSABLES */
const props = defineProps<{
  chatbotId: string;
}>();
const chatbotService = useChatbotService();

/************************ */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT STATE */
const { data: chatbotCredits, isLoading: chatbotCreditsIsLoading } = chatbotService.credit.queries.getChatbotCredit(props.chatbotId);
/****************** */


/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-card bordered flat class="bg-blue-1 text-blue" style="">
    <q-card-section v-if="chatbotCreditsIsLoading">
      <q-linear-progress indeterminate size="2px" color="primary"></q-linear-progress>
    </q-card-section>
    <q-card-section v-else-if="!chatbotCredits || chatbotCredits.length < 1">
      شما در حال حاضر در طرحی اشتراک ندارید
    </q-card-section>
    <q-card-section v-else>
      <div class="flex row">
        <q-icon name="info_outline" size="sm" class="q-mr-md"></q-icon>
        <div class="text-blue">وضعیت اشتراک(های) من</div>
      </div>
      <q-list>
        <q-expansion-item label="اعتبار دوره" dense class="q-my-md rounded-borders">
          <q-item>
            <q-item-section class="felx column">
              <div class="text-grey-8">از تاریخ</div>
              <div class="text-body1">{{ new Date(chatbotCredits[0].from_datetime).toLocaleDateString('fa-IR') }}</div>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="felx column">
              <div class="text-grey-8">تا تاریخ</div>
              <div class="text-body1">{{ new Date(chatbotCredits[0].to_datetime).toLocaleDateString('fa-IR') }}</div>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-item>
          <q-item-section class="felx column">
            <div class="text-grey-8">توکن های باقیمانده</div>
            <div class="text-body1">{{ chatbotCredits[0].remaining_token_count }}</div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="felx column">
            <div class="text-grey-8">چت های باقیمانده</div>
            <div class="text-body1">{{ chatbotCredits[0].remaining_chat_count }}</div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
