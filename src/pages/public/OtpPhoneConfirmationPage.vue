<script setup lang="ts">
import PhoneOtp from 'components/PhoneOtp.vue';
import { useAuthStore } from 'stores/auth-store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ISendActivationCodeResponse } from 'src/composables/types';
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
const { api, loading } = useApi();
const notify = useNotify();
const authStore = useAuthStore();
const router = useRouter();
if (!authStore.otpToken) {
  router.replace({ name: 'RegisterPage' });
}
const resendEmail = ref(false);
const counterSeconds = ref(120);
const timeout = ref(setInterval(() => {
  counterSeconds.value -= 1;
  if (counterSeconds.value == 0) {
    resendEmail.value = true;
    clearInterval(timeout.value);
  }
}, 1000));
const handleResendCode = async () => {
  console.log('fuck my life')
  try {
    const { data: { token } } = await api
      .post<ISendActivationCodeResponse>(
        '/auth/send-activation-code-by-sms',
        {
          phone_number: authStore.registerState.phone_number,
          phone_country_code: authStore.registerState.phone_country_code,
        }
      )
      resendEmail.value = false;
      counterSeconds.value = 120;
      timeout.value = setInterval(() => {
        counterSeconds.value -= 1;
        if (counterSeconds.value == 0) {
          resendEmail.value = true;
          clearInterval(timeout.value);
        }
      }, 1000);
      authStore.actions.setOtpToken(token);
      notify.success('ارسال مجدد موفقیت آمیز')
  } catch {
    notify.error('خطا در ارسال مجدد کد تایید')
  }
}
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
          @click="() => handleResendCode()"
          >{{ $t('pages.otp.resendConfirmation') }}
          {{ counterSeconds > 0 ? counterSeconds : '' }}</q-btn
        >
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
