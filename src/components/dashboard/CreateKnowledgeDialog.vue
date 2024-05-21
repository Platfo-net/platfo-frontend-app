<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useKnowledgebaseService } from 'src/services/useKnowledgebaseService';
import { useAuthStore } from 'src/stores/auth-store';
import { Knowledgebase, KnowledgebaseFileEnum } from 'src/types';
import { ref, defineModel } from 'vue';

/** COMPONENT COMPOSABLES */
const showDialog = defineModel<boolean>();
const props = defineProps<{
  chatbotId: string;
}>();
const knowledgebaseService = useKnowledgebaseService(props.chatbotId);
const authStore = useAuthStore();
const $q = useQuasar();
/************************ */

/** COMPONENT DEFINES */
type UploadFileRejectedProps = { failedPropValidation: string; file: File };
/******************** */

/** COMPONENT STATE */
const step = ref(1);
const currentCreateTab = ref<KnowledgebaseFileEnum>();
const createKnowledgeModel = ref<Knowledgebase>({
  name: '',
  chatbot_id: props.chatbotId,
});
const {
  mutateAsync: createKnowledgebase,
  isPending: createKnowledgebaseIsPending,
} = knowledgebaseService.mutations.createKnowledgebase();
/****************** */

/** COMPONENT FUNCTIONS */
const handleCreateSubmit = async () => {
  await createKnowledgebase(createKnowledgeModel.value);
  createKnowledgeModel.value = { name: '' };
  showDialog.value = false;
};
const handleChooseDataType = (dataType: KnowledgebaseFileEnum) => {
  createKnowledgeModel.value.type = dataType;
  currentCreateTab.value = dataType;
  step.value = 2;
};
const uploadFileRejected = (rejectedEntries: UploadFileRejectedProps[]) => {
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} فایل از نوع تعیین شده نیست`,
  });
};
const uploadedEventHandler = (info: { files: readonly File[]; xhr: any }) => {
  const response = JSON.parse(info.xhr.response);
  createKnowledgeModel.value.file_path = response.file_name;
  createKnowledgeModel.value.type = response.file_name.split(
    '.'
  )[1] as KnowledgebaseFileEnum;
};
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-dialog
    v-model="showDialog"
    @hide="() => {
    createKnowledgeModel = { name: '', chatbot_id: chatbotId as string };
    step = 1;
  }">
    <q-card style="width: 500px">
      <q-stepper
        animated
        v-model="step"
        active-color="blue"
        done-color="teal"
        vertical>
        <q-step
          :name="1"
          title="انتخاب نوع داده"
          icon="settings"
          :done="step > 1">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-card
                v-ripple
                class="cursor-pointer q-hoverable"
                flat
                bordered
                @click="
                  handleChooseDataType(KnowledgebaseFileEnum.MANUAL_INPUT)
                ">
                <span class="q-focus-helper"></span>
                <q-card-section class="text-body1">داده دستی</q-card-section>
              </q-card>
            </div>
            <div class="col-12">
              <q-card
                v-ripple
                class="cursor-pointer q-hoverable"
                flat
                bordered
                @click="handleChooseDataType(KnowledgebaseFileEnum.PDF)">
                <span class="q-focus-helper"></span>
                <q-card-section class="text-body1"
                  >داده فایل PDF</q-card-section
                >
              </q-card>
            </div>
            <div class="col-12">
              <q-card
                v-ripple
                class="cursor-pointer q-hoverable"
                flat
                bordered
                @click="handleChooseDataType(KnowledgebaseFileEnum.TEXT)">
                <span class="q-focus-helper"></span>
                <q-card-section class="text-body1"
                  >داده فایل TEXT</q-card-section
                >
              </q-card>
            </div>
          </div>
        </q-step>
        <q-step
          :name="2"
          title="تنظیم کردن داده"
          icon="settings"
          :done="step > 2">
          <q-form @submit="handleCreateSubmit">
            <q-tab-panels v-model="currentCreateTab">
              <q-tab-panel
                style="padding: 0"
                :name="KnowledgebaseFileEnum.MANUAL_INPUT">
                <q-card-section>
                  <q-input
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        $t('general.fields.requiredStringField'),
                    ]"
                    class="q-mb-sm"
                    outlined
                    type="text"
                    v-model="createKnowledgeModel!.name"
                    dense
                    label="نام"
                    lazy-rules></q-input>
                  <q-input
                    class="q-mb-md"
                    outlined
                    type="url"
                    v-model="createKnowledgeModel!.source_link"
                    dense
                    label="لینک منبع"></q-input>
                  <q-input
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        $t('general.fields.requiredStringField'),
                    ]"
                    lazy-rules
                    class="q-mb-md"
                    outlined
                    type="textarea"
                    v-model="createKnowledgeModel!.manual_input"
                    dense
                    label="متن دانش"></q-input>
                </q-card-section>
              </q-tab-panel>
              <q-tab-panel style="padding: 0" :name="KnowledgebaseFileEnum.PDF">
                <q-card-section>
                  <q-input
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        $t('general.fields.requiredStringField'),
                    ]"
                    class="q-mb-sm"
                    outlined
                    type="text"
                    v-model="createKnowledgeModel!.name"
                    dense
                    label="نام"
                    lazy-rules></q-input>
                  <q-input
                    class="q-mb-md"
                    outlined
                    type="url"
                    v-model="createKnowledgeModel!.source_link"
                    dense
                    label="لینک منبع"></q-input>
                  <q-uploader
                    :headers="[
                      {
                        name: 'Authorization',
                        value: 'Bearer ' + authStore.state.access_token,
                      },
                    ]"
                    url="https://dev-api.platfo.net/api/v1/knowledge_base/upload/"
                    :multiple="false"
                    auto-upload
                    field-name="file"
                    flat
                    bordered
                    no-thumbnails
                    label="فایل دانش (فقط pdf)"
                    class="q-mb-md full-width"
                    accept=".pdf"
                    @rejected="uploadFileRejected"
                    @uploaded="uploadedEventHandler">
                  </q-uploader>
                </q-card-section>
              </q-tab-panel>
              <q-tab-panel
                style="padding: 0"
                :name="KnowledgebaseFileEnum.TEXT">
                <q-card-section>
                  <q-input
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        $t('general.fields.requiredStringField'),
                    ]"
                    class="q-mb-sm"
                    outlined
                    type="text"
                    v-model="createKnowledgeModel!.name"
                    dense
                    label="نام"
                    lazy-rules></q-input>
                  <q-input
                    class="q-mb-md"
                    outlined
                    type="url"
                    v-model="createKnowledgeModel!.source_link"
                    dense
                    label="لینک منبع"></q-input>
                  <q-uploader
                    :headers="[
                      {
                        name: 'Authorization',
                        value: 'Bearer ' + authStore.state.access_token,
                      },
                    ]"
                    url="https://dev-api.platfo.net/api/v1/knowledge_base/upload/"
                    :multiple="false"
                    auto-upload
                    field-name="file"
                    flat
                    bordered
                    no-thumbnails
                    label="فایل دانش (فقط txt)"
                    class="q-mb-md full-width"
                    accept=".txt"
                    @rejected="uploadFileRejected"
                    @uploaded="uploadedEventHandler">
                  </q-uploader>
                </q-card-section>
              </q-tab-panel>
            </q-tab-panels>
            <q-stepper-navigation>
              <q-btn
                flat
                @click="step = 1"
                color="blue"
                label="بازگشت"
                class="q-mr-sm" />
              <q-btn
                type="submit"
                color="teal-1"
                text-color="teal"
                unelevated
                label="ذخیره دانش"
                :loading="createKnowledgebaseIsPending"></q-btn>
            </q-stepper-navigation>
          </q-form>
        </q-step>
      </q-stepper>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
