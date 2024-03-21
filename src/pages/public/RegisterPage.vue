<script setup lang="ts">
import { ref } from 'vue';
import { useApi } from 'src/composables/use-api';
import { useRouter } from 'vue-router';
import { useNotify } from 'src/composables/use-notify';
import { ISendActivationCodeResponse } from 'src/composables/types';
import { useAuthStore } from 'stores/auth-store';
import SignupImage from 'src/components/public/shop/SignupImage.vue';

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
      notify.success('Successful', 'ثبت نام موفقیت آمیز');
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
            notify.error('خطا در ارسال کد');
          });
      } else {
        notify.error('Error', err.response.data.detail);
      }
    });
};
</script>

<template>
  <q-page class="flex justify-center items-center bg-grey-3 q-pa-lg">
    <q-card
      flat
      style="min-width: 300px; width: 100%; max-width: 995px; border-radius: 35px;"
      class="flex row"
    >
      <q-card-section class="col-md-6 col-12">
        <div class="q-pa-lg">

          <div class="text-h6 q-mb-lg text-bold">{{$t('pages.public.register.title')}}</div>
          <form class="q-pa-md" @submit.prevent="handleFormSubmit">
            <div class="q-gutter-md">
              <div class="row q-col-gutter-md">
                <div class="col-md-6 col-12">
                  <div class="q-mb-sm">{{ $t('pages.public.register.fields.firstname') }}</div>
                  <q-input
                    rounded outlined
                    name="first_name"
                    v-model="authStore.registerState.first_name"
                    type="text"
                    color="primary"
                    :rules="[(val) => !!val || $t('general.fields.requiredStringField')]"
                  />
                </div>
                <div class="col-md-6 col-12">
                  <div class="q-mb-sm">{{ $t('pages.public.register.fields.lastname') }}</div>
                  <q-input
                    rounded outlined
                    color="primary"
                    name="last_name"
                    v-model="authStore.registerState.last_name"
                    type="text"
                    :rules="[(val) => !!val || $t('general.fields.requiredStringField')]"
                  />
                </div>
                <div class="col-12">
                  <div class="q-mb-sm">{{ $t('pages.public.register.fields.phoneNumber') }}</div>
                  <q-input
                    rounded outlined
                    color="primary"
                    name="phone_number"
                    v-model="authStore.registerState.phone_number"
                    type="text"
                    :rules="[(val) => !!val || $t('general.fields.requiredStringField')]"
                  />
                </div>
                <div class="col-12">
                  <div class="q-mb-sm">{{ $t('pages.public.register.fields.password') }}</div>
                    <q-input
                    rounded outlined
                      color="primary"
                      v-model="authStore.registerState.password"
                      :type="showPass ? 'password' : 'text'"
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
                  <div class="col-12">
                    <q-btn
                      rounded
                      color="primary"
                      class="full-width q-pa-md"
                      :label="$t('pages.public.register.register')"
                      type="submit"
                      :disable="
                        // authStore.registerState.phone_country_code.length < 1 ||
                        authStore.registerState.phone_number.length < 1 ||
                        authStore.registerState.first_name.length < 1 ||
                        authStore.registerState.last_name.length < 1 ||
                        authStore.registerState.password.length < 1
                      "
                    />
                  </div>
                </div>
              </div>
          </form>
          <div class="flex row justify-center items-center q-mt-md">
            <p>
              {{ $t('pages.public.register.isUser') }}
              <router-link class="text-primary text-bold text-body1" style="text-decoration: none;" :to="{ name: 'LoginPage' }">{{ $t('pages.public.register.loginHere') }}</router-link>
            </p>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="bg-primary col-12 col-md-6 mobile-hide q-pa-xl flex items-center justify-center" style="border-radius: 35px;">
        <signup-image />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped></style>
