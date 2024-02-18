import { useMutation, useQuery } from "@tanstack/vue-query";
import { useApi } from "src/composables/use-api"
import { ShopTableType } from "src/types";


export const useShopTableService = () => {
    const shopApi = useApi();
    const getAll = async (shopId: string): Promise<ShopTableType[]> => {
        const response = await shopApi.api.get(`/shop/tables/${shopId}/all`);
        return response.data;
    }
    const getOneById = async (tableId: string): Promise<ShopTableType> => {
        const response = await shopApi.api.get(`/shop/tables/${tableId}`);
        return response.data;
    }
    const create = async (shopId: string, title: string) => {
      const response = await shopApi.api.post('/shop/tables', {
        title,
        shop_id: shopId
      });
      return response.data;
    }
    const update = async (tableId: string, title: string) => {
      const response = await shopApi.api.put(`/shop/tables/${tableId}`, {
        title,
      });
      return response.data;
    }
    const remove = async (tableId: string) => {
      const response = await shopApi.api.delete(`/shop/tables/${tableId}`);
      return response.data;
    }
    return {
        queries: {
          getAll: (shopId: string) => useQuery({
            queryFn: async () => await getAll(shopId),
            queryKey: ['shop-tables', { shopId }],
          }),
          getOneById: (tableId: string) => useQuery({
            queryFn: async () => await getOneById(tableId),
            queryKey: ['shop-tables', { tableId }],
          }),
        },
        mutations: {
          create: (shopId: string) => useMutation({
            mutationFn: async (title: string) => await create(shopId, title),
            mutationKey: ['create-shop-table', {shopId}]
          }),
          update: () => useMutation({
            mutationFn: async (dto: {
              tableId: string,
              title: string,
            }) => await update(dto.tableId, dto.title),
            mutationKey: ['update-shop-table']
          }),
          remove: () => useMutation({
            mutationFn: async (dto: {
              tableId: string,
            }) => await remove(dto.tableId),
            mutationKey: ['delete-shop-table']
          }),
        },
      };
}