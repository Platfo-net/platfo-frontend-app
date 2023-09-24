import { UnwrapRef } from 'vue';

export interface IRegisterByPhoneBody {
  phone_number: string;
  phone_country_code: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface IActivatePhoneByCodeBody {
  phone_number: string;
  phone_country_code: string;
  code: number;
  token: string;
}

export interface ISendActivationCodeBody {
  phone_number: string;
  phone_country_code: string;
}

export type ApiQueryResponse<T> = {
  isLoading: boolean;
  isError: boolean;
  data: UnwrapRef<T> | undefined;
};

export type ApiQueryProps = {
  endpoint: string;
  params?: object;
};

export interface ISendActivationCodeResponse {
  token: string;
}

export interface ICreateShopResponse {
  id: string;
  title: string;
  description: string;
  category: string;
  support_token: string;
}

export interface IRegisterTelegramBotResponse {
  id: string;
  first_name: string;
  username: string;
}
