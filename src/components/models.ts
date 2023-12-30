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
  image_url?: string;
  price: number;
  currency: string;
  id: string;
  category: ICategory;
  created_at: Date;
  updated_at: Date;
}

export interface IProductCategory {
  id: string;
  image?: string;
  image_url?: string;
  title: string;
  shop_id: string;
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

export interface IUploadProductImageResponse {
  filename: string;
  url: string;
}
export enum ImageType {
  Product = 'product',
  ProductCategory = 'category',
}
