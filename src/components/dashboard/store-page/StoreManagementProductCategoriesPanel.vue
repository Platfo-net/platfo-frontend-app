<script setup lang="ts">
import { ref } from 'vue';

const addItem = ref<boolean>(false);
</script>

<template>
  <q-card class="q-pa-lg" bordered flat>
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
  </q-card>
</template>

<style scoped lang="scss">
:root {
}
</style>
