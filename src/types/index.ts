export interface IRegisterFormState {
  phone_number: string;
  phone_country_code: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface IChangePasswordFormState {
  phone_number: string;
  phone_country_code: string;
  code: number | null;
  password: string;
  token: string;
}

export interface IForgotPasswordState {
  phone_number: string;
  phone_country_code: string;
}

export interface ILoginFormState {
  phone_number: string;
  password: string;
  phone_country_code: string;
}
export interface ICheckTokenResponse {
  phone_number: string;
  phone_country_code: string;
  email: string;
  is_active: true;
  first_name: string;
  last_name: string;
  id: string;
  created_at: Date;
  updated_at: Date;
  role: {
    name: string;
    description: string;
    persian_name: string;
    id: string;
  };
  profile_image: {
    filename: string;
    url: string;
  };
}

export type UpsertShipmentMethodType = {
  id?: string;
  title: string;
  price: string;
  currency: 'IRT' | 'IRR';
  shop_id: string;
};

export type ShipmentMethodType = {
  id: string;
  title: string;
  price: string;
  currency: 'IRT' | 'IRR';
  shop_id: string;
};

export type UpsertProductType = {
  title: string;
  image: string;
  price: number;
  currency: string;
  category_id: string;
  variants: ProductVariantType[];
  attributes: ProductAttributeType[];
};

export type ProductVariantType = {
  id: string;
  title: string;
  price: number;
  currency: string;
  is_available: boolean;
}

export type ProductAttributeType = {
  key: string;
  value: string;
}

export type ProductType = {
  id: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  category: ProductCategoryType;
  created_at: Date;
  updated_at: Date;
  image_url: string;
  variants: ProductVariantType[];
  attributes: ProductAttributeType[];
};

export type InsertProductCategoryType = {
  title: string;
  image: string;
  shop_id: string;
};

export type UpdateProductCategoryType = {
  title: string;
  image: string;
};

export type ProductCategoryType = {
  title: string;
  image: string;
  id: string;
  image_url: string;
};

export type OrderItemType = {
  count: number;
  price: number;
  currency: string;
  title: string;
  image: string;
};

export enum OrderStatusEnum {
  UNPAID = 'UNPAID',
  PAYMENT_CHECK = 'PAYMENT_CHECK',
  ACCEPTED = 'ACCEPTED',
  PREPARATION = 'PREPARATION',
  SENT = 'SENT',
  DECLINED = 'DECLINED',
  PAYMENT_DECLINED = 'PAYMENT_DECLINED',
}

export type OrderType = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  state: string;
  city: string;
  address: string;
  postal_code: string;
  id: string;
  total_amount: number;
  currency: string;
  items: OrderItemType[];
  payment_method: string;
  shipment_method: string;
  status: OrderStatusEnum;
  payment_information: unknown;
};

export type OrderListType = {
  id: string;
  order_number: number;
  total_amount: number;
  currency: string;
  created_at: Date;
  first_name: string;
  last_name: string;
  phone_number: string;
  city: string;
  payment_method: string;
  shipment_method: string;
  status: OrderStatusEnum;
};

export type PaginationParamsType = {
  page: number;
  page_size: number;
};

export type TablePaginationType = {
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
};

export type ApiLocaleType = {
  fa: string;
  en: string;
};

export type OrderStatusConstantType = {
  value: OrderStatusEnum;
  title: ApiLocaleType;
};

export type UserRoleType = {
  name: string;
  description: string;
  persian_name: string;
  id: string;
};

export type UserProfileImageType = {
  filename: string;
  url: string;
};

export type UserInformationType = {
  id: string;
  phone_number: string;
  phone_country_code: string;
  email: string;
  is_active: boolean;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
  role: UserRoleType;
  profile_image: UserProfileImageType;
};

export type PaymentMethodInformationFieldKeyType = string;
export type PaymentMethodInformationFieldValueType = {
  name: string;
  title: string;
  is_required: boolean;
  type: 'string' | 'number';
};
export type PaymentMethodInformationFields = Record<
  PaymentMethodInformationFieldKeyType,
  PaymentMethodInformationFieldValueType
>;

export type PaymentMethodGroupType = {
  title: string;
  items: PaymentMethodType[];
};

export type PaymentMethodType = {
  id: string;
  title: string;
  description: string;
  // information_fields: PaymentMethodInformationFields;
  // information: Record<string, unknown>;
  is_active: boolean;
  // items: PaymentMethodType[];
};

export type PaymentMethodDetailType = {
  id: string;
  title: string;
  description: string;
  information_fields: PaymentMethodInformationFields;
  information: Record<string, unknown>;
  is_active: boolean;
};

export type ShopCreditType = {
  expires_at: string;
  is_expired: boolean;
};

export type ShopTableType = {
  title: string;
  id: string;
  url: string;
};

export type ShopCategoryType = {
  value: string;
  title: string;
}

export type ShopInformationType = {
  id: string;
  title: string;
  color_code: string;
};

export type PaginationType = {
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
};

export type ShopPlanType = {
  id: string;
  title: string;
  description: string;
  is_active: boolean;
  extend_days: number;
  extend_count: number;
  original_price: number;
  discounted_price: number;
  currency: string;
  discount_percentage: number;
  module: string;
  features: string[];
}

export type DashboardDailyReportType = {
  today_orders_count: number;
  today_orders_sum: number;
  today_orders_average: number;
};

export type ChartKeyValuePairType = {
  date: Date;
  value: number;
};

export type DashboardMonthlyReportType = {
  orders_count_per_day: ChartKeyValuePairType[];
  orders_amount_per_day: ChartKeyValuePairType[];
  orders_average_per_day: ChartKeyValuePairType[];
  orders_total_count: number;
  orders_total_amount: number;
  orders_total_average: number;
};

export type ShoppingCartItemType = {
  product: ProductType;
  count: number;
  variant?: ProductVariantType;
}

export type ShoppingCartType = {
  items: Record<string, Record<string, ShoppingCartItemType>>;
}