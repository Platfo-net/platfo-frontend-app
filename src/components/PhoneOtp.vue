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
function handleOnComplete(value: any) {
  console.log('OTP completed: ', optState.value);
  api
    .post('/auth/activate-by-sms', {
      phone_number: authStore.registerState.phone_number,
      phone_country_code: authStore.registerState.phone_country_code,
      code: value,
      token: authStore.otpToken,
    })
    .then((d) => {
      notify.success('Phone verified.');
      router.replace({ name: 'LoginPage' });
    })
    .catch((err) => {
      notify.error(JSON.stringify(err.response.data));
      // TODO implement proper error handling
    });
}
function handleOnChange(value: any) {
  optState.value = value;
}
</script>

<template>
  <div class="overflow-auto q-py-lg">
    <v-otp-input
      ref="otpInput"
      v-model="optState"
      input-classes="otp-input"
      separator=""
      :num-inputs="OTP_DIGITS"
      :should-auto-focus="true"
      input-type="letter-numeric"
      :conditionalClass="['one', 'two', 'three', 'four']"
      :placeholder="['*', '*', '*', '*', '*', '*']"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
    />
  </div>
</template>

<style lang="sass">
.otp-input
  width: 1.5rem
  height: 1.5rem
  margin: 0 10px
  border-radius: 4px
  border: #e2e2e2 1px solid
  text-align: center
  transition: all 150ms


.otp-input:focus
  border: $primary 1px solid
  outline: none

/* Background colour of an input field with value */
.otp-input.is-complete
  border: $warning 1px solid
  background-color: $warning
  color: $dark

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
