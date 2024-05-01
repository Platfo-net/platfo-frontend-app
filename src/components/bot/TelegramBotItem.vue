<script setup lang="ts">
import { useBotService } from 'src/services/useBotService';
import { useChatbotService } from 'src/services/useChatbotService';
import { TelegramBot } from 'src/types';
import { ref } from 'vue';

/** COMPONENT COMPOSABLES */
const props = defineProps<{
    bot: TelegramBot
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
const { mutateAsync: deleteChatbotAsync } = botService.telegram.mutations.deleteChatbot(props.bot.id);
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
    <q-form @submit.prevent="handleSubmit">
        <q-card flat bordered class="bg-grey-12">
            <q-card flat>
                <q-card-section class="text-body1">
                    اطلاعات بات
                </q-card-section>
                <q-card-section>
                    <div class="row">
                        <div class="q-mr-md">
                            <q-img :src="updateModel.image_url" class="rounded-borders bg-grey-12" height="100px"
                                width="100px" style="border: 1px solid #e2e2e2;"></q-img>
                        </div>
                        <div>
                            <div class="q-mb-sm">
                                <div class="text-grey">
                                    یوزرنیم
                                </div>
                                <div>{{ bot.username }}</div>
                            </div>
                            <div>
                                <div class="text-grey">
                                    نام
                                </div>
                                <div>{{ bot.first_name }}</div>
                            </div>
                        </div>
                    </div>
                </q-card-section>
                <q-card-section>
                </q-card-section>
            </q-card>
            <q-card flat bordered>
                <q-card-section class="text-body1">
                    تنظیمات بات
                </q-card-section>
                <q-card-section>
                    <q-input clearable class="bg-white" outlined label="پیام خوش آمد گویی" type="textarea"
                        v-model="updateModel.welcome_message"></q-input>
                </q-card-section>
                <q-card-section>
                    <q-input clearable class="bg-white" outlined label="عنوان دکمه" type="text"
                        v-model="updateModel.button_name"></q-input>
                </q-card-section>
                <q-card-section>
                    <q-input dir="ltr" clearable class="bg-white" outlined label="لینک اپلیکیشن" type="url"
                        v-model="updateModel.app_link"></q-input>
                </q-card-section>
                <q-expansion-item default-opened header-class="text-body1" label="چت بات"
                    style="border-top: 1px solid #e2e2e2; border-bottom: 1px solid #e2e2e2;">
                    <q-linear-progress v-if="chatbotIsLoading" size="2px" indeterminate></q-linear-progress>
                    <q-item v-if="chatbotIsError && chatbotError?.response.status === 404">
                        <q-item-section>چت باتی ثبت نشده است</q-item-section>
                        <q-item-section>
                            <q-btn @click="showRegisterChatbot = true" color="secondary">ثبت چت بات</q-btn>
                        </q-item-section>
                    </q-item>
                    <q-item v-else-if="chatbot">
                        <q-list>
                            <q-item>
                                <q-item-section class="text-bold">نام</q-item-section>
                                <q-item-section>{{ chatbot.name }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-item-section class="text-bold">تمپرچر</q-item-section>
                                <q-item-section>{{ chatbot.temperature }}</q-item-section>
                            </q-item>
                            <q-item>
                                <q-btn round size="sm" icon='delete' rounded color="negative" @click="async () => {
        await deleteChatbotAsync();
        chatbot = undefined;
    }"></q-btn>
                                <q-item-section class="text-bold"></q-item-section>
                            </q-item>
                        </q-list>
                    </q-item>
                </q-expansion-item>
                <!-- <q-card-section>
                    <q-file clearable class="bg-white" outlined label="عکس بات" type="file" v-model="updateModel.image">
                        <template v-slot:prepend>
                            <q-icon name="attach_file" />
                        </template>
</q-file>
</q-card-section> -->
            </q-card>
            <q-card-section class="row justify-end">
                <q-btn type="submit" size="sm" :color="isFormChangedChanged() ? 'primary' : 'grey'"
                    :disable="!isFormChangedChanged()" label="ذخیره تغییرات" :loading="isUpdatingBot"></q-btn>
            </q-card-section>
        </q-card>
    </q-form>
</template>

<style scoped></style>
