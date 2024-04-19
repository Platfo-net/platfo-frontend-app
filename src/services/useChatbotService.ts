import { useApi } from 'src/composables/use-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { Chatbot, ChatbotBaseType } from 'src/types';

export const useChatbotService = () => {
  const platfoApi = useApi();
  const queryClient = useQueryClient();

  const getChatbotList = async () => {
    const response = await platfoApi.api.get<Chatbot[]>(
      '/chatbot',
    );
    return response.data;
  };

  const createChatbot = async (dto: ChatbotBaseType) => {
    const response = await platfoApi.api.post<Chatbot>('/chatbot', {
      ...dto,
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
    queries: {
      getChatbotList: () => useQuery({
        queryKey: ['chatbotList'],
        queryFn: async () => await getChatbotList(),
        refetchOnWindowFocus: false,
      })
    },
    mutations: {
      createChatbot: () => useMutation({
        mutationKey: ['create-chatbot'],
        mutationFn: async (dto: ChatbotBaseType) => await createChatbot(dto),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['chatbotList'] })
        }
      })
    }
  };
};
