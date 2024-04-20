import { useApi } from 'src/composables/use-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { Chatbot, ChatbotBaseType } from 'src/types';
import { AxiosResponse } from 'axios';

export const useChatbotService = () => {
  const platfoApi = useApi();
  const queryClient = useQueryClient();

  const getChatbotList = async () => {
    const response = await platfoApi.api.get<Chatbot[]>(
      '/chatbot',
    );
    return response.data;
  };

  const getChatbot = async (chatbotId: string) => {
    const response = await platfoApi.api.get<Chatbot>(
      '/chatbot/' + chatbotId,
    );
    return response.data;
  };

  const createChatbot = async (dto: ChatbotBaseType) => {
    const response = await platfoApi.api.post<Chatbot>('/chatbot', {
      ...dto,
    });
    return response.data;
  }

  const updateChatbot = async (chatbotId: string, dto: Chatbot) => {
    const response = await platfoApi.api.put<Chatbot, AxiosResponse<Chatbot>, ChatbotBaseType>('/chatbot/' + chatbotId, {
      name: dto.name,
      description: dto.description,
      user_id: dto.user_id,
    });
    return response.data;
  }

  // const createChatbot = async () => {
  //   const response = await platfoApi.api.get<Chatbot[]>(
  //     '/chatbot/',
  //   );
  //   return response.data;
  // };

  return {
    clientData: {
      cachedChatbotData: (chatbotId: string) => queryClient.getQueryData<Chatbot>(['chatbot', { chatbotId }]),
    },
    queries: {
      getChatbotList: () => useQuery({
        queryKey: ['chatbotList'],
        queryFn: async () => await getChatbotList(),
        refetchOnWindowFocus: false,
      }),
      getChatbot: (chatbotId: string) => useQuery({
        queryKey: ['chatbot', { chatbotId }],
        queryFn: async () => await getChatbot(chatbotId),
        refetchOnWindowFocus: false,
      })
    },
    mutations: {
      createChatbot: () => useMutation({
        mutationKey: ['create-chatbot'],
        mutationFn: async (dto: ChatbotBaseType) => await createChatbot(dto),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['chatbotList'] })
        },
      }),
      updateChatbot: (chatbotId: string) => useMutation({
        mutationKey: ['update-chatbot', { chatbotId }],
        mutationFn: async (dto: Chatbot) => await updateChatbot(chatbotId, dto),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['chatbot', { chatbotId }] })
        },
      })
    }
  };
};
