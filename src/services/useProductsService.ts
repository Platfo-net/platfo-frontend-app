import { useApi } from 'src/composables/use-api';
import { ProductType, UpsertProductType } from 'src/types';
import { IPaginatedResponse } from 'src/composables/types';

export const useProductsService = () => {
  const shopApi = useApi();

  const getAll = async (
    shopId: string,
    params: {
      page: number;
      page_size: number;
    } = { page: 1, page_size: 10 }
  ) => {
    const response = await shopApi.api.get<IPaginatedResponse<ProductType>>(
      `/shop/products/${shopId}/all`,
      {
        params,
      }
    );
    return response.data;
  };

  const getOneById = async (id: string) => {
    const response = await shopApi.api.get<ProductType>(`/shop/products/${id}`);
    return response.data;
  };

  const create = async (dto: UpsertProductType) => {
    const response = await shopApi.api.post('/shop/products', dto);
    return response.data;
  };

  const update = async (id: string, dto: UpsertProductType) => {
    const response = await shopApi.api.put(`/shop/products/${id}`, dto);
    return response.data;
  };

  const remove = async (id: string) => {
    await shopApi.api.delete(`/shop/products/${id}`);
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
