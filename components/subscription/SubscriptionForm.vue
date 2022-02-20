<template>
  <ev-box>
    <subscription-form-ctrl :data="data">
      <template
        #default="{
          availablePhonesToAdd,
          activePlanDescription,
          membershipPlans,
          formState,
          flattenedFormData,
          addPhone,
          deletePhone,
          getPhoneValue,
          setMembership,
          updatePhone,
          phoneOptions
        }"
      >
        <form>
          <ev-heading-text :text="step.title" />

          <fieldset v-if="step.id === SubscriptionStepRoutes.PersonalInfo">
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

            <div
              v-for="(_, key) in formState.phones"
              :key="key"
              class="d-flex align-flex-end justify-space-between"
            >
              <ev-option-text-field
                :value="getPhoneValue(key)"
                :options="phoneOptions"
                :label="SubscrptionFormLabels.phone"
                type="number"
                @input="(value) => updatePhone(value, key)"
              />

              <ev-button
                size="sm"
                type="default"
                class="delete-phone-btn"
                @click="() => deletePhone(key)"
              >
                Delete
              </ev-button>
            </div>

            <ev-button
              v-if="availablePhonesToAdd.length"
              type="text"
              size="sm"
              class="left-side-btn"
              @click="addPhone"
            >
              Add phone
            </ev-button>
          </fieldset>

          <fieldset v-if="step.id === SubscriptionStepRoutes.Membership">
            <ev-radio-checkbox
              v-for="plan in membershipPlans"
              :key="plan.name"
              :label="plan.name"
              :value="plan.name === formState.membership"
              name="subscription"
              @change="() => setMembership(plan.name)"
            />

            <p class="membership-description text-regular">
              {{ activePlanDescription }}
            </p>
          </fieldset>

          <fieldset v-if="step.id === SubscriptionStepRoutes.Overview">
            <div
              v-for="(field, value) in flattenedFormData"
              :key="value"
              class="text-regular main--text form-record"
            >
              <p class="d-flex align-center justify-flex-start">
                <span class="halp-width font-weight-bold">{{ SubscrptionFormLabels[value] || SubscrptionFormLabels.phone }}:</span>
                <span class="halp-width">{{ field }}</span>
              </p>
            </div>

            <ev-button
              type="text"
              size="sm"
              class="left-side-btn edit-info"
              @click="$emit('edit')"
            >
              Edit information
            </ev-button>
          </fieldset>

          <ev-button
            v-if="step.id !== SubscriptionStepRoutes.Overview"
            type="primary"
            size="lg"
            class="control-btn"
            @click="$emit('next', formState)"
          >
            Continue
          </ev-button>

          <ev-button
            v-if="step.id === SubscriptionStepRoutes.Overview"
            :is-disabled="isPending"
            :is-loading="isPending"
            type="primary"
            size="lg"
            class="control-btn"
            @click="$emit('submit', formState)"
          >
            Submit
          </ev-button>

          <ev-button
            v-if="step.id !== SubscriptionStepRoutes.PersonalInfo"
            :is-disabled="isPending"
            type="outlined"
            size="lg"
            class="control-btn"
            @click="$emit('back', formState)"
          >
            Back
          </ev-button>
        </form>
      </template>
    </subscription-form-ctrl>
  </ev-box>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import {
  SubcriptionForm,
  SubcriptionFormEntity,
  SubscrptionFormLabels,
  SubscriptionStepRoutes,
  StepperStep
} from '@/contracts/subscription'
import {
  EvBox,
  EvButton,
  EvRadioCheckbox,
  EvHeadingText,
  EvTextField,
  EvOptionTextField
} from '@/components/design-system'
import SubscriptionFormCtrl from '@/controllers/SubscriptionFormCtrl.vue'

export default Vue.extend({
  name: 'SubscriptionForm',

  components: {
    EvBox,
    EvButton,
    EvRadioCheckbox,
    EvHeadingText,
    EvTextField,
    EvOptionTextField,
    SubscriptionFormCtrl
  },

  props: {
    data: {
      type: Object,
      default: () => new SubcriptionFormEntity()
    } as PropOptions<SubcriptionForm>,

    isPending: {
      type: Boolean,
      default: false
    } as PropOptions<Boolean>,

    step: {
      type: Object,
      default: () => {}
    } as PropOptions<StepperStep>
  },

  data () {
    return {
      SubscrptionFormLabels: Object.freeze(SubscrptionFormLabels),
      SubscriptionStepRoutes: Object.freeze(SubscriptionStepRoutes)
    }
  }
})
</script>

<style lang="scss" scoped>
  form {
    padding: 32px;

    fieldset {
      padding: 0;
      margin: 0;
      border: none;

      > div {
        margin-top: 15px;
      }
    }

    .ev-button {
      &.left-side-btn {
        padding: 0;
        margin-top: 15px;
      }

      &.edit-info {
        margin-bottom: 45px;
      }
    }

    .delete-phone-btn {
      margin-left: 20px;
    }

    .control-btn {
      display: block;
      width: 100%;
      margin-top: 24px;
    }

    ::v-deep {
      .ev-radio-checkbox {
        label {
          text-transform: capitalize;
        }
      }
    }

    .membership-description {
      margin: 20px 0 32px 0;
    }

    .form-record {
      margin-bottom: 40px;
    }

    .halp-width {
      width: 50%;
    }
  }
</style>
