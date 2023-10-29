<script setup lang="ts">
import { reactive, ref } from 'vue';
import { IShop } from 'components/models';
import { useApi } from 'src/composables/use-api';
import { useRoute } from 'vue-router';
import { useNotify } from 'src/composables/use-notify';
import { useI18n } from 'vue-i18n';

const { api, loading } = useApi();

const props = defineProps({
  title: String,
  category: String,
  description: String,
});

const { t } = useI18n();

const shopModel = reactive<Partial<IShop>>({
  description: props.description,
  title: props.title,
  category: props.category,
});

const isEdit = ref(false);

const route = useRoute();
const notify = useNotify();

const revertShopModel = () => {
  Object.assign(shopModel, {
    description: props.description,
    title: props.title,
    category: props.category,
  });
};

const updateShop = async () => {
  try {
    await api.put<IShop>(`/shop/shop/${route.params.storeId}`, shopModel);
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.basicInformation.notifications.updateShopSuccess'
      )
    );
  } catch (err) {
    notify.error(
      t(
        'pages.panel.dashboard.manageStorePage.panels.basicInformation.notifications.updateShopError'
      )
    );
    revertShopModel();
  } finally {
    isEdit.value = false;
  }
};
</script>

<template>
  <q-card class="q-pa-lg" bordered flat>
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h6">
        {{
          $t(
            'pages.panel.dashboard.manageStorePage.panels.basicInformation.title'
          )
        }}
      </div>
      <div class="q-gutter-sm">
        <q-btn
          :icon="!isEdit ? 'edit' : 'close'"
          :label="!isEdit ? $t('general.edit') : ''"
          size="sm"
          :color="!isEdit ? 'accent' : 'negative'"
          :flat="!isEdit"
          @click="isEdit = !isEdit"
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
          <q-input type="text" v-model="shopModel.title" />
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
          <q-input type="text" v-model="shopModel.category" />
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
          <q-input type="text" v-model="shopModel.description" />
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
