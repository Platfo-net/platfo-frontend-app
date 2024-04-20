<script setup lang="ts">
import {useChatbotService} from 'src/services/useChatbotService';
import { Chatbot } from 'src/types';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


/** COMPONENT COMPOSABLES */
const chatbotService = useChatbotService();
const route = useRoute();
/********************** */

/** COMPONENT STATE */
const editChatbotModel = ref<Partial<Chatbot>>();
const showEditChatbotModal = ref<boolean>(false);
const { data: chatbot } = chatbotService.queries.getChatbot(route.params.chatbotId as string)
const { mutateAsync: updateChatbot, isPending: updateChatbotIsPending } = chatbotService.mutations.updateChatbot(route.params.chatbotId as string)
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-dialog v-model="showEditChatbotModal" @hide="() => editChatbotModel = { ...chatbot }">
    <q-card style="min-width: 367px;">
      <q-card-section>
        <div class="text-h6">ویرایش بات جدید</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="async () => {
          await updateChatbot(editChatbotModel as Chatbot);
          showEditChatbotModal = false;
        }">
            <q-input
              class="q-mb-md"
              outlined
              type="textarea"
              v-model="editChatbotModel!.prompt"
              
              dense
              label="پراپمت"
              lazy-rules
            ></q-input>
            <q-btn
              type="submit"
              class="q-mb-md"
              color="primary"
              label='ویرایش'
              :loading="updateChatbotIsPending"
            ></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-page class="q-pa-md container">
    <q-card class="q-pa-lg q-mb-md" bordered flat>
      <q-card-section class="row justify-between items-center">
        <div class="text-h6"><q-icon name="settings" class="q-mr-md"></q-icon>تنظیمات بات</div>
        <q-btn @click="() => {
          editChatbotModel = { ...chatbot };
          showEditChatbotModal = true;
        }" label="ویرایش" color="dark"></q-btn>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="text-h6">پرامپت</div>
            <div >{{ chatbot?.prompt || 'تنظیم نشده است' }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
