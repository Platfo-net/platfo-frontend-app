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
      title: 'پلتفرم ها',
      icon: 'hub',
      to: { name: 'BotListPage' },
    },
    {
      title: 'چت بات',
      icon: 'assistant',
      children: [
        {
          title: 'چت بات های من',
          to: { name: 'ChatbotListPage' },
          icon: 'list',
        },
      ],
    },
    {
      title: 'فروشگاه',
      icon: 'storefront',
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
      title: 'پیشخوان',
      to: { name: 'ManageStoreIndexPage' },
      icon: 'explore',
    },
    {
      title: t(
        'pages.panel.dashboard.manageStorePage.panels.basicInformation.title'
      ),
      to: { name: 'ManageStoreBasicInformation' },
      icon: 'info',
    },
    // {
    //   title: 'مدیریت محصولات',
    //   // to: { name: 'ManageStoreProducts' },
    //   icon: 'inventory_2',
    //   children: [
    //     {
    //       title: t(
    //         'pages.panel.dashboard.manageStorePage.panels.productManagement.title'
    //       ),
    //       to: { name: 'ManageStoreProducts' },
    //       icon: 'list',
    //     },
    //     {
    //       title: t(
    //         'pages.panel.dashboard.manageStorePage.panels.productCategories.title'
    //       ),
    //       to: { name: 'ManageStoreProductCategories' },
    //       icon: 'category',
    //     },
    //   ],
    // },
    {
      title: 'مدیریت محصولات',
      // to: { name: 'ManageStoreProducts' },
      to: { name: 'StoreProductsManagement' },
      icon: 'inventory_2',
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
    {
      title: 'مدیریت میزها',
      icon: 'bento',
      to: { name: 'ManageStoreTablesListPage' },
    },
  ];

  const manageChatbotLayoutRoutes: SidebarRoute[] = [
    {
      title: t('general.goBack'),
      to: { name: 'ChatbotListPage' },
      icon: 'chevron_right',
      activeClass: 'bg-transparent',
    },
    {
      title: 'اطلاعات  چت بات',
      to: { name: 'ManageChatbotBasicInformationPage' },
      icon: 'info',
    },
    {
      title: 'مدیریت اعتبار',
      to: { name: 'ManageChatbotCreditPage' },
      icon: 'payment',
    },
    {
      title: 'تنظیمات',
      to: { name: 'ManageChatbotConfigurationPage' },
      icon: 'settings',
    },
    {
      title: 'پایگاه دانش',
      to: { name: 'ManageChatbotKnowledgeBasePage' },
      icon: 'school',
    },
    {
      title: 'اتصال و انتشار',
      to: { name: 'ManageChatbotConnectedBotsPage' },
      icon: 'link',
    },
  ];
  return {
    mainLayoutRoutes,
    manageShopLayoutRoutes,
    manageChatbotLayoutRoutes,
  };
};
