<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';

/** COMPONENT COMPOSABLES */
const authStore = useAuthStore();
const router = useRouter();
/************************ */

/** COMPONENT STATE */

/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */
const handleLogoutClick = () => {
  authStore.actions.clearAuthState();
  router.replace({
    name: 'LoginPage',
  });
};
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
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

        <q-btn class="q-ma-md" round text-color="white" icon="logout" flat @click="handleLogoutClick" dense>
          <q-tooltip>خروج</q-tooltip></q-btn>
      </div>
    </div>
  </q-img>
</template>

<style scoped></style>
