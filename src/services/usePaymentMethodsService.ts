import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useApi } from 'src/composables/use-api';
import {
  PaymentMethodDetailType,
  PaymentMethodGroupType,
  PaymentMethodInformationFields,
  PaymentMethodType,
} from 'src/types';

const usePaymentMethodsService = () => {
  const platfoApi = useApi();
  const queryClient = useQueryClient();
  const getAll = async (shopId: string) => {
    const response = await platfoApi.api.get<PaymentMethodGroupType[]>(
      `/shop/payment-methods/${shopId}/all`
    );
    return response.data;
  };
  const getById = async (id: string) => {
    const response = await platfoApi.api.get<PaymentMethodDetailType>(
      `/shop/payment-methods/${id}`
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
  const changeIsActive = async (id: string, is_active: boolean) => {
    const response = await platfoApi.api.put(`/shop/payment-methods/${id}/change-is-active`, {
      is_active: !is_active
    })
    return response.data;
  }
  return {
    queries: {
      getAll: (shopId: string) =>
        useQuery({
          queryFn: async () => await getAll(shopId),
          queryKey: ['payment-methods', { shopId }],
        }),
      getById: (id: string) =>
        useQuery({
          queryFn: async () => await getById(id),
          queryKey: ['payment-methods', { id }],
        }),
    },
    mutations: {
      updateInformation: (id: string) =>
        useMutation({
          mutationFn: async (data: {
            id: string;
            newInformation: PaymentMethodInformationFields;
          }) => await updateInformation(data.id, data.newInformation),
          mutationKey: ['update-payment-method', { id }],
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['payment-methods', { id }],
            });
          },
        }),
        changeIsActive: (shopId: string) => useMutation({
          mutationFn: async (dto: {
            id: string,
            is_active: boolean
          }) => await changeIsActive(dto.id, dto.is_active),
          mutationKey: ['change-payment-method-is-active'],
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['payment-methods', { shopId }],
            });
          },
        })
    },
  };
};

export default usePaymentMethodsService;
