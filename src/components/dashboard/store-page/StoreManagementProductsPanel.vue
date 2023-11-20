<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { IProduct, IProductCategory, IUploadProductImageResponse } from 'components/models';
import { useApi } from 'src/composables/use-api';
import { useRoute } from 'vue-router';
import { ICreateProduct, IPaginatedResponse } from 'src/composables/types';
import { useNotify } from 'src/composables/use-notify';
import ProductItem from './ProductItem.vue';
import { useI18n } from 'vue-i18n';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';
import BaseUploader from 'components/common/BaseUploader.vue';

const { api, loading } = useApi();
const products = ref<IProduct[]>([]);
const productCategories = ref<IProductCategory[]>([]);
const route = useRoute();
const notify = useNotify();
const { t } = useI18n();

const getProducts = async () => {
  const response = await api.get<IPaginatedResponse<IProduct>>(
    `/shop/products/${route.params.storeId}/all`
  );
  products.value = response.data.items;
};

const getProductCategories = async () => {
  const response = await api.get<IProductCategory[]>(
    `/shop/categories/${route.params.storeId}/all`
  );
  productCategories.value = response.data;
};

const createNewProduct = async () => {
  try {
    await api.post<IProduct>('/shop/products', {
      ...productModel.value,
      category_id: productModel.value.category_id,
    });
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.productManagement.notifications.createProductSuccess'
      )
    );
    productModel.value = {
      category_id: null,
      currency: 'IRT',
      image: '',
      price: 0,
      shop_id: route.params.storeId as string,
      title: '',
    };
    await getProducts();
    addItem.value = false;
  } catch (err) {
    // console.error(err);
    notify.error(err.message);
  }
};

const addItem = ref(false);

const deleteProduct = async (productId: string) => {
  try {
    await api.delete(`/shop/products/${productId}`);
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.productManagement.notifications.deleteProductSuccess'
      )
    );
    await getProducts();
  } catch (err) {
    // console.error(err);
    notify.error(
      t(
        'pages.panel.dashboard.manageStorePage.panels.productManagement.notifications.deleteProductError'
      )
    );
  }
};
const productModel = ref<ICreateProduct>({
  category_id: null,
  currency: 'IRT',
  image: '',
  price: 0,
  shop_id: route.params.storeId as string,
  title: '',
});

const handleUploadedImage = (response: string) => {
  const responseParsed = JSON.parse(response) as IUploadProductImageResponse;
  productModel.value.image = responseParsed.filename;
}

onMounted(async () => {
  await Promise.all([getProducts(), getProductCategories()]);
});
</script>

<template>
  <q-card class="q-pa-lg" bordered flat>
    <q-card-section class="row justify-between items-center q-mb-md">
      <div class="text-h6">
        {{
          $t(
            'pages.panel.dashboard.manageStorePage.panels.productManagement.title'
          )
        }}
      </div>
      <q-btn
        :icon="addItem ? 'expand_less' : 'expand_more'"
        :label="$t('general.new')"
        size="sm"
        color="accent"
        @click="addItem = !addItem"
      />
    </q-card-section>
    <div v-if="addItem" class="row q-my-md">
      <q-card class="q-pa-md full-width" bordered square flat>
        <q-form @submit.prevent="createNewProduct">
          <div class="q-my-md">
            <base-uploader @uploaded="handleUploadedImage"></base-uploader>
          </div>
          <q-input
            class="q-mb-lg"
            square
            filled
            v-model="productModel.title"
            :label="`${$t(
              'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.title'
            )} *`"
            color="accent"
            lazy-rules
            dense
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                $t('general.fields.requiredStringField'),
            ]"
          />
          <q-select
            color="accent"
            lazy-rules
            class="q-mb-lg"
            :options="
              productCategories.map((x) => ({ label: x.title, value: x.id }))
            "
            :loading="loading"
            square
            filled
            dense
            :label="`${$t(
              'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.category'
            )} *`"
            v-model="productModel.category_id"
            emit-value
            map-options
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                $t('general.fields.requiredStringField'),
            ]"
          >
          </q-select>
          <q-input
            class="q-mb-lg"
            dense
            square
            filled
            type="number"
            v-model="productModel.price"
            step="any"
            :label="`${$t(
              'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.price'
            )} *`"
            :hint="
              $t(
                'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.priceHint'
              )
            "
            lazy-rules
            color="accent"
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                $t('general.fields.requiredNumberField'),
              (val) =>
                val >= 0 ||
                $t('general.fields.requiredNumberFieldPositiveValue'),
            ]"
          />
          <div class="row q-gutter-md items-center">
            <q-btn
              @click="addItem = false"
              color="negative"
              icon="close"
              :label="$t('general.cancel')"
              size="sm"
            ></q-btn>
            <q-btn
              type="submit"
              color="green"
              icon="check"
              :label="$t('general.add')"
              size="sm"
              :disable="
                !productModel.title.length ||
                !productModel.price ||
                !productModel.category_id
              "
            ></q-btn>
          </div>
        </q-form>
      </q-card>
    </div>
    <q-card-section v-if="loading">
      <base-loading-spinner loading></base-loading-spinner>
    </q-card-section>
    <q-card-section v-else>
      <template v-if="!products.length">
        <p class="q-pa-none q-ma-none">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.productManagement.noProducts'
            )
          }}
        </p>
      </template>
      <template v-else>
        <div class="row q-gutter-sm">
          <template v-for="product in products" :key="product.id">
            <ProductItem
              :product="product"
              show-edit
              show-delete
              :delete-fn="deleteProduct"
              :categories="productCategories"
            />
          </template>
        </div>
      </template>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
:root {
}
</style>
