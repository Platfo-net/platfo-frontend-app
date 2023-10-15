import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from 'stores/auth-store';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'StoreListPage' },
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'StoreListPage' },
    name: 'Dashboard',
    children: [
      {
        path: 'store',
        children: [
          {
            name: 'StoreListPage',
            component: () => import('pages/dashboard/store/StoreListPage.vue'),
            path: 'list',
            meta: {
              breadcrumbs: [
                { label: 'Dashboard', to: { name: 'Dashboard' } },
                { label: 'My Stores' },
              ],
            },
          },
          {
            name: 'CreateStorePage',
            component: () =>
              import('pages/dashboard/store/CreateStorePage.vue'),
            path: 'create',
            meta: {
              breadcrumbs: [
                { label: 'Dashboard', to: { name: 'Dashboard' } },
                { label: 'My Stores', to: { name: 'StoreListPage' } },
                { label: 'Create new store' },
              ],
            },
          },
          {
            name: 'ManageStorePage',
            component: () =>
              import('pages/dashboard/store/ManageStorePage.vue'),
            path: 'manage/:storeId',
            meta: {
              breadcrumbs: [
                { label: 'Dashboard', to: { name: 'Dashboard' } },
                { label: 'My Stores', to: { name: 'StoreListPage' } },
                { label: 'Manage Store' },
              ],
            },
          },
        ],
      },
      {
        name: 'ContactsPage',
        path: 'contacts',
        meta: {
          breadcrumbs: [
            { label: 'Dashboard', to: { name: 'Dashboard' } },
            { label: 'My Contacts' },
          ],
        },
        component: () => import('pages/dashboard/contacts/ContactsPage.vue'),
      },
    ],
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (!authStore.state.isLoggedIn) {
        return next({
          name: 'NotAuthorized',
          replace: true,
        });
      }
      return next();
    },
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'LoginPage',
        component: () => import('pages/public/LoginPage.vue'),
        beforeEnter: (to, from, next) => {
          const authStore = useAuthStore();
          if (authStore.state.isLoggedIn) {
            next({
              name: 'StoresPage',
              replace: true,
            });
          }
          next();
        },
      },
      {
        path: 'register',
        name: 'RegisterPage',
        component: () => import('pages/public/RegisterPage.vue'),
      },
      {
        path: 'confirm-phone',
        name: 'OtpPhoneConfirmationPage',
        component: () => import('pages/public/OtpPhoneConfirmationPage.vue'),
      },
    ],
  },

  {
    path: '/shop/:shopId/:leadId',
    component: () => import('layouts/ShopLayout.vue'),
    redirect: { name: 'ShopProductsListPage' },
    children: [
      {
        name: 'ShopProductsListPage',
        path: 'products',
        component: () => import('pages/public/shop/ShopProductsListPage.vue'),
      },
      {
        name: 'ShopShoppingCartPage',
        path: 'cart',
        component: () => import('pages/public/shop/ShopShoppingCartPage.vue'),
      },
    ],
  },

  {
    path: '/not-authorized',
    name: 'NotAuthorized',
    component: () => import('pages/NotAuthorizedPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
