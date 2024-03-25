import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { IShoppingCart, IShoppingCartItem } from 'stores/types';
import { LocalStorage } from 'quasar';
import { IProduct } from 'components/models';
import { useRoute } from 'vue-router';
import { ProductType, ProductVariantType, ShoppingCartType } from 'src/types';

export const SHOPPING_CART_KEY = 'shopping-cart-v2.1';
export const useShoppingCart = defineStore('shopping-cart-store', () => {
  const { params } = useRoute();
  const initializeCart = (): ShoppingCartType => {
    let shoppingCart = LocalStorage.getItem<ShoppingCartType>(SHOPPING_CART_KEY);
    if (shoppingCart) {
      if (!shoppingCart.items[params.shopId as string]) {
        shoppingCart.items[params.shopId as string] = {};
      }
    } else {
      shoppingCart = {
        items: {},
      };
      shoppingCart.items[params.shopId as string] = {};
    }
    LocalStorage.set(SHOPPING_CART_KEY, shoppingCart);
    return shoppingCart;
  };

  const shoppingCart = reactive<ShoppingCartType>(initializeCart());

  const update = () => {
    LocalStorage.set(SHOPPING_CART_KEY, shoppingCart);
  };

  const clear = () => {
    // const shoppingCart: IShoppingCart = {
    //   items: {},
    // };
    shoppingCart.items[params.shopId as string] = {};
    LocalStorage.set(SHOPPING_CART_KEY, shoppingCart);
  };

  const getItemCount = (product: ProductType, variant?: ProductVariantType) => {
    if (!variant && !shoppingCart.items[params.shopId as string]?.[product.id]?.variant) {
      return shoppingCart.items[params.shopId as string]?.[product.id]?.count;
    } else {
      return shoppingCart.items[params.shopId as string]?.[product.id]?.count;
    }
  };

  const add = (product: ProductType, variant?: ProductVariantType) => {
    if (!variant) {
      if (shoppingCart.items[params.shopId as string][product.id]) {
        shoppingCart.items[params.shopId as string][product.id].count += 1;
      } else {
        shoppingCart.items[params.shopId as string][product.id] = {
          count: 1,
          product,
        };
      }
    } else {
      if (shoppingCart.items[params.shopId as string][product.id] && shoppingCart.items[params.shopId as string][product.id].variant) {
        shoppingCart.items[params.shopId as string][product.id].count += 1;
        shoppingCart.items[params.shopId as string][product.id].variant = variant;
      } else {
        shoppingCart.items[params.shopId as string][product.id] = {
          count: 1,
          product,
          variant,
        };
      }
    }
    update();
  };

  const remove = (product: IProduct) => {
    if (!shoppingCart.items[params.shopId as string][product.id]) {
      return;
    }
    shoppingCart.items[params.shopId as string][product.id].count -= 1;
    if (shoppingCart.items[params.shopId as string][product.id].count === 0)
      delete shoppingCart.items[params.shopId as string][product.id];
    update();
  };

  const removeCartItem = (product: IProduct) => {
    delete shoppingCart.items[params.shopId as string][product.id];
    update();
  };

  const totalItems = () => {
    const itemsKeys = Object.keys(
      shoppingCart.items[params.shopId as string] || {}
    );
    if (!itemsKeys.length) return 0;
    return itemsKeys.reduce(
      (acc, productId) =>
        acc + shoppingCart.items[params.shopId as string]?.[productId]?.count,
      0
    );
  };

  const totalCartAmount = () => {
    const itemsKeys = Object.keys(
      shoppingCart.items[params.shopId as string] || {}
    );
    if (!itemsKeys.length) return 0;
    return Object.keys(shoppingCart.items[params.shopId as string]).reduce(
      (acc, productId) =>
        acc +
        shoppingCart.items[params.shopId as string]?.[productId]?.product
          .price *
          shoppingCart.items[params.shopId as string]?.[productId]?.count,
      0
    );
  };

  const get = () => {
    return shoppingCart;
  };

  return {
    get,
    clear,
    getItemCount,
    add,
    remove,
    removeCartItem,
    totalItems,
    totalCartAmount,
  };
});
