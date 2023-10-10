<script setup lang="ts">
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const { api } = useApi();
const route = useRoute();
const notify = useNotify();

const paymentMethods = ref([]);

onMounted(async () => {
    try {
        const response = await api.get(`/shop/${route.params.storeId}/payment-methods/all`);
    } catch (err) {
        notify.error(err.message);
    }
});

const addItem = ref(false);
</script>

<template>
    <q-card class="q-pa-lg" bordered flat>
        <q-card-section>
            <div class="row justify-between items-center q-mb-md">
                <div class="text-h6">Payment Configuration</div>
                <q-btn :icon="addItem ? 'expand_less' : 'expand_more'" label="New" size="sm" color="accent"
                    @click="addItem = !addItem" />
            </div>
        </q-card-section>
        <q-card-section>
            <q-inner-loading :showing="loading"></q-inner-loading>
        </q-card-section>
    </q-card>
</template>