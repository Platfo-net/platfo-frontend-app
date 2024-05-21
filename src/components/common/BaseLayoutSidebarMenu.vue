<script setup lang="ts">
import { QIcon } from 'quasar';
import { SidebarRoute } from 'src/composables/use-sidebar';
import { useRoute } from 'vue-router';

/** COMPONENT COMPOSABLES */
const route = useRoute();
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
const isInnerRouteActive = (sidebarRoute: SidebarRoute) => sidebarRoute.children?.map(x => x.to?.name).includes(route.name as string);
/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-scroll-area style="height: calc(100% - 161.6px); margin-top: 161.6px">
    <q-list dense class="q-pa-md">
      <div v-for="(_route, idx) in routes" :key="_route.title + idx">
        <q-item dense class="q-my-sm rounded-borders" :active-class="_route.activeClass?.length ? _route.activeClass : 'bg-blue-1 text-blue'
        " clickable v-if="!_route.children?.length" :to="_route.to">
          <q-item-section avatar>
            <q-icon size="sm" :name="_route.icon"></q-icon>
          </q-item-section>
          <q-item-section>
            {{ _route.title }}
          </q-item-section>
        </q-item>
        <q-expansion-item :header-class="`rounded-borders ${isInnerRouteActive(_route) ? 'text-blue' : ''}`" dense
          class="q-my-sm rounded-borders" :default-opened="isInnerRouteActive(_route)" v-else :label="_route.title"
          :icon="_route.icon">
          <div v-for="(innerRoute, innerIdx) in _route.children" :key="innerRoute.title + innerIdx">
            <q-item dense :active-class="innerRoute.activeClass?.length
        ? innerRoute.activeClass
        : 'bg-blue-1 text-blue'
        " v-if="!innerRoute.children?.length" :key="innerRoute.title + innerIdx"
              class="q-pl-xl q-my-sm rounded-borders" clickable :to="innerRoute.to">
              <q-item-section avatar>
                <q-icon size="xs" :name="innerRoute.icon"></q-icon>
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
