<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useApi } from 'src/composables/use-api';
import { IShop } from 'components/models';
import { useNotify } from 'src/composables/use-notify';
import { ICreateShopResponse } from 'src/composables/types';
// import { AxiosError } from 'axios';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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
    notify.success(
      t(
        'pages.panel.dashboard.createNewStorePage.notifications.createShopSuccess'
      )
    );
    step.value = 2;
  } catch (err) {
    // if (err instanceof AxiosError) notify.error(err.response?.data.detail);
    notify.error(
      t(
        'pages.panel.dashboard.createNewStorePage.notifications.createShopError'
      )
    );
  }
};

const handleVerifySupportAccount = async () => {
  try {
    await api.get(`/shop/telegram/${createShopState.id}/check-support-bot`);
    notify.success(
      t(
        'pages.panel.dashboard.createNewStorePage.notifications.supportConnectionSuccess'
      )
    );
    step.value = 3;
  } catch (err) {
    // if (err instanceof AxiosError) notify.error(err.response?.data.detail);
    notify.error(
      t(
        'pages.panel.dashboard.createNewStorePage.notifications.supportConnectionError'
      )
    );
  }
};

const handleRegisterTelegramBot = async () => {
  try {
    await api.post<string>('/shop/telegram/connect-bot', {
      bot_token: botToken.value,
      shop_id: createShopState.id,
    });
    notify.success(
      t(
        'pages.panel.dashboard.createNewStorePage.notifications.telegramShopRegisterSuccess'
      )
    );
    step.value = 4;
  } catch (err) {
    // if (err instanceof AxiosError) notify.error(err.response?.data.detail);
    notify.error(
      t(
        'pages.panel.dashboard.createNewStorePage.notifications.telegramShopRegisterError'
      )
    );
  }
};
</script>

<template>
  <q-stepper class="full-height" v-model="step" vertical animated>
    <q-step
      :name="1"
      :title="
        $t(
          'pages.panel.dashboard.createNewStorePage.steps.shopInformation.title'
        )
      "
      icon="settings"
      :done="step > 1"
    >
      <p>
        {{
          $t(
            'pages.panel.dashboard.createNewStorePage.steps.shopInformation.description'
          )
        }}
      </p>
      <div class="row q-col-gutter-lg q-mb-lg">
        <div class="col-12 col-md-6">
          <q-input
            v-model="createShopState.title"
            color="accent"
            :label="
              $t(
                'pages.panel.dashboard.createNewStorePage.steps.shopInformation.fields.title'
              )
            "
            class="q-my-sm"
            filled
          />
          <q-input
            v-model="createShopState.category"
            color="accent"
            :label="
              $t(
                'pages.panel.dashboard.createNewStorePage.steps.shopInformation.fields.category'
              )
            "
            class="q-my-sm"
            filled
          />
        </div>
        <div class="col-12 col-md-6">
          <q-input
            v-model="createShopState.description"
            color="accent"
            type="textarea"
            :label="
              $t(
                'pages.panel.dashboard.createNewStorePage.steps.shopInformation.fields.description'
              )
            "
            filled
          />
        </div>
      </div>

      <q-stepper-navigation>
        <q-btn
          :loading="loading"
          @click="handleRegisterShop"
          color="accent"
          :label="$t('general.nextStep')"
          :disable="
  createShopState.title?.length! < 3 ||
  createShopState.category?.length! < 3"
        />
      </q-stepper-navigation>
    </q-step>
    <q-step
      :name="2"
      :title="
        $t(
          'pages.panel.dashboard.createNewStorePage.steps.supportAccountConnection.title'
        )
      "
      icon="key"
      :done="step > 2"
    >
      <p>
        {{
          $t(
            'pages.panel.dashboard.createNewStorePage.steps.supportAccountConnection.description'
          )
        }}
      </p>
      <p>
        {{
          $t(
            'pages.panel.dashboard.createNewStorePage.steps.supportAccountConnection.howto'
          )
        }}
      </p>
      <ol>
        <li>
          <div>
            {{
              $t(
                'pages.panel.dashboard.createNewStorePage.steps.supportAccountConnection.step1.part1'
              )
            }}
            <a
              href="https://t.me/Platfoshopsbot"
              target="_blank"
              class="text-bold"
              dir="ltr"
              >@Platfoshopsbot</a
            >
            {{
              $t(
                'pages.panel.dashboard.createNewStorePage.steps.supportAccountConnection.step1.part2'
              )
            }}
          </div>
          <div class="row justify-center full-width">
            <q-img
              src="~assets/platfoshopbot_qrcode.svg"
              style="max-width: 200px"
            ></q-img>
          </div>
        </li>
        <li>
          {{
            $t(
              'pages.panel.dashboard.createNewStorePage.steps.supportAccountConnection.step2.part1'
            )
          }}
          <span class="text-bold">"Start"</span>
          {{
            $t(
              'pages.panel.dashboard.createNewStorePage.steps.supportAccountConnection.step2.part2'
            )
          }}
        </li>
        <li>
          {{
            $t(
              'pages.panel.dashboard.createNewStorePage.steps.supportAccountConnection.step3.part1'
            )
          }}
          <div class="text-h2 full-width row justify-center q-my-lg">
            {{ supportToken }}
          </div>
        </li>
      </ol>

      <q-stepper-navigation>
        <q-btn
          @click="handleVerifySupportAccount"
          color="accent"
          :label="
            $t(
              'pages.panel.dashboard.createNewStorePage.steps.supportAccountConnection.verifyConnection'
            )
          "
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
      :title="
        $t(
          'pages.panel.dashboard.createNewStorePage.steps.telegramBotConnection.title'
        )
      "
      icon="robot"
      :done="step > 3"
    >
      <p>
        {{
          $t(
            'pages.panel.dashboard.createNewStorePage.steps.telegramBotConnection.description'
          )
        }}
      </p>
      <p>
        {{
          $t(
            'pages.panel.dashboard.createNewStorePage.steps.telegramBotConnection.howto'
          )
        }}
      </p>
      <ol>
        <li>
          <div>
            {{
              $t(
                'pages.panel.dashboard.createNewStorePage.steps.telegramBotConnection.step1.part1'
              )
            }}
            <a href="https://t.me/Botfather" target="_blank" class="text-bold"
              >@Botfather</a
            >
            {{
              $t(
                'pages.panel.dashboard.createNewStorePage.steps.telegramBotConnection.step1.part2'
              )
            }}
          </div>
          <div class="row justify-center full-width">
            <q-img
              src="~assets/botfather_qrcode.svg"
              style="max-width: 200px"
            ></q-img>
          </div>
        </li>
        <li>
          {{
            $t(
              'pages.panel.dashboard.createNewStorePage.steps.telegramBotConnection.step2.part1'
            )
          }}
          <span class="text-bold">start</span>
          {{
            $t(
              'pages.panel.dashboard.createNewStorePage.steps.telegramBotConnection.step2.part2'
            )
          }}
          <span class="text-bold" dir="ltr">/newbot</span>
          {{
            $t(
              'pages.panel.dashboard.createNewStorePage.steps.telegramBotConnection.step2.part3'
            )
          }}
        </li>
        <li>
          {{
            $t(
              'pages.panel.dashboard.createNewStorePage.steps.telegramBotConnection.step3.part1'
            )
          }}
        </li>
        <li>
          {{
            $t(
              'pages.panel.dashboard.createNewStorePage.steps.telegramBotConnection.step4.part1'
            )
          }}
        </li>
      </ol>
      <div class="row q-mb-lg">
        <div class="col-12">
          <q-input
            type="text"
            :label="
              $t(
                'pages.panel.dashboard.createNewStorePage.steps.telegramBotConnection.step4.fields.botToken'
              )
            "
            color="accent"
            filled
            v-model="botToken"
          ></q-input>
        </div>
      </div>

      <q-stepper-navigation>
        <q-btn
          color="accent"
          :label="
            $t(
              'pages.panel.dashboard.createNewStorePage.steps.telegramBotConnection.step4.finish'
            )
          "
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
    <q-step
      :name="4"
      :title="
        $t('pages.panel.dashboard.createNewStorePage.steps.success.title')
      "
      icon="success"
    >
      <div class="text-h5 q-my-lg">
        {{
          $t(
            'pages.panel.dashboard.createNewStorePage.steps.success.description'
          )
        }}
      </div>
      <q-btn
        color="accent"
        :label="
          $t(
            'pages.panel.dashboard.createNewStorePage.steps.success.backToShopList'
          )
        "
        :to="{ name: 'StoreListPage' }"
      />
    </q-step>
  </q-stepper>
</template>

<style scoped></style>
