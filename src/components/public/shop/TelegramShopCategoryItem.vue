<template>
    <q-card class="q-hoverable shadow-4 cursor-pointer" v-ripple style="border-radius: 7px; border-bottom: orange 5px solid;" @click="goToShopCategoryProductsPage(id)">
        <!-- <q-img style="overflow: hidden;" src="https://placehold.co/100x100" fit="cover" /> -->
        <q-card-section class="text-center text-bold">
            <div>{{ title }}</div>
        </q-card-section>
    </q-card>
</template>

<script setup lang="ts">
import { IProductCategory } from 'src/components/models';
import { useRouter } from 'vue-router';
const router = useRouter();
function goToShopCategoryProductsPage(categoryId: string) {
    router.push({ name: 'ShopCategoryProductsPage', params: {
        categoryId,
    }, query: { categoryTitle: props.title }});
}

const props = defineProps<IProductCategory>();
</script>

<style scoped>

</style>