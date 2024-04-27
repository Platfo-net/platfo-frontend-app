import { useApi } from 'src/composables/use-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { TelegramBot } from 'src/types';

export const useBotService = () => {
  const platfoApi = useApi();
  const queryClient = useQueryClient();

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
      },
      mutations: {
        updateBot: (botId: string) =>
          useMutation({
            mutationFn: async (bot: TelegramBot) => {
              const file = bot.image as File;
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
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['telegramBotList'],
              });
            },
          }),
      },
    },
  };
};
