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
    add: 'افزودن',
    cancel: 'لفو',
    fields: {
      requiredStringField: 'این فیلد نباید خالی باشد',
      requiredNumberField: 'مقدار عددی وارد کنید',
      requiredNumberFieldPositiveValue: 'مقدار عددی این فیلد باید مثبت باشد',
    },
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
            paymentConfiguration: {
              title: 'تنظیمان پرداخت',
              fields: {
                title: 'عنوان',
                name: 'نام دارنده حساب',
                bank: 'بانک',
                cardNumber: 'شماره کارت',
                active: 'فعال',
              },
              informationFields: 'اطلاعات شیوه پرداخت',
              notifications: {
                updatePaymentMethodSuccess:
                  'بروزرسانی شیوه پرداخت با موفقیت انجام شد.',
                updatePaymentMethodError:
                  'عملیات بروز رسانی شیوه پرداخت با خطا مواجه شد.',
              },
              messages: {
                noPaymentMethodRegistered: 'شیوه ی پرداختی ثبت نشده است.',
                addNewPaymentMethod: 'افزودن شیوه پرداخت جدید',
                deleteWarning1: 'آیا از حذف این شیوه پراخت مطمئین هستید؟',
                deleteWarning2: 'این شیوه پراخت برای همیشه از بین خواهد رفت.',
              },
            },
            productManagement: {
              title: 'مدیریت محصولات',
              fields: {
                title: 'عنوان',
                price: 'قیمت',
              },
              informationFields: 'اطلاعات شیوه پرداخت',
              notifications: {
                createProductSuccess: 'ایجاد محصول با موفقیت انجام شد.',
                createProductError: 'ایجاد محصول با خطا مواجه شد.',
                deleteProductSuccess: 'حذف محصول با موفقیت انجام شد.',
                deleteProductError: 'حذف محصول با خطا مواجه شد.',
              },
              messages: {},
            },
          },
        },
      },
    },
  },
};
