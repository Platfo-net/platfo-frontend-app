<template>
  <q-page class="q-pa-md">
    <template v-if="isPending">
      <base-loading-spinner :loading="isPending"></base-loading-spinner>
    </template>
    <template v-if="categories && categories.length > 0">
      <div class="row q-col-gutter-md">
        <div
          class="col-6"
          v-for="{ id, title, image, image_url } in categories"
          :key="id"
        >
          <telegram-shop-category-item
            :id="id"
            :title="title"
            :image="image"
            :image_url="image_url"
          ></telegram-shop-category-item>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import BaseLoadingSpinner from 'src/components/common/BaseLoadingSpinner.vue';
import TelegramShopCategoryItem from 'src/components/public/shop/TelegramShopCategoryItem.vue';
import { useTelegramShopService } from 'src/services/useTelegramShopService';
import { useRoute } from 'vue-router';
const {
  queries: { getShopCategories },
} = useTelegramShopService();

const route = useRoute();

const { data: categories, isPending } = getShopCategories(route.params.shopId as string)
// const categories = ref<IProductCategory[]>([]);

// onMounted(async () => {
//   categories.value = await getShopCategories(route.params.shopId as string);
// });
</script>

<style scoped></style>
