<script setup lang="ts">
import { QIcon } from 'quasar';
import { SidebarRoute } from 'src/composables/use-sidebar';

/** COMPONENT COMPOSABLES */

/************************ */

/** COMPONENT STATE */

/****************** */

/** COMPONENT DEFINES */

type BaseLayoutSidebarMenuProps = {
  routes: SidebarRoute[];
};
defineProps<BaseLayoutSidebarMenuProps>();

/******************** */

/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-scroll-area style="height: calc(100% - 161.6px); margin-top: 161.6px">
    <q-list padding>
      <div v-for="(route, idx) in routes" :key="route.title + idx">
        <q-item :active-class="route.activeClass?.length ? route.activeClass : 'bg-grey-3'
        " clickable v-if="!route.children?.length" :to="route.to">
          <q-item-section avatar>
            <q-icon :name="route.icon"></q-icon>
          </q-item-section>
          <q-item-section>
            {{ route.title }}
          </q-item-section>
        </q-item>
        <q-expansion-item v-else :label="route.title" :icon="route.icon">
          <div v-for="(innerRoute, innerIdx) in route.children" :key="innerRoute.title + innerIdx">
            <q-item :active-class="innerRoute.activeClass?.length
        ? innerRoute.activeClass
        : 'bg-grey-3'
        " v-if="!innerRoute.children?.length" :key="innerRoute.title + innerIdx" class="q-pl-xl" clickable
              :to="innerRoute.to">
              <q-item-section avatar>
                <q-icon :name="innerRoute.icon"></q-icon>
              </q-item-section>
              <q-item-section>
                {{ innerRoute.title }}
              </q-item-section>
            </q-item>
            <q-expansion-item header-class="q-pl-xl" v-else :label="innerRoute.title" :icon="innerRoute.icon">
              <q-item v-for="(
                  innerInnerRoute, innerInnerRouteIdx
                ) in innerRoute.children" :key="innerInnerRoute.title + innerInnerRouteIdx" class="pl-2xl" clickable
                :to="innerInnerRoute.to">
                <q-item-section avatar>
                  <q-icon :name="innerInnerRoute.icon"></q-icon>
                </q-item-section>
                <q-item-section>
                  {{ innerInnerRoute.title }}
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </div>
        </q-expansion-item>
      </div>
    </q-list>
  </q-scroll-area>
</template>

<style scoped></style>
