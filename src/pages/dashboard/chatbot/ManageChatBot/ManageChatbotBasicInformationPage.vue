<script setup lang="ts">
import {useChatbotService} from 'src/services/useChatbotService';
import { Chatbot } from 'src/types';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


/** COMPONENT COMPOSABLES */
const chatbotService = useChatbotService();
const route = useRoute();
const router = useRouter();
/********************** */

/** COMPONENT STATE */
const editChatbotModel = ref<Partial<Chatbot>>();
const showEditChatbotModal = ref<boolean>(false);
const showConfirmDeleteChatbotModal = ref<boolean>(false);
const { data: chatbot } = chatbotService.queries.getChatbot(route.params.chatbotId as string)
const { mutateAsync: updateChatbot, isPending: updateChatbotIsPending } = chatbotService.mutations.updateChatbot(route.params.chatbotId as string)
const { mutateAsync: deleteChatbot, isPending: deleteChatbotIsPending } = chatbotService.mutations.deleteChatbot(route.params.chatbotId as string)
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
              label="نام *"
              type="text"
              v-model="editChatbotModel!.name"
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
              v-model="editChatbotModel!.description"
              dense
              label="شرح"
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
  <q-dialog v-model="showConfirmDeleteChatbotModal">
    <q-card style="min-width: 367px;">
      <q-card-section>
        
        <div class="text-body2">آیا از حذف این بات اطمینان دارید؟</div>
      </q-card-section>
      <q-card-actions>
        <q-btn color="negative" flat label="انصراف" @click="showConfirmDeleteChatbotModal = false" :disable="deleteChatbotIsPending"></q-btn>
        <q-btn color="primary" label="بله" :loading="deleteChatbotIsPending" @click="async () => {
          await deleteChatbot();
          router.replace({ name: 'ChatbotListPage' })
        }" ></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-page class="q-pa-md container">
    <q-card class="q-pa-lg q-mb-md" bordered flat>
      <q-card-section class="row justify-between items-center">
        <div class="text-h6"><q-icon name="info" class="q-mr-md"></q-icon>اطلاعات بات</div>
        <div class="row flex items-center">
          <q-btn
            color="negative"
            label='حذف این بات'
            flat
            class="q-mr-sm"
            @click="showConfirmDeleteChatbotModal = true"
          ></q-btn>
          <q-btn @click="() => {
            editChatbotModel = { ...chatbot };
            showEditChatbotModal = true;
          }" label="ویرایش" color="dark"></q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="text-h6">نام</div>
            <div >{{ chatbot?.name }}</div>
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <div class="text-h6">شرح</div>
            <div >{{ chatbot?.description || 'بدون شرح' }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
