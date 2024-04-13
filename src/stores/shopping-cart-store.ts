import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { LocalStorage } from 'quasar';
import { IProduct } from 'components/models';
import { useRoute } from 'vue-router';
import { ProductType, ProductVariantType, ShoppingCartType } from 'src/types';

export const SHOPPING_CART_KEY = 'shopping-cart-v2.2';
export const useShoppingCart = defineStore('shopping-cart-store', () => {
  const { params: { shopId } } = useRoute();

  const initializeCarts = (): ShoppingCartType => {
    let carts = LocalStorage.getItem<ShoppingCartType>(SHOPPING_CART_KEY);
    if (carts) {
      const shopCart = carts.shop_carts.find(x => x.shop_id === shopId);
      if (!shopCart) {
        carts.shop_carts.push({
          shop_id: shopId as string,
          items: [],
        });
      }
    } else {
      carts = {
        shop_carts: [{
          shop_id: shopId as string,
          items: [],
        }],
      };
    }

    return carts;

    // if (shoppingCart) {
    //   if (!shoppingCart.items[params.shopId as string]) {
    //     shoppingCart.items[params.shopId as string] = {};
    //   }
    // } else {
    //   shoppingCart = {
    //     items: {},
    //   };
    //   shoppingCart.items[params.shopId as string] = {};
    // }

    // LocalStorage.set(SHOPPING_CART_KEY, shoppingCart);
    // return shoppingCart;
  };

  const all_carts = reactive<ShoppingCartType>(initializeCarts());

  const getShopCart = (shopId: string) => {
    return all_carts.shop_carts.find(x => x.shop_id === shopId) || null;
  }

  const update = () => {
    LocalStorage.set(SHOPPING_CART_KEY, all_carts);
  };

  const clear = () => {
    // const shoppingCart: IShoppingCart = {
    //   items: {},
    // };
    // shoppingCart.items[params.shopId as string] = {};
    LocalStorage.set(SHOPPING_CART_KEY, all_carts);
  };

  const getItemCount = (product: ProductType, variant?: ProductVariantType) => {
    const shopCart = getShopCart(shopId as string);
    if (shopCart) {
      if (!variant) {
        const item = shopCart.items.find(x => x.product.id === product.id && x.is_variant === false);
        if (!item) return 0;
        return item.count;
      } else {
        const item = shopCart.items.find(x => x.product.id === product.id && x.is_variant === true && x.variant?.id === variant.id);
        if (!item) return 0;
        return item.count;
      }
    } else {
      throw new Error('Shop cart was not initialized');
    }
    // if (!variant && !shoppingCart.items[params.shopId as string]?.[product.id]?.variant) {
    //   return shoppingCart.items[params.shopId as string]?.[product.id]?.count;
    // } else {
    //   return shoppingCart.items[params.shopId as string]?.[product.id]?.count;
    // }
  };

  const add = (product: ProductType, variant?: ProductVariantType) => {
    const shopCart = getShopCart(shopId as string);
    if (shopCart) {
      if (!variant) {
        const itemIndex = shopCart.items.findIndex(x => x.product.id === product.id && x.is_variant === false);
        if (itemIndex === -1) {
          shopCart.items.push({ count: 1, is_variant: false, product, variant: null, price: product.price });
        } else {
          shopCart.items[itemIndex].count += 1;
        }
      } else {
        const itemIndex = shopCart.items.findIndex(x => x.product.id === product.id &&
          x.is_variant === true && x.variant?.id === variant.id);
        if (itemIndex === -1) {
          shopCart.items.push({ count: 1, is_variant: true, product, variant, price: variant.price });
        } else {
          shopCart.items[itemIndex].count += 1;
        }
      }
      update();
    } else {
      throw new Error('Shop cart was not initialized');
    }
    // if (!variant) {
    //   if (shoppingCart.items[params.shopId as string][product.id]) {
    //     shoppingCart.items[params.shopId as string][product.id].count += 1;
    //   } else {
    //     shoppingCart.items[params.shopId as string][product.id] = {
    //       count: 1,
    //       product,
    //     };
    //   }
    // } else {
    //   if (shoppingCart.items[params.shopId as string][product.id] && shoppingCart.items[params.shopId as string][product.id].variant) {
    //     shoppingCart.items[params.shopId as string][product.id].count += 1;
    //     shoppingCart.items[params.shopId as string][product.id].variant = variant;
    //   } else {
    //     shoppingCart.items[params.shopId as string][product.id] = {
    //       count: 1,
    //       product,
    //       variant,
    //     };
    //   }
    // }
    
  };

  const remove = (product: ProductType, variant?: ProductVariantType) => {
    const shopCart = getShopCart(shopId as string);
    if (shopCart) {
      if (!variant) {
        const itemIndex = shopCart.items.findIndex(x => x.product.id === product.id &&
          x.is_variant === false && x.variant === null);
        if (itemIndex === -1) return;
        shopCart.items[itemIndex].count -= 1;
        if (shopCart.items[itemIndex].count === 0) {
          shopCart.items.splice(itemIndex, 1);
        }
      } else {
        const itemIndex = shopCart.items.findIndex(x => x.product.id === product.id &&
          x.is_variant === true && x.variant?.id === variant.id);
        if (itemIndex === -1) return;
        shopCart.items[itemIndex].count -= 1;
        if (shopCart.items[itemIndex].count === 0) {
          shopCart.items.splice(itemIndex, 1);
        }
      }
      update();
    } else {
      throw new Error('Shop cart was not initialized');
    }
    // if (!shoppingCart.items[params.shopId as string][product.id]) {
    //   return;
    // }
    // shoppingCart.items[params.shopId as string][product.id].count -= 1;
    // if (shoppingCart.items[params.shopId as string][product.id].count === 0)
    //   delete shoppingCart.items[params.shopId as string][product.id];
  };

  // const removeCartItem = (product: ProductType, variant?: ProductVariantType) => {
  //   // delete shoppingCart.items[params.shopId as string][product.id];
  //   update();
  // };

  const totalItems = () => {
    const shopCart = getShopCart(shopId as string);
    if (shopCart) {
      return shopCart.items.reduce((acc, item) => acc + item.count, 0);
      // update();
    } else {
      throw new Error('Shop cart was not initialized');
    }
    // const itemsKeys = Object.keys(
    //   shoppingCart.items[params.shopId as string] || {}
    // );
    // if (!itemsKeys.length) return 0;
    // return itemsKeys.reduce(
    //   (acc, productId) =>
    //     acc + shoppingCart.items[params.shopId as string]?.[productId]?.count,
    //   0
    // );
  };

  const totalCartAmount = () => {
    const shopCart = getShopCart(shopId as string);
    if (shopCart) {
      return shopCart.items.reduce((acc, item) => acc + item.price * item.count, 0);
    } else {
      throw new Error('Shop cart was not initialized');
    }
    // const itemsKeys = Object.keys(
    //   shoppingCart.items[params.shopId as string] || {}
    // );
    // if (!itemsKeys.length) return 0;
    // return Object.keys(shoppingCart.items[params.shopId as string]).reduce(
    //   (acc, productId) =>
    //     acc +
    //     shoppingCart.items[params.shopId as string]?.[productId]?.product
    //       .price *
    //       shoppingCart.items[params.shopId as string]?.[productId]?.count,
    //   0
    // );
  };

  const get = () => {
    const shopCart = getShopCart(shopId as string);
    if (shopCart) return shopCart;
    throw new Error('Shop cart was not initialized.');
  };

  return {
    get,
    clear,
    getItemCount,
    add,
    remove,
    // removeCartItem,
    totalItems,
    totalCartAmount,
  };
});
