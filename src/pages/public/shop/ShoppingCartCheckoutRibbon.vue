<script setup lang="ts">
import { useShoppingCart } from 'stores/shopping-cart-store';
import { useApi } from 'src/composables/use-api';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import {
  ICreateShopOrderBody,
  ICreateShopOrderResponse,
  IShopOrderItem,
  IShopPaymentMethod,
} from 'src/composables/types';
import { useNotify } from 'src/composables/use-notify';

const { api, loading } = useApi();
const notify = useNotify();
const route = useRoute();
const shoppingCart = useShoppingCart();
function closeWebApp() {
  window.Telegram.WebApp.close();
}

const shopPaymentMethods = ref<IShopPaymentMethod[]>();
const getShopPaymentMethods = async (): Promise<IShopPaymentMethod[]> => {
  const response = await api.get<IShopPaymentMethod[]>(
    `/shop/payment-methods/${route.params.shopId}/telegram-shop/all`
  );
  return response.data;
};
const showConfirmDialog = ref<boolean>(false);
const showCheckoutSuccessDialog = ref<boolean>(false);
const createdOrderId = ref<string>('');

const checkout = async () => {
  let paymentMethodToSend: IShopPaymentMethod;
  if (!shopPaymentMethods.value) {
    notify.error('خطا در پردازش اطلاعات. لطفا بعدا سعی کنید.');
    return;
  }
  paymentMethodToSend = shopPaymentMethods.value[0];
  const shoppingCartItems =
    shoppingCart.get().items[route.params.shopId as string];
  let itemsToSend: IShopOrderItem[] = Object.keys(shoppingCartItems).map(
    (k): IShopOrderItem => {
      return {
        product_id: k,
        count: shoppingCartItems[k].count,
      };
    }
  );
  const dataToSend: ICreateShopOrderBody = {
    items: itemsToSend,
    payment_method_id: paymentMethodToSend.id,
  };
  try {
    const { data } = await api.post<ICreateShopOrderResponse>(
      `/shop/orders/telegram/${route.params.shopId}/${route.params.leadId}`,
      dataToSend
    );
    createdOrderId.value = data.order_number;
    showConfirmDialog.value = false;
    showCheckoutSuccessDialog.value = true;
  } catch (err) {
    notify.error('خطا در ثبت سفارش. لطفا بعدا تلاش کنید.');
  }
};

const cleanup = () => {
  shoppingCart.clear();
  createdOrderId.value = '';
  showCheckoutSuccessDialog.value = false;
  showConfirmDialog.value = false;
  closeWebApp();
};

onMounted(async () => {
  shopPaymentMethods.value = await getShopPaymentMethods();
});
</script>

<template>
  <div
    class="flex row q-pa-md items-center justify-between blur"
    style="border-bottom: 1px solid #e2e2e2"
  >
    <q-dialog class="font-vazir" v-model="showConfirmDialog">
      <q-card>
        <q-card-section dir="rtl">
          <div class="text-negative text-bold">هشدار</div>
        </q-card-section>
        <q-separator />
        <q-card-section dir="rtl">
          <p>آیا از محصولات انتخاب شده در سبد خرید اطمینان دارید؟</p>
        </q-card-section>
        <q-card-actions>
          <q-btn size="sm" color="primary" :loading="loading" @click="checkout"
            >بله</q-btn
          >
          <q-btn
            size="sm"
            color="negative"
            :disable="loading"
            @click="showConfirmDialog = false"
            >خیر</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog class="font-vazir" v-model="showCheckoutSuccessDialog">
      <q-card>
        <q-card-section dir="rtl">
          <div class="text-primary text-bold">ثبت موفق</div>
        </q-card-section>
        <q-separator />
        <q-card-section dir="rtl">
          <p>شماره سفارش شما ثبت شد:</p>
          <p class="text-bold">{{ createdOrderId }}</p>
          <p>
            لطفا برای مشاهده سفارش و پرداخت آن، گزینه «بازگشت به بات» را انتخاب
            کنید.
          </p>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn size="sm" color="primary" @click="cleanup"
            >بازگشت به بات</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-btn
      @click="showConfirmDialog = true"
      label="ثبت سفارش"
      color="primary"
    />
    <div class="flex column text-dark">
      <div class="text-bold">جمع سبد خرید</div>
      <div>
        {{
          Intl.NumberFormat('fa', {
            currency: 'IRT',
          }).format(shoppingCart.totalCartAmount())
        }}
        <i class="icony icony-toman"></i>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
