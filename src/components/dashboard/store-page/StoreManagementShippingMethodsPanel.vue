<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useNotify } from 'src/composables/use-notify';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';
import { useShipmentMethodService } from 'src/services/useShipmentMethodService';
import { ShipmentMethodType, UpsertShipmentMethodType } from 'src/types';
import { useMeta } from 'quasar';
import StoreManagementShippingMethodItem from 'components/dashboard/store-page/StoreManagementShippingMethodItem.vue';

/** COMPONENT COMPOSABLES */

const { t } = useI18n();
const route = useRoute();
const notify = useNotify();
const shipmentMethodService = useShipmentMethodService();
useMeta({
  title: `${t(
    'pages.panel.dashboard.manageStorePage.tabs.shipmentMethods'
  )} | مدیریت فروشگاه`,
});

/************************ */

/** COMPONENT STATE */

const addItem = ref<boolean>(false);
const shipmentMethods = ref<ShipmentMethodType[]>([]);
const upsertModel = reactive<UpsertShipmentMethodType>({
  currency: 'IRT',
  price: '',
  shop_id: route.params.storeId as string,
  title: '',
});

/****************** */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT FUNCTIONS */

const createShipmentMethod = async () => {
  try {
    await shipmentMethodService.mutations.create(upsertModel);
    addItem.value = false;
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.notifications.createShipmentMethodSuccess'
      )
    );
  } catch (err) {
    notify.error(
      t(
        'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.notifications.createShipmentMethodError'
      )
    );
  }
};

const deleteShipmentMethod = async (id: string) => {
  try {
    await shipmentMethodService.mutations.remove(id);
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.notifications.deleteShipmentMethodSuccess'
      )
    );
    await shipmentMethodService.queries.getAll(route.params.storeId as string);
  } catch (err) {
    notify.error(
      t(
        'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.notifications.deleteShipmentMethodError'
      )
    );
  }
};

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

onMounted(async () => {
  shipmentMethods.value = await shipmentMethodService.queries.getAll(
    route.params.storeId as string
  );
});

/******************************* */
</script>

<template>
  <q-card class="q-pa-lg" bordered flat>
    <q-card-section>
      <div class="row justify-between items-center q-mb-md">
        <div class="text-h6">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.title'
            )
          }}
        </div>
        <q-btn
          :icon="addItem ? 'expand_less' : 'expand_more'"
          :label="$t('general.new')"
          size="sm"
          color="accent"
          @click="addItem = !addItem"
        />
      </div>
    </q-card-section>
    <q-card-section v-if="addItem">
      <q-card class="q-pa-md full-width" bordered square flat>
        <q-form @submit.prevent="createShipmentMethod">
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-12">
              <q-input
                class="q-mb-lg"
                square
                filled
                v-model="upsertModel.title"
                :label="`${$t(
                  'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.fields.title'
                )} *`"
                color="accent"
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    $t('general.fields.requiredStringField'),
                ]"
              />
            </div>
            <div class="col-md-6 col-12">
              <q-input
                dir="ltr"
                class="q-mb-lg"
                dense
                square
                filled
                type="number"
                v-model="upsertModel.price"
                step="any"
                :label="`${$t(
                  'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.fields.price'
                )} *`"
                :hint="
                  $t(
                    'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.fields.priceHint'
                  )
                "
                lazy-rules
                color="accent"
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    $t('general.fields.requiredNumberField'),
                  (val) =>
                    val >= 0 ||
                    $t('general.fields.requiredNumberFieldPositiveValue'),
                ]"
              />
            </div>
          </div>
          <div class="row q-gutter-md items-center">
            <q-btn
              @click="addItem = false"
              color="negative"
              icon="close"
              :label="$t('general.cancel')"
              size="sm"
            ></q-btn>
            <q-btn
              type="submit"
              color="green"
              icon="check"
              :label="$t('general.add')"
              size="sm"
              :disable="!(upsertModel.title.length && upsertModel.price.length)"
            ></q-btn>
          </div>
        </q-form>
      </q-card>
    </q-card-section>
    <q-card-section>
      <template v-if="shipmentMethodService.loading.value">
        <base-loading-spinner
          :loading="shipmentMethodService.loading.value"
        ></base-loading-spinner>
      </template>
      <template v-else-if="!shipmentMethods.length">
        <p class="q-pa-none q-ma-none">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.noShipmentMethods'
            )
          }}
        </p>
      </template>
      <template v-else>
        <div class="row q-gutter-sm">
          <template v-for="(x, idx) in shipmentMethods" :key="idx">
            <store-management-shipping-method-item
              :shipment-method="x"
              :delete-fn="deleteShipmentMethod"
              show-edit
              show-delete
            ></store-management-shipping-method-item>
          </template>
        </div>
      </template>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss"></style>
