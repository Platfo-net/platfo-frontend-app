import { useApi } from '../composables/use-api';
import { UpsertShipmentMethodType } from '../types';

export const useShipmentMethodService = () => {
  const shopApi = useApi();

  const getAll = async (shopId: string) => {
    const response = await shopApi.api.get(
      `/shop/shipment-methods/${shopId}/all`
    );
    return response.data;
  };

  const getOneById = async (id: string) => {
    const response = await shopApi.api.get(`/shop/shipment-methods/${id}`);
    return response.data;
  };

  const create = async (dto: UpsertShipmentMethodType) => {
    const response = await shopApi.api.post('/shop/shipment-methods', dto);
    return response.data;
  };

  const update = async (id: string, dto: UpsertShipmentMethodType) => {
    const response = await shopApi.api.put(`/shop/shipment-methods/${id}`, dto);
    return response.data;
  };

  const remove = async (id: string) => {
    await shopApi.api.delete(`/shop/shipment-methods/${id}`);
    return;
  };

  return {
    loading: shopApi.loading,
    queries: {
      getAll,
      getOneById,
    },
    mutations: {
      create,
      update,
      remove,
    },
  };
};
