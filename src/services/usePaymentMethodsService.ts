import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useApi } from 'src/composables/use-api';
import { PaymentMethodInformationFields, PaymentMethodType } from 'src/types';

const usePaymentMethodsService = () => {
  const platfoApi = useApi();
  const queryClient = useQueryClient();
  const getAll = async (shopId: string) => {
    const response = await platfoApi.api.get<PaymentMethodType[]>(
      `/shop/payment-methods/${shopId}/all`
    );
    return response.data;
  };
  const updateInformation = async (id: string, information: unknown) => {
    const response = await platfoApi.api.put(
      `/shop/payment-methods/${id}/fill-data`,
      {
        information,
      }
    );
    return response.data;
  };
  return {
    queries: {
      getAll: (shopId: string) =>
        useQuery({
          queryFn: async () => await getAll(shopId),
          queryKey: ['payment-methods', { shopId }],
        }),
    },
    mutations: {
      updateInformation: (shopId: string) =>
        useMutation({
          mutationFn: async (data: {
            id: string;
            newInformation: PaymentMethodInformationFields;
          }) => await updateInformation(data.id, data.newInformation),
          mutationKey: ['update-payment-method', { shopId }],
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['payment-methods', { shopId }],
            });
          },
        }),
    },
  };
};

export default usePaymentMethodsService;
