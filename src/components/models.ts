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
  shop_id: string;
  id: string;
}

export interface ITelegramShopProductItemProps {
  product: IProduct;
}
