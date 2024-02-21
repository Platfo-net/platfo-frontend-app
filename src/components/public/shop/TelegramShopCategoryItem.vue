<template>
  <q-card
    bordered
    flat
    class="q-hoverable shadow-4 cursor-pointer"
    v-ripple
    @click="goToShopCategoryProductsPage(id)"
  >
    <q-img
      style="overflow: hidden; max-height: 150px"
      :src="getCategoryImageSrc()"
      fit="cover"
    />
    <q-card-section class="text-center text-bold">
      <div>{{ title }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { IProductCategory } from 'src/components/models';
import { ProductCategoryType } from 'src/types';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const isTableShop = ref(route.query.table ? true : false)
function goToShopCategoryProductsPage(categoryId: string) {
  router.push(isTableShop.value === true ? {
    name: 'ShopTableCategoryProductsPage',
    params: {
      categoryId,
    },
    query: { categoryTitle: props.title, table: route.query.table },
  } : {
    name: 'ShopCategoryProductsPage',
    params: {
      categoryId,
    },
    query: { categoryTitle: props.title },
  });
}
const getCategoryImageSrc = () => {
  return props.image_url || 'https://placehold.co/100x100';
};
const props = defineProps<ProductCategoryType>();
</script>

<style scoped></style>
