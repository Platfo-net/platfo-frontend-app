<script setup lang="ts">
import { ITelegramShopProductItemProps } from 'components/models';
import { useShoppingCart } from 'stores/shopping-cart-store';

defineProps<ITelegramShopProductItemProps>();
const shoppingCart = useShoppingCart();
</script>

<template>
  <q-card class="col-12 q-mb-md" bordered flat>
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
  </q-card>
</template>

<style scoped></style>
