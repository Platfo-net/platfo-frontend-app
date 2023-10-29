<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth-store';
import { ILoginApiResponse } from 'stores/types';
import { ILoginFormState } from 'src/types';
import {useI18n} from "vue-i18n";

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

const handleFormSubmit = () => {
  api
    .post<ILoginApiResponse>('/auth/access-token-phone-number', loginState)
    .then((res) => {
      notify.success(t('pages.public.login.notifications.loginSuccess'));
      authStore.actions.setAuthState(res.data);
      router.replace({
        name: 'StoreListPage',
      });
    })
    .catch(() => {
      notify.error(t('pages.public.login.notifications.loginSuccess'));
    });
};
</script>

<template>
  <q-page class="flex justify-center items-center bg-primary q-pa-lg">
    <q-card
      class="q-pa-md"
      style="min-width: 300px; width: 100%; max-width: 500px"
    >
      <div class="text-h6">{{ $t('pages.public.login.title') }}</div>
      <form @submit.prevent="handleFormSubmit">
        <div class="q-gutter-md">
          <q-input
            name="phone_number"
            v-model="loginState.phone_number"
            type="text"
            :label="$t('pages.public.login.fields.phoneNumber')"
            color="dark"
            :rules="[(val) => !!val || $t('general.fields.requiredStringField')]"
            dir="ltr"
          />
          <q-input
            v-model="loginState.password"
            :type="showPass ? 'password' : 'text'"
            :label="$t('pages.public.login.fields.password')"
            color="dark"
            :rules="[(val) => !!val || $t('general.fields.requiredStringField')]"
            dir="ltr"
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
        <q-btn
          color="dark"
          class="full-width q-mt-md"
          :label="$t('pages.public.login.login')"
          type="submit"
          :disable="
            loginState.password.length < 1 || loginState.phone_number.length < 1
          "
        />
      </form>
      <div class="flex row justify-center items-center q-mt-md">
        <p>
          {{ $t('pages.public.login.notUser') }}
          <router-link :to="{ name: 'RegisterPage' }"
            >{{ $t('pages.public.login.registerHere') }}</router-link
          >
        </p>
      </div>
    </q-card>
  </q-page>
</template>

<style scoped></style>
