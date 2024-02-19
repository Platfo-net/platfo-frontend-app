<script setup lang="ts">
import { useShoppingCart } from 'stores/shopping-cart-store';
import { useApi } from 'src/composables/use-api';
import { useRoute } from 'vue-router';
import { computed, onMounted, reactive, ref } from 'vue';
import {
  ICreateShopOrderBody,
  ICreateShopOrderResponse,
  IShopOrderItem,
  IShopPaymentMethod,
  IShopShippingMethod,
} from 'src/composables/types';
import { useNotify } from 'src/composables/use-notify';
import TomanSymbol from 'src/components/common/TomanSymbol.vue';

const { api, loading } = useApi();
const notify = useNotify();
const route = useRoute();
const shoppingCart = useShoppingCart();
function closeWebApp() {
  window.Telegram.WebApp.close();
}

const shopPaymentMethods = ref<IShopPaymentMethod[]>();
const shopShippingMethods = ref<IShopShippingMethod[]>();

const getShopPaymentMethods = async (): Promise<IShopPaymentMethod[]> => {
  const response = await api.get<IShopPaymentMethod[]>(
    `/shop/payment-methods/telegram/${route.params.shopId}/all`
  );
  return response.data;
};

const getShopShippingMethods = async (): Promise<IShopShippingMethod[]> => {
  const response = await api.get<IShopShippingMethod[]>(
    `/shop/shipment-methods/telegram/${route.params.shopId}/all`
  );
  return response.data;
};
const showConfirmDialog = ref<boolean>(false);
const showCheckoutSuccessDialog = ref<boolean>(false);
const showCheckoutDialog = ref<boolean>(false);
const createdOrderId = ref<string>('');

const dataToSend = reactive<ICreateShopOrderBody>({
  items: [],
  payment_method_id: '',
  shipment_method_id: '',
});

const enableCheckout = computed(
  () =>
    dataToSend.shipment_method_id?.length ||
    !dataToSend.payment_method_id?.length
);

const checkout = async () => {
  if (!shopPaymentMethods.value) {
    notify.error('خطا در پردازش اطلاعات. لطفا بعدا سعی کنید.');
    return;
  }
  const shoppingCartItems =
    shoppingCart.get().items[route.params.shopId as string];
  dataToSend.items = Object.keys(shoppingCartItems).map((k): IShopOrderItem => {
    return {
      product_id: k,
      count: shoppingCartItems[k].count,
    };
  });
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
  shopShippingMethods.value = await getShopShippingMethods();
  dataToSend.payment_method_id = shopPaymentMethods.value[0].id;
  dataToSend.shipment_method_id = shopShippingMethods.value[0].id;
});
</script>

<template>
  <div
    class="flex row q-pa-md q-px-lg items-center justify-between blur"
    style="border-bottom: 1px solid #e2e2e2"
  >
    <q-dialog
      v-model="showCheckoutDialog"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white">
        <q-toolbar class="q-py-md bg-white shadow-10">
          <q-toolbar-title>تایید نهایی و پرداخت</q-toolbar-title>
          <q-btn
            round
            flat
            icon="close"
            @click="showCheckoutDialog = false"
          ></q-btn>
          <div style="font-size: 1.5rem" class="q-ml-lg text-bold"></div>
        </q-toolbar>
        <q-space></q-space>
        <q-card-section>
          <div class="text-body1">اطلاعات شخصی</div>
          <q-input
            class="q-my-md"
            dense
            outlined
            color="primary"
            v-model="dataToSend.first_name"
            name="first_name"
            label="نام"
          ></q-input>
          <q-input
            class="q-my-md"
            dense
            outlined
            color="primary"
            v-model="dataToSend.last_name"
            name="last_name"
            label="نام خانوادگی"
          ></q-input>
          <q-input
            dir="ltr"
            class="q-my-md"
            dense
            outlined
            color="primary"
            v-model="dataToSend.phone_number"
            name="phone_number"
            label="شماره تماس"
          ></q-input>
          <q-input
            class="q-my-md"
            dense
            outlined
            type="textarea"
            color="primary"
            v-model="dataToSend.address"
            name="address"
            label="آدرس محل سکونت"
          ></q-input>
        </q-card-section>
        <q-card-section>
          <div class="text-body1">روش ارسال</div>
          <template v-if="!shopShippingMethods?.length">
            روش ارسالی ثبت نشده است
          </template>
          <template v-else>
            <q-list>
              <q-item
                v-ripple
                class="q-my-md rounded-borders"
                style="border: 1px solid #e1e1e1"
                v-for="shippingMethod in shopShippingMethods"
                :key="shippingMethod.id"
                tag="label"
              >
                <q-item-section avatar>
                  <q-radio
                    v-model="dataToSend.shipment_method_id"
                    :val="shippingMethod.id"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ shippingMethod.title }}</q-item-label>
                  <q-item-label caption
                    >هزینه ارسال:
                    <span v-if="shippingMethod.price != 0">
                      {{
                        Intl.NumberFormat('fa', {
                          currency: 'IRT',
                        }).format(shippingMethod.price as number)
                      }}
                      <toman-symbol :size="12"></toman-symbol>
                    </span>
                    <span v-else>رایگان</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-card-section>
        <q-card-section>
          <div class="text-body1">روش پرداخت</div>
          <template
            v-for="paymentMethod in shopPaymentMethods"
            :key="paymentMethod.id"
          >
          <div dir="ltr">
            <!-- <pre><code>{{ paymentMethod }}</code></pre> -->
            <q-list>
              <q-item
                class="q-my-md rounded-borders"
                style="border: 1px solid #e1e1e1"
                tag="label"
              >
                <q-item-section avatar>
                  <q-radio
                    v-model="dataToSend.payment_method_id"
                    :val="paymentMethod.id"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ paymentMethod.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          
            <!-- <template v-if="paymentMethod.items.length">
              <template
                v-for="innerPm in paymentMethod.items"
                :key="innerPm.id"
              >
                <div class="q-ml-lg q-my-md">پراخت آنلاین</div>
                <q-list>
                  <q-item
                    class="q-my-md rounded-borders"
                    style="border: 1px solid #e1e1e1"
                    tag="label"
                  >
                    <q-item-section avatar>
                      <q-radio
                        v-model="dataToSend.payment_method_id"
                        :val="innerPm.id"
                        color="primary"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ innerPm.title }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </template>
            </template> -->
            <!-- <template>
              <div class="q-ml-lg q-my-md">پرداخت نقدی</div>
              <q-list>
                <q-item
                  class="q-my-md rounded-borders"
                  style="border: 1px solid #e1e1e1"
                  tag="label"
                >
                  <q-item-section avatar>
                    <q-radio
                      v-model="dataToSend.payment_method_id"
                      :val="paymentMethod.id"
                      color="primary"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ paymentMethod.title }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </template> -->
          </template>
        </q-card-section>
        <q-card-section>
          <div
            class="flex row q-pa-md q-px-lg items-center justify-between blur"
          >
            <div class="flex column text-dark">
              <div class="text-bold">{{ $t('general.payable') }}</div>
              <div>
                {{
                  Intl.NumberFormat('fa', {
                    currency: 'IRT',
                  }).format(
                    shoppingCart.totalCartAmount() +
                      (shopShippingMethods?.find(
                        (x) => x.id === dataToSend.shipment_method_id
                      )?.price as number)
                  )
                }}
                <toman-symbol :size="16"></toman-symbol>
              </div>
            </div>
            <!-- <q-btn @click="showCheckoutDialog = true" label="مرحله&zwnj;ی بعد" color="primary" /> -->
            <q-btn
              @click="showConfirmDialog = true"
              color="primary"
              :disable="!enableCheckout"
              >پرداخت سفارش</q-btn
            >
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog class="font-vazir" v-model="showConfirmDialog">
      <q-card>
        <q-card-section dir="rtl">
          <div class="text-negative text-bold">هشدار</div>
        </q-card-section>
        <q-separator />
        <q-card-section dir="rtl">
          <p>
            آیا از محصولات انتخاب شده در سبد خرید و اطلاعات ثبت شده اطمینان
            دارید؟
          </p>
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
          <q-btn size="sm" color="primary" @click="cleanup">بازگشت به بات</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="flex column text-dark">
      <div class="text-bold">مجموع سفارش</div>
      <div>
        {{
          Intl.NumberFormat('fa', {
            currency: 'IRT',
          }).format(shoppingCart.totalCartAmount())
        }}
        <toman-symbol :size="16"></toman-symbol>
      </div>
    </div>
    <q-btn
      @click="showCheckoutDialog = true"
      label="مرحله&zwnj;ی بعد"
      color="primary"
    />
  </div>
</template>

<style scoped></style>
