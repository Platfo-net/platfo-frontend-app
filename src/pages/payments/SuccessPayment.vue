<script setup lang="ts">
import { useMeta } from 'quasar';
import { useRoute } from 'vue-router';

/** COMPONENT COMPOSABLES */
const route = useRoute();
useMeta(() => ({
  title: route.meta.title as string,
}));
/************************ */

/** COMPONENT DEFINES */

/******************** */

/** COMPONENT STATE */

/****************** */

/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex justify-center items-center bg-grey-3 q-pa-lg">
        <q-card flat bordered>
          <q-card-section class="text-teal text-h6">
            <q-icon name="check"></q-icon>
            پرداخت موفق
          </q-card-section>
          <q-card-section>
            <q-list bordered padding class="rounded-borders">
              <q-item>
                <q-item-section>
                  <q-item-label>شماره تراکنش</q-item-label>
                  <q-item-section dir="ltr" caption>{{
                    route.query.tid
                  }}</q-item-section>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions>
            <q-btn
              color="blue-1"
              text-color="blue"
              unelevated
              :to="route.query.backUrl"
              >بازگشت به پنل</q-btn
            >
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
