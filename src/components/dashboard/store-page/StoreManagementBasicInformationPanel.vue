<script setup lang="ts">
import { reactive, ref } from 'vue';
import { IShop } from 'components/models';

const props = defineProps({
  title: String,
  category: String,
  description: String,
});

const updateModel = reactive<Partial<IShop>>({
  description: props.description,
  title: props.title,
  category: props.category,
});

const isEdit = ref(false);

// TODO implement edit shop
</script>

<template>
  <q-card class="q-pa-lg" bordered square flat>
    <div class="row justify-between items-center q-mb-md">
      <div class="text-h6">Basic Information</div>
      <div class="q-gutter-sm">
        <q-btn
          :icon="!isEdit ? 'edit' : 'close'"
          :label="!isEdit ? 'edit' : ''"
          size="sm"
          :color="!isEdit ? 'accent' : 'negative'"
          :flat="!isEdit"
          @click="isEdit = !isEdit"
        >
          <q-tooltip v-if="isEdit"> Cancel edit </q-tooltip>
        </q-btn>
        <q-btn v-if="isEdit" icon="save" size="sm" color="green">
          <q-tooltip> Save Changes </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="row q-gutter-md">
      <div class="column col-12 col-md-4">
        <div class="text-caption text-grey-7">Title</div>
        <template v-if="isEdit">
          <q-input type="text" v-model="updateModel.title" />
        </template>
        <template v-else>
          <div class="text-h4">
            {{ title }}
          </div>
        </template>
      </div>
      <div class="column col-12 col-md-4">
        <div class="text-caption text-grey-7">Category</div>
        <template v-if="isEdit">
          <q-input type="text" v-model="updateModel.category" />
        </template>
        <template v-else>
          <div class="text-h4">
            {{ category }}
          </div>
        </template>
      </div>
      <div class="column col-12 col-md-4">
        <div class="text-caption text-grey-7">Title</div>
        <template v-if="isEdit">
          <q-input type="text" v-model="updateModel.description" />
        </template>
        <template v-else>
          <div class="text-h4">
            {{ description }}
          </div>
        </template>
      </div>
    </div>
  </q-card>
</template>

<style scoped lang="scss"></style>
