<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNotify } from 'src/composables/use-notify';
import { useI18n } from 'vue-i18n';
import { useApi } from 'src/composables/use-api';
import { useRoute } from 'vue-router';
import { IShop } from 'components/models';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';
import { useShopService } from 'src/services/useShopService';
import { getDaysFromNow } from 'src/utils';
import TomanSymbol from 'src/components/common/TomanSymbol.vue';
const { api, loading } = useApi();

const { t } = useI18n();

const shopModel = ref<Partial<IShop>>({});
const updateModel = ref<Partial<IShop>>({});

const isEdit = ref(false);

const route = useRoute();
const notify = useNotify();
const shopService = useShopService();

const { data: shopCredit } = shopService.queries.getShopCredit(
  route.params.storeId as string
);

const { data: shopCategories, isPending: isCategoriesLoading } = shopService.queries.getShopCategories();
const { data: shopPlans } = shopService.queries.getAllPlans();
const { mutateAsync } = shopService.mutations.extendShopPlan(route.params.storeId as string);
const showPlans = ref<boolean>(false);

const updateShop = async () => {
  try {
    await api.put<IShop>(
      `/shop/shop/${route.params.storeId}`,
      updateModel.value
    );
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.basicInformation.notifications.updateShopSuccess'
      )
    );
    shopModel.value = updateModel.value;
  } catch (err) {
    notify.error(
      t(
        'pages.panel.dashboard.manageStorePage.panels.basicInformation.notifications.updateShopError'
      )
    );
    updateModel.value = shopModel.value;
  } finally {
    isEdit.value = false;
  }
};

const toggleEdit = () => {
  isEdit.value = !isEdit.value;
  Object.assign(updateModel.value, shopModel.value);
};

onMounted(async () => {
  const r = await api.get(`/shop/shop/${route.params.storeId}`);
  shopModel.value = r.data;
  Object.assign(updateModel.value, shopModel.value);
});

const handleExtendBtn = async (planId: string) => {
  const { payment_url } = await mutateAsync(planId);
  window.location.assign(payment_url);
}
</script>

<template>
  <q-dialog full-width v-model="showPlans" >
    <q-card>
      <q-card-section class="text-h6">
        پلن ها
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <div class="q-mb-md" v-for="plan in shopPlans" :key="plan.id">
              <q-card v-if="plan.is_active">
                <q-card-section style="border-bottom: 1px solid #e2e2e2;">
                  {{ plan.title }}
                </q-card-section>
                <q-card-section>
                  میزان اعتبار: {{ plan.extend_days }} روز
                </q-card-section>
                <q-card-section>
                  قیمت: {{ plan.original_price }} <toman-symbol :size="16"></toman-symbol>
                </q-card-section>
                <q-card-section>
                  <q-btn @click="handleExtendBtn(plan.id)" color="primary" class="full-width">افزودن اعبتار</q-btn>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-card class="q-pa-lg q-mb-md" bordered flat>
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h6">
        {{
          $t(
            'pages.panel.dashboard.manageStorePage.panels.basicInformation.title'
          )
        }}
      </div>
      <base-loading-spinner :loading="loading"></base-loading-spinner>
      <div class="q-gutter-sm">
        <q-btn
          :icon="!isEdit ? 'edit' : 'close'"
          :label="!isEdit ? $t('general.edit') : ''"
          size="sm"
          :color="!isEdit ? 'accent' : 'negative'"
          :flat="!isEdit"
          @click="toggleEdit"
          :disable="loading"
        >
          <q-tooltip v-if="isEdit">
            {{ $t('general.cancelEdit') }}
          </q-tooltip>
        </q-btn>
        <q-btn
          v-if="isEdit"
          icon="save"
          size="sm"
          color="green"
          @click="updateShop"
          :loading="loading"
        >
          <q-tooltip> {{ $t('general.saveChanges') }} </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="row q-gutter-md">
      <div class="column col-12 col-md-4">
        <div class="text-caption text-grey-7">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.basicInformation.fields.title'
            )
          }}
        </div>
        <template v-if="isEdit">
          <q-input type="text" v-model="updateModel.title" />
        </template>
        <template v-else>
          <div class="text-body1">
            {{ shopModel.title }}
          </div>
        </template>
      </div>
      <div class="column col-12 col-md-4">
        <div class="text-caption text-grey-7">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.basicInformation.fields.category'
            )
          }}
        </div>
        <template v-if="isEdit">
          <q-select v-model="updateModel.category" :loading="isCategoriesLoading"
            lazy-rules :options="shopCategories?.map(({ title, value }) => ({ label: title, value }))" emit-value
            map-options :rules="[(val) => (val && val.length > 0) || 'لطفاً گزینه ای را انتخاب کنید']">
          </q-select>
        </template>
        <template v-else>
          <div class="text-body1">
            {{ shopCategories?.find(x => x.value == shopModel.category)?.title }}
          </div>
        </template>
      </div>
      <div class="column col-12 col-md-4">
        <div class="text-caption text-grey-7">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.basicInformation.fields.description'
            )
          }}
        </div>
        <template v-if="isEdit">
          <q-input type="text" v-model="updateModel.description" />
        </template>
        <template v-else>
          <div class="text-body1">
            {{ shopModel.description }}
          </div>
        </template>
      </div>
      <div class="column col-12 col-md-4">
        <div class="text-caption text-grey-7">
          تم رنگی فروشگاه
        </div>
        <template v-if="isEdit">
          <q-input
            v-model="updateModel.color_code"
            class="my-input"
          >
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-color v-model="updateModel.color_code" default-value="#ff9800" no-header no-footer />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- <q-color v-model="updateModel.color_code" class="q-my-md my-picker"  /> -->
          <!-- <input type="color" v-model="" /> -->
        </template>
        <template v-else>
          <div class="text-body1">
            <template v-if="!shopModel.color_code">
              تعریف نشده. پیش فرض
              <span dir="ltr"><code>#ff9800</code></span>
            </template>
            <template v-else>
              <div class="flex row q-gutter-md items-center">
                <code>{{ shopModel.color_code }}</code>
                <div :style="{ width: '20px', height: '20px', borderRadius: '1000px', border: '1px solid black', backgroundColor: shopModel.color_code }"></div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </q-card>
  <q-card bordered flat>
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="text-h6">اعتبار حساب</div>
        <q-btn color="dark" flat @click="showPlans = true">افزودن اعتبار</q-btn>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-md-6 col-12">
          <div class="text-body2 q-mb-md">اعتبار باقی مانده</div>
          <div>
            {{ getDaysFromNow(new Date(shopCredit?.expires_at as string)) || 0 }} روز
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss"></style>
