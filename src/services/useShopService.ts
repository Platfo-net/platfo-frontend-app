import { useApi } from 'src/composables/use-api';
import { useQuery } from '@tanstack/vue-query';
import { ShopCreditType } from 'src/types';

export const useShopService = () => {
  const platfoApi = useApi();

  const getShopCredit = async (shopId: string) => {
    const response = await platfoApi.api.get<ShopCreditType>(
      '/credit/credit/shop/' + shopId
    );
    return response.data;
  };

  return {
    queries: {
      getShopCredit: (shopId: string) =>
        useQuery({
          queryKey: ['shop-credit', { shopId }],
          queryFn: async () => await getShopCredit(shopId),
        }),
    },
  };
};
