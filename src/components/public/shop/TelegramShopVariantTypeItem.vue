<script setup lang="ts">
import { ProductType, ProductVariantType } from 'src/types';
import { useShoppingCart } from 'stores/shopping-cart-store';
import TomanSymbol from 'src/components/common/TomanSymbol.vue';
/** COMPONENT COMPOSABLES */

/************************ */

/** COMPONENT STATE */
defineProps<{
  product: ProductType;
  variant: ProductVariantType;
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
    {{ variant.title }}
  </div>
  <div class="flex row justify-between items-center q-py-md q-px-sm">
    <div class="flex row">
      <div>
        {{
          Intl.NumberFormat('fa', {
            currency: 'IRT',
          }).format(variant.price)
        }}
        <toman-symbol :size="16"></toman-symbol>
      </div>
    </div>
    <div class="flex row">
      <template v-if="shopCart.getItemCount(product, variant) > 0">
        <div class="flex row q-pa-sm justify-between items-center"
          style="border: 1px solid #e2e2e2; border-radius: 4px; box-shadow: #e2e2e2 0px 0px 15px; width: 143px;">
          <q-btn @click="shopCart.add(product, variant)" class="q-mx-sm" icon="add" color="white" text-color="grey-8"
            size="sm" dense flat></q-btn>
          <small class="q-mx-sm">{{ shopCart.getItemCount(product, variant) }}</small>
          <q-btn @click="shopCart.remove(product, variant)" class="q-mx-sm"
            :icon="shopCart.getItemCount(product, variant) === 1 ? 'delete' : 'remove'"
            :text-color="shopCart.getItemCount(product, variant) === 1 ? 'red-8' : 'dark'" size="sm" dense flat></q-btn>
        </div>
      </template>
      <template v-else>
        <div class="flex row">
          <q-btn color="dark" label="افزودن" @click="shopCart.add(product, variant)" style="width: 143px;"></q-btn>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
