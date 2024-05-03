<script setup lang="ts">
import { useBotService } from 'src/services/useBotService';
import { useChatbotService } from 'src/services/useChatbotService';
import { TelegramBot } from 'src/types';
import { ref } from 'vue';

/** COMPONENT COMPOSABLES */
const props = defineProps<{
    bot: TelegramBot;
    showBotConfig?: boolean;
}>();
const botService = useBotService();
const chatbotService = useChatbotService();
/************************ */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT STATE */
const updateModel = ref<TelegramBot>({ ...props.bot });
const { mutateAsync: updateBotAsync, isPending: isUpdatingBot } = botService.telegram.mutations.updateBot(props.bot.id);
const { data: chatbot, isLoading: chatbotIsLoading, isError: chatbotIsError, error: chatbotError } = botService.telegram.queries.getBotChatbot(props.bot.id);
const { data: chatbotList, isLoading: chatbotListLoading } = chatbotService.queries.getChatbotList();
const { mutateAsync: registerChatbotAsync } = botService.telegram.mutations.registerChatbot(props.bot.id);
const { mutateAsync: deleteChatbotAsync, isPending: chatbotIsDeleting } = botService.telegram.mutations.deleteChatbot(props.bot.id);
const showRegisterChatbot = ref(false)
const chatbotId = ref<string>();
/****************** */

/** COMPONENT FUNCTIONS */
const isFormChangedChanged = () => Object.keys(updateModel.value).some((x: string) => updateModel.value[x] !== props.bot[x]);
const handleSubmit = async () => {
    updateModel.value = await updateBotAsync(updateModel.value);
}
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
    <q-dialog v-model="showRegisterChatbot" @hide="chatbotId = undefined">
        <q-card style="min-width: 367px;">
            <q-form @submit.prevent="async () => {
        await registerChatbotAsync(chatbotId as string);
        showRegisterChatbot = false;
    }">
                <q-card-section class="text-body1">
                    ثبت چت بات
                    <q-select lazy-rules class="q-my-md"
                        :options="chatbotList?.map((x) => ({ label: x.name, value: x.uuid }))" outlined label="چت بات"
                        v-model="chatbotId" emit-value map-options :loading="chatbotListLoading">
                    </q-select>
                    <q-btn :disable="chatbotId === void 0" type="submit" color="primary" label="ثبت چت بات"
                        class="full-width"></q-btn>
                </q-card-section>
            </q-form>
        </q-card>
    </q-dialog>

    <q-card flat bordered class="bg-grey-12">
        <q-card flat>
            <q-card-section>
                <div class="row">
                    <div class="q-mr-md">
                        <q-img :src="updateModel.image_url" class="rounded-borders bg-grey-12" height="100px"
                            width="100px" style="border: 1px solid #e2e2e2;"></q-img>
                    </div>
                    <div>
                        <div class="q-mb-sm">
                            <div class="text-grey">
                                آیدی بات
                            </div>
                            <div dir="ltr">@{{ bot.username }}</div>
                        </div>
                        <div>
                            <div class="text-grey">
                                عنوان بات
                            </div>
                            <div>{{ bot.first_name }}</div>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
        <template v-if="showBotConfig">
            <q-expansion-item header-style="border-top: 1px solid #e2e2e2" header-class="text-body1" label="تنظیمات بات"
                class="bg-white">
                <q-form @submit.prevent="handleSubmit">
                    <q-item>
                        <q-input clearable class="bg-white full-width" outlined label="پیام خوش آمد گویی"
                            type="textarea" v-model="updateModel.welcome_message"></q-input>
                    </q-item>
                    <q-item><q-input clearable class="bg-white full-width" outlined label="عنوان دکمه" type="text"
                            v-model="updateModel.button_name"></q-input></q-item>
                    <q-item><q-input dir="ltr" clearable class="bg-white full-width" outlined label="لینک اپلیکیشن"
                            type="url" v-model="updateModel.app_link"></q-input></q-item>
                    <q-item><q-btn class="q-mb-md full-width" type="submit"
                            :color="isFormChangedChanged() ? 'primary' : 'grey'" :disable="!isFormChangedChanged()"
                            label="ذخیره تغییرات" :loading="isUpdatingBot"></q-btn></q-item>

                </q-form>
            </q-expansion-item>
            <q-expansion-item default-opened header-style="border-top: 1px solid #e2e2e2" header-class="text-body1"
                label="اتصال چت بات" class="bg-white">
                <q-linear-progress v-if="chatbotIsLoading" size="2px" indeterminate></q-linear-progress>
                <div v-if="chatbotIsError && chatbotError?.response.status === 404"
                    class="flex row items-center justify-between q-pa-md">
                    <div>چت باتی ثبت نشده است</div>
                    <q-btn @click="showRegisterChatbot = true" color="secondary">ثبت چت بات</q-btn>
                </div>
                <div v-else-if="chatbot" class="flex row items-center justify-between q-pa-md">
                    <div class="flex column">
                        <div class="text-grey-6 q-mb-sm">نام بات تلگرام</div>
                        <div class="text-body2">{{ chatbot.name }}</div>
                    </div>
                    <q-btn color="negative" @click="async () => {
        await deleteChatbotAsync();
        chatbot = undefined;
    }" round icon="delete" :loading="chatbotIsDeleting" flat>
                    </q-btn>
                </div>
            </q-expansion-item>
        </template>
    </q-card>
</template>

<style scoped></style>
