<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
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

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="flex column justify-between full-height">
        <q-list>
          <q-item-label header>{{ $t('layout.links.title') }}</q-item-label>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
        <q-btn
          class="q-ma-md"
          color="negative"
          :label="$t('layout.logout')"
          @click="handleLogoutClick"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { useAuthStore } from 'stores/auth-store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogoutClick = () => {
  authStore.actions.clearAuthState();
  router.replace({
    name: 'LoginPage',
  });
};

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'layout.links.myStores',
    icon: 'storefront',
    link: { name: 'StoreListPage' },
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
