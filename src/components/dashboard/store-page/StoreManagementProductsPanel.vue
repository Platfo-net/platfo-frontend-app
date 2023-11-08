<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { IProduct } from 'components/models';
import { useApi } from 'src/composables/use-api';
import { useRoute } from 'vue-router';
import { ICreateProduct, IPaginatedResponse } from 'src/composables/types';
import { useNotify } from 'src/composables/use-notify';
import ProductItem from './ProductItem.vue';
import { useI18n } from 'vue-i18n';
const { api, loading } = useApi();
const products = ref<IProduct[]>([]);
const route = useRoute();
const notify = useNotify();
const { t } = useI18n();

const getProducts = async () => {
  const response = await api.get<IPaginatedResponse<IProduct>>(
    `/shop/products/${route.params.storeId}/all`
  );
  products.value = response.data.items;
};

const createNewProduct = async () => {
  try {
    await api.post<IProduct>('/shop/products', productModel);
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.productManagement.notifications.createProductSuccess'
      )
    );
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
const productModel = reactive<ICreateProduct>({
  category_id: null,
  currency: 'IRT',
  image: '',
  price: 0,
  shop_id: route.params.storeId as string,
  title: '',
});

onMounted(async () => {
  await getProducts();
  // await createCategory();
});
</script>

<template>
  <q-card class="q-pa-lg" bordered flat>
    <div class="row justify-between items-center q-mb-md">
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
    </div>
    <div class="row q-my-md">
      <q-card v-show="addItem" class="q-pa-md full-width" bordered square flat>
        <q-form @submit.prevent="createNewProduct">
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
              :disable="!productModel.title.length || !productModel.price"
            ></q-btn>
          </div>
        </q-form>
      </q-card>
    </div>
    <div v-if="loading" class="flex justify-center items-lg-center">
      <q-spinner-dots size="md" />
    </div>
    <template v-else>
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
          <template v-for="(product, idx) in products" :key="idx">
            <ProductItem
              :product="product"
              show-edit
              show-delete
              :delete-fn="deleteProduct"
            />
          </template>
        </div>
      </template>
    </template>
  </q-card>
</template>

<style scoped lang="scss">
:root {
}
</style>
