<script setup lang="ts">
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth-store';
import { IForgotPasswordResponse } from 'stores/types';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

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
const isBtnDisabled = computed(
  () => authStore.changePasswordState.phone_number.length < 11
);
</script>

<template>
  <q-page class="flex justify-center items-center bg-grey-3 q-pa-lg">
    <q-card
      flat
      bordered
      class="q-pa-md"
      style="min-width: 300px; width: 100%; max-width: 500px">
      <q-card-section class="text-h6 text-primary">
        <q-icon name="fingerprint"></q-icon>
        {{ $t('pages.public.forgotPassword.title') }}
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="handleFormSubmit">
          <div>
            <div>{{ $t('pages.public.login.fields.phoneNumber') }}</div>
            <q-input
              class="q-mt-md"
              rounded
              outlined
              name="phone_number"
              v-model="authStore.changePasswordState.phone_number"
              type="text"
              color="teal"
              :rules="[
                (val) => !!val || $t('general.fields.requiredStringField'),
              ]"
              dir="ltr"
              :hint="t('pages.public.forgotPassword.fields.phoneNumberHint')" />
          </div>
          <q-btn
            rounded
            :color="!isBtnDisabled ? 'teal-1' : 'grey-3'"
            :text-color="!isBtnDisabled ? 'teal' : 'grey-8'"
            unelevated
            class="full-width q-mt-md q-pa-md"
            :label="$t('pages.public.forgotPassword.getToken')"
            type="submit"
            :disable="authStore.changePasswordState.phone_number.length < 11" />
        </q-form>
      </q-card-section>
      <div class="flex column justify-center end q-mt-md">
        <p>
          {{ $t('pages.public.forgotPassword.notUser') }}
          <router-link
            class="text-body2 text-blue"
            style="text-decoration: none"
            :to="{ name: 'RegisterPage' }"
            >{{ $t('pages.public.forgotPassword.registerHere') }}</router-link
          >
        </p>
        <p>
          {{ $t('pages.public.forgotPassword.isUser') }}
          <router-link
            class="text-body2 text-blue"
            style="text-decoration: none"
            :to="{ name: 'LoginPage' }"
            >{{ $t('pages.public.forgotPassword.loginHere') }}</router-link
          >
        </p>
      </div>
    </q-card>
  </q-page>
</template>

<style scoped></style>
