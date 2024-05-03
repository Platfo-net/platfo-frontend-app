<script setup lang="ts">
import BreadCrumbs from 'src/components/BreadCrumbs.vue';
import TelegramBotItem from 'src/components/bot/TelegramBotItem.vue';
import { computed, h, reactive, ref } from 'vue';
import { isMobile } from 'src/utils'
import { useBotService } from 'src/services/useBotService.ts';
import { ifError } from 'assert';
import { useQuasar } from 'quasar';

/** COMPONENT COMPOSABLES */
const botService = useBotService();
const $q = useQuasar();
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
// const createBotSteps = [
//     {
//         id: 'bot_token',
//         title: 'توکن بات',
//         step: 1,
//     },
//     {
//         id: 'verify_bot_details',
//         title: 'تایید اطلاعات بات',
//         step: 2,
//     },
// ];
/******************** */

/** COMPONENT STATE */
const createTelegramBotToken = ref('');
const isEnabledGetTelegramBotInformation = computed(() => createTelegramBotToken.value.length > 0);
const showCreateTelegramBot = ref(false);
const tab = ref('telegram');
const splitterModel = ref(20);
const { data: telegramBots, isLoading: telegramBotsIsLoading } = botService.telegram.queries.getBotList();
const { data: botInformation, isFetching: botInformationIsFetching, error: botInformationError, isError: botInformationIsError, refetch } = botService.telegram.queries.getBotInformation(createTelegramBotToken, isEnabledGetTelegramBotInformation);
const { mutateAsync: addTelegramBotAsync, isPending: isAddingTelegramBot } = botService.telegram.mutations.addBot();
/****************** */

/** COMPONENT FUNCTIONS */
const handleAddTelegramBot = async () => {
    try {
        await addTelegramBotAsync(createTelegramBotToken.value);
        createTelegramBotToken.value = '';
        $q.notify({
            color: 'positive',
            message: 'بات با موفقیت اضافه شد',
        });
        showCreateTelegramBot.value = false;
    } catch (err) {
        $q.notify({
            color: 'negative',
            message: 'افزودن بات با خطا مواجه شد',
        });
    }
}
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
    <q-dialog v-model="showCreateTelegramBot">
        <q-card style="min-width: 327px;">
            <q-card-section>
                <q-input debounce="500" dir="ltr" class="bg-white full-width" outlined label="توکن بات" type="url"
                    v-model="createTelegramBotToken" @update:model-value="refetch()"></q-input>
                <div class="q-mt-sm flex column items-center justify-center">
                    <q-linear-progress v-if="botInformationIsFetching" indeterminate size="2px"></q-linear-progress>
                    <div class="q-mt-sm">
                        <span v-if="botInformationIsFetching">در حال دریافت اطلاعات بات</span>
                        <span v-else-if="botInformationIsError && botInformationError.response.status === 404">باتی
                            با توکن داده شده یافت نشد</span>
                        <div v-else-if="botInformation" class="flex column">
                            <telegram-bot-item :bot="botInformation"></telegram-bot-item>
                            <q-btn class="q-mt-md" color="primary" @click="handleAddTelegramBot"
                                :loading="isAddingTelegramBot">ثبت بات</q-btn>
                        </div>
                        <span v-else>لطفاٌ توکن بات را وارد کنید</span>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
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
                    <q-list v-if="!isMobile()">
                        <q-item v-for="link in botTabs" :key="link.botType" clickable v-ripple
                            :active="link.botType === tab" @click="tab = link.botType">
                            <q-item-section avatar>
                                <q-icon :name="link.icon" />
                            </q-item-section>
                            <q-item-section>{{ link.title }}</q-item-section>
                        </q-item>
                    </q-list>
                    <q-tabs v-model="tab" v-else>
                        <q-tab v-for="link in botTabs" :key="link.botType" :label="link.title"
                            :name="link.botType"></q-tab>
                    </q-tabs>
                </template>
                <template v-slot:after>
                    <q-tab-panels v-model="tab">
                        <q-tab-panel name="telegram">
                            <div class="flex row justify-between q-mb-md">
                                <div class="text-h6">بات های تلگرام من</div>
                                <q-btn @click="showCreateTelegramBot = true" size="sm" color="dark"
                                    label="ثبت بات جدید در پلفتو"></q-btn>
                            </div>
                            <p class="text-body2">در این بخش، میتوانید بات های تلگرام خود را در پلتفو مدیریت کنید.</p>
                            <q-linear-progress v-if="telegramBotsIsLoading" size="2px" indeterminate />
                            <template v-else>
                                <div v-if="!telegramBots?.length" class="text-h6 text-grey">
                                    شما باتی را به پلتفو متصل نکردید...
                                </div>
                                <template v-else>
                                    <div class="row q-col-gutter-md">
                                        <div class="col-12 col-md-6" v-for="tbot in telegramBots" :key="tbot.id">
                                            <telegram-bot-item :bot="tbot" :show-bot-config="true"></telegram-bot-item>
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
