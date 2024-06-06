<script setup lang="ts">
import VueQrcode from 'vue-qrcode'
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { QTableColumn } from 'quasar';
import { useShopTableService } from 'src/services/useShopTableService';
import { ShopTableType } from 'src/types';
import { useNotify } from 'src/composables/use-notify';

/** COMPONENT STATE */
const showCreateDialog = ref<boolean>(false);
const showUpdateDialog = ref<boolean>(false);
const showDeleteDialog = ref<boolean>(false);
const createTableModel = reactive<{
  title: string,
}>({
  title: '',
});
const updateTableModel = reactive<{
  title: string,
  id: string,
}>({
  title: '',
  id: '',
});
const columns = [
  { name: 'title', label: 'عنوان', field: 'title', align: 'left' },
  {
    name: 'url',
    label: 'لینک منو',
    field: 'url',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'عملیات',
    field: 'actions',
    align: 'left',
  },
];
/****************** */


/** COMPONENT COMPOSABLES */
const shopTablesService = useShopTableService();
const route = useRoute();

const { data: shopTables, isFetching, refetch: refetchList } = shopTablesService.queries.getAll(route.params.storeId as string)
const { mutateAsync: createShopTable } = shopTablesService.mutations.create(route.params.storeId as string);
const { mutateAsync: updateShopTable } = shopTablesService.mutations.update();
const { mutateAsync: removeShopTable } = shopTablesService.mutations.remove();
const notify = useNotify()
/************************ */

/** COMPONENT DEFINES */
/******************** */

/** COMPONENT FUNCTIONS */
const handleCreate = async () => {
  await createShopTable(createTableModel.title)
  refetchList()
  createTableModel.title = '';
  showCreateDialog.value = false;
}
const handleUpdate = async () => {
  await updateShopTable({
    tableId: updateTableModel.id,
    title: updateTableModel.title
  });
  refetchList()
  updateTableModel.title = '';
  updateTableModel.id = '';
  showUpdateDialog.value = false;
}
const handleClickUpdateButton = (row: ShopTableType) => {
  showUpdateDialog.value = true;
  updateTableModel.title = row.title;
  updateTableModel.id = row.id;
}
const handleDelete = async (tableId: string) => {
  await removeShopTable({ tableId })
  refetchList()
}
const handleClickUrlCell = (url: string) => { navigator.clipboard.writeText(url); notify.success('به بریده دان انتقال یافت') }
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */
/******************************* */
</script>

<template>
  <q-dialog v-model="showCreateDialog">
    <q-card>
      <q-card-section>
        ایجاد میز جدید
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="handleCreate">
          <q-input class="q-my-md" type="text" v-model="createTableModel.title" :rules="[(val) =>
    (val && val.length > 0) ||
    $t('general.fields.requiredStringField'),]" label="عنوان میز"></q-input>
          <q-btn color="primary" label="ایجاد میز جدید" type="submit"></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showUpdateDialog">
    <q-card>
      <q-card-section>
        ویرایش میز
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="handleUpdate">
          <q-input class="q-my-md" type="text" v-model="updateTableModel.title" :rules="[(val) =>
    (val && val.length > 0) ||
    $t('general.fields.requiredStringField'),]" label="عنوان میز"></q-input>
          <q-btn color="primary" label="اعمال ویرایش" type="submit"></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showDeleteDialog">
    <q-card>
      <q-card-section>
        ویرایش میز
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="handleUpdate">
          <q-input class="q-my-md" type="text" v-model="updateTableModel.title" :rules="[(val) =>
    (val && val.length > 0) ||
    $t('general.fields.requiredStringField'),]" label="عنوان میز"></q-input>
          <q-btn color="primary" label="اعمال ویرایش" type="submit"></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <div class="q-my-md">
    <q-table ref="tableRef" class="sticky-last-col" title="اتصال و انتشار" bordered flat separator="cell"
      :rows="shopTables" :columns="columns as QTableColumn[]" row-key="name" :loading="isFetching">
      <template v-slot:top-right>
        <q-btn color="primary" label="ایجاد میز جدید" icon="add" flat @click="showCreateDialog = true"></q-btn>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:body-cell-url="props">
        <q-td :props="props">
          <div style="z-index: 2" @click="handleClickUrlCell(props.row.url as string)">
            <q-card bordered flat style="max-width: 150px;">
              <vue-qrcode :value="props.value"></vue-qrcode>
            </q-card>
            <q-tooltip>
              {{ props.value }}
            </q-tooltip>
            <!-- <q-img style="max-width: 50px" :src="props.value" /> -->
          </div>
        </q-td>
      </template>
      <!-- <template v-slot:body-cell-category="props">
        <q-td :props="props">
          {{ props.value.title }}
        </q-td>
      </template> -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div>
            <q-btn dense size="sm" flat label="ویرایش" @click="handleClickUpdateButton(props.row)"></q-btn>
            <q-btn dense size="sm" label="حذف" @click="handleDelete(props.row.id)" color="negative" icon="delete"
              class="q-ml-sm"></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style lang="sass">
</style>
