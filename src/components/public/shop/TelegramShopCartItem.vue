<script setup lang="ts">
import { ITelegramShopProductItemProps } from 'components/models';
import { ref } from 'vue';
import { useShoppingCart } from 'stores/shopping-cart-store';

const cartCount = ref(0);
const props = defineProps<ITelegramShopProductItemProps>();
const shoppingCart = useShoppingCart();
</script>

<template>
  <q-card class="col-12 q-mb-md" bordered flat>
    <q-card-section>
      <div class="text-h5">{{ product.title }}</div>
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
                icon="remove"
                color="negative"
                dense
                size="sm"
                @click="shoppingCart.remove(product)"
              ></q-btn>
            </template>
          </div>
        </div>
        <div class="flex column">
          <div>قیمت</div>
          <div>{{ product.price }} ریال</div>
        </div>
        <div class="flex column">
          <q-btn
            icon="delete"
            color="negative"
            label="حذف از سبد خرید"
            outline
            @click="shoppingCart.removeCartItem(product)"
          ></q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
