<script setup lang="ts">
import { IProduct, IProductCategory } from 'src/components/models';
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
  product: IProduct;
  showEdit?: boolean;
  showDelete?: boolean;
  deleteFn?: (productId: string) => void;
  categories: IProductCategory[];
}>();

const { api, loading } = useApi();
const notify = useNotify();

const isEdit = ref(false);

const productModel = reactive<IProduct>({
  ...props.product,
});

const deleteAlert = ref(false);

const revertModel = () => {
  Object.assign(productModel, {
    ...props.product,
  });
};

const productCategory = ref(props.product.category?.id);

const updateModel = async () => {
  try {
    const { data } = await api.put<IProduct>(
      `/shop/products/${props.product.id}`,
      {
        ...productModel,
        category_id: productCategory.value,
      }
    );
    Object.assign(productModel, {
      ...data,
    });
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.productManagement.notifications.updateProductSuccess'
      )
    );
  } catch (err) {
    notify.error(
      t(
        'pages.panel.dashboard.manageStorePage.panels.productManagement.notifications.updateProductError'
      )
    );
    revertModel();
  } finally {
    isEdit.value = false;
    productCategory.value = productModel.category.id;
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
              'pages.panel.dashboard.manageStorePage.panels.productManagement.messages.deleteAlertMessage1'
            )
          }}
          <span class="text-negative text-bold">{{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.productManagement.messages.deleteAlertMessage2'
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
            @click="deleteFn(product.id)"
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
              'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.title'
            )
          }}
        </div>
        <template v-if="isEdit">
          <q-input type="text" v-model="productModel.title" clearable />
        </template>
        <template v-else>
          <div class="text-body1">{{ productModel.title }}</div>
        </template>
      </div>
      <div class="column q-mb-md">
        <div class="text-grey-8">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.category'
            )
          }}
        </div>
        <template v-if="isEdit">
          <q-select
            color="accent"
            lazy-rules
            class="q-my-md"
            :options="categories.map((x) => ({ label: x.title, value: x.id }))"
            square
            filled
            dense
            :label="`${$t(
              'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.category'
            )} *`"
            v-model="productCategory"
            emit-value
            map-options
          >
          </q-select>
        </template>
        <template v-else>
          <div class="text-body1">
            {{ productModel.category?.title || 'بدون دسته بندی' }}
          </div>
        </template>
      </div>
      <!-- <div class="text-caption text-grey">
                {{ product?.category?.title }}
            </div> -->
      <div class="column q-mb-md">
        <div class="text-grey-8">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.price'
            )
          }}
        </div>
        <template v-if="isEdit">
          <q-input
            type="number"
            v-model="productModel.price"
            step="0.01"
            clearable
            min="0"
            :hint="
              $t(
                'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.priceHint'
              )
            "
          />
        </template>
        <template v-else>
          <div class="text-body1">
            {{ $n(parseFloat(productModel.price as string)) }} تومان
          </div>
        </template>
      </div>
    </q-card>
  </div>
</template>
