import { useApi } from 'src/composables/use-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { Chatbot, TelegramBot } from 'src/types';
import { MaybeRefOrGetter, Ref } from 'vue';

export const useBotService = () => {
  const platfoApi = useApi();
  const queryClient = useQueryClient();

  const invalidateTelegramBotList = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['telegramBotList'],
    });
  };

  return {
    telegram: {
      queries: {
        getBotList: () =>
          useQuery({
            queryKey: ['telegramBotList'],
            queryFn: async () => {
              const response = await platfoApi.api.get<TelegramBot[]>(
                '/telegram/all'
              );
              return response.data;
            },
          }),
        getBotChatbot: (botId: string) =>
          useQuery({
            queryKey: ['telegramBotChatbot', { botId }],
            queryFn: async () => {
              const response = await platfoApi.api.get<Chatbot>(
                '/telegram-bot/' + botId + '/chatbot'
              );
              return response.data;
            },
            retry: false,
          }),
        getBotInformation: (
          botToken: Ref<string>,
          enabled?: MaybeRefOrGetter<boolean>
        ) =>
          useQuery({
            queryKey: ['telegramBotInformation', botToken.value],
            queryFn: async () => {
              const response = await platfoApi.api.get<TelegramBot>(
                'telegram/me?token=' + botToken.value
              );
              return response.data;
            },
            enabled,
            retry: false,
          }),
      },
      mutations: {
        addBot: () =>
          useMutation({
            mutationKey: ['addTelegramBot'],
            mutationFn: async (bot_token: string) => {
              const response = await platfoApi.api.post<TelegramBot>(
                '/telegram',
                {
                  bot_token,
                }
              );
              return response.data;
            },
            onSuccess: async () => {
              await invalidateTelegramBotList();
            },
          }),
        updateBot: (botId: string) =>
          useMutation({
            mutationFn: async (bot: TelegramBot) => {
              // const file = bot.image as File;
              const response = await platfoApi.api.put<TelegramBot>(
                `/telegram/${botId}`,
                {
                  welcome_message: bot.welcome_message,
                  button_name: bot.button_name,
                  app_link: bot.app_link,
                  // image: await file.text(),
                }
              );
              return response.data;
            },
            onSuccess: async () => {
              await invalidateTelegramBotList();
            },
          }),
        deleteBot: (botId: string) =>
          useMutation({
            mutationFn: async () => {
              const response = await platfoApi.api.delete('/telegram/' + botId);
              return response.data;
            },
            mutationKey: ['delete-telegram-bot', { botId }],
            onSuccess: async () => {
              await invalidateTelegramBotList();
            },
          }),
        registerChatbot: (botId: string) =>
          useMutation({
            mutationKey: ['registerChatbot'],
            mutationFn: async (chatbotId: string) => {
              const response = await platfoApi.api.post(
                '/telegram-bot/' + botId + '/chatbot/' + chatbotId + '/connect',
                {
                  chatbot_id: chatbotId,
                }
              );
              return response.data;
            },
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['telegramBotChatbot', { botId }],
              });
            },
          }),
        deleteChatbot: (botId: string) =>
          useMutation({
            mutationKey: ['deleteChatbot'],
            mutationFn: async (dto: { botId: string; chatbotId: string }) => {
              const response = await platfoApi.api.delete(
                '/telegram-bot/' +
                  dto.botId +
                  '/chatbot/' +
                  dto.chatbotId +
                  '/disconnect'
              );
              return response.data;
            },
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['telegramBotChatbot', { botId }],
              });
            },
          }),
      },
    },
  };
};
