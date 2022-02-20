<template>
  <div>
    <div class="d-flex justify-space-between">
      <div
        v-for="(step, index) in steps"
        :key="`${step.id}`"
        :class="{'active': isStepPassed(step.id)}"
        class="el-stepper-step d-flex align-center justify-center"
      >
        <div class="el-stepper-step__body d-flex flex-column align-center">
          <div
            class="el-stepper-step__body_point text-lg font-weight-bold d-flex align-center justify-center"
            :class="{
              'primary--text': isStepPassed(step.id),
              'secondary--text': !isStepPassed(step.id)
            }"
          >
            <slot
              name="step-point"
              :step="step"
            >
              {{ index + 1 }}
            </slot>
          </div>
        </div>
      </div>
    </div>

    <div class="ev-stepper-titles d-flex align-center justify-space-between">
      <div
        v-for="step in steps"
        :key="`title_${step.id}`"
        class="text-subtitle d-flex justify-center flex-grow"
        :class="{
          'main--text': isStepPassed(step.id),
          'secondary--text': !isStepPassed(step.id)
        }"
      >
        <slot
          name="step-title"
          :step="step"
        >
          {{ step.title }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { StepperStep } from '@/contracts/subscription'

export default Vue.extend({
  name: 'EvStepper',

  props: {
    activeStep: {
      type: String,
      default: ''
    } as PropOptions<String>,

    steps: {
      type: Array,
      required: true
    } as PropOptions<StepperStep[]>
  },

  methods: {
    isStepPassed (id: string | number): boolean {
      const targetStepIndex = this.steps.findIndex((step: StepperStep): boolean => step.id === id)
      const activeStepIndex = this.steps.findIndex((step: StepperStep): boolean => step.id === this.activeStep)

      return activeStepIndex >= targetStepIndex
    }
  }
})
</script>

<style lang="scss" scoped>
  .el-stepper-step {
    width: 100%;
    position: relative;

    &:not(:first-of-type) {
      &:before{
        content: '';
        position: absolute;
        height: 2px;
        width: calc(100% - 80px);
        left: calc(-50% + 40px);
        top: 50%;
        background-color: $secondary-color;
      }
    }

    &__body {
      position: relative;

      &_point {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px solid $secondary-color;
      }
    }

    &__line {
      height: 1px;
      width: 100%;
      background-color: $secondary-color;
    }

    &.active {
      .el-stepper-step__body {
        &_point {
          border: 2px solid $primary-color;
        }
      }

      &:before {
        background-color: $primary-color;
      }
    }
  }

  .ev-stepper-titles {
    margin-top: 15px;
  }
</style>
