<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ProductCategoryType, ProductType, UpsertProductType } from 'src/types';
import BaseUploader from 'components/common/BaseUploader.vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductsService } from 'src/services/useProductsService';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';
import { useProductCategoriesService } from 'src/services/useProductCategoriesService';
import { useNotify } from 'src/composables/use-notify';
import { IUploadProductImageResponse } from 'components/models';

/** COMPONENT COMPOSABLES */
const route = useRoute();
const router = useRouter();
const productsService = useProductsService();
const productCategoriesService = useProductCategoriesService();
const notify = useNotify();
/************************ */

/** COMPONENT STATE */
const upsertModel = ref<UpsertProductType>({
  category_id: '',
  currency: 'IRT',
  image: '',
  price: 0,
  title: '',
});
const categories = ref<ProductCategoryType[]>([]);
const isEdit = ref<boolean>(route.fullPath.includes('edit'));
const productId = route.params.productId as string;
const product = ref<ProductType>({} as ProductType);
const newImageUrl = ref('');
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */
async function initUpsertStates() {
  if (productId) {
    isEdit.value = true;
    product.value = await productsService.queries.getOneById(
      productId,
      route.params.storeId as string
    );
    upsertModel.value.category_id = product.value.category.id;
    upsertModel.value.currency = product.value.currency;
    upsertModel.value.image = product.value.image;
    upsertModel.value.price = product.value.price;
    upsertModel.value.title = product.value.title;
  }
}

const handleUploadedImage = (response: string) => {
  const responseParsed = JSON.parse(response) as IUploadProductImageResponse;
  upsertModel.value.image = responseParsed.filename;
  newImageUrl.value = responseParsed.url;
};

async function submitForm() {
  try {
    if (isEdit.value === true) {
      await productsService.mutations.update(productId, upsertModel.value);
      notify.success('محصول با موفقیت ویرایش شد');
    } else {
      await productsService.mutations.create(upsertModel.value);
      notify.success('محصول با موفقیت ایجاد شد');
    }
    await router.replace({ name: 'ManageStoreProducts' });
  } catch {
    notify.success('خطایی در ارسال داده رخ داد.');
  }
}
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */
onMounted(async () => {
  categories.value = await productCategoriesService.queries.getAll(
    route.params.storeId as string
  );
  await initUpsertStates();
});

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-form @submit="submitForm">
    <q-card>
      <base-loading-spinner
        :loading="
          productCategoriesService.loading.value ||
          productsService.loading.value
        "
      />
      <q-card-section class="flex row justify-between">
        <div class="text-h5">
          <template v-if="!isEdit">ایجاد محصول جدید</template>
          <template v-else>ویرایش محصول</template>
        </div>
        <div>
          <q-btn
            color="black"
            label="بازگشت"
            :to="{ name: 'ManageStoreProducts' }"
          ></q-btn>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-md-6 col-12">
            <q-input
              class="q-mb-md"
              outlined
              label="عنوان"
              type="text"
              v-model="upsertModel.title"
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
              type="number"
              v-model="upsertModel.price"
              dense
              :label="`${$t(
                'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.price'
              )} *`"
              :hint="
                $t(
                  'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.priceHint'
                )
              "
              lazy-rules
            ></q-input>
            <q-select
              lazy-rules
              class="q-mb-lg"
              :options="
                categories.map((x) => ({ label: x.title, value: x.id }))
              "
              dense
              outlined
              :label="`${$t(
                'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.category'
              )} *`"
              v-model="upsertModel.category_id"
              emit-value
              map-options
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  $t('general.fields.requiredStringField'),
              ]"
            >
            </q-select>
          </div>
          <div class="col-md-6 col-12">
            <q-img
              class="q-pa-md rounded-borders"
              style="border: 1px solid #e1e1e1; max-width: 500px"
              :src="newImageUrl || product.image_url"
            ></q-img>
            <base-uploader @uploaded="handleUploadedImage" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn
          type="submit"
          class="q-mb-md"
          color="positive"
          :label="isEdit ? 'ذخیره تغییرات' : 'ایجاد محصول'"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<style scoped></style>
