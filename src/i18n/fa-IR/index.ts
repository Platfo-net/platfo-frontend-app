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
    alert: 'هشدار',
    yes: 'بله',
    no: 'خیر',
    nextStep: 'مرحله بعد',
    fields: {
      requiredStringField: 'این فیلد نباید خالی باشد',
      requiredNumberField: 'مقدار عددی وارد کنید',
      requiredNumberFieldPositiveValue: 'مقدار عددی این فیلد باید مثبت باشد',
    },
  },
  layout: {
    appHeader: 'پلتفو',
    links: {
      title: 'منو',
      myStores: 'فروشگاه های من',
    },
    logout: 'خروج',
  },
  pages: {
    public: {
      login: {
        title: 'ورود به پلتفو',
        fields: {
          phoneNumber: 'شماره موبایل',
          password: 'پسوورد',
        },
        notUser: 'هنوز کاربر نیستید؟',
        registerHere: 'اینجا ثبت نام کن.',
        notifications: {
          loginSuccess: 'ورود موفقیت آمیز',
          loginError: 'شماره یا پسوورد نادرست بود',
        },
        login: 'ورود',
      },
      register: {
        title: 'ثبت نام در پلتفو',
        fields: {
          firstname: 'نام',
          lastname: 'نام خانوادگی',
          phoneCountryCode: 'کد کشور',
          phoneNumber: 'شماره موبایل',
          password: 'پسوورد',
        },
        isUser: 'کاربر هستید؟',
        loginHere: 'اینجا وارد شوید.',
        notifications: {
          registerSuccess: 'ثبت نام موفقیت آمیز',
          registerError: 'شماره یا پسوورد نادرست بود',
        },
        register: 'ثبت نام',
      },
    },
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
          steps: {
            shopInformation: {
              title: 'ثبت مشخصات فروشگاه',
              description:
                'در این قسمت اطلاعات فروشگاهی را که می خواهید ایجاد کنید را وارد کنید.',
              fields: {
                title: 'عنوان',
                category: 'دسته بندی',
                description: 'شرح',
              },
            },
            supportAccountConnection: {
              title: 'اتصال حساب پشتیبانی',
              description:
                'برای دریافت تمام رویدادهای فروشگاه خود باید یک حساب کاربری متصل کنید.',
              howto: 'برای انجام این کار، قدم های زیر را طی کنید:',
              step1: {
                part1: 'در تلگرام لینک',
                part2:
                  'را جست و جو کنید یا با دوربین خود عکس زیر را اسکن کنید.',
              },
              step2: {
                part1: 'سپس دکمه ی ',
                part2: 'را لمس کنید.',
              },
              step3: {
                part1:
                  'برای اتصال اکانت تلگرام خود به عنوان اکانت پشتیبانی، کد زیر را وارد کنید:',
              },
              verifyConnection: 'تایید اتصال',
            },
            telegramBotConnection: {
              title: 'اتصال بات تلگرام',
              description: 'بات تلگرام خود را به فروشگاه متصل کنید.',
              howto: 'برای این کار، قدم های زیر را طی کنید:',
              step1: {
                part1: 'در تلگرام لینک',
                part2:
                  'را جست و جو کنید یا با دوربین خود عکس زیر را اسکن کنید.',
              },
              step2: {
                part1: 'سپس دکمه ی ',
                part2: 'را لمس کنید و دستور',
                part3: 'را فراخوانی کنید.',
              },
              step3: {
                part1: 'سپس مراحل ایجاد بات در تلگرام را طی کنید.',
              },
              step4: {
                part1:
                  'پس از طی کردن مراحل ایجاد بات، برای شما توکنی ایجاد میشود. آن توکن را در فیلد زیر جایگذاری کنید و به مرحله بعد بروید:',
                fields: {
                  botToken: 'توکن بات',
                },
                finish: 'اتمام فرایند ایجاد فروشگاه',
              },
            },
            success: {
              title: 'ثبت موفق',
              description: 'تبریک، شما با موفقیت فروشگاه خود را ایجاد کردید!',
              backToShopList: 'بازکشت به لیست فروشگاه',
            },
          },
          notifications: {
            createShopSuccess: 'ایجاد فروشگاه با موفقیت انجام شد.',
            createShopError: 'ایجاد فروشگاه با خطا مواجه شد.',
            supportConnectionSuccess: 'ارزیابی اتصال شما موفقیت آمیز بود.',
            supportConnectionError: 'ارزیابی اتصال شما موفقیت آمیز نبود.',
            telegramShopRegisterSuccess: 'ثبت بات با موفقیت انجام شد.',
            telegramShopRegisterError: 'ثبت بات با خطا مواجه شد.',
          },
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
              title: 'تنظیمات پرداخت',
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
                updateProductSuccess: 'ویرایش محصول با موفقیت انجام شد.',
                updateProductError: 'ویرایش محصول با خطا مواجه شد.',
              },
              messages: {
                deleteAlertMessage1: 'آیا از حذف این محصول اطمینان دارید؟',
                deleteAlertMessage2: 'این مصحول برای همیشه از بین خواهد رفت.',
              },
            },
          },
        },
      },
    },
  },
};
