import { useApi } from 'src/composables/use-api';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { DashboardDailyReportType, DashboardMonthlyReportType, ShopCategoryType, ShopCreditType, ShopPlanType } from 'src/types';

export const useShopService = () => {
  const platfoApi = useApi();

  const getShopCredit = async (shopId: string) => {
    const response = await platfoApi.api.get<ShopCreditType>(
      '/credit/credit/shop/' + shopId
    );
    return response.data;
  };

  const getShopCategories = async () => {
    const response = await platfoApi.api.get<ShopCategoryType[]>(`/constants/shop-categories`);
    return response.data;
  }

  const getShopPlans = async () => {
    const response = await platfoApi.api.get<ShopPlanType[]>(`/credit/plans/all?currency=IRT`);
    return response.data;
  }

  const extendShop = async (shopId: string, planId: string) => {
    const response = await platfoApi.api.post<{ payment_url: string }>(`/credit/credit/shop/${shopId}/extend`, {
      plan_id: planId
    });
    return response.data;
  }

  const dashboardCharts = async (shopId: string) => {
    const reportResponses = await Promise.all([
      await platfoApi.api.post<DashboardDailyReportType>(`/shop/dashboard/${shopId}/daily`),
      await platfoApi.api.post<DashboardMonthlyReportType>(`/shop/dashboard/${shopId}/monthly`)
    ]);
    return {
      dialyData: reportResponses[0].data,
      monthlyData: reportResponses[1].data,
    }
  }

  return {
    queries: {
      getShopCredit: (shopId: string) =>
        useQuery({
          queryKey: ['shop-credit', { shopId }],
          queryFn: async () => await getShopCredit(shopId),
        }),
      getShopCategories: () =>
        useQuery({
          queryKey: ['shop-categories'],
          queryFn: async () => await getShopCategories(),
        }),
      getAllPlans: () =>
        useQuery({
          queryKey: ['shop-plans'],
          queryFn: async () => await getShopPlans(),
          refetchOnWindowFocus: false,
        }),
      getDashboardCharts: (shopId: string) => 
        useQuery({
          queryKey: ['dashboard-charts'],
          queryFn: async () => await dashboardCharts(shopId),
          refetchOnWindowFocus: false,
        }),
    },
    mutations: {
      extendShopPlan: (shopId: string) =>
        useMutation({
          mutationKey: ['shop-plan-extend', { shopId }],
          mutationFn: async (planId: string) => await extendShop(shopId, planId),
        }),
    }
  };
};
