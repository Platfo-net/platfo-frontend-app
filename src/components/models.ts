export interface IShop {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface ICategory {
  title: string;
  id: string;
}

export interface IProduct {
  title: string;
  image: string;
  price: number;
  currency: string;
  id: string;
  category: ICategory;
  created_at: Date;
  updated_at: Date;
}

export interface IPaymentMethod {
  title: string;
  description: string;
  information_fields: Record<string, string>;
  information: Record<string, string>;
  id: string;
  is_active: boolean;
}

export interface ITelegramShopProductItemProps {
  product: IProduct;
}
