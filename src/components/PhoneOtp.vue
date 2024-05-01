<script setup lang="ts">
import VOtpInput from 'vue3-otp-input';
import { ref } from 'vue';

const authStore = useAuthStore();

import { useApi } from 'src/composables/use-api';
import { useAuthStore } from 'stores/auth-store';
import { useRouter } from 'vue-router';
import { useNotify } from 'src/composables/use-notify';
const { api } = useApi();
const OTP_DIGITS = 6;
const otpInput = ref<InstanceType<typeof VOtpInput> | null>();
const optState = ref('');
const router = useRouter();
const notify = useNotify();
const inputClasses = ref<string[]>(['otp-input']);
function handleOnComplete(value: any) {
  api
    .post('/auth/activate-by-sms', {
      phone_number: authStore.registerState.phone_number,
      phone_country_code: authStore.registerState.phone_country_code,
      code: value,
      token: authStore.otpToken,
    })
    .then((d) => {
      notify.success('شماره احراز هویت شد');
      router.replace({ name: 'LoginPage' });
    })
    .catch((err) => {
      inputClasses.value.push('otp-input-error')
      notify.error(JSON.stringify(err.response.data));
      // TODO implement proper error handling
    });
}
function handleOnChange(value: any) {
  if (inputClasses.value.includes('otp-input-error')) inputClasses.value = ['otp-input'];
  optState.value = value;
}
</script>

<template>
  <div>
    <v-otp-input
      class="flex justify-between items-center"
      ref="otpInput"
      v-model="optState"
      :input-classes="inputClasses"
      separator=""
      :num-inputs="OTP_DIGITS"
      :should-auto-focus="true"
      input-type="letter-numeric"
      :conditionalClass="['one', 'two', 'three', 'four']"
      :placeholder="['', '', '', '', '', '']"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
    />
  </div>
</template>

<style lang="sass">
.otp-input
  width: 2.2rem
  height: 2.2rem
  border-radius: 4px
  border: #e2e2e2 1px solid
  text-align: center
  transition: all 150ms

.otp-input-error
  border: 1px solid $red !important
  color: red !important

.otp-input:focus
  border: $secondary 1px solid
  outline: none

/* Background colour of an input field with value */
.otp-input.is-complete
  border: $secondary 1px solid
  color: $secondary

.otp-input.is-complete:focus
  border: $secondary 1px solid
  outline: none

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button
  -webkit-appearance: none
  margin: 0

input::placeholder
  font-size: 15px
  text-align: center
  font-weight: 600
</style>
