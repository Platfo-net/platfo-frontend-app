<script setup lang="ts"></script>

<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div class="text-h4">{{ $t('general.unauthorized') }}</div>

      <div class="text-h5" style="opacity: 0.4">
        {{ $t('general.notAllowedToViewPage') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        :to="{ name: 'LoginPage' }"
        :label="$t('general.backToLoginPage')"
        no-caps
      />
    </div>
  </div>
</template>

<style scoped></style>
