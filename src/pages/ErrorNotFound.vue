<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div class="text-h6">{{ $t('general.oops') }}</div>

      <div class="text-h4" style="opacity: 0.4">
        {{ $t('general.nothingHere') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        :label="$t('general.goBack')"
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
