<script setup lang="ts">
import { ITelegramShopProductItemProps } from 'components/models';
import { useShoppingCart } from 'stores/shopping-cart-store';

defineProps<ITelegramShopProductItemProps>();
const shoppingCart = useShoppingCart();
</script>

<template>
  <q-card class="col-12 q-mb-md" bordered flat style="border-radius: 7px;">
    <div class="flex column q-pa-md">
      <div class="flex row" style="flex-wrap: nowrap;">
        <div class="full-width">
          <div style="border-radius: 4px; overflow: hidden; width: 100px; height: 100px; object-fit: cover;">
            <img src="data:image/webp;base64,UklGRmoBAABXRUJQVlA4TF4BAAAvY8AYAAUkRZIcSf//W57qtGr0TMNoVSTVFEmsyIyuUeeN6L8Dt5EUyXsMrSw+Ql5i+V9dXntvl6I84VbzEqy1XN5oQps9jj7WUCqUJtwmVXiKWmBzmtBiDS+ZjUQy1jThpnsP74gsMrJKExoaLzBvjb38LlZpwi3fVphXze+DNU0YpNDOyxj5SW80Ie7y/OdS5sEI1hXnDeonZZow7Chzr8RtPucJfil/G7RDYRNGPi5GCwpNGH4jkUV7mhC8maVklmhtsI+MJgzvUwLRkSawYz4rOpZLHCPQhEeRAqg8gT7qaAIxAkZtuqinCQ1u/Ak97lEG3PaTRnRr9eAJUYecsW4i6MNYmnCDEdT/jyZEKfytiWLk/0cTbiAKna/NRjSBfbb+G6hNRrD1XJF5wi1SBlDnNIF9VvzadANCVAVwSTSh7bI6fyMFI6EJbMrc9b79tvAYmsUTXmL5998rEg==" alt="Image">
          </div>
        </div>
        <div class="flex column full-width q-pa-sm">
            <div>{{ product.title }}</div>
            <div class="flex row q-my-sm">
              <q-icon name="category" color="deep-purple"></q-icon>
              <small class="q-ml-sm">{{ product.category?.title || 'بدون دسته بندی' }}</small>
            </div>
          </div>
      </div>
      <div class="flex row justify-between items-center q-py-md q-px-sm">
        <div class="flex row">
          <div>
            {{
              Intl.NumberFormat('fa', {
                currency: 'IRT',
              }).format(product.price * shoppingCart.getItemCount(product))
            }}
          <i class="icony icony-toman"></i>
          </div>
        </div>
        <div class="flex row">
          <template v-if="shoppingCart.getItemCount(product) > 0">
            <div class="flex row q-pa-sm justify-center items-center" style="border: 1px solid #e2e2e2; border-radius: 4px; box-shadow: #e2e2e2 0px 0px 15px;">
              <q-btn @click="shoppingCart.add(product)" class="q-mx-sm" icon="add" color="white" text-color="grey-8" size="sm" dense flat></q-btn>
              <small class="q-mx-sm">{{ shoppingCart.getItemCount(product) }}</small>
              <q-btn @click="
                  shoppingCart.getItemCount(product) > 1
                    ? shoppingCart.remove(product)
                    : shoppingCart.removeCartItem(product)
                " class="q-mx-sm" :icon="shoppingCart.getItemCount(product) === 1 ? 'delete' : 'remove'" :text-color="shoppingCart.getItemCount(product) === 1 ? 'red-8' : 'dark'" size="sm" dense flat></q-btn>
            </div>
          </template>
          <template v-else>
            <div class="flex row">
              <q-btn color="dark" label="افزودن به سبد خرید" @click="shoppingCart.add(product)"></q-btn>
            </div>
          </template>
        </div>
      </div>
    </div>
  </q-card>
  <!-- <q-card class="col-12 q-mb-md" bordered flat>
    <q-card-section>
      <div class="text-body1">{{ product.title }}</div>
    </q-card-section>
    <q-card-section>
      <div class="flex row items-center justify-between full-width">
        <div>
          <div class="row q-gutter-md">
            <q-btn
              icon="add"
              color="primary"
              dense
              size="sm"
              @click="shoppingCart.add(product)"
            ></q-btn>
            <template v-if="shoppingCart.getItemCount(product) > 0">
              <div>{{ shoppingCart.getItemCount(product) }}</div>
              <q-btn
                :icon="
                  shoppingCart.getItemCount(product) > 1 ? 'remove' : 'delete'
                "
                color="negative"
                dense
                size="sm"
                @click="
                  shoppingCart.getItemCount(product) > 1
                    ? shoppingCart.remove(product)
                    : shoppingCart.removeCartItem(product)
                "
              ></q-btn>
            </template>
          </div>
        </div>
        <div class="flex column">
          <div>
            {{
              Intl.NumberFormat('fa', {
                currency: 'IRT',
              }).format(product.price * shoppingCart.getItemCount(product))
            }}
            <i class="icony icony-toman"></i>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card> -->
</template>

<style scoped></style>
