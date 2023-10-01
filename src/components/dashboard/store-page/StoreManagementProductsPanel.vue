<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { IProduct } from 'components/models';
import { useApi } from 'src/composables/use-api';
import { useRoute } from 'vue-router';
import { ICreateProduct, IPaginatedResponse } from 'src/composables/types';
import { useNotify } from 'src/composables/use-notify';
const { api, loading } = useApi();
const products = ref<IProduct[]>([]);
const route = useRoute();
const notify = useNotify();

const getProducts = async () => {
  const response = await api.get<IPaginatedResponse<IProduct>>(
    `/shop/products/${route.params.storeId}/all`
  );
  products.value = response.data.items;
};

const createNewProduct = async () => {
  try {
    const response = await api.post<IProduct>('/shop/products', productModel);
    notify.success('Created new product');
    await getProducts();
    addItem.value = false;
  } catch (err) {
    console.error(err);
    notify.error(err.message);
  }
};

const addItem = ref(false);
const productModel = reactive<ICreateProduct>({
  category_id: 'a8b0f6ec-9475-4531-bcda-e3d1ba742c1e',
  currency: '',
  image: '',
  price: 0,
  shop_id: route.params.storeId as string,
  title: '',
});
const createCategory = async () => {
  await api.post('/shop/categories', {
    shop_id: route.params.storeId,
    title: 'Test Category',
  });
};

onMounted(async () => {
  await getProducts();
  // await createCategory();
});
</script>

<template>
  <q-card class="q-pa-lg" bordered square flat>
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h6">Product Management</div>
      <q-btn
        :icon="addItem ? 'expand_less' : 'expand_more'"
        label="New"
        size="sm"
        color="accent"
        @click="addItem = !addItem"
      />
    </div>
    <div class="row q-my-md">
      <q-card v-show="addItem" class="q-pa-md full-width" bordered square flat>
        <q-form @submit.prevent="createNewProduct">
          <q-input
            square
            filled
            v-model="productModel.title"
            label="Title *"
            hint="Product title"
            color="accent"
            lazy-rules
            dense
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            dense
            square
            filled
            type="number"
            v-model="productModel.price"
            step="any"
            label="Price *"
            lazy-rules
            color="accent"
            :rules="[
              (val) => (val !== null && val !== '') || 'Please enter a number',
              (val) => val >= 0 || 'Price should be positive',
            ]"
          />
          <div class="row q-gutter-md items-center">
            <q-btn
              @click="addItem = false"
              color="negative"
              icon="close"
              label="cancel"
              size="sm"
            ></q-btn>
            <q-btn
              type="submit"
              color="primary"
              icon="check"
              label="Add"
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
          No products currently registered. Add a new product.
        </p>
      </template>
      <template v-else>
        <div class="row q-gutter-sm">
          <div
            class="col-xs-12 col-sm-12 col-md-3"
            v-for="(product, idx) in products"
            :key="idx"
          >
            <q-card
              id="product-card"
              flat
              bordered
              square
              class="q-pa-md overflow-hidden card-hover non-selectable"
            >
              <div class="row justify-between items-center q-mb-md">
                <div class="text-h6">{{ product.title }}</div>
                <q-btn icon="edit" size="sm" color="accent" flat />
              </div>
              <div class="text-caption text-grey">
                {{ product.category.title }}
              </div>
              <div class="text-h4 text-grey">IRR{{ product.price }}</div>
            </q-card>
          </div>
        </div>
      </template>
    </template>
  </q-card>
</template>

<style scoped lang="scss">
:root {
}
</style>
