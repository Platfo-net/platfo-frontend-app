<script setup lang="ts">
import { ProductType } from 'src/types';
import { useShoppingCart } from 'stores/shopping-cart-store';
import TomanSymbol from 'src/components/common/TomanSymbol.vue';
/** COMPONENT COMPOSABLES */

/************************ */

/** COMPONENT STATE */
defineProps<{
  product: ProductType;
}>();
const shopCart = useShoppingCart();
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <div class="flex row">
    <div>
      {{
        Intl.NumberFormat('fa', {
          currency: 'IRT',
        }).format(product.price)
      }}
      <toman-symbol :size="16"></toman-symbol>
    </div>
  </div>
  <div class="flex row">
    <template v-if="shopCart.getItemCount(product) > 0">
      <div
        class="flex row q-pa-sm justify-between items-center"
        style="
          border: 1px solid #e2e2e2;
          border-radius: 4px;
          box-shadow: #e2e2e2 0px 0px 15px;
          width: 143px;
        "
      >
        <q-btn
          @click="shopCart.add(product)"
          class="q-mx-sm"
          icon="add"
          color="white"
          text-color="grey-8"
          size="sm"
          dense
          flat
        ></q-btn>
        <small class="q-mx-sm">{{ shopCart.getItemCount(product) }}</small>
        <q-btn
          @click="shopCart.remove(product)"
          class="q-mx-sm"
          :icon="shopCart.getItemCount(product) === 1 ? 'delete' : 'remove'"
          :text-color="shopCart.getItemCount(product) === 1 ? 'red-8' : 'dark'"
          size="sm"
          dense
          flat
        ></q-btn>
      </div>
    </template>
    <template v-else>
      <div class="flex row">
        <q-btn
          color="dark"
          label="افزودن"
          @click="shopCart.add(product)"
          style="width: 143px"
        ></q-btn>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
