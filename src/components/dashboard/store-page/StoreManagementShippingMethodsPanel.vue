<script setup lang="ts">
import { useApi } from 'src/composables/use-api';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AxiosError } from 'axios';
import { useI18n } from 'vue-i18n';
import { useNotify } from 'src/composables/use-notify';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';
import { useShipmentMethodService } from '../../../services/useShipmentMethodService';
import { ShipmentMethodType } from 'src/types';
import { useMeta } from 'quasar';


/** COMPONENT COMPOSABLES */

const { t } = useI18n();
const route = useRoute();
const notify = useNotify();
const shipmentMethodService = useShipmentMethodService();
useMeta({
  title: `${t('pages.panel.dashboard.manageStorePage.tabs.shipmentMethods')} | مدیریت فروشگاه`,
})

/************************ */

/** COMPONENT STATE */

const addItem = ref<boolean>(false);
const shipmentMethods = ref<ShipmentMethodType[]>([]);

/****************** */


/** COMPONENT DEFINES */


/******************** */


/** COMPONENT FUNCTIONS */


/********************** */


/** COMPONENT LIFECYCLE HANDLERS */

onMounted(async () => {
  shipmentMethods.value = await shipmentMethodService.queries.getAll(route.params.shopId as string);
});

/******************************* */


</script>

<template>
  {{ shipmentMethods }}
  <!-- <q-card class="q-pa-lg" bordered flat>
    <q-card-section>
      <div class="row justify-between items-center q-mb-md">
        <div class="text-h6">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.productCategories.title'
            )
          }}
        </div>
        <q-btn :icon="addItem ? 'expand_less' : 'expand_more'" :label="$t('general.new')" size="sm" color="accent"
          @click="addItem = !addItem" />
      </div>
    </q-card-section>
    <q-card-section v-if="addItem">
      <q-card class="q-pa-md full-width" bordered square flat>
        <q-form @submit.prevent="addShipmentMethod">
          <q-input class="q-mb-lg" square filled v-model="shipmentMethodModel.title" :label="`${$t(
            'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.title'
          )} *`" color="accent" lazy-rules dense :rules="[
  (val) =>
    (val && val.length > 0) ||
    $t('general.fields.requiredStringField'),
]" />
          <div class="row q-gutter-md items-center">
            <q-btn @click="addItem = false" color="negative" icon="close" :label="$t('general.cancel')" size="sm"></q-btn>
            <q-btn type="submit" color="green" icon="check" :label="$t('general.add')" size="sm"
              :disable="!shipmentMethodModel.title.length"></q-btn>
          </div>
        </q-form>
      </q-card>
    </q-card-section>
    <q-card-section>
      <template v-if="shipmentMethodService.loading">
        <base-loading-spinner :loading="shipmentMethodService.loading.value"></base-loading-spinner>
      </template>
      <template v-else-if="!shipmentMethods.length">
        <p class="q-pa-none q-ma-none">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.productCategories.noProductCategories'
            )
          }}
        </p>
      </template>
      <template v-else>
        <div class="row q-gutter-sm">
          <template v-for="(x, idx) in shipmentMethods" :key="idx">

          </template>
        </div>
      </template>
    </q-card-section>
  </q-card> -->
</template>

<style scoped lang="scss"></style>
