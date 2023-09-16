<script setup lang="ts">
import PhoneOtp from 'components/PhoneOtp.vue';
import { useAuthStore } from 'stores/auth-store';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();
if (!authStore.otpToken) {
  router.replace({ name: 'RegisterPage' });
}
</script>

<template>
  <q-page class="flex justify-center items-center bg-primary q-pa-lg">
    <q-card class="q-pa-md" style="min-width: 300px">
      <div class="flex row justify-center items-center text-h6">
        Phone Confirmation
      </div>
      <phone-otp></phone-otp>
    </q-card>
  </q-page>
</template>

<style scoped></style>
