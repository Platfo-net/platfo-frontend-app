import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useApi } from 'src/composables/use-api';
import { ProductCategoryType, UpdateProductCategoryType, InsertProductCategoryType } from 'src/types';

export const useProductCategoriesService = () => {
  const shopApi = useApi();
  const queryClient = useQueryClient();

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

  const create = async (dto: InsertProductCategoryType) => {
    const response = await shopApi.api.post('/shop/categories', dto);
    return response.data;
  };

  const update = async (id: string, dto: UpdateProductCategoryType) => {
    console.log(dto);
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
      getAll: (shopId: string) => useQuery({
        queryKey: ['categories-list', shopId],
        queryFn: async () => await getAll(shopId),
      }),
      getOneById: (id: string) => useQuery({
        queryKey: ['category', id],
        queryFn: async () => await getOneById(id),
      }),
    },
    mutations: {
      create: (dto: InsertProductCategoryType) => useMutation({
        mutationKey: ['create-category'],
        mutationFn: async () => await create(dto),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['categories-list'] })
        }
      }),
      update: (id: string, dto: UpdateProductCategoryType) => useMutation({
        mutationKey: ['update-category', id],
        mutationFn: async () => await update(id, dto),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['categories-list'] })
        },
      }),
      remove: (id: string) => useMutation({
        mutationKey: ['delete-category', id],
        mutationFn: async () => await remove(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['categories-list'] })
        }
      }),
    },
  };
};
