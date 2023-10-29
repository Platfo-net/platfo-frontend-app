import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { IShoppingCart } from 'stores/types';
import { LocalStorage } from 'quasar';
import { IProduct } from 'components/models';
import { useRoute } from 'vue-router';

export const SHOPPING_CART_KEY = 'shopping-cart';
export const useShoppingCart = defineStore('shopping-cart-store', () => {
  const { params } = useRoute();
  const initializeCart = (): IShoppingCart => {
    let shoppingCart = LocalStorage.getItem<IShoppingCart>(SHOPPING_CART_KEY);
    if (shoppingCart) return shoppingCart;
    shoppingCart = {
      items: {},
    };
    shoppingCart.items[params.shopId as string] = {};
    LocalStorage.set(SHOPPING_CART_KEY, shoppingCart);
    return shoppingCart;
  };

  const shoppingCart = reactive<IShoppingCart>(initializeCart());

  const update = () => {
    LocalStorage.set(SHOPPING_CART_KEY, shoppingCart);
  };

  const clear = () => {
    LocalStorage.set(SHOPPING_CART_KEY, {
      items: {},
      totalPrice: 0,
    } as IShoppingCart);
  };

  const getItemCount = (product: IProduct) => {
    return shoppingCart.items[params.shopId as string]?.[product.id]?.count;
  };

  const add = (product: IProduct) => {
    if (shoppingCart.items[params.shopId as string][product.id]) {
      shoppingCart.items[params.shopId as string][product.id].count += 1;
    } else {
      shoppingCart.items[params.shopId as string][product.id] = {
        count: 1,
        product,
      };
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
    const itemsKeys = Object.keys(shoppingCart.items[params.shopId as string]);
    if (!itemsKeys.length) return 0;
    return itemsKeys.reduce(
      (acc, productId) =>
        acc + shoppingCart.items[params.shopId as string]?.[productId]?.count,
      0
    );
  };

  const totalCartAmount = () =>
    Object.keys(shoppingCart.items[params.shopId as string]).reduce(
      (acc, productId) =>
        acc +
        shoppingCart.items[params.shopId as string]?.[productId]?.product
          .price *
          shoppingCart.items[params.shopId as string]?.[productId]?.count,
      0
    );

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
