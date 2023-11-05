export interface IRegisterFormState {
  phone_number: string;
  phone_country_code: string;
  first_name: string;
  last_name: string;
  password: string;
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
