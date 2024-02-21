<script setup lang="ts">
import useAuthService from 'src/services/useAuthService';
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';

/** COMPONENT COMPOSABLES */
const authStore = useAuthStore();
const router = useRouter();
/************************ */

/** COMPONENT STATE */
const { data: userInfo, isLoading } = useAuthService().queries.me();
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
      <template v-if="isLoading"><q-skeleton type="QAvatar" /></template>
      <q-avatar square v-else size="56px" class="q-mb-sm">
        <img loading="eager" :src="userInfo?.profile_image ? userInfo?.profile_image.url : '/avatar.png'" />
      </q-avatar>
      <div class="flex row items-center justify-between">
        <div>
          <template v-if="isLoading"><q-skeleton type="QBadge" /></template>
          <div v-else class="text-weight-bold">{{ userInfo?.first_name }} {{ userInfo?.last_name }}</div>
          <template v-if="isLoading"><q-skeleton type="QBadge" /></template>
          <div v-else>{{ userInfo?.phone_number }}</div>
        </div>

        <q-btn class="q-ma-md" round text-color="white" icon="logout" flat @click="handleLogoutClick" dense>
          <q-tooltip class="bg-red-4">خروج</q-tooltip></q-btn>
      </div>
    </div>
  </q-img>
</template>

<style scoped></style>
