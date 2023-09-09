<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth-store';
import { ILoginApiResponse } from 'stores/types';

const { api } = useApi();
const notify = useNotify();
const router = useRouter();
const authStore = useAuthStore();

const loginState = reactive({
  phone_number: '',
  password: '',
  phone_country_code: '+98',
});
const showPass = ref(true);

const handleFormSubmit = () => {
  api
    .post<ILoginApiResponse>('/auth/access-token-phone-number', loginState)
    .then((res) => {
      notify.success('Successful', 'Login was successful');
      authStore.actions.setAuthState(res.data);
      router.replace({
        name: 'StoresPage',
      });
    })
    .catch((err) => {
      notify.error('Error', err.response.data.detail);
    });
};
</script>

<template>
  <q-page class="flex justify-center items-center bg-primary q-pa-lg">
    <q-card class="q-pa-md">
      <div class="text-h6">Login to Platfo</div>
      <form @submit.prevent="handleFormSubmit">
        <div class="q-gutter-md">
          <q-input
            name="phone_number"
            v-model="loginState.phone_number"
            type="text"
            label="Phone Number"
            color="dark"
            :rules="[(val) => !!val || 'Field is required']"
          />
          <q-input
            v-model="loginState.password"
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
          label="Login"
          type="submit"
          :disable="
            loginState.password.length < 1 || loginState.phone_number.length < 1
          "
        />
      </form>
    </q-card>
  </q-page>
</template>

<style scoped></style>
