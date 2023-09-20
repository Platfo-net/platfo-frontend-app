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

        <q-toolbar-title> Platfo </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="flex column justify-between full-height">
        <q-list>
          <q-item-label header>Links</q-item-label>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
        <q-btn
          class="q-ma-md"
          color="negative"
          label="Logout"
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
    title: 'My Stores',
    icon: 'storefront',
    link: { name: 'StoreListPage' },
  },
  {
    title: 'My Contacts',
    icon: 'account_circle',
    link: { name: 'ContactsPage' },
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
