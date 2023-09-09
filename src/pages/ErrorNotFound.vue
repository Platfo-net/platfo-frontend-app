<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div class="text-h6">Oops!</div>

      <div class="text-h4" style="opacity: 0.4">Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        label="Go Back"
        @click="back()"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const { back } = useRouter();
</script>
