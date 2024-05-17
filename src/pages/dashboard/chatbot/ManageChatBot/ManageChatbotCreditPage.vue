<script setup lang="ts">
import { useChatbotService } from 'src/services/useChatbotService';
import { ref } from 'vue';

/** COMPONENT COMPOSABLES */
const chatbotService = useChatbotService();
/************************ */

/** COMPONENT DEFINES */
type CreditSectionTabLink = {
  id: string;
  title: string;
  icon?: string;
  children?: CreditSectionTabLink[];
};
const creditSections: CreditSectionTabLink[] = [
  { id: 'chatbot_credit_transactions', title: 'صورت حساب ها' },
];
/******************** */

/** COMPONENT STATE */
const showCreditDrawer = ref(false);
const manageCreditSection = ref<string>('chatbot_credit_transactions');
const {
  data: chatbotCreditSubscriptionTransactions,
  isLoading: chatbotCreditSubscriptionTransactionsIsLoading,
} = chatbotService.credit.queries.getChatbotCreditTransactions();
const { mutateAsync: payTransactionAsync, isPending: payTransactionIsPending } =
  chatbotService.credit.mutations.payTransaction();
/****************** */

/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
  <q-card flat bordered>
    <q-layout
      container
      style="min-height: 800px; max-height: 800px"
      view="hHh lpR fFf">
      <q-header bordered class="bg-white text-primary" height-hint="98">
        <q-toolbar>
          <q-btn
            flat
            :icon="showCreditDrawer ? 'chevron_right' : 'chevron_left'"
            :label="showCreditDrawer ? 'بستن منو' : 'منو'"
            @click="showCreditDrawer = !showCreditDrawer" />
        </q-toolbar>
      </q-header>
      <q-drawer
        class="flex column justify-between q-pa-md overflow-auto"
        show-if-above
        v-model="showCreditDrawer"
        side="left"
        bordered>
        <q-list dense>
          <template v-for="section in creditSections" :key="section.id">
            <q-expansion-item
              :default-opened="
                section.children.map((x) => x.id).includes(manageCreditSection)
              "
              dense
              v-if="section.children !== void 0"
              :label="section.title">
              <q-list dense>
                <q-item
                  clickable
                  v-ripple
                  @click="manageCreditSection = sectionChildren.id"
                  :active="manageCreditSection === sectionChildren.id"
                  active-class="bg-grey-3"
                  v-for="sectionChildren in section.children"
                  :key="sectionChildren.id"
                  class="q-pl-md">
                  <q-item-section>{{ sectionChildren.title }}</q-item-section>
                </q-item>
              </q-list>
            </q-expansion-item>
            <q-item
              class="q-ma-sm rounded-borders"
              @click="manageCreditSection = section.id"
              :active="manageCreditSection === section.id"
              active-class="bg-blue-1 text-blue"
              clickable
              v-ripple
              v-else>
              <q-item-section>{{ section.title }}</q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-drawer>
      <q-page-container>
        <q-page class="q-pa-md">
          <q-tab-panels v-model="manageCreditSection">
            <q-tab-panel name="chatbot_credit_transactions">
              <q-table
                flat
                bordered
                :columns="[
                  {
                    label: 'قابل پرداخت',
                    name: 'amount',
                    field: 'amount',
                    align: 'left',
                  },
                  {
                    label: 'تاریخ سند',
                    name: 'created_at',
                    field: 'created_at',
                    align: 'left',
                  },
                  {
                    label: 'وضعیت پرداخت',
                    name: 'is_paid',
                    field: 'is_paid',
                    align: 'left',
                  },
                  {
                    label: 'تاریخ پرداخت',
                    name: 'paid_at',
                    field: 'paid_at',
                    align: 'left',
                  },
                  {
                    label: 'عملیات',
                    name: 'actions',
                    field: 'actions',
                    align: 'left',
                  },
                ]"
                :rows="chatbotCreditSubscriptionTransactions || []"
                :loading="chatbotCreditSubscriptionTransactionsIsLoading">
                <template v-slot:body-cell-amount="props">
                  <q-td>
                    <q-badge
                      :label="
                        Intl.NumberFormat('fa-IR').format(props.row.amount) +
                        ' ت'
                      "
                      outline
                      color="blue"></q-badge>
                  </q-td>
                </template>
                <template v-slot:body-cell-is_paid="props">
                  <q-td>
                    <q-badge
                      :label="props.row.is_paid ? 'پرداخت شده' : 'پرداخت نشده'"
                      :color="props.row.is_paid ? 'teal-1' : 'red-1'"
                      :class="
                        props.row.is_paid ? 'text-teal' : 'text-red'
                      "></q-badge>
                  </q-td>
                </template>
                <template v-slot:body-cell-paid_at="props">
                  <q-td>
                    <q-badge
                      :label="props.row.is_paid ? 'پرداخت شده' : 'پرداخت نشده'"
                      :color="props.row.is_paid ? 'teal-1' : 'red-1'"
                      :class="
                        props.row.is_paid ? 'text-teal' : 'text-red'
                      "></q-badge>
                  </q-td>
                </template>
                <template v-slot:body-cell-created_at="props">
                  <q-td>
                    {{
                      new Date(props.row.created_at).toLocaleDateString('fa-IR')
                    }}
                  </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                  <q-td>
                    <q-btn
                      :label="props.row.can_pay ? 'پرداخت' : 'پرداخت شده'"
                      :color="!props.row.can_pay ? 'grey-4' : 'teal-1'"
                      :text-color="!props.row.can_pay ? 'grey' : 'teal'"
                      size="sm"
                      unelevated
                      :disable="!props.row.can_pay"
                      :loading="payTransactionIsPending"
                      @click="
                        async () => {
                          try {
                            await payTransactionAsync({
                              transactionId: props.row.uuid,
                            });
                            $q.notify({
                              color: 'teal-1',
                              textColor: 'teal',
                              message: 'در حال انتقال به صفحه پرداخت',
                            });
                          } catch (err) {}
                        }
                      "></q-btn>
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-card>
  <!-- <q-card flat bordered>
  </q-card> -->
</template>

<style scoped></style>
