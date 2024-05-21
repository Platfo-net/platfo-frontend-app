<template>
    <q-img :width="width" :height="height" src="~assets/shop/nothing-to-show.svg"></q-img>
</template>

<script setup lang="ts">
defineProps<{
    width?: string;
    height?: string;
}>()
</script>