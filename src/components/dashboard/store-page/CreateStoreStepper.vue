<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useApi } from 'src/composables/use-api';
import { IShop } from 'components/models';
import { useNotify } from 'src/composables/use-notify';
import {
  ICreateShopResponse,
  IRegisterTelegramBotResponse,
} from 'src/composables/types';
import { AxiosError } from 'axios';
const { api, loading } = useApi();
const step = ref(1);

const createShopState = reactive<Partial<IShop>>({
  category: '',
  description: '',
  title: '',
});
const notify = useNotify();

const supportToken = ref('');
const botToken = ref('');
const handleRegisterShop = async () => {
  try {
    const apiResponse = await api.post<ICreateShopResponse>(
      '/shop/telegram/create-shop',
      createShopState
    );
    createShopState.id = apiResponse.data.id;
    supportToken.value = apiResponse.data.support_token;
    notify.success('Shop Successfully created');
    step.value = 2;
  } catch (err) {
    if (err instanceof AxiosError) notify.error(err.response?.data.detail);
  }
};

const handleVerifySupportAccount = async () => {
  try {
    await api.get(`/shop/telegram/${createShopState.id}/check-support-bot`);
    notify.success('Support Connection Verified');
    step.value = 3;
  } catch (err) {
    if (err instanceof AxiosError) notify.error(err.response?.data.detail);
  }
};

const handleRegisterTelegramBot = async () => {
  try {
    await api.post<IRegisterTelegramBotResponse>('/telegram', {
      bot_token: botToken.value,
    });
    notify.success('Telegram Bot Registered in Platfo');
    step.value = 4;
  } catch (err) {
    if (err instanceof AxiosError) notify.error(err.response?.data.detail);
  }
};
</script>

<template>
  <q-stepper class="full-height" v-model="step" vertical animated>
    <q-step
      :name="1"
      title="Register Shop Information"
      icon="settings"
      :done="step > 1"
    >
      <p>In this section, enter the Shop information you want create.</p>
      <div class="row q-col-gutter-lg q-mb-lg">
        <div class="col-12 col-md-6">
          <q-input
            v-model="createShopState.title"
            color="accent"
            label="Title"
            class="q-my-sm"
            filled
          />
          <q-input
            v-model="createShopState.category"
            color="accent"
            label="Category"
            class="q-my-sm"
            filled
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="createShopState.description"
            color="accent"
            type="textarea"
            label="Description"
            filled
          />
        </div>
      </div>

      <q-stepper-navigation>
        <q-btn
          :loading="loading"
          @click="handleRegisterShop"
          color="accent"
          label="Next"
          :disable="createShopState.description?.length! < 3 ||
  createShopState.title?.length! < 3 ||
  createShopState.category?.length! < 3"
        />
      </q-stepper-navigation>
    </q-step>
    <q-step
      :name="2"
      title="Support Account Connection"
      icon="key"
      :done="step > 2"
    >
      <p>
        You need to connect an account in order to receive all the events of
        your shop.
      </p>
      <p>To do this, please follow the steps below:</p>
      <ol>
        <li>
          <div>
            Search for
            <a
              href="https://t.me/Platfoshopsbot"
              target="_blank"
              class="text-bold"
              >@Platfoshopsbot</a
            >
            in Telegram or scan QR code with camera.
          </div>
          <div class="row justify-center full-width">
            <q-img
              src="~assets/platfoshopbot_qrcode.svg"
              style="max-width: 200px"
            ></q-img>
          </div>
        </li>
        <li>Click on the <span class="text-bold">"Start"</span> button</li>
        <li>
          Enter the code bellow to connect your Telegram account as a support
          account
          <div class="text-h2 full-width row justify-center q-my-lg">
            {{ supportToken }}
          </div>
        </li>
      </ol>

      <q-stepper-navigation>
        <q-btn
          @click="handleVerifySupportAccount"
          color="accent"
          label="Verify Connection"
        />
        <!--        <q-btn-->
        <!--          flat-->
        <!--          @click="step = 1"-->
        <!--          color="accent"-->
        <!--          label="Back"-->
        <!--          class="q-ml-sm"-->
        <!--        />-->
      </q-stepper-navigation>
    </q-step>
    <q-step
      :name="3"
      title="Telegram Bot Connection"
      icon="robot"
      :done="step > 3"
    >
      <p>Connect your shop to your telegram bot.</p>
      <p>To do this, please follow the steps below:</p>
      <ol>
        <li>
          <div>
            Search for in Telegram or scan QR code with camera.
            <a href="https://t.me/Botfather" target="_blank" class="text-bold"
              >@Botfather</a
            >
            in Telegram or scan QR code with camera.
          </div>
          <div class="row justify-center full-width">
            <q-img
              src="~assets/botfather_qrcode.svg"
              style="max-width: 200px"
            ></q-img>
          </div>
        </li>
        <li>
          Click on the <span class="text-bold">start</span> button & send
          <span class="text-bold">/newbot</span> in chat.
        </li>
        <li>
          Do the steps of creating bot, includes choosing a
          <span class="text-bold">name</span> and
          <span class="text-bold">username</span>.
        </li>
        <li>
          Enter <span class="text-bold">token</span> of your bot that telegram
          sent & click on <span class="text-bold">"Connect"</span>.
        </li>
      </ol>
      <div class="row q-mb-lg">
        <div class="col-12">
          <q-input
            type="text"
            label="Bot Token"
            color="accent"
            filled
            v-model="botToken"
          ></q-input>
        </div>
      </div>

      <q-stepper-navigation>
        <q-btn
          color="accent"
          label="Finish"
          :disable="botToken.length < 3"
          @click="handleRegisterTelegramBot"
        />
        <!--        <q-btn-->
        <!--          flat-->
        <!--          @click="step = 2"-->
        <!--          color="accent"-->
        <!--          label="Back"-->
        <!--          class="q-ml-sm"-->
        <!--        />-->
      </q-stepper-navigation>
    </q-step>
    <q-step :name="4" title="Success" icon="success">
      <div class="text-h5 q-my-lg">
        Congratulations, you have created a new shop
      </div>
      <q-btn
        color="accent"
        label="Back to shop list"
        :to="{ name: 'StoreListPage' }"
      />
    </q-step>
  </q-stepper>
</template>

<style scoped></style>
