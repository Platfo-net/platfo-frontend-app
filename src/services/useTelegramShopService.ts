import { useApi } from '../composables/use-api';

const shopApi = useApi();

export const useTelegramShopService = () => {
    const getShopCategories = async (shopId: string) => {
        const response = await shopApi.api.get(`/shop/categories/telegram/${shopId}/all`);
        return response.data;
    }
    const getShopCategoryProducts = async (shopId: string, categoryId: string) => {
        const response = await shopApi.api.get(`/shop/products/telegram/${shopId}/all?category_id=${categoryId}`);
        return response.data;
    }
    return {
        loading: shopApi.loading,
        queries: {
            getShopCategories,
            getShopCategoryProducts,
        },
    }
}