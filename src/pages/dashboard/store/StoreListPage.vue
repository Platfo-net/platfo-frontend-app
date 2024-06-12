<script setup lang="ts">
import StoreList from 'components/dashboard/store-page/StoreList.vue';
import LayoutBreadCrumbs from 'components/BreadCrumbs.vue';
import { ref } from 'vue';
import { CreateShopDto } from 'src/types';
import { useShopService } from 'src/services/useShopService';
import { useNotify } from 'src/composables/use-notify';
const notify = useNotify();
const shopService = useShopService();
const { mutateAsync: createShopAsync, isPending: createShopIsPending } = shopService.mutations.createShop();
const { data: shopCategories, isPending: isCategoriesLoading } = shopService.queries.getShopCategories();
const showCreateDialog = ref(false);
const createShopModel = ref<CreateShopDto>({
  title: '',
  description: '',
  category: '',
  color_code: ''
});
const handleFormSubmit = async () => {
  try {
    await createShopAsync(createShopModel.value);
    showCreateDialog.value = false;
    notify.success('ایجاد فروشگاه موفقیت آمیز بود', 'check');
  } catch (err) {
    notify.error('ایجاد فروشگاه با خطا مواجه شد', 'error');
  }
}
const clearCreateShopModel = () => createShopModel.value = {
  title: '',
  description: '',
  category: '',
  color_code: ''
};
</script>

<template>
  <q-page class="q-pa-md container">
    <LayoutBreadCrumbs />
    <q-dialog @hide="clearCreateShopModel" v-model="showCreateDialog">
      <q-card style="min-width: 367px">
        <q-card-section>
          <div class="text-h6">چت بات جدید</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="handleFormSubmit">
            <q-input class="q-mb-md" outlined label="عنوان *" type="text" v-model="createShopModel.title" lazy-rules
              :rules="[
      (val) =>
        (val && val.length > 0) ||
        $t('general.fields.requiredStringField'),
    ]"></q-input>
            <q-select v-model="createShopModel.category" outlined label="دسته بندی" :loading="isCategoriesLoading"
              lazy-rules :options="shopCategories?.map(({ title, value }) => ({ label: title, value }))" emit-value
              map-options :rules="[(val) => (val && val.length > 0) || 'لطفاً گزینه ای را انتخاب کنید']">
            </q-select>
            <q-input class="q-mb-md" outlined type="textarea" v-model="createShopModel.description" dense label="شرح"
              lazy-rules></q-input>
            <q-input label="تم رنگی فروشگاه" outlined dir="ltr" v-model="createShopModel.color_code"
              class="my-input q-mb-md">
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-color v-model="createShopModel.color_code" default-value="#ff9800" no-header no-footer />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-btn unelevated type="submit" class="q-mb-md full-width" color="teal-1" text-color="teal" label="ایجاد"
              :loading="createShopIsPending"></q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="row justify-between items-center q-mb-lg">
      <div class="text-h5">
        {{ $t('pages.panel.dashboard.storeListPage.title') }}
      </div>
      <q-btn @click="showCreateDialog = true" color="dark"
        :label="$t('pages.panel.dashboard.storeListPage.createNewStore')"></q-btn>
    </div>
    <StoreList />
  </q-page>
</template>

<style scoped></style>
