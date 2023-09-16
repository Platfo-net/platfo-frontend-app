<script setup lang="ts">
import { reactive, ref } from 'vue';
import { IRegisterFormState } from 'src/types';
import { useApi } from 'src/composables/use-api';
import { useRouter } from 'vue-router';
import { useNotify } from 'src/composables/use-notify';
import { ISendActivationCodeResponse } from 'src/composables/types';
import { useAuthStore } from 'stores/auth-store';

const authStore = useAuthStore();
const registerState = reactive<IRegisterFormState>({
  first_name: '',
  last_name: '',
  password: '',
  phone_country_code: '',
  phone_number: '',
});
const showPass = ref(true);
const { api } = useApi();
const router = useRouter();
const notify = useNotify();

const handleFormSubmit = () => {
  api
    .post<null>('/user/register-by-phone-number', registerState)
    .then(() => {
      api
        .post<ISendActivationCodeResponse>(
          '/auth/send-activation-code-by-sms',
          {
            phone_number: registerState.phone_number,
            phone_country_code: registerState.phone_country_code,
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
      notify.error('Error', err.response.data.detail);
    });
};
</script>

<template>
  <q-page class="flex justify-center items-center bg-primary q-pa-lg">
    <q-card
      class="q-pa-md"
      style="min-width: 300px; width: 100%; max-width: 500px"
    >
      <div class="text-h6">Register at Platfo</div>
      <form @submit.prevent="handleFormSubmit">
        <div class="q-gutter-md">
          <q-input
            name="first_name"
            v-model="registerState.first_name"
            type="text"
            label="First Name"
            color="dark"
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-input
            name="last_name"
            v-model="registerState.last_name"
            type="text"
            label="Last Name"
            color="dark"
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-input
            name="phone_number"
            v-model="registerState.phone_number"
            type="text"
            label="Phone Number"
            color="dark"
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-input
            name="phone_country_code"
            v-model="registerState.phone_country_code"
            type="text"
            label="Phone Country Code"
            color="dark"
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-input
            v-model="registerState.password"
            :type="showPass ? 'password' : 'text'"
            label="Password"
            color="dark"
            :rules="[(val) => !!val || 'Field is required']"
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
          label="Register"
          type="submit"
          :disable="
            registerState.phone_country_code.length < 1 ||
            registerState.phone_number.length < 1 ||
            registerState.first_name.length < 1 ||
            registerState.last_name.length < 1 ||
            registerState.password.length < 1
          "
        />
      </form>
      <div class="flex row justify-center items-center q-mt-md">
        <p>
          Already a user?
          <router-link :to="{ name: 'LoginPage' }">Login here.</router-link>
        </p>
      </div>
    </q-card>
  </q-page>
</template>

<style scoped></style>
