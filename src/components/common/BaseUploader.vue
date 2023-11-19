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
    />
</template>

<script setup lang="ts">
import { QUploaderHeaderItem } from 'quasar';
import { useAuthStore } from 'src/stores/auth-store';
import { ref } from 'vue';
const authStore = useAuthStore();

const getUploadPath = () => `${process.env.API_BASEURL}/file/upload/shop/product`;
const uploadHeaders = ref<QUploaderHeaderItem[]>([
    { name: 'Authorization', value: 'Bearer ' + authStore.state.access_token },
]);
const uploadedEventHandler = (info: { files: readonly any[]; xhr: any; }) => {
    emit('uploaded', info.xhr.response);
}
const emit = defineEmits<{
    (e: 'uploaded', response: string): void
}>()
</script>

<style scoped>

</style>