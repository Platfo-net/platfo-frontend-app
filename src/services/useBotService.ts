import { useApi } from 'src/composables/use-api';
import { useQuery } from '@tanstack/vue-query';
import { TelegramBot } from 'src/types';

export const useBotService = () => {
  const platfoApi = useApi();
  //   const queryClient = useQueryClient();

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
    },
  };
};
