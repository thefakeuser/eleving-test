<template>
  <div class="ev-page subscription-step-wrapper">
    <div class="subscription-step-container">
      <ev-stepper
        :active-step="$route.params.step"
        :steps="subscriptionFormSteps"
      />

      <subscription-form
        :key="formRenderKey"
        :data="formData"
        :is-pending="isPending"
        :step="subscriptionFormSteps[activeStepIndex]"
        class="subscription-form"
        @next="toNextStep"
        @back="toPrevStep"
        @edit="isEditingDialog = true"
        @submit="submitFormData"
      />

      <ev-dialog
        v-model="isEditingDialog"
        width="490px"
      >
        <ev-box class="subscription-form-edit">
          <subscription-dialog-form
            :data="formData"
            @close="closeEditingDialog"
            @submit="setFormData"
          />
        </ev-box>
      </ev-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  StepperStep,
  SubscriptionStepRoutes,
  SubscriptionStepTitles,
  SubcriptionForm,
  SubcriptionFormEntity
} from '@/contracts/subscription'
import { EvBox, EvDialog, EvStepper } from '@/components/design-system'
import { SubscriptionForm, SubscriptionDialogForm } from '@/components/subscription'

export default Vue.extend({
  name: 'SubscriptionPageStep',

  components: {
    EvBox,
    EvDialog,
    EvStepper,
    SubscriptionDialogForm,
    SubscriptionForm
  },

  data () {
    return {
      subscriptionFormSteps: [
        {
          id: SubscriptionStepRoutes.PersonalInfo,
          title: SubscriptionStepTitles.PersonalInfo
        },
        {
          id: SubscriptionStepRoutes.Membership,
          title: SubscriptionStepTitles.Membership
        },
        {
          id: SubscriptionStepRoutes.Overview,
          title: SubscriptionStepTitles.Overview
        }
      ] as Array<StepperStep>,
      formData: new SubcriptionFormEntity() as SubcriptionForm,
      formRenderKey: 0 as number,
      isPending: false,
      isEditingDialog: false as boolean
    }
  },

  fetch () {
    this.syncStorageData()
  },

  fetchOnServer: false,

  computed: {
    activeStepIndex (): number {
      return this.subscriptionFormSteps.findIndex((step: StepperStep) => step.id === this.$route.params.step)
    }
  },

  methods: {
    closeEditingDialog (): void {
      this.isEditingDialog = false
    },

    getFormData (): SubcriptionForm {
      const item = sessionStorage.getItem('subscriptionForm')

      return item ? JSON.parse(item || '{}') : this.formData
    },

    setFormData (data: SubcriptionForm): void {
      if (!process.client) {
        return
      }

      sessionStorage.setItem('subscriptionForm', JSON.stringify(data))
      this.syncStorageData()
      this.formRenderKey += 1
    },

    syncStorageData (): void {
      if (process.server) {
        return
      }

      this.formData = this.getFormData()
    },

    async submitFormData (): Promise<void> {
      const API_MOCK_URL: string = '/api/weathered-cake-7pzeo094/record'

      try {
        this.isPending = true
        await this.$axios.$post(API_MOCK_URL, this.formData)
      } catch (err) {
      } finally {
        this.isPending = false
      }
    },

    toNextStep (data: SubcriptionForm): void {
      this.setFormData(data)
      const nextStep = this.subscriptionFormSteps[this.activeStepIndex + 1]
      this.$router.push(`/subscription/${nextStep.id}`)
    },

    toPrevStep (data: SubcriptionForm): void {
      this.setFormData(data)
      const previosStep = this.subscriptionFormSteps[this.activeStepIndex - 1]
      this.$router.push(`/subscription/${previosStep.id}`)
    }
  }
})
</script>

<style lang="scss" scoped>
  .subscription-step-wrapper {
    background-color: $light-color;
    padding: 100px 0 60px;
  }

  .subscription-step-container {
    max-width: 920px;
    margin: 0 auto;

    .subscription-form {
      width: 490px;
      margin: 80px auto;
    }
  }

  .subscription-form-edit {
    padding: 32px;
  }
</style>
