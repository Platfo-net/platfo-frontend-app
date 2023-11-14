<script setup lang="ts">
import { IProductCategory } from 'src/components/models';
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const props = defineProps<{
  productCategory: IProductCategory;
  showEdit?: boolean;
  showDelete?: boolean;
  deleteFn?: (productCategoryId: string) => void;
}>();

const { api, loading } = useApi();
const notify = useNotify();

const isEdit = ref(false);

const productCategoryModel = reactive<IProductCategory>({
  ...props.productCategory,
});

const deleteAlert = ref(false);

const revertModel = () => {
  Object.assign(productCategoryModel, {
    ...props.productCategory,
  });
};

const updateModel = async () => {
  try {
    await api.put<IProductCategory>(`/shop/categories/${props.productCategory.id}`, {
        title: productCategoryModel.title,
        shop_id: route.params.storeId
    });
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.productCategories.notifications.updateProductCategorySuccess'
      )
    );
  } catch (err) {
    notify.error(
      t(
        'pages.panel.dashboard.manageStorePage.panels.productCategories.notifications.updateProductCategoryError'
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
              'pages.panel.dashboard.manageStorePage.panels.productCategories.messages.deleteAlertMessage1'
            )
          }}
          <span class="text-negative text-bold">{{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.productCategories.messages.deleteAlertMessage2'
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
            @click="deleteFn ? deleteFn(productCategory.id) : null"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card
      id="product-card"
      flat
      bordered
      class="q-pa-md overflow-hidden card-hover non-selectable"
    >
      <q-inner-loading :showing="loading" />
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
      <!-- <div class="text-caption text-grey">
                {{ product?.category?.title }}
            </div> -->
      <div class="column q-mb-md">
        <div class="text-grey-8">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.productCategories.fields.title'
            )
          }}
        </div>
        <template v-if="isEdit">
          <q-input
            type="text"
            v-model="productCategoryModel.title"
            clearable
          />
        </template>
        <template v-else>
          <div class="text-body1">
            {{productCategoryModel.title}}
          </div>
        </template>
      </div>
    </q-card>
  </div>
</template>
