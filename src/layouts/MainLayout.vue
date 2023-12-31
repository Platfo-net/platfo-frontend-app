<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> {{ $t('layout.appHeader') }} </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above style="border: 1px solid #e2e2e2">
      <q-scroll-area style="height: calc(100% - 161.6px); margin-top: 161.6px;">
        <q-list padding>
          <div v-for="(route, idx) in routes" clickable :key="route.title + idx">
            <q-item clickable v-if="!route.children?.length" :to="route.to">
              <q-item-section avatar>
                <q-icon :name="route.icon"></q-icon>
              </q-item-section>
              <q-item-section>
                {{ route.title }}
              </q-item-section>
            </q-item>
            <q-expansion-item v-else :label="route.title" :icon="route.icon">
              <q-item v-for="(innerRoute, innerIdx) in route.children" :key="innerRoute.title + innerIdx" class="q-pl-xl"
                clickable :to="innerRoute.to">
                <q-item-section avatar>
                  <q-icon :name="innerRoute.icon"></q-icon>
                </q-item-section>
                <q-item-section>
                  {{ innerRoute.title }}
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </div>
          <!-- <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>
              Star
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>
              Send
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section>
              Drafts
            </q-item-section>
          </q-item> -->
        </q-list>
      </q-scroll-area>
      <q-img class="absolute-top bg-primary" style="height: 161.6px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="flex row items-center justify-between">
            <div>
              <div class="text-weight-bold">جعفر لولویی</div>
              <div>09123456789</div>
            </div>

            <q-btn class="q-ma-md" round text-color="white" icon="logout" flat @click="handleLogoutClick" dense>
              <q-tooltip>خروج</q-tooltip></q-btn>
          </div>
        </div>
      </q-img>
      <!-- <div class="flex column justify-between full-height">
        <q-list>
          <q-item-label header>{{ $t('layout.links.title') }}</q-item-label>
          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </q-list>
        <q-btn class="q-ma-md" color="negative" :label="$t('layout.logout')" @click="handleLogoutClick" />
      </div> -->
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import EssentialLink, {
//   EssentialLinkProps,
// } from 'components/EssentialLink.vue';
import { useAuthStore } from 'stores/auth-store';
import { useRouter } from 'vue-router';
import { useSidebar } from 'src/composables/use-sidebar';
import { QIcon } from 'quasar';

const authStore = useAuthStore();
const router = useRouter();

const handleLogoutClick = () => {
  authStore.actions.clearAuthState();
  router.replace({
    name: 'LoginPage',
  });
};

const { routes } = useSidebar();


// const essentialLinks: EssentialLinkProps[] = [
//   {
//     title: 'layout.links.myStores',
//     icon: 'storefront',
//     link: { name: 'StoreListPage' },
//   },
// ];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
