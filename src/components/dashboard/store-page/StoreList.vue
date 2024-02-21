<script setup lang="ts">
import { useApi } from 'src/composables/use-api';
const { api, loading } = useApi();
import StoreListItem from 'components/dashboard/store-page/StoreListItem.vue';
import { IShop } from 'components/models';
import { ref } from 'vue';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';
import { useShopService } from 'src/services/useShopService';

const shopService = useShopService();

const { data: shopCategories, isPending: isCategoriesLoading } = shopService.queries.getShopCategories();

const getShops = async () => {
  try {
    const { data } = await api.get<IShop[]>('/shop/shop/all');
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
const shops = ref<IShop[]>([]);

getShops().then((data) => {
  shops.value = data;
});
</script>

<template>
  <div class="row q-col-gutter-md">
    <template v-if="loading"
      ><base-loading-spinner loading></base-loading-spinner
    ></template>
    <template v-else-if="shops.length < 1">
      <p>
        {{
          $t('pages.panel.dashboard.storeListPage.messages.noShopsRegistered')
        }}
      </p>
    </template>
    <template v-else v-for="(shop, idx) in shops" :key="`${idx}-${shop.id}`">
      <StoreListItem
        :category="(shopCategories?.find(x => x.value == shop.category)?.title as string)"
        :description="shop.description"
        :id="shop.id"
        :title="shop.title"
      />
    </template>
  </div>
</template>

<style scoped></style>
