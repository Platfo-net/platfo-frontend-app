import { IProduct } from 'components/models';

export type AuthState = {
  access_token: string;
  token_type: string;
  isLoggedIn: boolean;
};

export interface ILoginApiResponse {
  access_token: string;
  token_type: string;
}

export interface IShoppingCartItem {
  // product_id: string;
  product: IProduct;
  count: number;
}

export interface IShoppingCart {
  items: Record<string, Record<string, IShoppingCartItem>>;
}
