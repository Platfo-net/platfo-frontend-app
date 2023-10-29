<script setup lang="ts">
import { IShop } from 'components/models';

const props = defineProps<IShop>();
</script>

<template>
  <div class="col-12 col-sm-6 col-lg-3">
    <q-toolbar class="bg-accent text-white">
      <q-toolbar-title class="text-h6">{{ props.title }}</q-toolbar-title>
      <q-btn
        class="q-ml-lg"
        size="sm"
        color="white"
        text-color="dark"
        :to="{ name: 'ManageStorePage', params: { storeId: props.id } }"
        >{{
          $t('pages.panel.dashboard.storeListPage.storeListItem.manage')
        }}</q-btn
      >
    </q-toolbar>
    <q-list bordered>
      <q-item class="q-my-sm">
        <q-item-section>
          <q-item-label caption>{{
            $t('pages.panel.dashboard.storeListPage.storeListItem.category')
          }}</q-item-label>
          <q-item-label lines="1">{{ props.category }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="q-my-sm">
        <q-item-section>
          <q-item-label caption>{{
            $t('pages.panel.dashboard.storeListPage.storeListItem.description')
          }}</q-item-label>
          <q-item-label lines="1">{{ props.description }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </q-list>
  </div>
</template>

<style scoped></style>
