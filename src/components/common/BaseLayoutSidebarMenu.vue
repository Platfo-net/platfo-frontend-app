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

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-scroll-area style="height: calc(100% - 161.6px); margin-top: 161.6px">
    <q-list padding>
      <div v-for="(_route, idx) in routes" :key="_route.title + idx">
        <q-item :active-class="_route.activeClass?.length ? _route.activeClass : 'bg-grey-3'
        " clickable v-if="!_route.children?.length" :to="_route.to">
          <q-item-section avatar>
            <q-icon :name="_route.icon"></q-icon>
          </q-item-section>
          <q-item-section>
            {{ _route.title }}
          </q-item-section>
        </q-item>
        <q-expansion-item :default-opened="_route.children.map(x => x.to?.name).includes(route.name!)" v-else
          :label="_route.title" :icon="_route.icon">
          <div v-for="(innerRoute, innerIdx) in _route.children" :key="innerRoute.title + innerIdx">
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
