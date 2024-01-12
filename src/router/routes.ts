import {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';
import { useAuthStore } from 'stores/auth-store';
import { useApi } from 'src/composables/use-api';
import { AxiosError } from 'axios';
import { useNotify } from 'src/composables/use-notify';

const beforeEnterAuth = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { api } = useApi();
  const authStore = useAuthStore();

  if (!authStore.state.isLoggedIn) {
    return next({
      name: 'LoginPage',
      replace: true,
    });
  }
  try {
    const { data } = await api.post('/auth/check');
  } catch (err) {
    if (err instanceof AxiosError) {
      // console.log(err.response);
      authStore.actions.clearAuthState();
      return next({
        name: 'LoginPage',
        replace: true,
      });
    }
    // throw new Error('Unhandled error while verifying token.');
  }
  return next();
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'StoreListPage' },
  },
  {
    path: '/dashboard',
    // component: () => import('layouts/MainLayout.vue'),
    redirect: { name: 'StoreListPage' },
    name: 'Dashboard',
    children: [
      {
        path: 'store',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {
            name: 'StoreListPage',
            component: () => import('pages/dashboard/store/StoreListPage.vue'),
            path: 'list',
            meta: {
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                { label: 'pages.panel.dashboard.storeListPage.title' },
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
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                {
                  label: 'pages.panel.dashboard.storeListPage.title',
                  to: { name: 'StoreListPage' },
                },
                { label: 'pages.panel.dashboard.createNewStorePage.title' },
              ],
            },
          },
        ],
      },
      {
        name: 'ManageStorePage',
        component: () => import('src/layouts/ManageShopLayout.vue'),
        path: 'store/manage/:storeId',
        children: [
          {
            path: 'basic-information',
            name: 'ManageStoreBasicInformation',
            component: () =>
              import(
                'components/dashboard/store-page/StoreManagementBasicInformationPanel.vue'
              ),
            meta: {
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                {
                  label: 'pages.panel.dashboard.storeListPage.title',
                  to: { name: 'StoreListPage' },
                },
                {
                  label: 'pages.panel.dashboard.manageStorePage.title',
                  to: { name: 'ManageStoreBasicInformation' },
                },
                {
                  label:
                    'pages.panel.dashboard.manageStorePage.panels.basicInformation.title',
                },
              ],
            },
          },
          {
            path: 'products',
            name: 'ManageStoreProducts',
            component: () =>
              import(
                'pages/dashboard/store/ManageStore/Products/ManageStoreProductsListPage.vue'
                // 'components/dashboard/store-page/StoreManagementProductsPanel.vue'
              ),

            meta: {
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                {
                  label: 'pages.panel.dashboard.storeListPage.title',
                  to: { name: 'StoreListPage' },
                },
                {
                  label: 'pages.panel.dashboard.manageStorePage.title',
                  to: { name: 'ManageStoreBasicInformation' },
                },
                {
                  label:
                    'pages.panel.dashboard.manageStorePage.panels.productManagement.title',
                },
              ],
            },
          },
          {
            path: 'products-old',
            name: 'ManageStoreProductsOld',
            component: () =>
              import(
                'components/dashboard/store-page/StoreManagementProductsPanel.vue'
              ),

            meta: {
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                {
                  label: 'pages.panel.dashboard.storeListPage.title',
                  to: { name: 'StoreListPage' },
                },
                {
                  label: 'pages.panel.dashboard.manageStorePage.title',
                  to: { name: 'ManageStoreBasicInformation' },
                },
                {
                  label:
                    'pages.panel.dashboard.manageStorePage.panels.productManagement.title',
                },
              ],
            },
          },
          {
            path: 'products/:productId/edit',
            name: 'ManageStoreProductEditPage',
            component: () =>
              import(
                'pages/dashboard/store/ManageStore/Products/ManageStoreUpsertProductPage.vue'
              ),
            meta: {
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                {
                  label: 'pages.panel.dashboard.storeListPage.title',
                  to: { name: 'StoreListPage' },
                },
                {
                  label: 'pages.panel.dashboard.manageStorePage.title',
                  to: { name: 'ManageStoreBasicInformation' },
                },
                {
                  label:
                    'pages.panel.dashboard.manageStorePage.panels.productManagement.title',
                  to: { name: 'ManageStoreProducts' },
                },
                {
                  label: 'ویرایش محصول',
                },
              ],
            },
          },
          {
            path: 'products/create',
            name: 'ManageStoreProductCreatePage',
            component: () =>
              import(
                'pages/dashboard/store/ManageStore/Products/ManageStoreUpsertProductPage.vue'
              ),
            meta: {
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                {
                  label: 'pages.panel.dashboard.storeListPage.title',
                  to: { name: 'StoreListPage' },
                },
                {
                  label: 'pages.panel.dashboard.manageStorePage.title',
                  to: { name: 'ManageStoreBasicInformation' },
                },
                {
                  label:
                    'pages.panel.dashboard.manageStorePage.panels.productManagement.title',
                  to: { name: 'ManageStoreProducts' },
                },
                {
                  label: 'ایجاد محصول',
                },
              ],
            },
          },
          {
            path: 'payment-methods',
            name: 'ManageStorePaymentMethods',
            component: () =>
              import(
                'components/dashboard/store-page/StoreManagementPaymentMethodsPanel.vue'
              ),
            meta: {
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                {
                  label: 'pages.panel.dashboard.storeListPage.title',
                  to: { name: 'StoreListPage' },
                },
                {
                  label: 'pages.panel.dashboard.manageStorePage.title',
                  to: { name: 'ManageStoreBasicInformation' },
                },
                {
                  label:
                    'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.title',
                },
              ],
            },
          },
          {
            path: 'product-categories',
            name: 'ManageStoreProductCategories',
            component: () =>
              import(
                'pages/dashboard/store/ManageStore/ProductCategories/ManageStoreProductCategoriesPage.vue'
              ),
            meta: {
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                {
                  label: 'pages.panel.dashboard.storeListPage.title',
                  to: { name: 'StoreListPage' },
                },
                {
                  label: 'pages.panel.dashboard.manageStorePage.title',
                  to: { name: 'ManageStoreBasicInformation' },
                },
                {
                  label:
                    'pages.panel.dashboard.manageStorePage.panels.productCategories.title',
                },
              ],
            },
          },
          {
            path: 'product-categories/:categoryId/edit',
            name: 'ManageStoreProductCategoryEditPage',
            component: () =>
              import(
                'pages/dashboard/store/ManageStore/ProductCategories/ManageStoreProductCategoryEditPage.vue'
              ),
            meta: {
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                {
                  label: 'pages.panel.dashboard.storeListPage.title',
                  to: { name: 'StoreListPage' },
                },
                {
                  label: 'pages.panel.dashboard.manageStorePage.title',
                  to: { name: 'ManageStoreBasicInformation' },
                },
                {
                  label:
                    'pages.panel.dashboard.manageStorePage.panels.productCategories.title',
                  to: { name: 'ManageStoreProductCategories' },
                },
                {
                  label: 'ویرایش دسته بندی',
                },
              ],
            },
          },
          {
            path: 'product-categories/create',
            name: 'ManageStoreProductCategoryCreatePage',
            component: () =>
              import(
                'pages/dashboard/store/ManageStore/ProductCategories/ManageStoreProductCategoryCreatePage.vue'
              ),
            meta: {
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                {
                  label: 'pages.panel.dashboard.storeListPage.title',
                  to: { name: 'StoreListPage' },
                },
                {
                  label: 'pages.panel.dashboard.manageStorePage.title',
                  to: { name: 'ManageStoreBasicInformation' },
                },
                {
                  label:
                    'pages.panel.dashboard.manageStorePage.panels.productCategories.title',
                  to: { name: 'ManageStoreProductCategories' },
                },
                {
                  label: 'ایجاد دسته بندی',
                },
              ],
            },
          },
          {
            path: 'shipping-methods',
            name: 'ManageStoreShippingMethods',
            component: () =>
              import(
                'components/dashboard/store-page/StoreManagementShippingMethodsPanel.vue'
              ),
            meta: {
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                {
                  label: 'pages.panel.dashboard.storeListPage.title',
                  to: { name: 'StoreListPage' },
                },
                {
                  label: 'pages.panel.dashboard.manageStorePage.title',
                  to: { name: 'ManageStoreBasicInformation' },
                },
                {
                  label:
                    'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.title',
                },
              ],
            },
          },
          {
            path: 'orders',
            children: [
              {
                name: 'ManageStoreOrdersListPage',
                path: '',
                component: () =>
                  import(
                    'pages/dashboard/store/ManageStore/Orders/ManageStoreOrdersListPage.vue'
                  ),
                meta: {
                  breadcrumbs: [
                    {
                      label: 'pages.panel.dashboard.title',
                      to: { name: 'Dashboard' },
                    },
                    {
                      label: 'pages.panel.dashboard.storeListPage.title',
                      to: { name: 'StoreListPage' },
                    },
                    {
                      label: 'pages.panel.dashboard.manageStorePage.title',
                      to: { name: 'ManageStoreBasicInformation' },
                    },
                    {
                      label: 'سفارش ها',
                    },
                  ],
                },
              },
              {
                path: ':orderId',
                name: 'ManageStoreOrderDetailsPage',
                component: () =>
                  import(
                    'pages/dashboard/store/ManageStore/Orders/ManageStoreOrderDetailsPage.vue'
                  ),
                meta: {
                  breadcrumbs: [
                    {
                      label: 'pages.panel.dashboard.title',
                      to: { name: 'Dashboard' },
                    },
                    {
                      label: 'pages.panel.dashboard.storeListPage.title',
                      to: { name: 'StoreListPage' },
                    },
                    {
                      label: 'pages.panel.dashboard.manageStorePage.title',
                      to: { name: 'ManageStoreBasicInformation' },
                    },
                    {
                      label: 'سفارش ها',
                      to: { name: 'ManageStoreOrdersListPage' },
                    },
                    {
                      label: 'جزئیات سفارش',
                    },
                  ],
                },
              },
            ],
          },
        ],
        meta: {
          breadcrumbs: [
            {
              label: 'pages.panel.dashboard.title',
              to: { name: 'Dashboard' },
            },
            {
              label: 'pages.panel.dashboard.storeListPage.title',
              to: { name: 'StoreListPage' },
            },
            { label: 'pages.panel.dashboard.manageStorePage.title' },
          ],
        },
      },
      {
        name: 'ContactsPage',
        path: 'contacts',
        meta: {
          breadcrumbs: [
            {
              label: 'pages.panel.dashboard.title',
              to: { name: 'Dashboard' },
            },
            { label: 'My Contacts' },
          ],
        },
        component: () => import('pages/dashboard/contacts/ContactsPage.vue'),
      },
    ],
    beforeEnter: beforeEnterAuth,
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
              name: 'StoreListPage',
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
        path: 'forgot-password',
        name: 'ForgotPasswordPage',
        component: () => import('pages/public/ForgotPasswordPage.vue'),
      },
      {
        path: 'change-password',
        name: 'ChangePasswordPage',
        component: () => import('pages/public/ChangePasswordPage.vue'),
        beforeEnter: async (to, from, next) => {
          const authStore = useAuthStore();
          const notify = useNotify();
          if (!authStore.changePasswordState.token) {
            return next({
              name: 'LoginPage',
            });
          } else {
            next();
          }
        },
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
      {
        name: 'ShopCategoriesPage',
        path: 'categories',
        component: () => import('pages/public/shop/ShopCategoriesPage.vue'),
      },
      {
        name: 'ShopCategoryProductsPage',
        path: 'categories/:categoryId',
        component: () =>
          import('pages/public/shop/ShopCategoryProductsPage.vue'),
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
