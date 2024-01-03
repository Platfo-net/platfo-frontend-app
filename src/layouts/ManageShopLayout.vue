<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar class="mobile-only">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> {{ $t('layout.appHeader') }} </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      style="border: 1px solid #e2e2e2"
    >
      <base-layout-sidebar-menu
        :routes="manageShopLayoutRoutes"
      ></base-layout-sidebar-menu>
      <q-img class="absolute-top bg-primary" style="height: 161.6px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="flex row items-center justify-between">
            <div>
              <div class="text-weight-bold">جعفر لولویی</div>
              <div>09123456789</div>
            </div>

            <q-btn
              class="q-ma-md"
              round
              text-color="white"
              icon="logout"
              flat
              @click="handleLogoutClick"
              dense
            >
              <q-tooltip>خروج</q-tooltip></q-btn
            >
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container class="bg-teal-1">
      <q-page class="q-pa-md">
        <BreadCrumbs />
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth-store';
import { useRouter } from 'vue-router';
import { useSidebar } from 'src/composables/use-sidebar';
import BreadCrumbs from 'components/BreadCrumbs.vue';
import BaseLayoutSidebarMenu from 'components/common/BaseLayoutSidebarMenu.vue';

const authStore = useAuthStore();
const router = useRouter();

const handleLogoutClick = () => {
  authStore.actions.clearAuthState();
  router.replace({
    name: 'LoginPage',
  });
};

const { manageShopLayoutRoutes } = useSidebar();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
