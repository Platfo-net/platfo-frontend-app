export default {
  notifications: {
    failed: 'عملایت ناموفق',
    success: 'عملیات موفق',
  },
  general: {
    saveChanges: 'ذخیره تغییرات',
    cancelEdit: 'لغو تغییرات',
    edit: 'ویرایش',
    goBack: 'بازگشت',
    new: 'افزودن',
  },
  pages: {
    public: {},
    panel: {
      dashboard: {
        title: 'داشبورد',
        storeListPage: {
          title: 'فروشگاه های من',
          storeListItem: {
            category: 'دسته بندی',
            description: 'شرح',
            manage: 'مدیریت',
          },
          createNewStore: 'ایجاد فروشگاه جدید',
          messages: {
            noShopsRegistered:
              'در حال حاضر فروشگاهی را ثبت نکرده اید. لطفاً فروشگاه جدیدی را ایجاد کنید.',
          },
        },
        createNewStorePage: {
          title: 'ایجاد فروشگاه جدید',
        },
        manageStorePage: {
          title: 'مدیریت فروشگاه',
          tabs: {
            basic: 'اطلاعات پایه',
            products: 'محصولات',
            paymentConfiguration: 'تنظیمات پرداخت',
          },
          panels: {
            basicInformation: {
              title: 'اطاعالت پایه',
              fields: {
                title: 'نام',
                category: 'دسته بندی',
                description: 'شرح',
              },
              notifications: {
                updateShopSuccess: 'بروزرسانی فروشگاه با موفقیت انجام شد.',
                updateShopError: 'عملیات بروز رسانی فروشگاه با خطا مواجه شد.',
              },
            },
          },
        },
      },
    },
  },
};
