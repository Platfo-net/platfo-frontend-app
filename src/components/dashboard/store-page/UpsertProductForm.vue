<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  ProductType,
  UpsertProductType,
  ProductVariantType,
  ProductAttributeType,
} from 'src/types';
import BaseUploader from 'components/common/BaseUploader.vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductsService } from 'src/services/useProductsService';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';
import { useProductCategoriesService } from 'src/services/useProductCategoriesService';
import { useNotify } from 'src/composables/use-notify';
import { IUploadProductImageResponse } from 'components/models';
import { QTableColumn } from 'quasar';

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
  attributes: [],
  variants: [],
});
const { data: categories, isPending: categoriesPending } =
  productCategoriesService.queries.getAll(route.params.storeId as string);
const isEdit = ref<boolean>(route.fullPath.includes('edit'));
const productId = route.params.productId as string;
const product = ref<ProductType>({} as ProductType);
const newImageUrl = ref('');
const productVariantTableColumns = [
  { name: 'title', label: 'عنوان', field: 'title', align: 'left' },
  {
    name: 'price',
    label: 'قیمت',
    field: 'price',
    align: 'left',
  },
  {
    name: 'is_available',
    label: 'وضعیت موجودی',
    field: 'is_available',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'عملیات',
    field: 'actions',
    align: 'left',
  },
];
const productAttributesTableColumns = [
  {
    name: 'key',
    label: 'عنوان',
    field: 'key',
    align: 'left',
  },
  {
    name: 'value',
    label: 'مقدار',
    field: 'value',
    align: 'left',
  },
  {
    name: 'actions',
    label: 'عملیات',
    field: 'actions',
    align: 'left',
  },
];
const productVariantModel = ref<Partial<ProductVariantType>>({
  title: '',
  price: 0,
  currency: 'IRT',
  is_available: true,
});
const productAttributeModel = ref<Partial<ProductAttributeType>>({
  key: '',
  value: '',
});
const showCreateVariantDialog = ref<boolean>(false);
const showCreateAttributeDialog = ref<boolean>(false);
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
    upsertModel.value.variants = product.value.variants;
    upsertModel.value.attributes = product.value.attributes;
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
  await initUpsertStates();
});

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-dialog
    v-model="showCreateVariantDialog"
    @hide="
      (x) =>
        (productVariantModel = {
          id: '',
          title: '',
          price: 0,
          currency: 'IRT',
          is_available: false,
        })
    "
  >
    <q-card style="min-width: 367px">
      <q-card-section>
        <div class="text-h6">گونه جدید</div>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="() => {
          upsertModel.variants?.push(productVariantModel as ProductVariantType)
          productVariantModel = {
            id: '',
            title: '',
            price: 0,
            currency: 'IRT',
            is_available: false
          };
          showCreateVariantDialog = false;
        }"
        >
          <q-input
            class="q-mb-md"
            outlined
            label="عنوان"
            type="text"
            v-model="productVariantModel.title"
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
            v-model="productVariantModel.price"
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
          <div class="flex justify-between items-center row q-mb-md">
            <div>وضعیت موجودی</div>
            <div>
              <q-toggle
                v-model="productVariantModel.is_available"
                checked-icon="check"
                color="primary"
                unchecked-icon="clear"
                :label="productVariantModel.is_available ? 'موجود' : 'نا موجود'"
              />
            </div>
          </div>
          <q-btn
            type="submit"
            class="q-mb-md"
            color="primary"
            label="افزودن"
          ></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="showCreateAttributeDialog"
    @hide="
      () =>
        (productAttributeModel = {
          key: '',
          value: '',
        })
    "
  >
    <q-card style="min-width: 367px">
      <q-card-section>
        <div class="text-h6">ویژگی جدید</div>
      </q-card-section>
      <q-card-section>
        <q-form
          @submit="() => {
          upsertModel.attributes?.push(productAttributeModel as ProductAttributeType)
          productAttributeModel = {
            key: '',
            value: ''
          };
          showCreateAttributeDialog = false;
        }"
        >
          <q-input
            class="q-mb-md"
            outlined
            label="عنوان"
            type="text"
            v-model="productAttributeModel.key"
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
            type="text"
            v-model="productAttributeModel.value"
            dense
            label="مقدار"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                $t('general.fields.requiredStringField'),
            ]"
            lazy-rules
          ></q-input>
          <q-btn
            type="submit"
            class="q-mb-md"
            color="primary"
            label="افزودن"
          ></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-form @submit="submitForm">
    <q-card>
      <base-loading-spinner :loading="productsService.loading.value" />
      <q-card-section class="flex row justify-between">
        <div class="text-h5">
          <template v-if="!isEdit">ایجاد محصول جدید</template>
          <template v-else>ویرایش محصول</template>
        </div>
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
                categories?.map((x) => ({ label: x.title, value: x.id }))
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
              :loading="categoriesPending"
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
        <q-table
          flat
          bordered
          title="گونه های محصول"
          :columns="productVariantTableColumns as QTableColumn[]"
          :rows="upsertModel.variants"
        >
          <template v-slot:top-right>
            <q-btn @click="showCreateVariantDialog = true" color="dark"
              >افزودن</q-btn
            >
          </template>
          <template v-slot:body-cell-is_available="props">
            <q-td :props="props">
              <q-badge :color="props.row.is_available ? 'green' : 'negative'">{{
                props.row.is_available ? 'موجود' : 'نا موجود'
              }}</q-badge>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div>
                <q-btn
                  dense
                  size="sm"
                  flat
                  color="red"
                  icon="delete"
                  @click="
                    () => {
                      upsertModel.variants = upsertModel.variants?.filter(
                        (x) => x.title !== props.row.title
                      );
                    }
                  "
                ></q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      <q-card-section>
        <q-table
          flat
          bordered
          title="ویژگی های محصول"
          :columns="productAttributesTableColumns as QTableColumn[]"
          :rows="upsertModel.attributes"
        >
          <template v-slot:top-right>
            <q-btn @click="showCreateAttributeDialog = true" color="dark"
              >افزودن</q-btn
            >
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div>
                <q-btn
                  dense
                  size="sm"
                  flat
                  color="red"
                  icon="delete"
                  @click="
                    () => {
                      upsertModel.attributes = upsertModel.attributes?.filter(
                        (x) => x.key !== props.row.key
                      );
                    }
                  "
                ></q-btn>
              </div>
            </q-td>
          </template>
        </q-table>
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
