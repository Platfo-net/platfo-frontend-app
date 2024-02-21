import { useMutation, useQuery } from '@tanstack/vue-query';
import { IPaginatedResponse } from 'src/composables/types';
import { useApi } from 'src/composables/use-api';
import {
  OrderListType,
  OrderStatusConstantType,
  OrderStatusEnum,
  OrderType,
  PaginationParamsType,
  TablePaginationType,
} from 'src/types';
import { Ref } from 'vue';

export const useOrdersService = () => {
  const platfoApi = useApi();

  const getAll = async (shopId: string, params: PaginationParamsType) => {
    const response = await platfoApi.api.get<
      IPaginatedResponse<OrderListType[]>
    >(`/shop/orders/${shopId}/all`, { params });
    return response.data;
  };

  const getOneById = async (id: string) => {
    const response = await platfoApi.api.get<OrderType>(`/shop/orders/${id}`);
    return response.data;
  };

  const updateOrderStatus = async (id: string, status: OrderStatusEnum) => {
    const response = await platfoApi.api.put(
      `/shop/orders/${id}/change-status`,
      {
        status,
      }
    );
    return response.data;
  };

  const getOrderStatusList = async () => {
    const response = await platfoApi.api.get<OrderStatusConstantType[]>(
      '/constants/order-status'
    );
    return response.data;
  };

  return {
    queries: {
      getAll: (shopId: string, pagination: Ref<TablePaginationType>) =>
        useQuery({
          queryFn: async () =>
            await getAll(shopId, {
              page: pagination.value.page || 1,
              page_size: pagination.value.rowsPerPage || 20,
            }),
          queryKey: ['orders', { shopId, pagination }],
          enabled: true,
        }),
      getOneById: (orderId: string) =>
        useQuery({
          queryFn: async () => await getOneById(orderId),
          queryKey: ['order', { orderId }],
        }),
      getOrderStatusList: () =>
        useQuery({
          queryFn: async () => await getOrderStatusList(),
          queryKey: ['orders-status-list'],
        }),
    },
    mutations: {
      updateOrderStatus: (orderId: string) =>
        useMutation({
          mutationFn: async (status: OrderStatusEnum) =>
            await updateOrderStatus(orderId, status),
          mutationKey: ['update-order-status', { orderId, status }],
        }),
    },
  };
};
