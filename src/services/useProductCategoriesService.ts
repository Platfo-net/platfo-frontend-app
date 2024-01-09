import { useApi } from 'src/composables/use-api';
import { ProductCategoryType, UpsertProductCategoryType } from 'src/types';

export const useProductCategoriesService = () => {
  const shopApi = useApi();

  const getAll = async (shopId: string) => {
    const response = await shopApi.api.get<ProductCategoryType[]>(
      `/shop/categories/${shopId}/all`
    );
    return response.data;
  };

  const getOneById = async (id: string) => {
    const response = await shopApi.api.get<ProductCategoryType>(
      `/shop/categories/${id}`
    );
    return response.data;
  };

  const create = async (dto: UpsertProductCategoryType) => {
    const response = await shopApi.api.post('/shop/categories', dto);
    return response.data;
  };

  const update = async (id: string, dto: UpsertProductCategoryType) => {
    const response = await shopApi.api.put(`/shop/categories/${id}`, dto);
    return response.data;
  };

  const remove = async (id: string) => {
    await shopApi.api.delete(`/shop/categories/${id}`);
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
