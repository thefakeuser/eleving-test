<template>
  <div class="ev-radio-checkbox d-flex align-center">
    <input
      :id="id || `${componentUUID}-ev-radio-checkbox`"
      :name="name"
      type="radio"
      :checked="value"
      @change="onChange"
    >

    <label
      :for="id || `${componentUUID}-ev-radio-checkbox`"
      :class="labelPositionClass"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { CheckboxLabelPosition } from '@/contracts/design-system'
import { InputEventTypes } from '@/contracts/shared'

export default Vue.extend({
  name: 'EvRadioCheckbox',

  props: {
    id: {
      type: String,
      default: ''
    } as PropOptions<String>,

    value: {
      type: [Boolean, String, Number],
      default: false
    } as PropOptions<Boolean | String | Number>,

    label: {
      type: String,
      default: ''
    } as PropOptions<String>,

    labelPosition: {
      type: String,
      default: CheckboxLabelPosition.Right
    } as PropOptions<CheckboxLabelPosition>,

    name: {
      type: String,
      default: ''
    } as PropOptions<String>
  },

  data () {
    return {
      componentUUID: null
    }
  },

  computed: {
    labelPositionClass (): string {
      return CheckboxLabelPosition.Right === this.labelPosition
        ? CheckboxLabelPosition.Right
        : CheckboxLabelPosition.Left
    }
  },

  mounted () {
    this.componentUUID = (this as any)._uid
  },

  methods: {
    onChange (): void {
      this.$emit(InputEventTypes.Change, this.value)
    }
  }
})
</script>

<style lang="scss" scoped>
  .ev-radio-checkbox {
    position: relative;
    min-height: 32px;

    label {
      cursor: pointer;

      &:before {
        top: 0;
        position: absolute;
        content: '';
        width: 32px;
        height: 32px;
        border: 2px solid $primary-color;
        border-radius: 8px;
      }

      &.right {
        padding-left: 48px;

        &:before {
          left: 0;
        }
      }

      &.left {
        padding-right: 48px;

        &:before {
          right: 0;
        }
      }
    }

    input {
      cursor: pointer;
      opacity: 0;
      position: absolute;

      &:checked + label {
        &:before {
          background-color: $primary-color;
        }
      }
    }
  }
</style>
