import { useQuery } from '@tanstack/vue-query';
import { useApi } from '../composables/use-api';
import { IPaginatedResponse } from 'src/composables/types';
import { ProductCategoryType, ProductType, ShopInformationType } from 'src/types';

const shopApi = useApi();

export const useTelegramShopService = () => {
    const getShopCategories = async (shopId: string) => {
        const response = await shopApi.api.get<ProductCategoryType[]>(`/shop/categories/telegram/${shopId}/all`);
        return response.data;
    }
    const getShopCategoryProducts = async (shopId: string, categoryId: string) => {
        const response = await shopApi.api.get<IPaginatedResponse<ProductType>>(`/shop/products/telegram/${shopId}/all?category_id=${categoryId}`);
        return response.data;
    }

    const getShopProducts = async (shopId: string) => {
      const response = await shopApi.api.get<IPaginatedResponse<ProductType>>(`/shop/products/telegram/${shopId}/all`);
      return response.data;
    }

    const getShopProductsRaw = async (shopId: string, params: {
      page: number;
      page_size: number;
    } = { page: 1, page_size: 10 }) => {
      const response = await shopApi.api.get<IPaginatedResponse<ProductType>>(`/shop/products/telegram/${shopId}/all`, {
        params,
      });
      return response.data;
    }

    const getShopCategoryProductsRaw = async (shopId: string, categoryId: string, params: {
      page: number;
      page_size: number;
    } = { page: 1, page_size: 10 }) => {
      const response = await shopApi.api.get<IPaginatedResponse<ProductType>>(`/shop/products/telegram/${shopId}/all`, {
        params: {
          ...params,
          category_id: categoryId,
        },
      });
      return response.data;
  }

    const getShopInformation = async (shopId: string) => {
      const response = await shopApi.api.get<ShopInformationType>(`/shop/shop/telegram/info/${shopId}`)
      return response.data;
    }

    return {
        queries: {
            getShopCategories: (shopId: string) => useQuery({
              queryFn: async () => await getShopCategories(shopId),
              queryKey: ['tgshop-categories', { shopId }],
            }),
            getShopCategoryProducts: (shopId: string, categoryId: string) => useQuery({
              queryFn: async () => await getShopCategoryProducts(shopId, categoryId),
              queryKey: ['tgshop-category-products', { shopId, categoryId }],
            }),
            getShopProducts: (shopId: string) => useQuery({
              queryFn: async () => await getShopProducts(shopId),
              queryKey: ['tgshop-products', { shopId }],
            }),
            getShopInformation: (shopId: string) => useQuery({
              queryFn: async () => await getShopInformation(shopId),
              queryKey: ['shop-information', { shopId }]
            }),
            getShopProductsRaw,
            getShopCategoryProductsRaw,
        },
    }
}
