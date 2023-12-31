import { RouteLocationNamedRaw } from 'vue-router';

type SidebarRoute = {
  title: string;
  to?: RouteLocationNamedRaw;
  children?: SidebarRoute[];
  icon?: string;
};

export const useSidebar = () => {
  const routes: SidebarRoute[] = [
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
  return {
    routes,
  };
};
