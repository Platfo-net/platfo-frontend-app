<script setup lang="ts">
import { IProduct } from 'src/components/models';
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ShipmentMethodType, UpsertShipmentMethodType } from 'src/types';
import { useRoute } from 'vue-router';

const { t } = useI18n();

const props = defineProps<{
  shipmentMethod: ShipmentMethodType;
  showEdit?: boolean;
  showDelete?: boolean;
  deleteFn?: (productId: string) => void;
}>();

const { api } = useApi();
const notify = useNotify();
const route = useRoute();

const isEdit = ref(false);

const upsertModel = reactive<UpsertShipmentMethodType>({
  ...props.shipmentMethod,
});

const deleteAlert = ref(false);

const revertModel = () => {
  Object.assign(upsertModel, {
    ...props.shipmentMethod,
  });
};

const updateModel = async () => {
  try {
    const { data } = await api.put<IProduct>(
      `/shop/shipment-methods/${props.shipmentMethod.id}`,
      {
        ...upsertModel,
        shop_id: route.params.storeId as string,
      }
    );
    Object.assign(upsertModel, {
      ...data,
    });
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.notifications.updateShipmentMethodSuccess'
      )
    );
  } catch (err) {
    notify.error(
      t(
        'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.notifications.updateShipmentMethodError'
      )
    );
    revertModel();
  } finally {
    isEdit.value = false;
  }
};
</script>

<template>
  <div class="col-xs-12 col-sm-12 col-md-3">
    <q-dialog v-if="deleteFn && showDelete" v-model="deleteAlert">
      <q-card>
        <q-card-section>
          <div class="row items-center q-gutter-md">
            <q-icon name="info_outline" color="negative" size="md" />
            <div class="text-h6 text-negative">{{ $t('general.alert') }}</div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.messages.deleteAlertMessage1'
            )
          }}
          <span class="text-negative text-bold">{{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.messages.deleteAlertMessage2'
            )
          }}</span>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn :label="$t('general.no')" color="negative" v-close-popup />
          <q-btn
            flat
            :label="$t('general.yes')"
            color="green"
            @click="deleteFn(shipmentMethod.id)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card
      style="max-height: 378px; overflow-y: scroll"
      id="product-card"
      flat
      bordered
      class="q-pa-md card-hover non-selectable"
    >
      <!-- <q-inner-loading :showing="loading" /> -->
      <div class="row justify-end items-center q-mb-md q-gutter-sm">
        <q-btn
          :icon="!isEdit ? 'edit' : 'close'"
          size="sm"
          :color="!isEdit ? 'accent' : 'negative'"
          :flat="!isEdit"
          @click="isEdit = !isEdit"
          v-if="showEdit"
        />
        <q-btn
          v-if="!isEdit && showDelete"
          icon="delete"
          size="sm"
          color="negative"
          flat
          @click="deleteAlert = true"
        />
        <template v-if="isEdit">
          <q-btn icon="save" size="sm" color="green" @click="updateModel" />
        </template>
      </div>
      <div class="column q-mb-md">
        <div class="text-grey-8">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.fields.title'
            )
          }}
        </div>
        <template v-if="isEdit">
          <q-input type="text" v-model="upsertModel.title" clearable />
        </template>
        <template v-else>
          <div class="text-body1">{{ upsertModel.title }}</div>
        </template>
      </div>
      <div class="column q-mb-md">
        <div class="text-grey-8">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.fields.price'
            )
          }}
        </div>
        <template v-if="isEdit">
          <q-input
            type="number"
            v-model="upsertModel.price"
            step="0.01"
            clearable
            min="0"
            :hint="
              $t(
                'pages.panel.dashboard.manageStorePage.panels.shipmentMethods.fields.priceHint'
              )
            "
          />
        </template>
        <template v-else>
          <div class="text-body1">
            {{ $n(parseFloat(upsertModel.price as string)) }} تومان
          </div>
        </template>
      </div>
    </q-card>
  </div>
</template>
