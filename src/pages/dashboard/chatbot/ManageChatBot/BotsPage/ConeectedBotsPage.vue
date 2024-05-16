<script setup lang="ts">
import { TelegramBot } from 'src/types';
import { useChatbotService } from 'src/services/useChatbotService';
import { useRoute } from 'vue-router';
const props = defineProps<{
  id: string;
  username: string;
}>();
const route = useRoute();
const chatbotService = useChatbotService();
const {
  mutateAsync: deleteConnectedTelegramBot,
  isPending: deleteConnectedTelegramBotIsPending,
} = chatbotService.bots.telegram.mutations.deleteBot(
  route.params.chatbotId as string
);
// const { id, username } = props.botProp;
console.log(props.id);
console.log(props.username);

// const {
//   data: connectedTelegramBots,
//   isLoading: connectedTelegramBotsIsLoading,
// } = chatbotService.bots.telegram.queries.getConnectedBots(
//   route.params.chatbotId as string
// );
</script>
<template>
  <q-card bordered flat>
    <q-card-section>
      <div class="flex row justify-between items-center">
        <div>نام بات</div>
        <div>
          {{ props.username }}
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-btn
        @click="
          async () => {
            await deleteConnectedTelegramBot({
              botId: props.id,
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
  </q-card>
</template>
