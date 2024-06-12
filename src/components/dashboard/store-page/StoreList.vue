<script setup lang="ts">
import StoreListItem from 'components/dashboard/store-page/StoreListItem.vue';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';
import { useShopService } from 'src/services/useShopService';

const shopService = useShopService();

const { data: shopList, isPending: shopListIsPending } = shopService.queries.getShopList();
const { data: shopCategories, isPending: isCategoriesLoading } = shopService.queries.getShopCategories();

</script>

<template>
  <div class="row q-col-gutter-md">
    <template v-if="shopListIsPending">
      <base-loading-spinner loading></base-loading-spinner>
    </template>
    <template v-else-if="!shopList || shopList.length < 1">
      <p>
        {{
      $t('pages.panel.dashboard.storeListPage.messages.noShopsRegistered')
    }}
      </p>
    </template>
    <template v-else v-for="(shop, idx) in shopList || []" :key="`${idx}-${shop.id}`">
      <StoreListItem :category="(shopCategories?.find(x => x.value == shop.category)?.title as string)"
        :description="shop.description" :id="shop.id" :title="shop.title" />
    </template>
  </div>
</template>

<style scoped></style>
