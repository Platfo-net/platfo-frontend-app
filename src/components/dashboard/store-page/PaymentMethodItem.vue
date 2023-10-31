<script setup lang="ts">
import { IPaymentMethod } from 'src/components/models';
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  paymentMethod: IPaymentMethod;
  showEdit?: boolean;
  showDelete?: boolean;
  deleteFn?: (paymentMethodId: string) => void;
}>();

const { api, loading } = useApi();
const notify = useNotify();
const { t } = useI18n();

const isEdit = ref(false);

const paymentMethodModel = reactive<IPaymentMethod>({
  ...props.paymentMethod,
  information: props.paymentMethod.information || {
    bank: '',
    card_number: '',
    name: '',
  },
});

const deleteAlert = ref(false);

const revertModel = () => {
  Object.assign(paymentMethodModel, {
    ...props.paymentMethod,
  });
};

const updateModel = async () => {
  try {
    await api.put<IPaymentMethod>(
      `/shop/payment-methods/${props.paymentMethod.id}/fill-data`,
      {
        information: {
          bank: paymentMethodModel.information['bank'],
          card_number: paymentMethodModel.information['card_number'],
          name: paymentMethodModel.information['name'],
        },
      }
    );
    notify.success(
      t(
        'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.notifications.updatePaymentMethodSuccess'
      )
    );
  } catch (err) {
    notify.error(
      t(
        'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.notifications.updatePaymentMethodError'
      )
    );
    revertModel();
  } finally {
    isEdit.value = false;
  }
};
</script>

<template>
  <div class="col-xs-12 col-sm-6 col-md-4">
    <q-dialog v-if="deleteFn && showDelete" v-model="deleteAlert">
      <q-card>
        <q-card-section>
          <div class="row items-center q-gutter-md">
            <q-icon name="info_outline" color="negative" size="md" />
            <div class="text-h6 text-negative">Alert</div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.messages.deleteWarning1'
            )
          }}
          <span class="text-negative text-bold">{{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.messages.deleteWarning2'
            )
          }}</span>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn label="No" color="negative" v-close-popup />
          <q-btn
            flat
            label="Yes"
            color="primary"
            @click="deleteFn(paymentMethod.id)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card
      id="paymentMethod-card"
      flat
      bordered
      class="q-pa-md overflow-hidden card-hover non-selectable"
    >
      <q-inner-loading :showing="loading" />
      <div class="row justify-end items-center q-mb-md q-gutter-sm">
        <q-btn
          :icon="!isEdit ? 'edit' : 'close'"
          size="sm"
          :color="!isEdit ? 'accent' : 'negative'"
          :flat="!isEdit"
          @click="isEdit = !isEdit"
          v-if="showEdit"
        />
        <q-btn
          v-if="!isEdit && showDelete"
          icon="delete"
          size="sm"
          color="negative"
          flat
          @click="deleteAlert = true"
        />
        <template v-if="isEdit">
          <q-btn icon="save" size="sm" color="green" @click="updateModel" />
        </template>
      </div>
      <div class="column q-mb-md">
        <div class="text-grey-8">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.fields.title'
            )
          }}
        </div>
        <div class="text-body1">کارت به کارت</div>
        <!--        <div class="text-body1">{{ paymentMethod.title }}</div>-->
        <!--        Payment Title hard coded. Dynamic feature later on. Reason: Only one payment method supported ATM.-->
      </div>

      <div class="column q-mb-md">
        <div class="text-grey-8 q-mb-sm">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.informationFields'
            )
          }}
        </div>
        <q-card flat bordered>
          <q-card-section>
            <div class="column q-mb-md">
              <div class="text-grey-8">
                {{
                  $t(
                    'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.fields.bank'
                  )
                }}
              </div>
              <template v-if="isEdit">
                <template v-if="isEdit">
                  <q-input
                    type="text"
                    v-model="paymentMethodModel.information['bank']"
                    clearable
                  /> </template
              ></template>
              <template v-else>
                <div class="text-body1">
                  {{ paymentMethodModel.information['bank'] }}
                </div>
              </template>
            </div>
            <div class="column q-mb-md">
              <div class="text-grey-8">
                {{
                  $t(
                    'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.fields.cardNumber'
                  )
                }}
              </div>
              <template v-if="isEdit">
                <template v-if="isEdit">
                  <q-input
                    type="text"
                    v-model="paymentMethodModel.information['card_number']"
                    clearable
                  /> </template
              ></template>
              <template v-else>
                <div class="text-body1">
                  {{ paymentMethodModel.information['card_number'] }}
                </div>
              </template>
            </div>
            <div class="column q-mb-md">
              <div class="text-grey-8">
                {{
                  $t(
                    'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.fields.name'
                  )
                }}
              </div>
              <template v-if="isEdit">
                <template v-if="isEdit">
                  <q-input
                    type="text"
                    v-model="paymentMethodModel.information['name']"
                    clearable
                  /> </template
              ></template>
              <template v-else>
                <div class="text-body1">
                  {{ paymentMethodModel.information['name'] }}
                </div>
              </template>
            </div>
            <!--            <div-->
            <!--              class="column q-mb-md"-->
            <!--              v-for="key in Object.keys(paymentMethodModel.information)"-->
            <!--              :key="key"-->
            <!--            >-->
            <!--              <div class="text-grey-8">{{ key }}</div>-->
            <!--              <template v-if="isEdit">-->
            <!--                <template v-if="isEdit">-->
            <!--                  <q-input-->
            <!--                    type="text"-->
            <!--                    v-model="paymentMethodModel.information[key]"-->
            <!--                    clearable-->
            <!--                  /> </template-->
            <!--              ></template>-->
            <!--              <template v-else>-->
            <!--                <div class="text-body1">-->
            <!--                  {{ paymentMethodModel.information[key] }}-->
            <!--                </div>-->
            <!--              </template>-->
            <!--            </div>-->
            <!-- ^^^^^^^^^^^ Dynamic model. Use if needed later on. -->
          </q-card-section>
        </q-card>
      </div>

      <div class="column q-mb-md">
        <div class="text-grey-8">
          {{
            $t(
              'pages.panel.dashboard.manageStorePage.panels.paymentConfiguration.fields.active'
            )
          }}
        </div>
        <q-toggle disable v-model="paymentMethodModel.is_active" />
      </div>
    </q-card>
  </div>
</template>
