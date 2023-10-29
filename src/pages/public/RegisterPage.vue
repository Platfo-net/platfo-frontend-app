<script setup lang="ts">
import { reactive, ref } from 'vue';
import { IRegisterFormState } from 'src/types';
import { useApi } from 'src/composables/use-api';
import { useRouter } from 'vue-router';
import { useNotify } from 'src/composables/use-notify';
import { ISendActivationCodeResponse } from 'src/composables/types';
import { useAuthStore } from 'stores/auth-store';

const authStore = useAuthStore();
// const registerState = reactive<IRegisterFormState>({
//   first_name: '',
//   last_name: '',
//   password: '',
//   phone_country_code: '+98',
//   phone_number: '',
// });
const showPass = ref(true);
const { api } = useApi();
const router = useRouter();
const notify = useNotify();

const handleFormSubmit = () => {
  api
    .post<null>('/user/register-by-phone-number', authStore.registerState)
    .then(() => {
      api
        .post<ISendActivationCodeResponse>(
          '/auth/send-activation-code-by-sms',
          {
            phone_number: authStore.registerState.phone_number,
            phone_country_code: authStore.registerState.phone_country_code,
          }
        )
        .then(({ data: { token } }) => {
          authStore.actions.setOtpToken(token);
          router.replace({ name: 'OtpPhoneConfirmationPage' });
        })
        .catch(() => {
          notify.error('Error while calling OTP');
        });
      notify.success('Successful', 'Register was successful');
      router.replace({
        name: 'OtpPhoneConfirmationPage',
      });
    })
    .catch((err) => {
      console.log(err.response.data.detail);
      if (
        err.response.status == 400 &&
        err.response.data.detail === 'Inactive user'
      ) {
        api
          .post<ISendActivationCodeResponse>(
            '/auth/send-activation-code-by-sms',
            {
              phone_number: authStore.registerState.phone_number,
              phone_country_code: authStore.registerState.phone_country_code,
            }
          )
          .then(({ data: { token } }) => {
            authStore.actions.setOtpToken(token);
            router.replace({ name: 'OtpPhoneConfirmationPage' });
          })
          .catch(() => {
            notify.error('Error while calling OTP');
          });
      } else {
        notify.error('Error', err.response.data.detail);
      }
    });
};
</script>

<template>
  <q-page class="flex justify-center items-center bg-primary q-pa-lg">
    <q-card
      class="q-pa-md"
      style="min-width: 300px; width: 100%; max-width: 500px"
    >
      <div class="text-h6">{{$t('pages.public.register.title')}}</div>
      <form @submit.prevent="handleFormSubmit">
        <div class="q-gutter-md">
          <q-input
            name="first_name"
            v-model="authStore.registerState.first_name"
            type="text"
            :label="$t('pages.public.register.fields.firstname')"
            color="dark"
            :rules="[(val) => !!val || $t('general.fields.requiredStringField')]"
          />
          <q-input
            name="last_name"
            v-model="authStore.registerState.last_name"
            type="text"
            :label="$t('pages.public.register.fields.lastname')"
            color="dark"
            :rules="[(val) => !!val || $t('general.fields.requiredStringField')]"
          />
          <q-input
            name="phone_number"
            v-model="authStore.registerState.phone_number"
            type="text"
            :label="$t('pages.public.register.fields.phoneNumber')"
            color="dark"
            :rules="[(val) => !!val || $t('general.fields.requiredStringField')]"
          />
          <q-input
            name="phone_country_code"
            v-model="authStore.registerState.phone_country_code"
            type="text"
            :label="$t('pages.public.register.fields.phoneCountryCode')"
            color="dark"
            :rules="[(val) => !!val || $t('general.fields.requiredStringField')]"
            disable
          />
          <q-input
            v-model="authStore.registerState.password"
            :type="showPass ? 'password' : 'text'"
            :label="$t('pages.public.register.fields.password')"
            color="dark"
            :rules="[(val) => !!val || $t('general.fields.requiredStringField')]"
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
          :label="$t('pages.public.register.register')"
          type="submit"
          :disable="
            authStore.registerState.phone_country_code.length < 1 ||
            authStore.registerState.phone_number.length < 1 ||
            authStore.registerState.first_name.length < 1 ||
            authStore.registerState.last_name.length < 1 ||
            authStore.registerState.password.length < 1
          "
        />
      </form>
      <div class="flex row justify-center items-center q-mt-md">
        <p>
          {{ $t('pages.public.register.isUser') }}
          <router-link :to="{ name: 'LoginPage' }">{{ $t('pages.public.register.loginHere') }}</router-link>
        </p>
      </div>
    </q-card>
  </q-page>
</template>

<style scoped></style>
