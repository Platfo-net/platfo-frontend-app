<script setup lang="ts">
import TomanSymbol from 'src/components/common/TomanSymbol.vue';
import ChatbotCreditCard from 'src/components/dashboard/store-page/ChatbotCreditCard.vue';
import { useChatbotService } from 'src/services/useChatbotService';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

/** COMPONENT COMPOSABLES */
const route = useRoute();
const chatbotService = useChatbotService();
/************************ */

/** COMPONENT DEFINES */
type CreditSectionTabLink = { id: string, title: string, icon?: string; children?: CreditSectionTabLink[] }
const creditSections: CreditSectionTabLink[] = [
    // { id: 'chatbot_credit_report', title: 'وضعیت فعلی'},
    { id: 'chatbot_credit_transactions', title: 'صورت حساب ها' },
    { id: 'chatbot_credit_buy_subscription', title: 'خرید اشتراک' },
    // { id: 'chatbot_credit_transactions', title: 'تراکنش های سابق' },
]
/******************** */

/** COMPONENT STATE */
const showCreditDrawer = ref(false);
const manageCreditSection = ref<string>('chatbot_credit_transactions');
const { data: chatbotCreditSubscriptionPlans, isLoading: chatbotCreditSubscriptionPlansIsLoading } = chatbotService.credit.queries.getChatbotSubscriptionPlans();
const { data: chatbotCreditSubscriptionTransactions, isLoading: chatbotCreditSubscriptionTransactionsIsLoading } = chatbotService.credit.queries.getChatbotCreditTransactions(route.params.chatbotId as string);
const { mutateAsync: buyPlan, isPending: butPlanIsPending } = chatbotService.credit.mutations.buyPlan(route.params.chatbotId as string);
/****************** */


/** COMPONENT FUNCTIONS */

/********************** */

/** COMPONENT LIFECYCLE HANDLERS */

/******************************* */
</script>

<template>
    <q-card flat bordered>
        <q-layout container style="min-height: 800px;" view="hHh lpR fFf">
            <q-header bordered class="bg-white text-primary" height-hint="98">
                <q-toolbar>
                    <!-- <q-toolbar-title>مدیریت اعتبار</q-toolbar-title> -->
                    <q-btn flat :icon="showCreditDrawer ? 'chevron_right' : 'chevron_left'"
                        :label="showCreditDrawer ? 'بستن منو' : 'منو'" @click="showCreditDrawer = !showCreditDrawer" />
                </q-toolbar>
            </q-header>
            <q-drawer class="flex column justify-between q-pa-md" show-if-above v-model="showCreditDrawer" side="left"
                bordered>
                <q-list dense>
                    <template v-for="section in creditSections" :key="section.id">
                        <q-expansion-item
                            :default-opened="section.children.map(x => x.id).includes(manageCreditSection)" dense
                            v-if="section.children !== void 0" :label="section.title">
                            <q-list dense>
                                <q-item clickable v-ripple @click="manageCreditSection = sectionChildren.id"
                                    :active="manageCreditSection === sectionChildren.id" active-class="bg-grey-3"
                                    v-for="sectionChildren in section.children" :key="sectionChildren.id"
                                    class="q-pl-md">
                                    <q-item-section>{{ sectionChildren.title }}</q-item-section>
                                </q-item>
                            </q-list>
                        </q-expansion-item>
                        <q-item class="q-ma-sm rounded-borders" @click="manageCreditSection = section.id"
                            :active="manageCreditSection === section.id" active-class="bg-blue-1 text-blue" clickable
                            v-ripple v-else>
                            <q-item-section>{{ section.title }}</q-item-section>
                        </q-item>
                    </template>
                </q-list>
                <div class="q-pa-md">
                    <ChatbotCreditCard :chatbot-id="route.params.chatbotId as string"></ChatbotCreditCard>
                </div>
            </q-drawer>
            <q-page-container>
                <q-page class="q-pa-md">
                    <q-tab-panels v-model="manageCreditSection">
                        <q-tab-panel name="chatbot_credit_transactions">
                            <q-table flat bordered :columns="[
                        { label: 'نام اشتراک', name: 'title', field: 'title', align: 'left' },
                        { label: 'قابل پرداخت', name: 'amount', field: 'amount', align: 'left' },
                        { label: 'تاریخ سند', name: 'created_at', field: 'amount', align: 'left' },
                        { label: 'وضعیت پرداخت', name: 'is_paid', field: 'is_paid', align: 'left' },
                        { label: 'اشتراک مازاد', name: 'is_extra', field: 'is_extra', align: 'left' },
                        { label: 'تاریخ پرداخت', name: 'paid_at', field: 'paid_at', align: 'left' },
                        { label: 'تعداد روز افزایش', name: 'extend_days', field: 'extend_days', align: 'left' },
                        { label: 'تعداد چت', name: 'extend_chat_count', field: 'extend_chat_count', align: 'left' },
                        { label: 'تعداد توکن', name: 'extend_token_count', field: 'extend_token_count', align: 'left' },
                        { label: 'عملیات', name: 'actions', field: 'actions', align: 'left' },
                    ]" :rows="chatbotCreditSubscriptionTransactions"
                                :loading="chatbotCreditSubscriptionTransactionsIsLoading">
                                <template v-slot:body-cell-is_paid="props">
                                    <q-td>
                                        <q-badge :label="props.row.is_paid ? 'پرداخت شده' : 'پرداخت نشده'"
                                            :color="props.row.is_paid ? 'teal-1' : 'red-1'"
                                            :class="props.row.is_paid ? 'text-teal' : 'text-red'"></q-badge>
                                    </q-td>
                                </template>
                                <template v-slot:body-cell-is_extra="props">
                                    <q-td>
                                        <q-badge :label="props.row.is_extra ? 'بله' : 'خیر'"
                                            :color="props.row.is_extra ? 'teal-1' : 'red-1'"
                                            :class="props.row.is_extra ? 'text-teal' : 'text-red'"></q-badge>
                                    </q-td>
                                </template>
                                <template v-slot:body-cell-actions="props">
                                    <q-td>
                                        <q-btn :label="!props.row.is_paid ? 'پرداخت' : 'پرداخت شده'"
                                            :color="props.row.is_paid ? 'grey-4' : 'teal-1'"
                                            :text-color="props.row.is_paid ? 'grey' : 'teal'" size="sm" unelevated
                                            :disable="props.row.is_paid"></q-btn>
                                    </q-td>
                                </template>
                            </q-table>
                        </q-tab-panel>
                        <q-tab-panel name="chatbot_credit_buy_subscription">
                            <template v-if="chatbotCreditSubscriptionPlansIsLoading">
                                <q-linear-progress indeterminate size="2px" color="primary"></q-linear-progress>
                            </template>
                            <template v-else>
                                <div
                                    v-if="!chatbotCreditSubscriptionPlans || chatbotCreditSubscriptionPlans.length < 1">
                                    پلنی برای نمایش وجود ندارد...
                                </div>
                                <div v-else class="row q-col-gutter-md">
                                    <div v-for="plan in chatbotCreditSubscriptionPlans.filter(x => x.is_active)"
                                        :key="plan.uuid" class="col-12 col-md-4">
                                        <q-card flat bordered class="bg-grey-1">
                                            <q-card-section class="text-h5">
                                                اشتراک {{ plan.title }}
                                            </q-card-section>
                                            <q-card-section>
                                                <div class="text-body1 text-grey-8">توضیحات</div>
                                                <p class="q-ma-none">{{ plan.description }}</p>
                                            </q-card-section>
                                            <q-card-section>
                                                <div v-if="!plan.original_price" class="text-h6">
                                                    رایگان!
                                                </div>
                                                <div v-else class="text-h6">
                                                    {{ plan.original_price }} <TomanSymbol :size="24"></TomanSymbol> /
                                                    در
                                                    ماه
                                                </div>
                                            </q-card-section>
                                            <q-card-section style="border-top: 1px solid #e2e2e2;">
                                                <q-list>
                                                    <q-item>
                                                        <q-item-section side><q-icon
                                                                name="done"></q-icon></q-item-section>
                                                        <q-item-section>{{ plan.extend_days }} روزه</q-item-section>
                                                    </q-item>
                                                    <q-item>
                                                        <q-item-section side><q-icon
                                                                name="done"></q-icon></q-item-section>
                                                        <q-item-section>{{ plan.extend_token_count }}
                                                            توکن</q-item-section>
                                                    </q-item>
                                                    <q-item>
                                                        <q-item-section side><q-icon
                                                                name="done"></q-icon></q-item-section>
                                                        <q-item-section>{{ plan.extend_chat_count }} چت</q-item-section>
                                                    </q-item>
                                                </q-list>
                                            </q-card-section>
                                            <q-card-section style="border-top: 1px solid #e2e2e2;">
                                                <q-btn class="full-width" unelevated
                                                    :label="plan.original_price ? 'خرید اشتراک' : 'فعال سازی اشتراک'"
                                                    color="teal-1" text-color="teal" @click="async () => {
                        await buyPlan({
                            planId: plan.uuid,
                        });
                        manageCreditSection = 'chatbot_credit_transactions';
                    }" :loading="butPlanIsPending"></q-btn>
                                            </q-card-section>
                                        </q-card>
                                    </div>
                                </div>
                            </template>
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
