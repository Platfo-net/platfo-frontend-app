<script setup lang="ts">
import { useChatbotService } from 'src/services/useChatbotService';
import { Chatbot } from 'src/types';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


/** COMPONENT COMPOSABLES */
const chatbotService = useChatbotService();
const route = useRoute();
/********************** */

/** COMPONENT STATE */
const editChatbotModel = ref<Partial<Chatbot>>({});
const showEditChatbotModal = ref<boolean>(false);
const { data: chatbot, isLoading: chatbotIsLoading } = chatbotService.queries.getChatbot(route.params.chatbotId as string)
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
        <div class="text-h6">تنظیم بات</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="async () => {
    await updateChatbot(editChatbotModel as Chatbot);
    showEditChatbotModal = false;
  }">
          <q-input dir="ltr" class="q-mb-md" outlined type="textarea" v-model="editChatbotModel!.prompt" dense
            label="دستور متنی" lazy-rules></q-input>
          <div class="text-grey-8">میزان خلاقیت</div>
          <q-item>
            <q-item-section side>
              کم
            </q-item-section>
            <q-item-section>
              <q-slider v-model="editChatbotModel!.temperature" markers :marker-labels="(val) => `%${val * 100}`" snap
                :min="0" :max="1" :step="0.25" />
            </q-item-section>
            <q-item-section side>
              زیاد
            </q-item-section>
          </q-item>
          <q-btn type="submit" class="q-my-md full-width" color="primary" label='اعمال تغییرات'
            :loading="updateChatbotIsPending"></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-card class="q-pa-md q-mb-md" bordered flat>
    <q-card-section class="row justify-between items-center">
      <div class="text-h6"><q-icon name="settings" class="q-mr-md"></q-icon>تنظیمات بات</div>
      <q-btn @click="() => {
    editChatbotModel = { ...chatbot };
    showEditChatbotModal = true;
  }" label="ویرایش" color="dark"></q-btn>
    </q-card-section>
    <q-card-section>
      <q-linear-progress v-if="chatbotIsLoading" size="2px" indeterminate></q-linear-progress>
      <div v-else class="row q-col-gutter-md">
        <div class="col-12 col-md-6">
          <div class="flex row q-mb-md">
            <div class="text-body1 text-grey-8 q-mr-md">دستور متنی</div>
            <q-icon name="info_outline" color="blue" size="xs">
              <q-tooltip :hide-delay="2000" class="bg-blue-1 text-blue"
                style="font-size: small; border: 1px solid #90caf9 " max-width="200px">
                گذاره‌ای است که شرایط و نحوه پاسخگویی هوش مصنوعی را مشخص می‌کند و توصیه می‌شود که به زبان انگلیسی نوشته
                شود.
              </q-tooltip>
            </q-icon>
          </div>
          <textarea dir="ltr" class="q-pa-sm full-width rounded-borders" style="border: 1px solid grey" disabled
            rows="16" :value="chatbot?.prompt"></textarea>
          <!-- <q-input class="q-mt-md" outlined type="textarea" v-model="chatbot.prompt" disable rows="25"></q-input> -->
        </div>
        <div class="col-12 col-md-6 ">
          <div class="flex row q-mb-md">
            <div class="text-body1 text-grey-8 q-mr-md">میزان خلاقیت</div>
            <q-icon name="info_outline" color="blue" size="xs">
              <q-tooltip :hide-delay="2000" class="bg-blue-1 text-blue"
                style="font-size: small; border: 1px solid #90caf9 " max-width="300px">
                خلاقیت مدل زبانی یک پارامتر در مدل است که میزان خلاقیت پاسخ‌ها را تعیین می‌کند. مقدار ۰٪ به معنای این
                است
                که پاسخ‌ها بسیار مستقیم و مشخص خواهند بود، مقدار ۱۰۰٪ به معنای این است که پاسخ‌ها می‌توانند بسیار
                متفاوت،
                گاهی عجیب و خلاقانه باشند.
              </q-tooltip>
            </q-icon>
          </div>
          <div style="font-size: x-large;">%{{ chatbot?.temperature * 100 }}</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
