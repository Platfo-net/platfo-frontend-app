<script setup lang="ts">
import BreadCrumbs from 'src/components/BreadCrumbs.vue';
import TelegramBotItem from 'src/components/bot/TelegramBotItem.vue';
import { ref } from 'vue';
import { isMobile } from 'src/utils'
import { useBotService } from 'src/services/useBotService.ts';
/** COMPONENT COMPOSABLES */
const botService = useBotService();
/************************ */

/** COMPONENT DEFINES */
type BotType = 'telegram' | 'instagram' | 'whatsapp';
type BotTabType = {
    title: string;
    botType: BotType;
    icon?: string;
}
const botTabs: BotTabType[] = [
    { botType: 'telegram', title: 'تلگرام', icon: 'telegram' },
    { botType: 'instagram', title: 'اینستگرام', icon: 'instagram' },
];
/******************** */

/** COMPONENT STATE */
const tab = ref('telegram');
const splitterModel = ref(20);
const { data: telegramBots, isLoading: telegramBotsIsLoading } = botService.telegram.queries.getBotList();
/****************** */

/** COMPONENT FUNCTIONS */
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
    <q-page class="q-pa-md container">
        <BreadCrumbs />
        <div class="row justify-between items-center q-mb-lg">
            <div class="text-h5">
                پلتفرم ها
            </div>
        </div>
        <q-card bordered flat>
            <q-splitter :horizontal="isMobile()" v-model="splitterModel" :limits="[20]" disable>
                <template v-slot:before>
                    <q-list>
                        <q-item v-for="link in botTabs" :key="link.botType" clickable v-ripple
                            :active="link.botType === tab" @click="tab = link.botType">
                            <q-item-section avatar>
                                <q-icon :name="link.icon" />
                            </q-item-section>
                            <q-item-section>{{ link.title }}</q-item-section>
                        </q-item>
                    </q-list>
                </template>
                <template v-slot:after>
                    <q-tab-panels v-model="tab">
                        <q-tab-panel name="telegram">
                            <div class="flex row justify-between q-mb-md">
                                <div class="text-h6">بات های تلگرام من</div>
                                <q-btn size="sm" color="dark" label="ثبت بات جدید در پلفتو" disable></q-btn>
                            </div>
                            <p class="text-body2">در این بخش، میتوانید بات های تلگرام خود را در پلتفو مدیریت کنید.</p>
                            <q-linear-progress v-if="telegramBotsIsLoading" stripe size="2px" indeterminate />
                            <template v-else>
                                <div v-if="!telegramBots?.length" class="text-h6 text-grey">
                                    شما باتی را به پلتفو متصل نکردید...
                                </div>
                                <template v-else>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-6" v-for="tbot in telegramBots" :key="tbot.id">
                                            <telegram-bot-item :bot="tbot"></telegram-bot-item>
                                        </div>
                                    </div>
                                </template>
                            </template>
                        </q-tab-panel>
                        <q-tab-panel name="instagram">
                            این بخش در حال حاضر از دسترس خارج است.
                        </q-tab-panel>
                    </q-tab-panels>
                </template>
            </q-splitter>
        </q-card>
    </q-page>
</template>

<style scoped></style>
