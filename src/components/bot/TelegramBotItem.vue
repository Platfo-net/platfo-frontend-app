<script setup lang="ts">
import { useBotService } from 'src/services/useBotService';
import { TelegramBot } from 'src/types';
import { ref } from 'vue';

/** COMPONENT COMPOSABLES */
const props = defineProps<{
    bot: TelegramBot
}>();
const botService = useBotService();
/************************ */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT STATE */
const updateModel = ref<TelegramBot>({ ...props.bot });
const { mutateAsync: updateBotAsync, isPending: isUpdatingBot } = botService.telegram.mutations.updateBot(props.bot.id);
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
