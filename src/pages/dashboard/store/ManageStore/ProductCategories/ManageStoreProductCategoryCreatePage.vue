<script setup lang="ts">
import BaseUploader from 'src/components/common/BaseUploader.vue';
import { IUploadProductImageResponse, ImageType } from 'src/components/models';
import { useNotify } from 'src/composables/use-notify';
import { useProductCategoriesService } from 'src/services/useProductCategoriesService';
import { InsertProductCategoryType } from 'src/types';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/** COMPONENT COMPOSABLES */
const route = useRoute();
const router = useRouter();
const productCategoriesService = useProductCategoriesService();
const notify = useNotify();
/************************ */

/** COMPONENT STATE */
const upsertModel = ref<InsertProductCategoryType>({
  image: '',
  title: '',
  shop_id: route.params.storeId as string,
});
const newImageUrl = ref('');
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */
const handleUploadedImage = (response: string) => {
  const responseParsed = JSON.parse(response) as IUploadProductImageResponse;
  upsertModel.value.image = responseParsed.filename;
  newImageUrl.value = responseParsed.url;
};

const create = productCategoriesService.mutations.create(upsertModel.value);

async function submitForm() {
  try {
    await create.mutateAsync();
    notify.success('دسته بندی با موفقیت ایجاد شد');
    await router.replace({ name: 'ManageStoreProductCategories' });
  } catch {
    notify.error('خطایی در ارسال داده رخ داد.');
  }
}
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-form @submit="submitForm">
    <q-card>
      <q-card-section class="flex row justify-between">
        <div class="text-h5">دسته بندی جدید</div>
        <div>
          <q-btn
            color="black"
            label="بازگشت"
            :to="{ name: 'StoreProductsManagement' }"
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
            <div class="col-md-6 col-12">
              <base-uploader
                :image-type="ImageType.ProductCategory"
                @uploaded="handleUploadedImage"
              />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn
          type="submit"
          class="q-mb-md"
          color="positive"
          label="ایجاد دسته بندی"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<style scoped></style>
