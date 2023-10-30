<script setup lang="ts">
import PhoneOtp from 'components/PhoneOtp.vue';
import { useAuthStore } from 'stores/auth-store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const authStore = useAuthStore();
const router = useRouter();
if (!authStore.otpToken) {
  router.replace({ name: 'RegisterPage' });
}
const resendEmail = ref(false);
const counterSeconds = ref(120);
const timeout = setInterval(() => {
  counterSeconds.value -= 1;
  if (counterSeconds.value == 0) {
    resendEmail.value = true;
    clearInterval(timeout);
  }
}, 1000);
</script>

<template>
  <q-page class="flex justify-center items-center bg-primary q-pa-lg">
    <q-card class="q-pa-md" style="min-width: 300px">
      <q-card-section>
        <div class="flex row justify-center items-center text-h6">
          {{ $t('pages.otp.title') }}
        </div>
      </q-card-section>
      <q-card-section style="overflow: hidden" dir="ltr">
        <phone-otp></phone-otp>
      </q-card-section>
      <q-card-section class="flex items-center justify-center">
        <q-btn color="dark" :disable="!resendEmail"
          >{{ $t('pages.otp.resendConfirmation') }}
          {{ counterSeconds > 0 ? counterSeconds : '' }}</q-btn
        >
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
