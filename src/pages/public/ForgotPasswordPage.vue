<script setup lang="ts">
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth-store';
import { IForgotPasswordResponse } from 'stores/types';
import { useI18n } from 'vue-i18n';

const { api } = useApi();
const notify = useNotify();
const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

const handleFormSubmit = async () => {
  try {
    const {
      data: { token },
    } = await api.post<IForgotPasswordResponse>('/auth/forgot-password', {
      phone_number: authStore.changePasswordState.phone_number,
      phone_country_code: authStore.changePasswordState.phone_country_code,
    });
    notify.success(
      t('pages.public.forgotPassword.notifications.getTokenSuccess')
    );
    authStore.actions.setChangePasswordStateToken(token);
    await router.replace({
      name: 'ChangePasswordPage',
    });
  } catch (err) {
    notify.error(t('pages.public.forgotPassword.notifications.getTokenError'));
  }
};
</script>

<template>
  <q-page class="flex justify-center items-center bg-primary q-pa-lg">
    <q-card
      class="q-pa-md"
      style="min-width: 300px; width: 100%; max-width: 500px"
    >
      <div class="text-h6">{{ $t('pages.public.forgotPassword.title') }}</div>
      <form @submit.prevent="handleFormSubmit">
        <div class="q-gutter-md">
          <q-input
            name="phone_number"
            v-model="authStore.changePasswordState.phone_number"
            type="text"
            :label="$t('pages.public.login.fields.phoneNumber')"
            color="dark"
            :rules="[
              (val) => !!val || $t('general.fields.requiredStringField'),
            ]"
            dir="ltr"
            :hint="t('pages.public.forgotPassword.fields.phoneNumberHint')"
          />
        </div>
        <q-btn
          color="dark"
          class="full-width q-mt-md"
          :label="$t('pages.public.forgotPassword.getToken')"
          type="submit"
          :disable="authStore.changePasswordState.phone_number.length < 11"
        />
      </form>
      <div class="flex column justify-center end q-mt-md">
        <p>
          {{ $t('pages.public.forgotPassword.notUser') }}
          <router-link :to="{ name: 'RegisterPage' }">{{
            $t('pages.public.forgotPassword.registerHere')
          }}</router-link>
        </p>
        <p>
          {{ $t('pages.public.forgotPassword.isUser') }}
          <router-link :to="{ name: 'LoginPage' }">{{
            $t('pages.public.forgotPassword.loginHere')
          }}</router-link>
        </p>
      </div>
    </q-card>
  </q-page>
</template>

<style scoped></style>
