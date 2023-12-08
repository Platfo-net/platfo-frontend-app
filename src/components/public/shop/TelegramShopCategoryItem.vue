<template>
    <q-card class="shadow-4" style="border-radius: 7px;">
        <q-img style="overflow: hidden;" src="https://placehold.co/100x100" fit="cover" />
        <q-card-section class="text-center text-bold bg-orange text-white">
            <div>{{ title }}</div>
        </q-card-section>
    </q-card>
</template>

<script setup lang="ts">
import { IProductCategory } from 'src/components/models';

defineProps<IProductCategory>();
</script>

<style scoped>

</style>