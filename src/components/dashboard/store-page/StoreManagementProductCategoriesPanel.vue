<script setup lang="ts">
import { useApi } from 'src/composables/use-api';
import { onMounted, reactive, ref } from 'vue';
import { IProductCategory } from 'components/models';
import { useRoute } from 'vue-router';
import { AxiosError } from 'axios';
import { useI18n } from 'vue-i18n';
import { useNotify } from 'src/composables/use-notify';
import ProductCategoryItem from './ProductCategoryItem.vue';

const { t } = useI18n();

const { api, loading } = useApi();
const route = useRoute();
const notify = useNotify();

const addItem = ref<boolean>(false);

const productCategories = ref<IProductCategory[]>([]);
const productCategoryModel = reactive<IProductCategory>({
  id: '',
  title: '',
});

const getProductCategories = async () => {
  const response = await api.get<IProductCategory[]>(
    `/shop/categories/${route.params.storeId}/all`
  );
  productCategories.value = response.data;
};

const addProductCategory = async () => {
  try {
    await api.post('/shop/categories', {
      title: productCategoryModel.title,
      shop_id: route.params.storeId,
    });
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.productCategories.notifications.createProductCategorySuccess'
      )
    );
    addItem.value = false;
    await getProductCategories();
  } catch (err) {
    if (err instanceof AxiosError) {
      notify.error(
        t(
          'pages.panel.dashboard.manageStorePage.panels.productCategories.notifications.createProductCategoryError'
        )
      );
    }
  }
};

const deleteProductCategory = async (productCategoryId: string) => {
  try {
    await api.delete(`/shop/categories/${productCategoryId}`);
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.productCategories.notifications.deleteProductCategorySuccess'
      )
    );
    await getProductCategories();
  } catch (err) {
    notify.error(
      t(
        'pages.panel.dashboard.manageStorePage.panels.productCategories.notifications.deleteProductCategoryError'
      )
    );
  }
};

onMounted(async () => {
  await getProductCategories();
});
</script>

<template>
  <q-card class="q-pa-lg" bordered flat>
    <q-card-section>
      <div class="row justify-between items-center q-mb-md">
        <div class="text-h6">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.productCategories.title'
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
    <q-card-section>
      <q-card v-show="addItem" class="q-pa-md full-width" bordered square flat>
        <q-form @submit.prevent="addProductCategory">
          <q-input
            class="q-mb-lg"
            square
            filled
            v-model="productCategoryModel.title"
            :label="`${$t(
              'pages.panel.dashboard.manageStorePage.panels.productManagement.fields.title'
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
              :disable="!productCategoryModel.title.length"
            ></q-btn>
          </div>
        </q-form>
      </q-card>
    </q-card-section>
    <q-card-section>
      <div v-if="loading" class="flex justify-center items-lg-center">
        <q-spinner-dots size="md" />
      </div>
      <template v-else>
        <template v-if="!productCategories.length">
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
            <template v-for="(x, idx) in productCategories" :key="idx">
              <product-category-item
                :product-category="x"
                show-edit
                show-delete
                :delete-fn="deleteProductCategory"
              ></product-category-item>
            </template>
          </div>
        </template>
      </template>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss"></style>
