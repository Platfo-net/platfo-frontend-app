<script setup lang="ts">
import StoreListItem from 'components/dashboard/store-page/StoreListItem.vue';
import { ShopModel } from 'components/models';
const shops: ShopModel[] = [
  {
    category: 'Developer Shop Category #1',
    id: '1',
    description: 'Description #1',
    title: 'Shop Title #1',
  },
  {
    category: 'Developer Shop Category #2',
    id: '2',
    description: 'Description #2',
    title: 'Shop Title #2',
  },
  {
    category: 'Developer Shop Category #3',
    id: '3',
    description: 'Description #3',
    title: 'Shop Title #3',
  },
  {
    category: 'Developer Shop Category #4',
    id: '4',
    description: 'Description #4',
    title: 'Shop Title #4',
  },
];
</script>

<template>
  <div class="row q-col-gutter-md">
    <template v-for="(shop, idx) in shops" :key="`${idx}-${shop.id}`">
      <StoreListItem
        :category="shop.category"
        :description="shop.description"
        :id="shop.id"
        :title="shop.title"
      />
    </template>
  </div>
</template>

<style scoped></style>
