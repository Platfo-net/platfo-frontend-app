<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth-store';
import { ILoginApiResponse } from 'stores/types';
import { ILoginFormState } from 'src/types';
import { useI18n } from 'vue-i18n';
import LoginImage from 'src/components/public/shop/LoginImage.vue';

const { api } = useApi();
const notify = useNotify();
const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

const loginState = reactive<ILoginFormState>({
  phone_number: '',
  password: '',
  phone_country_code: '+98',
});
const showPass = ref(true);

const handleFormSubmit = async () => {
  try {
    const { data } = await api.post<ILoginApiResponse>(
      '/auth/access-token-phone-number',
      loginState
    );
    notify.success(t('pages.public.login.notifications.loginSuccess'));
    authStore.actions.setAuthState(data);
    await router.replace({
      name: 'StoreListPage',
    });
  } catch (err) {
    notify.error(t('pages.public.login.notifications.loginError'));
  }
};
</script>

<template>
  <q-page class="flex justify-center items-center bg-grey-3 q-pa-lg">
    <q-card flat style="min-width: 300px; width: 100%; max-width: 995px; max-height: 595px; border-radius: 35px;"
      class="flex row">
      <q-card-section class="col-md-6 col-12">
        <div class="q-pa-lg">
          <div class="text-h6 q-mb-lg">{{ $t('pages.public.login.title') }}</div>
          <form @submit.prevent="handleFormSubmit">
            <div class="q-mb-lg">{{ $t('pages.public.login.fields.phoneNumber') }}</div>
            <div class="q-gutter-md">
              <q-input rounded outlined color="secondary" name="phone_number" v-model="loginState.phone_number"
                type="text" :rules="[
            (val) => !!val || $t('general.fields.requiredStringField'),
          ]" dir="ltr" />
              <div class="q-mb-lg">{{ $t('pages.public.login.fields.password') }}</div>
              <q-input rounded outlined color="secondary" style="font-family: sans-serif;" v-model="loginState.password"
                :type="showPass ? 'password' : 'text'" :rules="[
            (val) => !!val || $t('general.fields.requiredStringField'),
          ]" dir="ltr">
                <template v-slot:append>
                  <q-icon :name="showPass ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="showPass = !showPass" />
                </template>
              </q-input>
              <div class="flex justify-center q-mb-lg">
                <span class="q-mr-sm">رمز عبور خود را فراموش کرده اید؟</span>
                <router-link class="text-bold text-secondary" style="text-decoration: none;"
                  :to="{ name: 'ForgotPasswordPage' }">{{
            $t('pages.public.login.forgotPassword')
          }}</router-link>
              </div>
            </div>
            <q-btn rounded color="primary" class="full-width q-mt-md q-pa-md" :label="$t('pages.public.login.login')"
              type="submit" :disable="loginState.password.length < 1 || loginState.phone_number.length < 1
            " />
          </form>
          <div class="flex column justify-center items-center q-mt-md">
            <p>
              {{ $t('pages.public.login.notUser') }}
              <router-link class="text-bold text-secondary" style="text-decoration: none;"
                :to="{ name: 'RegisterPage' }">{{
            $t('pages.public.login.registerHere')
                }}</router-link>
            </p>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="bg-primary col-12 col-md-6 mobile-hide" style="border-radius: 35px;">
        <login-image />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
