<script setup lang="ts">
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth-store';
import { IForgotPasswordResponse } from 'stores/types';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const { api } = useApi();
const notify = useNotify();
const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

const repeatPassword = ref<string>('');

const showPass = ref<boolean>(false);
const showRepPass = ref<boolean>(false);

const handleFormSubmit = async () => {
  try {
    await api.post<IForgotPasswordResponse>('/auth/change-password', authStore.changePasswordState);
    notify.success(
      t('pages.public.changePassword.notifications.changePasswordSuccess')
    );
    authStore.actions.clearChangePasswordState();
    await router.replace({
      name: 'LoginPage',
    });
  } catch (err) {
    notify.error(t('pages.public.changePassword.notifications.changePasswordError'));
  }
};
</script>

<template>
  <q-page class="flex justify-center items-center bg-primary q-pa-lg">
    <q-card
      class="q-pa-md"
      style="min-width: 300px; width: 100%; max-width: 500px"
    >
      <div class="text-h6">{{ $t('pages.public.changePassword.title') }}</div>
      <form @submit.prevent="handleFormSubmit">
        <div class="q-gutter-md">
          <q-input
            name="change_password_code"
            v-model="authStore.changePasswordState.code"
            type="text"
            :label="$t('pages.public.changePassword.fields.code')"
            color="dark"
            :rules="[
              (val) => !!val || $t('general.fields.requiredStringField'),
            ]"
            dir="ltr"
          />
        </div>
        <div class="q-gutter-md">
          <q-input
            name="new_pasword"
            v-model="authStore.changePasswordState.password"
            :type="showPass ? 'password' : 'text'"
            :label="$t('pages.public.changePassword.fields.newPassword')"
            color="dark"
            :rules="[
              (val) => !!val || $t('general.fields.requiredStringField'),
            ]"
            dir="ltr"
            clearable
          >
            <template v-slot:append>
              <q-icon
                :name="showPass ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPass = !showPass"
              />
            </template>
        </q-input>
        </div>
        <div class="q-gutter-md">
          <q-input
            name="new_password_repeat"
            v-model="repeatPassword"
            :type="showRepPass ? 'password' : 'text'"
            :label="$t('pages.public.changePassword.fields.repeatNewPassword')"
            color="dark"
            :rules="[
              (val) => val === authStore.changePasswordState.password || $t('general.fields.passwordsDoNotMatch'),
            ]"
            dir="ltr"
            clearable
          >
            <template v-slot:append>
              <q-icon
                :name="showRepPass ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showRepPass = !showRepPass"
              />
            </template>
          </q-input>
        </div>
        <q-btn
          color="dark"
          class="full-width q-mt-md"
          :label="$t('pages.public.changePassword.resetPassword')"
          type="submit"
          :disable="!authStore.changePasswordState.code || !authStore.changePasswordState.password || authStore.changePasswordState.password !== repeatPassword"
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
