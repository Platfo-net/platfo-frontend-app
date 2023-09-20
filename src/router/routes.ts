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
    children: [
      {
        path: 'store',
        children: [
          {
            name: 'StoreListPage',
            component: () => import('pages/dashboard/store/StoreListPage.vue'),
            path: 'list',
          },
          {
            name: 'CreateStorePage',
            component: () =>
              import('pages/dashboard/store/CreateStorePage.vue'),
            path: 'create',
          },
        ],
      },
      {
        name: 'ContactsPage',
        path: 'contacts',
        meta: {},
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
