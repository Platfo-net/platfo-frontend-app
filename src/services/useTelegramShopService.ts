import { useApi } from '../composables/use-api';

const { api, loading } = useApi();

export const useTelegramShopService = () => {
    const getShopCategories = async (shopId: string) => {
        const response = await api.get(`/shop/categories/telegram/${shopId}/all`);
        return response.data;
    }
    return {
        loading,
        queries: {
            getShopCategories,
        },
    }
}