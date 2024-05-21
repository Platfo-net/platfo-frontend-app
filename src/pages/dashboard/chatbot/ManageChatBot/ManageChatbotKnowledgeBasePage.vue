<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { useKnowledgebaseService } from 'src/services/useKnowledgebaseService';
import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import CreateKnowledgeDialog from 'src/components/dashboard/CreateKnowledgeDialog.vue';
import EditKnowledgeDialog from 'src/components/dashboard/EditKnowledgeDialog.vue';
import { Knowledgebase } from 'src/types';

/** COMPONENT COMPOSABLES */
const route = useRoute();
const knowledgebaseService = useKnowledgebaseService(
  route.params.chatbotId as string
);
/************************ */

/** COMPONENT STATE */
const { data: knowledgebaseList } =
  knowledgebaseService.queries.getKnowledgebaseList();
const {
  mutateAsync: deleteKnowledgebase,
  isPending: deleteKnowledgebaseIsPending,
} = knowledgebaseService.mutations.deleteKnowledgebase();
const showCreateKnowledgebaseModel = ref<boolean>(false);
const showUpdateKnowledgebaseModel = ref<boolean>(false);
// const updateKnowledgebaseModel = ref(null);
const updateKnowledgebaseModel = ref<Knowledgebase>({} as Knowledgebase);
/****************** */

/** COMPONENT DEFINES */
const TABLE_COLUMNS: QTableColumn[] = [
  { name: 'name', field: 'name', label: 'عنوان', align: 'left' },
  {
    name: 'source_link',
    field: 'source_link',
    label: 'لینک منبع',
    align: 'left',
  },
  {
    name: 'manual_input',
    field: 'manual_input',
    label: 'متن دستی',
    align: 'left',
  },
  // { name: 'type', field: 'type', label: 'نوع فایل', align: 'left' },
  { name: 'file_path', field: 'file_path', label: 'فایل', align: 'left' },
  { name: 'actions', field: 'actions', label: 'عملیات', align: 'left' },
];
/******************** */

/** COMPONENT FUNCTIONS */
const editKnowlegebase = (knowledgebase: Knowledgebase) => {
  updateKnowledgebaseModel.value = knowledgebase;
  showUpdateKnowledgebaseModel.value = true;
};
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <create-knowledge-dialog
    v-model="showCreateKnowledgebaseModel"
    :chatbotId="route.params.chatbotId as string"></create-knowledge-dialog>
  <edit-knowledge-dialog
    v-if="showUpdateKnowledgebaseModel"
    v-model="showUpdateKnowledgebaseModel"
    :chatbot-id="route.params.chatbotId as string"
    :knowledge-base="updateKnowledgebaseModel"></edit-knowledge-dialog>
  <q-card flat bordered class="q-pa-md">
    <q-card-section class="row justify-between items-center">
      <div class="text-h6">
        <q-icon name="list" class="q-mr-md"></q-icon>پایگاه دانش
      </div>
      <div class="row flex items-center">
        <q-btn
          label="افزودن دانش"
          color="dark"
          @click="showCreateKnowledgebaseModel = true"></q-btn>
      </div>
    </q-card-section>
    <q-card-section>
      <q-table
        flat
        bordered
        :columns="TABLE_COLUMNS"
        :rows="knowledgebaseList || []">
        <template v-slot:body-cell-source_link="props">
          <q-td v-if="props.row.source_link" :props="props">
            <a :href="props.row.source_link" target="_blank"
              ><q-chip
                dir="ltr"
                color="blue-1"
                text-color="blue"
                :label="props.row.source_link.substring(0, 15) + '...'"
                class="q-pa-sm"
                icon-right="link">
                <q-tooltip>{{ props.row.source_link }}</q-tooltip></q-chip
              ></a
            >
          </q-td>
          <q-td v-else>
            <q-badge
              color="red-1"
              text-color="red"
              label="تعریف نشده"
              class="q-pa-sm"></q-badge>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div>
              <q-btn
                dense
                size="sm"
                flat
                color="negative"
                label="حذف"
                @click="
                  async () =>
                    await deleteKnowledgebase(props.row.uuid as string)
                "
                :loading="deleteKnowledgebaseIsPending"></q-btn>
              <q-btn
                class="q-ml-md"
                dense
                size="sm"
                flat
                color="dark"
                label="ویرایش"
                @click="editKnowlegebase(props.row)"></q-btn>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-manual_input="props">
          <q-td v-if="props.row.manual_input" :props="props">
            <q-btn
              color="blue-1"
              text-color="blue"
              label="مشاهده متن"
              unelevated
              size="sm">
              <q-popup-proxy>
                <q-banner>
                  <template v-slot:avatar>
                    <q-icon name="text_snippet" color="blue" size="sm" />
                  </template>
                  {{ props.row.manual_input }}
                </q-banner>
              </q-popup-proxy>
            </q-btn>
          </q-td>
          <q-td v-else>
            <q-badge
              color="red-1"
              text-color="red"
              label="تعریف نشده"
              class="q-pa-sm"></q-badge>
          </q-td>
        </template>
        <template v-slot:body-cell-file_path="props">
          <q-td :props="props">
            <template v-if="props.row.manual_input">
              <q-badge class="q-pa-sm" color="red-1" text-color="red"
                >آپلود نشده</q-badge
              >
            </template>
            <template v-else>
              <q-badge class="q-pa-sm" color="teal-1" text-color="teal"
                >دارد</q-badge
              >
            </template>
          </q-td>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
