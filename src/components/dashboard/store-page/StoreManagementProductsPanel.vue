<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { IProduct } from 'components/models';
import { useApi } from 'src/composables/use-api';
import { useRoute } from 'vue-router';
import { ICreateProduct, IPaginatedResponse } from 'src/composables/types';
import { useNotify } from 'src/composables/use-notify';
import ProductItem from './ProductItem.vue'
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
    await api.post<IProduct>('/shop/products', productModel);
    notify.success('Created new product');
    await getProducts();
    addItem.value = false;
  } catch (err) {
    console.error(err);
    notify.error(err.message);
  }
};

const addItem = ref(false);

const deleteProduct = async (productId: string) => {
  try {
    await api.delete(`/shop/products/${productId}`);
    notify.success('Delete product success');
    await getProducts();
  } catch (err) {
    console.error(err);
    notify.error(err.message);
  }
}
const productModel = reactive<ICreateProduct>({
  category_id: null,
  currency: 'IRR',
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
      <div class="text-h6">Product Management</div>
      <q-btn :icon="addItem ? 'expand_less' : 'expand_more'" label="New" size="sm" color="accent"
        @click="addItem = !addItem" />
    </div>
    <div class="row q-my-md">
      <q-card v-show="addItem" class="q-pa-md full-width" bordered square flat>
        <q-form @submit.prevent="createNewProduct">
          <q-input class="q-mb-lg" square filled v-model="productModel.title" label="Title *" color="accent" lazy-rules
            dense :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]" />
          <q-input class="q-mb-lg" dense square filled type="number" v-model="productModel.price" step="any"
            label="Price *" lazy-rules color="accent" :rules="[
              (val) => (val !== null && val !== '') || 'Please enter a number',
              (val) => val >= 0 || 'Price should be positive',
            ]" />
          <div class="row q-gutter-md items-center">
            <q-btn @click="addItem = false" color="negative" icon="close" label="cancel" size="sm"></q-btn>
            <q-btn type="submit" color="primary" icon="check" label="Add" size="sm"
              :disable="!productModel.title.length || !productModel.price"></q-btn>
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
          <template v-for="(product, idx) in products" :key="idx">
            <ProductItem :product="product" show-edit show-delete :delete-fn="deleteProduct" />
          </template>
        </div>
      </template>
    </template>
  </q-card>
</template>

<style scoped lang="scss">
:root {}
</style>
