<script setup lang="ts">
import { useProductsService } from 'src/services/useProductsService';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { UpsertProductType } from 'src/types';

/** COMPONENT COMPOSABLES */
const productsService = useProductsService();
const route = useRoute();
const upsertModel = ref<UpsertProductType>({
  category_id: '',
  currency: '',
  image: '',
  price: 0,
  title: '',
});
/************************ */

/** COMPONENT STATE */
/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */
onMounted(async () => {
  const product = await productsService.queries.getOneById(
    route.params.productId as string
  );
  // upsertModel.value = {
  //   currency: product.currency,
  //   image: ''
  // }
});
/******************************* */
</script>

<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="q-table__title">ویرایش محصول</div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
