<script setup lang="ts">
import { QTableColumn, useQuasar } from 'quasar';
import { useKnowledgebaseService } from 'src/services/useKnowledgebaseService';
import { useAuthStore } from 'src/stores/auth-store';
import { KnowledgebaseFileType, Knowledgebase } from 'src/types';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

/** COMPONENT COMPOSABLES */
const route = useRoute();
const knowledgebaseService = useKnowledgebaseService(route.params.chatbotId as string);
const $q = useQuasar();
const authStore = useAuthStore();
/************************ */

/** COMPONENT STATE */
const { data: knowledgebaseList } = knowledgebaseService.queries.getKnowledgebaseList();
const { mutateAsync: createKnowledgebase, isPending: createKnowledgebaseIsPending } = knowledgebaseService.mutations.createKnowledgebase();
const { mutateAsync: deleteKnowledgebase, isPending: deleteKnowledgebaseIsPending } = knowledgebaseService.mutations.deleteKnowledgebase();
const { mutateAsync: updateKnowledgebase, isPending: updateKnowledgebaseIsPending } = knowledgebaseService.mutations.updateKnowledgebase();
const upsertKnowledgebaseModel = ref<Knowledgebase>({
  name: '',
  chatbot_id: route.params.chatbotId as string,
});
const showUpsertKnowledgebaseModel = ref<boolean>(false);
const isEdit = ref<boolean>(false);
/****************** */

/** COMPONENT DEFINES */
const TABLE_COLUMNS: QTableColumn[] = [
  { name: 'name', field: 'name', label: 'عنوان', align: 'left' },
  // { name: 'type', field: 'type', label: 'نوع فایل', align: 'left' },
  // { name: 'file', field: 'file', label: 'فایل', align: 'left' },
  { name: 'actions', field: 'actions', label: 'عملیات', align: 'left' },
]
type UploadFileRejectedProps = { failedPropValidation: string; file: File };
/******************** */

/** COMPONENT FUNCTIONS */
const uploadFileRejected = (rejectedEntries: UploadFileRejectedProps[]) => {
  $q.notify({
    type: 'negative',
    message: `${rejectedEntries.length} فایل از نوع تعیین شده نیست`
  });
};
const uploadedEventHandler = (info: { files: readonly File[]; xhr: any }) => {
  const response = JSON.parse(info.xhr.response);
  upsertKnowledgebaseModel.value.file_path = response.file_name;
  upsertKnowledgebaseModel.value.type = response.file_name.split('.')[1] as KnowledgebaseFileType;
};

const handleSubmit = async () => {
  if (isEdit.value) {
    await updateKnowledgebase({ id: upsertKnowledgebaseModel.value.uuid as string, putdata: upsertKnowledgebaseModel.value });
  } else {
    await createKnowledgebase(upsertKnowledgebaseModel.value);
  }
  upsertKnowledgebaseModel.value = { name: '' };
  showUpsertKnowledgebaseModel.value = false;
}
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-dialog v-model="showUpsertKnowledgebaseModel" @hide="() => {
    upsertKnowledgebaseModel = { name: '', chatbot_id: route.params.chatbotId as string };
    isEdit = false;
  }">
    <q-card style="min-width: 367px;">
      <q-card-section>
        <div class="text-h6">{{ isEdit ? 'ویرایش دانش' : 'ایجاد دانش جدید' }}</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="handleSubmit">
          <q-input :rules="[
    (val) =>
      (val && val.length > 0) ||
      $t('general.fields.requiredStringField'),
  ]" class="q-mb-md" outlined type="text" v-model="upsertKnowledgebaseModel!.name" dense label="نام"
            lazy-rules></q-input>
          <q-uploader v-if="!isEdit" :headers="[
    { name: 'Authorization', value: 'Bearer ' + authStore.state.access_token },
  ]" url="https://dev-api.platfo.net/api/v1/knowledge_base/upload/" :multiple="false" auto-upload field-name="file"
            flat bordered no-thumbnails label="فایل دانش (فقط pdf یا txt)" class="q-mb-md full-width"
            accept=".txt, .pdf" @rejected="uploadFileRejected" @uploaded="uploadedEventHandler">
          </q-uploader>
          <q-btn type="submit" class="q-mb-md" color="primary" :label="isEdit ? 'ذخیره تغییرات' : 'ایجاد دانش جدید'"
            :loading="isEdit ? updateKnowledgebaseIsPending : createKnowledgebaseIsPending"></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-card flat bordered class="q-pa-md">
    <q-card-section class="row justify-between items-center">
      <div class="text-h6"><q-icon name="list" class="q-mr-md"></q-icon>پایگاه دانش</div>
      <div class="row flex items-center">
        <q-btn label="افزودن دانش" color="dark" @click="showUpsertKnowledgebaseModel = true"></q-btn>
      </div>
    </q-card-section>
    <q-card-section>
      <q-table flat bordered :columns="TABLE_COLUMNS" :rows="knowledgebaseList">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div>
              <q-btn dense size="sm" flat color="negative" label="حذف"
                @click="async () => await deleteKnowledgebase(props.row.uuid as string)"
                :loading="deleteKnowledgebaseIsPending"></q-btn>
              <q-btn class="q-ml-md" dense size="sm" flat color="dark" label="ویرایش" @click="() => {
    upsertKnowledgebaseModel = { ...props.row };
    isEdit = true;
    showUpsertKnowledgebaseModel = true;
  }"></q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
