import { useApi } from 'src/composables/use-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import {
  Chatbot,
  ChatbotBaseType,
  ChatbotConnectedTelegramBotsApiResponse,
  ChatbotCreditSubscriptionTransactionResponse,
  ChatbotSubscriptionPlansResponse,
  ChatbotCreditType,
} from 'src/types';
import { AxiosResponse } from 'axios';

export const useChatbotService = () => {
  const platfoApi = useApi();
  const queryClient = useQueryClient();

  const getChatbotList = async () => {
    const response = await platfoApi.api.get<Chatbot[]>('/chatbot');
    return response.data;
  };

  const getChatbot = async (chatbotId: string) => {
    const response = await platfoApi.api.get<Chatbot>('/chatbot/' + chatbotId);
    return response.data;
  };

  const createChatbot = async (dto: ChatbotBaseType) => {
    const response = await platfoApi.api.post<Chatbot>('/chatbot', {
      ...dto,
    });
    return response.data;
  };

  const deleteChatbot = async (chatbotId: string) => {
    await platfoApi.api.delete<Chatbot>('/chatbot/' + chatbotId);
    return;
  };

  const updateChatbot = async (chatbotId: string, dto: Chatbot) => {
    const response = await platfoApi.api.put<
      Chatbot,
      AxiosResponse<Chatbot>,
      ChatbotBaseType
    >('/chatbot/' + chatbotId, {
      name: dto.name,
      description: dto.description,
      user_id: dto.user_id,
      prompt: dto.prompt,
      temperature: dto.temperature,
    });
    return response.data;
  };

  return {
    clientData: {
      cachedChatbotData: (chatbotId: string) =>
        queryClient.getQueryData<Chatbot>(['chatbot', { chatbotId }]),
      chatbotList: queryClient.getQueryData<Chatbot[]>(['chatbotList']),
    },
    credit: {
      queries: {
        getChatbotCredit: () =>
          useQuery({
            queryKey: ['chatbot-credit'],
            queryFn: async () => {
              const response = await platfoApi.api.get<ChatbotCreditType>(
                '/chatbot-credit/credit'
              );
              return response.data;
            },
            retry: false,
            refetchOnWindowFocus: false,
          }),
        getChatbotCreditTransactions: (chatbotId: string) =>
          useQuery({
            queryKey: ['chatbot-credit-transactions', { chatbotId }],
            queryFn: async () => {
              const response =
                await platfoApi.api.get<ChatbotCreditSubscriptionTransactionResponse>(
                  '/chatbot-credit/' + chatbotId + '/transaction'
                );
              return response.data;
            },
            retry: false,
            refetchOnWindowFocus: false,
          }),
        getChatbotSubscriptionPlans: () =>
          useQuery({
            queryKey: ['chatbot-subscription-plans'],
            queryFn: async () => {
              const response =
                await platfoApi.api.get<ChatbotSubscriptionPlansResponse>(
                  '/chatbot-credit/plans'
                );
              return response.data;
            },
            refetchOnWindowFocus: false,
          }),
      },
      mutations: {
        buyPlan: (chatbotId: string) =>
          useMutation({
            mutationKey: ['buyPlan'],
            mutationFn: async (dto: { planId: string }) => {
              const response = await platfoApi.api.get(
                '/chatbot-credit/' +
                  chatbotId +
                  '/plans/' +
                  dto.planId +
                  '/buy?chatbot_plan_id=' +
                  dto.planId
              );
              return response.data;
            },
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['chatbot-credit', { chatbotId }],
              });
              queryClient.invalidateQueries({
                queryKey: ['chatbot-credit-transactions', { chatbotId }],
              });
            },
          }),
      },
    },
    bots: {
      telegram: {
        queries: {
          getConnectedBots: (chatbotId: string) =>
            useQuery({
              queryFn: async () => {
                const response =
                  await platfoApi.api.get<ChatbotConnectedTelegramBotsApiResponse>(
                    '/chatbot/' + chatbotId + '/telegram-bots'
                  );
                return response.data;
              },
              queryKey: ['chatbot-connected-telegram-bots', { chatbotId }],
              refetchOnWindowFocus: false,
              retry: false,
            }),
        },
        mutations: {
          registerBot: (chatbotId: string) =>
            useMutation({
              mutationKey: ['registerChatbot'],
              mutationFn: async (botId: string) => {
                const response = await platfoApi.api.post(
                  '/telegram-bot/' +
                    botId +
                    '/chatbot/' +
                    chatbotId +
                    '/connect',
                  {
                    chatbot_id: chatbotId,
                  }
                );
                return response.data;
              },
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ['chatbot-connected-telegram-bots', { chatbotId }],
                });
              },
            }),
          deleteBot: (chatbotId: string) =>
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
                  queryKey: ['chatbot-connected-telegram-bots', { chatbotId }],
                });
              },
            }),
        },
      },
    },
    queries: {
      getChatbotList: () =>
        useQuery({
          queryKey: ['chatbotList'],
          queryFn: async () => await getChatbotList(),
          refetchOnWindowFocus: false,
        }),
      getChatbot: (chatbotId: string) =>
        useQuery({
          queryKey: ['chatbot', { chatbotId }],
          queryFn: async () => await getChatbot(chatbotId),
          refetchOnWindowFocus: false,
        }),
    },
    mutations: {
      createChatbot: () =>
        useMutation({
          mutationKey: ['create-chatbot'],
          mutationFn: async (dto: ChatbotBaseType) => await createChatbot(dto),
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chatbotList'] });
          },
        }),
      updateChatbot: (chatbotId: string) =>
        useMutation({
          mutationKey: ['update-chatbot', { chatbotId }],
          mutationFn: async (dto: Chatbot) =>
            await updateChatbot(chatbotId, dto),
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['chatbot', { chatbotId }],
            });
          },
        }),
      deleteChatbot: (chatbotId: string) =>
        useMutation({
          mutationKey: ['delete-chatbot', { chatbotId }],
          mutationFn: async () => await deleteChatbot(chatbotId),
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['chatbot', { chatbotId }],
            });
          },
        }),
    },
  };
};
