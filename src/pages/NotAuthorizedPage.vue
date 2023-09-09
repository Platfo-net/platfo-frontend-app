<script setup lang="ts"></script>

<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div class="text-h6">401 Unauthorized</div>

      <div class="text-h4" style="opacity: 0.4">
        You're not allowed to view this page.
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        :to="{ name: 'LoginPage' }"
        label="Go To Login Page"
        no-caps
      />
    </div>
  </div>
</template>

<style scoped></style>
