<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar class="mobile-only">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> {{ $t('layout.appHeader') }} </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above style="border: 1px solid #e2e2e2">
      <base-layout-sidebar-menu :routes="manageShopLayoutRoutes"></base-layout-sidebar-menu>
      <base-layout-sidebar-user-info></base-layout-sidebar-user-info>
    </q-drawer>

    <q-page-container class="bg-teal-1">
      <q-page class="q-pa-md container">
        <BreadCrumbs />
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSidebar } from 'src/composables/use-sidebar';
import BreadCrumbs from 'components/BreadCrumbs.vue';
import BaseLayoutSidebarMenu from 'components/common/BaseLayoutSidebarMenu.vue';
import BaseLayoutSidebarUserInfo from 'src/components/common/BaseLayoutSidebarUserInfo.vue';
import { useMeta } from 'quasar';
import { useRoute } from 'vue-router';
const route = useRoute();
useMeta(() => ({
  title: route.meta.title as string,
}))

const { manageShopLayoutRoutes } = useSidebar();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
