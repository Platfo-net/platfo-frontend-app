<template>
  <q-uploader
    class="q-my-md full-width"
    :url="getUploadPath"
    :label="$t('general.upload2mbLimit')"
    :headers="uploadHeaders"
    bordered
    flat
    field-name="file"
    @uploaded="uploadedEventHandler"
    auto-upload
  />
</template>

<script setup lang="ts">
import { QUploaderHeaderItem } from 'quasar';
import { useAuthStore } from 'src/stores/auth-store';
import { ref } from 'vue';
import { ImageType } from 'components/models';
const authStore = useAuthStore();

type BaseUploaderPropsType = {
  imageType?: ImageType;
};

// const getUploadPath = () => 'https://api.platfo.net/api/v1/file/upload/shop/product';
const getUploadPath = () => {
  switch (props.imageType) {
    case ImageType.ProductCategory:
      return `${process.env.API_BASEURL}/file/upload/shop/category`;
    default:
      return `${process.env.API_BASEURL}/file/upload/shop/product`;
  }
};
const uploadHeaders = ref<QUploaderHeaderItem[]>([
  { name: 'Authorization', value: 'Bearer ' + authStore.state.access_token },
]);
const uploadedEventHandler = (info: { files: readonly any[]; xhr: any }) => {
  emit('uploaded', info.xhr.response);
};
const emit = defineEmits<{
  (e: 'uploaded', response: string): void;
}>();
const props = defineProps<BaseUploaderPropsType>();
</script>

<style scoped></style>
