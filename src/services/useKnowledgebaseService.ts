import { useApi } from 'src/composables/use-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { Knowledgebase, KnowledgebaseBase } from 'src/types';
import { AxiosResponse } from 'axios';

export const useKnowledgebaseService = (chatbotId: string) => {
  const platfoApi = useApi();
  const queryClient = useQueryClient();

  const getKnowledgebaseList = async (chatbotId: string) => {
    const response = await platfoApi.api.get<Knowledgebase[]>(
      '/knowledge_base/all/' + chatbotId
    );
    return response.data;
  };

  // const getChatbot = async (chatbotId: string) => {
  //   const response = await platfoApi.api.get<Chatbot>(
  //     '/chatbot/' + chatbotId,
  //   );
  //   return response.data;
  // };

  const createKnowledgebase = async (dto: KnowledgebaseBase) => {
    const response = await platfoApi.api.post<Knowledgebase>(
      '/knowledge_base',
      {
        ...dto,
      }
    );
    return response.data;
  };

  const deleteKnowledgebase = async (knowledgebaseId: string) => {
    await platfoApi.api.delete('/knowledge_base/' + knowledgebaseId);
    return;
  };

  const updateKnowledgebase = async (
    knowledgebaseId: string,
    dto: KnowledgebaseBase
  ) => {
    const response = await platfoApi.api.put<
      Knowledgebase,
      AxiosResponse<Knowledgebase>,
      KnowledgebaseBase
    >('/knowledge_base/' + knowledgebaseId, {
      ...dto,
    });
    return response.data;
  };

  return {
    clientData: {
      cachedKnowledgebaseData: () =>
        queryClient.getQueryData<Knowledgebase[]>([
          'knowledgebaseList',
          { chatbotId },
        ]),
    },
    queries: {
      getKnowledgebaseList: () =>
        useQuery({
          queryKey: ['knowledgebaseList', { chatbotId }],
          queryFn: async () => await getKnowledgebaseList(chatbotId),
          refetchOnWindowFocus: false,
        }),
      // getChatbot: (chatbotId: string) => useQuery({
      //   queryKey: ['chatbot', { chatbotId }],
      //   queryFn: async () => await getChatbot(chatbotId),
      //   refetchOnWindowFocus: false,
      // })
    },
    mutations: {
      createKnowledgebase: () =>
        useMutation({
          mutationKey: ['create-knowledgebase'],
          mutationFn: async (dto: KnowledgebaseBase) =>
            await createKnowledgebase(dto),
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['knowledgebaseList', { chatbotId }],
            });
          },
        }),
      updateKnowledgebase: () =>
        useMutation({
          mutationKey: ['update-knowledgebase', { chatbotId }],
          mutationFn: async (dto: { id: string; putdata: KnowledgebaseBase }) =>
            await updateKnowledgebase(dto.id, {
              name: dto.putdata.name,
              source_link: dto.putdata.source_link,
              manual_input: dto.putdata.manual_input,
              // chatbot_id: dto.putdata.chatbot_id,
              // file_path: dto.putdata.file_path,
              // type: dto.putdata.type,
            }),
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['knowledgebaseList', { chatbotId }],
            });
          },
        }),
      deleteKnowledgebase: () =>
        useMutation({
          mutationKey: ['delete-knowledgebase'],
          mutationFn: async (knowledgeBaseId: string) =>
            await deleteKnowledgebase(knowledgeBaseId),
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['knowledgebaseList', { chatbotId }],
            });
          },
        }),
    },
  };
};
