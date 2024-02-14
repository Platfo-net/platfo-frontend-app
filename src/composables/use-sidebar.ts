import { RouteLocationNamedRaw } from 'vue-router';
import { useI18n } from 'vue-i18n';

export type SidebarRoute = {
  title: string;
  to?: RouteLocationNamedRaw;
  children?: SidebarRoute[];
  icon?: string;
  activeClass?: string;
};

export const useSidebar = () => {
  const { t } = useI18n();
  const mainLayoutRoutes: SidebarRoute[] = [
    {
      title: 'فروشگاه',
      icon: 'shopping_cart',
      children: [
        {
          title: 'فروشگاه های من',
          to: { name: 'StoreListPage' },
          icon: 'list',
        },
        {
          title: 'ایجاد فروشگاه جدید',
          to: { name: 'CreateStorePage' },
          icon: 'add',
        },
      ],
    },
  ];

  const manageShopLayoutRoutes: SidebarRoute[] = [
    {
      title: t('general.goBack'),
      to: { name: 'Dashboard' },
      icon: 'chevron_right',
      activeClass: 'bg-transparent',
    },
    {
      title:
        t(
          'pages.panel.dashboard.manageStorePage.panels.basicInformation.title'
        ) + ' و اعتبار حساب',
      to: { name: 'ManageStoreBasicInformation' },
      icon: 'info',
    },
    {
      title: 'مدیریت محصولات',
      // to: { name: 'ManageStoreProducts' },
      icon: 'inventory_2',
      children: [
        {
          title: t(
            'pages.panel.dashboard.manageStorePage.panels.productManagement.title'
          ),
          to: { name: 'ManageStoreProducts' },
          icon: 'list',
        },
        {
          title: t(
            'pages.panel.dashboard.manageStorePage.panels.productCategories.title'
          ),
          to: { name: 'ManageStoreProductCategories' },
          icon: 'category',
        },
      ],
    },
    {
      title: t(
        'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.title'
      ),
      to: { name: 'ManageStorePaymentMethods' },
      icon: 'payment',
    },
    {
      title: t(
        'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.title'
      ),
      to: { name: 'ManageStoreShippingMethods' },
      icon: 'local_shipping',
    },
    
    {
      title: 'سفارش ها',
      icon: 'list',
      to: { name: 'ManageStoreOrdersListPage' },
    },
  ];
  return {
    mainLayoutRoutes,
    manageShopLayoutRoutes,
  };
};
