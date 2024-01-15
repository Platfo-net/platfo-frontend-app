<script setup lang="ts">
import { QTableColumn } from 'quasar';
import usePaymentMethodsService from 'src/services/usePaymentMethodsService';
import { PaymentMethodInformationFieldKeyType, PaymentMethodInformationFields, PaymentMethodType } from 'src/types';
import { Ref } from 'vue';
import { useRoute } from 'vue-router';

/** COMPONENT COMPOSABLES */
const route = useRoute();
/************************ */

/** COMPONENT STATE */
const { data, isLoading } = usePaymentMethodsService().queries.getAll(route.params.storeId as string);
const { mutateAsync: mutateInformation, isPending: isUpdateInformationPending, isSuccess: isUpdateInformationSuccess } = usePaymentMethodsService().mutations.updateInformation(route.params.storeId as string);
const columns: QTableColumn[] = [
  { name: 'title', field: 'title', label: 'عنوان', align: 'left' },
  // { name: 'is_active', field: 'is_active', label: 'وضعیت', align: 'left' },
  { name: 'needs_setup', field: 'needs_setup', label: 'نیاز به تنظیم', align: 'left' },
  // { name: 'actions', field: 'actions', label: 'عملیات', align: 'left' },
];
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */
function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
function generateInformationFieldsCols(informationFields: PaymentMethodInformationFields): QTableColumn[] {
  const cols: QTableColumn[] = Object.keys(informationFields).sort().map((k) => ({
    name: informationFields[k].name,
    field: informationFields[k].name,
    label: informationFields[k].title,
    align: 'left'
  }));
  // cols.push({
  //   name: 'actions',
  //   field: 'actions',
  //   label: 'عملیات',
  //   align: 'left'
  // });
  return cols;
}
function hasInformationFields(informationFields: PaymentMethodInformationFields): boolean {
  return Object.keys(informationFields).length > 0;
}
function informationFieldKeys(informationFields: PaymentMethodInformationFields): string[] {
  return Object.keys(informationFields).sort();
}
function hasItems(items: PaymentMethodType[]) {
  return items.length > 0;
}
async function updateTheMotherFucker(informationFields: Record<string, string>, newData: {
  key: PaymentMethodInformationFieldKeyType,
  value: string,
}, doSet: () => void) {
  const dataToSend = { ...informationFields };
  dataToSend[newData.key] = newData.value;
  const id = dataToSend.id;
  delete dataToSend.id;
  await mutateInformation({
    id: id as string,
    newInformation: dataToSend,
  });
  doSet();
}
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-table separator="cell" :loading="isLoading" flat bordered title="روش های پرداخت" :columns="columns as QTableColumn[]"
    :rows="data">
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th auto-width />
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-btn v-if="hasInformationFields(props.row.information_fields) || hasItems(props.row.items)" size="sm" flat
            color="dark" round dense @click="props.expand = !props.expand">
            <q-icon name="expand_more" :class="props.expand ? 'rotate-180' : ''"
              style="transition: all ease-in-out 200ms;"></q-icon>
          </q-btn>
        </q-td>
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <template v-if="col.name === 'title'">
            {{ $t(`general.paymentMethods.${camelize(col.value)}`) }}
          </template>
          <template v-else-if="col.name === 'needs_setup'">
            <q-badge rounded
              :label="hasInformationFields(props.row.information_fields) || hasItems(props.row.items) ? 'بله' : 'خیر'"
              :color="hasInformationFields(props.row.information_fields) || hasItems(props.row.items) ? 'positive' : 'negative'"
              style="font-size: 10px;"></q-badge>
          </template>
          <!-- <template v-else-if="col.name === 'is_active'">
            <q-badge rounded :label="col.value === true ? 'فعال' : 'غیر فعال'"
              :color="col.value === true ? 'positive' : 'negative'" style="font-size: 10px;"></q-badge>
          </template> -->
          <template v-else>
            {{ col.value }}
          </template>
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <template v-if="hasItems(props.row.items)">
          <q-td colspan="100%">
            در حال توسعه
            <!-- <div dir="ltr">{{ props.row.items }}</div> -->
          </q-td>
        </template>
        <template v-else>
          <q-td colspan="100%">
            <q-table :loading="isUpdateInformationPending" flat bordered separator="cell"
              :columns="generateInformationFieldsCols(props.row.information_fields)"
              :rows="[{ ...props.row.information, id: props.row.id }]" hide-pagination title="جزئیات">
              <template v-slot:body="props">
                <q-tr :prop="props">
                  <q-td v-for="(k) in informationFieldKeys(props.row).filter(k => k !== 'id')" :key="k">
                    {{ props.row[k] }}
                    <q-popup-edit v-model="props.row[k]" v-slot="scope">
                      <q-input :name="k" v-model="scope.value" dense autofocus counter @keyup.enter="(e) => updateTheMotherFucker({ ...props.row }, {
                        key: e.target.name,
                        value: e.target.value
                      }, scope.set)"></q-input>
                    </q-popup-edit>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <small class="q-my-md text-red">* برای تنظیم هر کدام از گزینه ها، روی آن کلیک کنید و سپس دکمه ی اینتر را فشار
              دهید.</small>
          </q-td>
        </template>
      </q-tr>
    </template>

    <!-- <template v-slot:body-cell-title="props">
      <q-td :props="props">
        {{ $t(`general.paymentMethods.${camelize(props.value)}`) }}
      </q-td>
    </template>
    <template v-slot:body-cell-is_active="props">
      <q-td :props="props">
        <q-badge rounded :label="props.value === true ? 'فعال' : 'غیر فعال'"
          :color="props.value === true ? 'positive' : 'negative'" style="font-size: 10px;"></q-badge>
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn :disable="Object.keys(props.row.information_fields).length < 1 && props.row.items.length < 1" size="sm"
          flat label="تنظیم"></q-btn>
      </q-td>
    </template>
    <template v-slot:body-cell-needs_setup="props">
      <q-td :props="props">
        <q-badge rounded
          :label="Object.keys(props.row.information_fields).length > 0 || props.row.items.length > 0 ? 'بله' : 'خیر'"
          :color="Object.keys(props.row.information_fields).length > 0 || props.row.items.length > 0 ? 'positive' : 'negative'"
          style="font-size: 10px;"></q-badge>
      </q-td>
    </template> -->
  </q-table>
</template>

<style scoped></style>
