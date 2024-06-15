<script setup lang="ts">
import { ref } from 'vue';
import ManageStoreProductCategoriesPage from '../ProductCategories/ManageStoreProductCategoriesPage.vue';
import ManageStoreProductsListPage from '../Products/ManageStoreProductsListPage.vue';
/** COMPONENT COMPOSABLES *
/************************ */

/** COMPONENT DEFINES */
type CreditSectionTabLink = {
  id: string;
  title: string;
  icon?: string;
  children?: CreditSectionTabLink[];
};
const creditSections: CreditSectionTabLink[] = [
  { id: 'store-management', title: 'محصولات', icon: 'list' },
  {
    id: 'store-catagory-management',
    title: 'دسته بندی محصولات',
    icon: 'catagory',
  },
];
/******************** */

/** COMPONENT STATE */
const showStoreDrawer = ref(false);
const manageCreditSection = ref<string>('store-management');
</script>

<template>
  <q-card flat bordered>
    <q-layout
      container
      style="min-height: 800px; max-height: 800px"
      view="hHh lpR fFf"
    >
      <q-header bordered class="bg-white text-primary" height-hint="98">
        <q-toolbar>
          <div class="flex row justify-between items-center full-width">
            <q-btn
              flat
              :icon="showStoreDrawer ? 'chevron_right' : 'chevron_left'"
              :label="showStoreDrawer ? 'بستن منو' : 'منو'"
              @click="showStoreDrawer = !showStoreDrawer"
            />
            <div class="text-body1">محصولات</div>
          </div>
          <!-- <q-toolbar-title>مدیریت اعتبار</q-toolbar-title> -->
        </q-toolbar>
      </q-header>
      <q-drawer
        class="flex column justify-between q-pa-md overflow-auto"
        show-if-above
        v-model="showStoreDrawer"
        side="left"
        bordered
      >
        <q-list dense>
          <template v-for="section in creditSections" :key="section.id">
            <q-expansion-item
              :default-opened="
                section.children.map((x) => x.id).includes(manageCreditSection)
              "
              dense
              v-if="section.children !== void 0"
              :label="section.title"
            >
              <q-list dense>
                <q-item
                  clickable
                  v-ripple
                  @click="manageCreditSection = sectionChildren.id"
                  :active="manageCreditSection === sectionChildren.id"
                  active-class="bg-grey-3"
                  v-for="sectionChildren in section.children"
                  :key="sectionChildren.id"
                  class="q-pl-md"
                >
                  <q-item-section>{{ sectionChildren.title }}</q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-item
              class="q-ma-sm rounded-borders"
              @click="manageCreditSection = section.id"
              :active="manageCreditSection === section.id"
              active-class="bg-blue-1 text-blue"
              clickable
              v-ripple
              v-else
            >
              <q-item-section>{{ section.title }}</q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-drawer>
      <q-page-container>
        <q-page class="q-pa-md">
          <q-tab-panels v-model="manageCreditSection">
            <q-tab-panel name="store-management">
              <ManageStoreProductsListPage />
            </q-tab-panel>
            <q-tab-panel name="store-catagory-management">
              <ManageStoreProductCategoriesPage />
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-card>
  <!-- <q-card flat bordered>
  </q-card> -->
</template>

<style scoped></style>
