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
};

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
};

export type ProductCategoryType = {
  id: string;
  image?: string;
  image_url?: string;
  title: string;
  shop_id: string;
};
