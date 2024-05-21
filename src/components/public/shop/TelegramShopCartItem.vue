<script setup lang="ts">
import { TelegramShopCartItemProps } from 'components/models';
import TomanSymbol from 'src/components/common/TomanSymbol.vue';
import { useShoppingCart } from 'stores/shopping-cart-store';

defineProps<TelegramShopCartItemProps>();
const shoppingCart = useShoppingCart();
</script>

<template>
  <q-card class="col-12 q-mb-md" bordered flat style="border-radius: 7px;">
    <div class="flex column q-pa-md">
      <div class="flex row" style="flex-wrap: nowrap;">
        <div class="full-width">
          <q-img style="border-radius: 4px; overflow: hidden; width: 100px; height: 100px; object-fit: cover;"
            :src="item.product.image_url" fit="cover" />
        </div>
        <div class="flex column full-width q-pa-sm">
          <div>{{ item.is_variant ? item.variant?.title : item.product.title }}</div>
          <div class="flex row q-my-sm">
            <q-icon name="category" color="primary"></q-icon>
            <small class="q-ml-sm">{{ item.product.category?.title || 'بدون دسته بندی' }}</small>
          </div>
        </div>
      </div>
      <div class="flex row justify-between items-center q-py-md q-px-sm">
        <div class="flex row">
          <div>
            {{
              Intl.NumberFormat('fa', {
                currency: 'IRT',
              }).format(item.count * item.price)
            }}
            <toman-symbol :size="16"></toman-symbol>
          </div>
        </div>
        <div class="flex row">
          <template v-if="item.count > 0">
            <div class="flex row q-pa-sm justify-center items-center"
              style="border: 1px solid #e2e2e2; border-radius: 4px; box-shadow: #e2e2e2 0px 0px 15px; width: 143px;">
              <q-btn @click="item.is_variant ? shoppingCart.add(item.product, item.variant!) : shoppingCart.add(item.product)" class="q-mx-sm" icon="add" color="white" text-color="grey-8"
                size="sm" dense flat></q-btn>
              <small class="q-mx-sm">{{ item.count }}</small>
              <q-btn @click="item.is_variant ? shoppingCart.remove(item.product, item.variant!) : shoppingCart.remove(item.product)" class="q-mx-sm" :icon="item.count === 1 ? 'delete' : 'remove'"
                :text-color="item.count === 1 ? 'red-8' : 'dark'" size="sm" dense flat></q-btn>
            </div>
          </template>
          <template v-else>
            <div class="flex row">
              <q-btn color="dark" label="افزودن به سبد خرید" @click="item.is_variant ? shoppingCart.add(item.product, item.variant!) : shoppingCart.add(item.product)"></q-btn>
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
