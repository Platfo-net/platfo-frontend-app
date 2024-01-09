<script setup lang="ts">
import BaseUploader from 'src/components/common/BaseUploader.vue';
import { ProductType, UpsertProductType } from 'src/types';
import { onMounted, ref } from 'vue';

/** COMPONENT COMPOSABLES */

/************************ */

/** COMPONENT STATE */
const upsertModel = ref<UpsertProductType>({
  category_id: '',
  currency: 'IRT',
  image: '',
  price: 0,
  title: '',
});
const isEdit = ref<boolean>(false);
/****************** */

/** COMPONENT DEFINES */
const props = defineProps<{
  product?: ProductType,
}>();
/******************** */

/** COMPONENT FUNCTIONS */
function initUpsertStates() {
  if (props.product) {
    isEdit.value = true;
    upsertModel.value.category_id = props.product.category.id;
    upsertModel.value.currency = props.product.currency;
    upsertModel.value.image = props.product.image;
    upsertModel.value.price = props.product.price;
    upsertModel.value.title = props.product.title;
  }
}
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */
onMounted(() => {
  initUpsertStates();
});
/******************************* */
</script>

<template>
  <q-card>
    <q-card-section class="flex row justify-between">
      <div class="text-h5">
        <template v-if="isEdit">ایجاد محصول جدید</template>
        <template v-else>ویرایش محصول</template>
      </div>
      <div>
        <q-btn color="black" label="بازگشت"></q-btn>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-md-6 col-12">
          <base-uploader />
        </div>
        <div class="col-md-6 col-12">
          <q-input outlined label="عنوان" type="text" v-model="upsertModel.title"></q-input>
          <q-input outlined label="عنوان" type="num" v-model="upsertModel.title"></q-input>
          <q-input outlined label="عنوان" type="text" v-model="upsertModel.title"></q-input>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <div>upsert product page</div>
  {{ upsertModel }}
</template>

<style scoped></style>
