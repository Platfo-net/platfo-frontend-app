<script setup lang="ts">
import { IPaymentMethod } from 'src/components/models';
import { useApi } from 'src/composables/use-api';
import { useNotify } from 'src/composables/use-notify';
import { reactive, ref } from 'vue';

const props = defineProps<{
  paymentMethod: IPaymentMethod;
  showEdit?: boolean;
  showDelete?: boolean;
  deleteFn?: (paymentMethodId: string) => void;
}>();

const { api, loading } = useApi();
const notify = useNotify();

const isEdit = ref(false);

const paymentMethodModel = reactive<IPaymentMethod>({
  ...props.paymentMethod,
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
          bank: paymentMethodModel.information_fields['Bank'],
          card_number: paymentMethodModel.information_fields['Card Number'],
          name: paymentMethodModel.information_fields['Name'],
        },
      }
    );
    notify.success('Update paymentMethod successful');
  } catch (err) {
    notify.error('Error while updating paymentMethod.');
    revertModel();
  } finally {
    isEdit.value = false;
  }
};
</script>

<template>
  <div class="col-xs-12 col-sm-12 col-md-3">
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
          Are you sure you want to delete this payment method?
          <span class="text-negative text-bold"
            >The paymentMethod will be lost forever.</span
          >
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
        <div class="text-grey-8">Title</div>
        <div class="text-h6">{{ paymentMethod.title }}</div>
      </div>

      <div class="column q-mb-md">
        <div class="text-grey-8 q-mb-sm">Information Fields</div>
        <q-card flat bordered>
          <q-card-section>
            <div
              class="column q-mb-md"
              v-for="key in Object.keys(paymentMethodModel.information)"
              :key="key"
            >
              <div class="text-grey-8">{{ key }}</div>
              <template v-if="isEdit">
                <template v-if="isEdit">
                  <q-input
                    type="text"
                    v-model="paymentMethodModel.information[key]"
                    clearable
                  /> </template
              ></template>
              <template v-else>
                <div class="text-h6">
                  {{ paymentMethodModel.information[key] }}
                </div>
              </template>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="column q-mb-md">
        <div class="text-grey-8">Is Active</div>
        <q-toggle disable v-model="paymentMethodModel.is_active" />
      </div>
    </q-card>
  </div>
</template>
