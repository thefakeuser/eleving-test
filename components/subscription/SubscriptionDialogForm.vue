<template>
  <subscription-form-ctrl :data="data">
    <template
      #default="{
        formState,
        getPhoneValue,
        setMembership,
        updatePhone,
        phoneOptions
      }"
    >
      <form>
        <!-- Dialog header -->
        <div class="d-flex align-center justify-space-between">
          <ev-heading-text>
            Edit information
          </ev-heading-text>

          <ev-button
            type="text"
            size="sm"
            class="close-btn"
            @click="$emit('close')"
          >
            Close
          </ev-button>
        </div>

        <!-- Dialog body -->
        <div class="dialog-body">
          <ev-text-field
            v-model="formState.firstName"
            :label="SubscrptionFormLabels.firstName"
          />

          <ev-text-field
            v-model="formState.lastName"
            :label="SubscrptionFormLabels.lastName"
          />

          <ev-text-field
            v-model="formState.email"
            :label="SubscrptionFormLabels.email"
          />

          <ev-option-text-field
            v-for="(_, key) in formState.phones"
            :key="key"
            :value="getPhoneValue(key)"
            :options="phoneOptions"
            :label="SubscrptionFormLabels.phone"
            type="number"
            @input="(value) => updatePhone(value, key)"
          />

          <div class="d-flex subscription-control">
            <ev-radio-checkbox
              v-for="plan in SubscriptionFormMembership"
              :key="plan"
              :label="plan"
              :value="plan === formState.membership"
              name="subscription"
              @change="() => setMembership(plan)"
            />
          </div>
        </div>

        <ev-button
          type="primary"
          size="lg"
          class="fill-width"
          @click="() => submitData(formState)"
        >
          Save
        </ev-button>
      </form>
    </template>
  </subscription-form-ctrl>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import {
  EvButton,
  EvHeadingText,
  EvTextField,
  EvOptionTextField,
  EvRadioCheckbox
} from '@/components/design-system'
import {
  SubcriptionForm,
  SubcriptionFormEntity,
  SubscrptionFormLabels,
  SubscriptionFormMembership,
  SubscrptionFormNames
} from '@/contracts/subscription'
import SubscriptionFormCtrl from '@/controllers/SubscriptionFormCtrl.vue'

export default Vue.extend({
  name: 'SubscriptionDialogForm',

  components: {
    EvButton,
    EvHeadingText,
    EvTextField,
    EvOptionTextField,
    EvRadioCheckbox,
    SubscriptionFormCtrl
  },

  props: {
    data: {
      type: Object,
      default: () => new SubcriptionFormEntity()
    } as PropOptions<SubcriptionForm>
  },

  data () {
    return {
      SubscrptionFormLabels: Object.freeze(SubscrptionFormLabels),
      SubscriptionFormMembership: Object.freeze(SubscriptionFormMembership),
      SubscrptionFormNames: Object.freeze(SubscrptionFormNames)
    }
  },

  methods: {
    submitData (formState: SubcriptionForm): void {
      this.$emit('submit', formState)
      this.$emit('close')
    }
  }
})
</script>

<style lang="scss" scoped>
  .fill-width {
    width: 100%;
  }

  .ev-button {
    &.close-btn {
      color: $grey-color;
    }
  }

  .dialog-body {
    margin-bottom: 45px;

    > div {
      margin-top: 15px;
    }
  }

  .subscription-control {
    div:first-child {
      margin-right: 30px;
    }
  }
</style>
