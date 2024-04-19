<script setup lang="ts">
import BreadCrumbs from 'src/components/BreadCrumbs.vue';
import { ChatbotBaseType } from 'src/types';
import { ref } from 'vue';
import { useChatbotService } from 'src/services/useChatbotService'

/** COMPONENT COMPOSABLES */
const chatbotService = useChatbotService();
/************************ */

/** COMPONENT STATE */
const createChatbotModel = ref<ChatbotBaseType>({
    name: ''
});
const showCreateChatbotDialog = ref<boolean>(false);
const { data: chatbotList, isLoading: chatBotListLoading } = chatbotService.queries.getChatbotList();
const { mutateAsync, isPending: createChatbotIsPending } = chatbotService.mutations.createChatbot();
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-dialog v-model="showCreateChatbotDialog" @hide="x => createChatbotModel = {
    name: '',
    description: '',
    prompt: '',
  }">
    <q-card style="min-width: 367px;">
      <q-card-section>
        <div class="text-h6">چت بات جدید</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="async () => {
            await mutateAsync(createChatbotModel);
            showCreateChatbotDialog = false;
        }">
          <q-input
              class="q-mb-md"
              outlined
              label="نام *"
              type="text"
              v-model="createChatbotModel.name"
              dense
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  $t('general.fields.requiredStringField'),
              ]"
            ></q-input>
            <q-input
              class="q-mb-md"
              outlined
              type="textarea"
              v-model="createChatbotModel.prompt"
              dense
              label="پرامپت"
              lazy-rules
            ></q-input>
            <q-input
              class="q-mb-md"
              outlined
              type="textarea"
              v-model="createChatbotModel.description"
              dense
              label="شرح"
              lazy-rules
            ></q-input>
            <q-btn
              type="submit"
              class="q-mb-md"
              color="primary"
              label='ایجاد'
              :loading="createChatbotIsPending"
            ></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-page class="q-pa-md container">
    <BreadCrumbs />
    <div class="row justify-between items-center q-mb-lg">
      <div class="text-h5">
        چت بات های من
      </div>
      <q-btn
        color="dark"
        label="ایجاد چت بات جدید"
        @click="showCreateChatbotDialog = true"
      ></q-btn>
    </div>
    <div v-if="!chatBotListLoading" class="row q-col-gutter-md">
        <div v-for="chatbot in chatbotList" :key="chatbot.uuid" class="col-12 col-sm-6 col-lg-3">
            <q-toolbar class="bg-primary text-white" style="border-top-left-radius: 4px; border-top-right-radius: 4px;">
                <q-toolbar-title class="text-h6">{{ chatbot.name }}</q-toolbar-title>
                    <q-btn class="q-ml-lg" size="sm" color="white" text-color="dark" :to="{
                        name: 'ManageChatbotBasicInformationPage',
                        params: { chatbotId: chatbot.uuid },
                    }">{{ $t('pages.panel.dashboard.storeListPage.storeListItem.manage')}}</q-btn>
            </q-toolbar>
            <q-list bordered class="bg-white" style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;">
                <q-item class="q-my-sm">
                    <q-item-section>
                    <q-item-label caption>پرامپت</q-item-label>
                    <q-item-label lines="1">{{ chatbot.prompt ?? 'بدون پرامپت' }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item class="q-my-sm">
                    <q-item-section>
                    <q-item-label caption>شرح</q-item-label>
                    <q-item-label lines="1">{{ chatbot.description ?? 'بدون شرح' }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </div>
    <!-- {{ chatbotList }} -->
  </q-page>
</template>

<style scoped></style>
