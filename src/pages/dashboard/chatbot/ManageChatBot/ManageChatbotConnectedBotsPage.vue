<script setup lang="ts">
import ConnectedBotsPage from './BotsPage/ConeectedBotsPage.vue';
import { useBotService } from 'src/services/useBotService';
import { useChatbotService } from 'src/services/useChatbotService';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

/** COMPONENT COMPOSABLES */
const route = useRoute();
const chatbotService = useChatbotService();
const botService = useBotService();
/************************ */

/** COMPONENT DEFINES */
type CreditSectionTabLink = {
  id: string;
  title: string;
  icon?: string;
  children?: CreditSectionTabLink[];
};
const creditSections: CreditSectionTabLink[] = [
  { id: 'connected_telegram_bots', title: 'بات های تلگرام', icon: 'telegram' },
  {
    id: 'connected_instagram_bots',
    title: 'بات های اینستگرام',
    icon: 'instagram',
  },
];
/******************** */

/** COMPONENT STATE */
const showBotsDrawer = ref(false);
const showTelegramBotsList = ref(false);
const selectedBotToAdd = ref<string>('');
const manageCreditSection = ref<string>('connected_telegram_bots');
// const botProp = ref({});
// const loadingProp = ref(false);
// const chatbotIdProp = ref('');
// const botIdProp = ref('');

const {
  data: connectedTelegramBots,
  isLoading: connectedTelegramBotsIsLoading,
} = chatbotService.bots.telegram.queries.getConnectedBots(
  route.params.chatbotId as string
);
// const {
//   mutateAsync: deleteConnectedTelegramBot,
//   isPending: deleteConnectedTelegramBotIsPending,
// } = chatbotService.bots.telegram.mutations.deleteBot(
//   route.params.chatbotId as string
// );
const {
  mutateAsync: registerTelegramBot,
  isPending: registerTelegramBotIsPending,
} = chatbotService.bots.telegram.mutations.registerBot(
  route.params.chatbotId as string
);

const { data: telegramBots, isLoading: telegramBotsIsLoading } =
  botService.telegram.queries.getBotList();
/****************** */

/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-dialog v-model="showTelegramBotsList">
    <q-card flat bordered style="min-width: 275px">
      <!-- <q-card-section style="border-bottom: 1px solid #e2e2e2;">
                لیست بات های تلگرام
            </q-card-section> -->
      <q-card-section>
        <q-select
          lazy-rules
          class="q-my-md"
          :options="
            telegramBots?.map((x) => ({ label: x.first_name, value: x.id }))
          "
          outlined
          label="بات"
          v-model="selectedBotToAdd"
          emit-value
          map-options
          :loading="telegramBotsIsLoading"
        >
        </q-select>
        <q-btn
          unelevated
          :disable="!selectedBotToAdd.length"
          type="submit"
          color="green-1"
          text-color="green"
          label="متصل کن"
          class="full-width"
          @click="
            async () => {
              await registerTelegramBot(selectedBotToAdd);
              showTelegramBotsList = false;
              selectedBotToAdd = '';
            }
          "
          :loading="registerTelegramBotIsPending"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-card flat bordered>
    <q-layout
      container
      style="min-height: 800px; max-height: 800px"
      view="hHh lpR fFf"
    >
      <q-header bordered class="bg-white text-primary" height-hint="98">
        <q-toolbar>
          <div class="flex row justify-between items-center full-width">
            <q-btn
              flat
              :icon="showBotsDrawer ? 'chevron_right' : 'chevron_left'"
              :label="showBotsDrawer ? 'بستن منو' : 'منو'"
              @click="showBotsDrawer = !showBotsDrawer"
            />
            <div class="text-body1">بات های متصل</div>
          </div>
          <!-- <q-toolbar-title>مدیریت اعتبار</q-toolbar-title> -->
        </q-toolbar>
      </q-header>
      <q-drawer
        class="flex column justify-between q-pa-md overflow-auto"
        show-if-above
        v-model="showBotsDrawer"
        side="left"
        bordered
      >
        <q-list dense>
          <template v-for="section in creditSections" :key="section.id">
            <q-expansion-item
              :default-opened="
                section.children.map((x) => x.id).includes(manageCreditSection)
              "
              dense
              v-if="section.children !== void 0"
              :label="section.title"
            >
              <q-list dense>
                <q-item
                  clickable
                  v-ripple
                  @click="manageCreditSection = sectionChildren.id"
                  :active="manageCreditSection === sectionChildren.id"
                  active-class="bg-grey-3"
                  v-for="sectionChildren in section.children"
                  :key="sectionChildren.id"
                  class="q-pl-md"
                >
                  <q-item-section>{{ sectionChildren.title }}</q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-item
              class="q-ma-sm rounded-borders"
              @click="manageCreditSection = section.id"
              :active="manageCreditSection === section.id"
              active-class="bg-blue-1 text-blue"
              clickable
              v-ripple
              v-else
            >
              <q-item-section>{{ section.title }}</q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-drawer>
      <q-page-container>
        <q-page class="q-pa-md">
          <q-tab-panels v-model="manageCreditSection">
            <q-tab-panel name="connected_telegram_bots">
              <div class="text-body1">بات های تلگرام</div>
              <p>
                در این بخش، شما میتوانید بات های تلگرامی خود را که در بخش
                <router-link :to="{ name: 'BotListPage' }"
                  >پلتفرم ها</router-link
                >
                اضافه کردید را به این چت بات متصل کنید.
              </p>
              <div v-if="connectedTelegramBotsIsLoading">
                <q-linear-progress size="2px" indeterminate></q-linear-progress>
              </div>
              <div
                v-else-if="
                  !connectedTelegramBots || !connectedTelegramBots.length
                "
                class="row"
              >
                <div class="col-12 col-md-2">
                  <div
                    class="bg-green-1 full-height cursor-pointer rounded-borders flex column items-center justify-center full-height"
                    @click="showTelegramBotsList = true"
                  >
                    <q-icon name="add" size="lg" color="green"></q-icon>
                    <div class="text-green">اتصال بات</div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="row q-col-gutter-md">
                  <div
                    v-for="bot in connectedTelegramBots"
                    class="col-12 col-md-4"
                    :key="bot.uuid"
                  >
                    <!-- <q-card bordered flat>
                      <q-card-section>
                        <div class="flex row justify-between items-center">
                          <div>نام بات</div>
                          <div>
                            {{ bot.username }}
                          </div>
                        </div>
                      </q-card-section>
                      <q-card-section>
                        <q-btn
                          @click="
                            async () => {
                              await deleteConnectedTelegramBot({
                                botId: bot.uuid,
                                chatbotId: route.params.chatbotId as string,
                              });
                            }
                          "
                          color="red-1"
                          text-color="red"
                          label="حذف اتصال"
                          unelevated
                          class="full-width"
                          :loading="deleteConnectedTelegramBotIsPending"
                        ></q-btn>
                      </q-card-section>
                    </q-card> -->
                    <ConnectedBotsPage
                      :id = "bot.uuid"
                      :username = "bot.username"
                    />
                  </div>
                  <div class="col-12 col-md-2">
                    <div
                      class="bg-green-1 full-height cursor-pointer rounded-borders flex column items-center justify-center full-height"
                      @click="showTelegramBotsList = true"
                    >
                      <q-icon name="add" size="lg" color="green"></q-icon>
                      <div class="text-green">اتصال بات</div>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="connected_instagram_bots">
              این بخش در حال حاضر از دسترس خارج است.
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-card>
  <!-- <q-card flat bordered>
  </q-card> -->
</template>

<style scoped></style>
