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
      //#region Stores
      {
        path: 'store',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {
            name: 'StoreListPage',
            component: () => import('pages/dashboard/store/StoreListPage.vue'),
            path: 'list',
            meta: {
              title: 'فروشگاه های من | پلتفو',
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
              title: 'ایجاد فروشگاه | پلتفو',
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
            path: 'index',
            name: 'ManageStoreIndexPage',
            component: () =>
              import(
                'pages/dashboard/store/ManageStore/Index/ManageStoreIndexPage.vue'
              ),
            meta: {
              title: 'پیشخوان | پلتفو',
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
                  to: { name: 'ManageStoreIndexPage' },
                },
                {
                  label: 'پیشخوان',
                },
              ],
            },
          },
          {
            path: 'basic-information',
            name: 'ManageStoreBasicInformation',
            component: () =>
              import(
                'components/dashboard/store-page/StoreManagementBasicInformationPanel.vue'
              ),
            meta: {
              title: 'اطلاعات پایه | پلتفو',
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
              title: 'محصولات | پلتفو',
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
              title: 'ویرایش محصول | پلتفو',
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
              title: 'ایجاد محصول | پلتفو',
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
                // 'components/dashboard/store-page/StoreManagementPaymentMethodsPanel.vue'
                'pages/dashboard/store/ManageStore/PaymentMethods/ManageStorePaymentMethodsPage.vue'
              ),
            meta: {
              title: 'روش های پرداخت | پلتفو',
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
            path: 'tables',
            name: 'ManageStoreTablesListPage',
            component: () =>
              import(
                // 'components/dashboard/store-page/StoreManagementPaymentMethodsPanel.vue'
                'pages/dashboard/store/ManageStore/Tables/ManageStoreTablesListPage.vue'
              ),
            meta: {
              title: 'میز ها | پلتفو',
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
                  label: 'مدیریت میزها',
                },
              ],
            },
          },
          {
            path: 'payment-methods/:paymentMethodId',
            name: 'ManageStorePaymentMethodEditPage',
            component: () =>
              import(
                'pages/dashboard/store/ManageStore/PaymentMethods/ManageStorePaymentMethodEditPage.vue'
              ),
            meta: {
              title: 'ویرایش روش پرداخت | پلتفو',
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
                  to: { name: 'ManageStorePaymentMethods' },
                },
                {
                  label: 'ویرایش روش پرداخت',
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
              title: 'دسته بندی محصولات | پلتفو',
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
              title: 'ویرایش دسته بندی محصولات | پلتفو',
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
              title: 'ایجاد دسته بندی جدید | پلتفو',
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
              title: 'روش های ارسال | پلتفو',
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
                  title: 'سفارش ها | پلتفو',
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
                  title: 'جزئیات سفارش | پلتفو',
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
      //#endregion
      //#region Chatbots
      {
        path: '/chatbot',
        component: () => import('layouts/MainLayout.vue'),
        redirect: { name: 'ChatbotListPage' },
        children: [
          {
            path: 'list',
            name: 'ChatbotListPage',
            component: () => import('pages/dashboard/chatbot/ChatbotListPage.vue'),
            meta: {
              title: 'چت بات های من | پلتفو',
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                { label: 'چت بات های من' },
              ],
            },
          }
        ]
      },
      {
        path: '/manage/chatbot/:chatbotId',
        component: () => import('layouts/ManageChatbotLayout.vue'),
        redirect: { name: 'ManageChatbotBasicInformationPage' },
        children: [
          {
            path: 'basic-information',
            name: 'ManageChatbotBasicInformationPage',
            component: () => import('pages/dashboard/chatbot/ManageChatBot/ManageChatbotBasicInformationPage.vue'),
            meta: {
              title: 'اطلاعات پایه چت بات | پلتفو',
              breadcrumbs: [
                {
                  label: 'pages.panel.dashboard.title',
                  to: { name: 'Dashboard' },
                },
                { label: 'چت بات های من', to: { name: 'ChatbotListPage' } },
                { label: 'اطلاعات پایه' },
              ],
            },
          }
        ]
      },
      //#endregion
      // {
      //   name: 'ContactsPage',
      //   path: 'contacts',
      //   meta: {
      //     breadcrumbs: [
      //       {
      //         label: 'pages.panel.dashboard.title',
      //         to: { name: 'Dashboard' },
      //       },
      //       { label: 'My Contacts' },
      //     ],
      //   },
      //   component: () => import('pages/dashboard/contacts/ContactsPage.vue'),
      // },
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
        meta: {
          title: 'ورود | پلتفو',
        },
      },
      {
        path: 'register',
        name: 'RegisterPage',
        component: () => import('pages/public/RegisterPage.vue'),
        meta: {
          title: 'ثبت نام | پلتفو',
        },
      },
      {
        path: 'forgot-password',
        name: 'ForgotPasswordPage',
        component: () => import('pages/public/ForgotPasswordPage.vue'),
        meta: {
          title: 'فراموشی رمز | پلتفو',
        },
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
        meta: {
          title: 'تغییر رمز | پلتفو',
        },
      },
      {
        path: 'confirm-phone',
        name: 'OtpPhoneConfirmationPage',
        component: () => import('pages/public/OtpPhoneConfirmationPage.vue'),
        meta: {
          title: 'تایید شماره همراه | پلتفو',
        },
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
    path: '/shop/:shopId',
    component: () => import('layouts/ShopLayout.vue'),
    redirect: { name: 'ShopTableProductsListPage' },
    children: [
      {
        name: 'ShopTableProductsListPage',
        path: 'products',
        component: () => import('pages/public/shop/ShopProductsListPage.vue'),
      },
      {
        name: 'ShopTableShoppingCartPage',
        path: 'cart',
        component: () => import('pages/public/shop/ShopShoppingCartPage.vue'),
      },
      {
        name: 'ShopTableCategoriesPage',
        path: 'categories',
        component: () => import('pages/public/shop/ShopCategoriesPage.vue'),
      },
      {
        name: 'ShopTableCategoryProductsPage',
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
    meta: {
      title: 'عملایت غیر مجاز | پلتفو',
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: {
      title: 'یافت نشد | پلتفو',
    },
  },
];

export default routes;
