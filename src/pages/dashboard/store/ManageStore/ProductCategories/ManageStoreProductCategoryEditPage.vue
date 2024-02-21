<script setup lang="ts">
import BaseLoadingSpinner from 'src/components/common/BaseLoadingSpinner.vue';
import BaseUploader from 'src/components/common/BaseUploader.vue';
import { IUploadProductImageResponse, ImageType } from 'src/components/models';
import { useNotify } from 'src/composables/use-notify';
import { useProductCategoriesService } from 'src/services/useProductCategoriesService';
import { UpdateProductCategoryType } from 'src/types';
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';


/** COMPONENT COMPOSABLES */
const route = useRoute();
const router = useRouter();
const productCategoriesService = useProductCategoriesService();
const notify = useNotify();
/************************ */

/** COMPONENT STATE */
const newImageUrl = ref('');
const { data: category, isPending } = productCategoriesService.queries.getOneById(route.params.categoryId as string);
const upsertModel = reactive<UpdateProductCategoryType>({
  image: '',
  title: '',
});
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */
const handleUploadedImage = (response: string) => {
  const responseParsed = JSON.parse(response) as IUploadProductImageResponse;
  upsertModel.image = responseParsed.filename;
  newImageUrl.value = responseParsed.url;
};
const { mutateAsync } = productCategoriesService.mutations.update(route.params.categoryId as string, upsertModel);

async function submitForm() {
  try {
    await mutateAsync();
    notify.success('دسته بندی با موفقیت ایجاد شد');
    await router.replace({ name: 'ManageStoreProductCategories' });
  } catch(err) {
    console.log(err);
    notify.error('خطایی در ارسال داده رخ داد.');
  }
}
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */
watch(category, (c) => {
  upsertModel.image = c?.image as string;
  upsertModel.title = c?.title as string;
});
/******************************* */
</script>

<template>
  <q-form @submit="submitForm">
    <base-loading-spinner :loading="isPending"></base-loading-spinner>
    <q-card>
      <q-card-section class="flex row justify-between">
        <div class="text-h5">ویرایش دسته بندی</div>
        <div>
          <q-btn
            color="black"
            label="بازگشت"
            :to="{ name: 'ManageStoreProductCategories' }"
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
          </div>
          <div class="col-md-6 col-12">
            <q-img class="q-pa-md rounded-borders" style="border: 1px solid #e1e1e1;" :src="newImageUrl || category?.image_url"></q-img>
            <base-uploader :image-type="ImageType.ProductCategory" @uploaded="handleUploadedImage" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn
          type="submit"
          class="q-mb-md"
          color="positive"
          label="ذخیره سازی تغییرات"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-form>
</template>

<style scoped></style>
