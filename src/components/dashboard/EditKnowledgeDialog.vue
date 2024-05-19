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
  knowledgeBase: Knowledgebase;
}>();
console.log(props.knowledgeBase);
const knowledgebaseService = useKnowledgebaseService(props.chatbotId);
const authStore = useAuthStore();
const $q = useQuasar();
/************************ */

/** COMPONENT DEFINES */
type UploadFileRejectedProps = { failedPropValidation: string; file: File };
/******************** */

/** COMPONENT STATE */
const updateKnowledgebaseModel = ref<Knowledgebase>({ ...props.knowledgeBase });
const {
  mutateAsync: updateKnowledgebase,
  isPending: updateKnowledgebaseIsPending,
} = knowledgebaseService.mutations.updateKnowledgebase();
/****************** */

/** COMPONENT FUNCTIONS */
const handleUpdateSubmit = async () => {
  await updateKnowledgebase({
    id: props.knowledgeBase.uuid as string,
    putdata: updateKnowledgebaseModel.value,
  });
  updateKnowledgebaseModel.value = { name: '' };
  showDialog.value = false;
};
const uploadFileRejected = (rejectedEntries: UploadFileRejectedProps[]) => {
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} فایل از نوع تعیین شده نیست`,
  });
};
const uploadedEventHandler = (info: { files: readonly File[]; xhr: any }) => {
  const response = JSON.parse(info.xhr.response);
  updateKnowledgebaseModel.value.file_path = response.file_name;
  updateKnowledgebaseModel.value.type = response.file_name.split(
    '.'
  )[1] as KnowledgebaseFileEnum;
};
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-dialog v-model="showDialog">
    <q-card flat style="width: 700px">
      <q-form @submit.prevent="handleUpdateSubmit()">
        <template
          v-if="
            props.knowledgeBase.type === KnowledgebaseFileEnum.MANUAL_INPUT
          ">
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
              v-model="updateKnowledgebaseModel.name"
              dense
              label="نام"
              lazy-rules></q-input>
            <q-input
              class="q-mb-md"
              outlined
              type="url"
              v-model="updateKnowledgebaseModel.source_link"
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
              v-model="updateKnowledgebaseModel.manual_input"
              dense
              label="متن دانش"></q-input>
          </q-card-section>
        </template>
        <template v-if="props.knowledgeBase.type === KnowledgebaseFileEnum.PDF">
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
              v-model="updateKnowledgebaseModel.name"
              dense
              label="نام"
              lazy-rules></q-input>
            <q-input
              class="q-mb-md"
              outlined
              type="url"
              v-model="updateKnowledgebaseModel.source_link"
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
        </template>
        <template
          v-if="props.knowledgeBase.type === KnowledgebaseFileEnum.TEXT">
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
              v-model="updateKnowledgebaseModel.name"
              dense
              label="نام"
              lazy-rules></q-input>
            <q-input
              class="q-mb-md"
              outlined
              type="url"
              v-model="updateKnowledgebaseModel.source_link"
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
        </template>
        <q-card-section>
          <q-btn
            type="submit"
            class="full-width"
            unelevated
            color="teal-1"
            text-color="teal"
            label="ذخیره تغییرات"></q-btn>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
