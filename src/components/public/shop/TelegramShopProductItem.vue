<script setup lang="ts">
import { ITelegramShopProductItemProps } from 'components/models';
import { ref } from 'vue';

const cartCount = ref(0);
const props = defineProps<ITelegramShopProductItemProps>();
</script>

<template>
  <q-card class="col-12 q-mb-md" bordered flat>
    <q-card-section>
      <div class="text-h5">{{ product.title }}</div>
    </q-card-section>
    <q-card-section>
      <div class="flex row items-center justify-between full-width">
        <div class="flex column">
          <div>قیمت</div>
          <div>{{ product.price }} ریال</div>
        </div>
        <div>
          <div class="row q-gutter-md">
            <q-btn
              icon="add"
              color="primary"
              dense
              size="sm"
              @click="cartCount += 1"
            ></q-btn>
            <template v-if="cartCount > 0">
              <div>{{ cartCount }}</div>
              <q-btn
                icon="remove"
                color="negative"
                dense
                size="sm"
                @click="cartCount -= 1"
              ></q-btn>
            </template>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped></style>
