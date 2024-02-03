<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useNotify } from 'src/composables/use-notify';
import { useI18n } from 'vue-i18n';
import { useApi } from 'src/composables/use-api';
import { useRoute } from 'vue-router';
import { IShop } from 'components/models';
import BaseLoadingSpinner from 'components/common/BaseLoadingSpinner.vue';
import { useShopService } from 'src/services/useShopService';
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
</script>

<template>
  <q-card bordered flat class="q-mb-md">
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="text-h6">اعتبار حساب</div>
        <q-btn color="dark" flat>افزودن اعتبار</q-btn>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-md-6 col-12">
          <div class="text-body2 q-mb-md">اعتبار تا</div>
          <div>
            {{ new Date(shopCredit?.expires_at as string).toLocaleString('fa-IR') }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <q-card class="q-pa-lg" bordered flat>
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
          <q-input type="text" v-model="updateModel.category" />
        </template>
        <template v-else>
          <div class="text-body1">
            {{ shopModel.category }}
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
    </div>
  </q-card>
</template>

<style scoped lang="scss"></style>
