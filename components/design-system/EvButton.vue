<template>
  <button
    class="ev-button font-weight-bold"
    :class="[
      colorClass,
      sizeClass,
      typeClass,
      { 'loading': isLoading },
      { 'disabled': isDisabled }
    ]"
    :type="submit ? 'submit' : 'button'"
    @click="onButtonClick"
  >
    <slot name="default">
      {{ text }}
    </slot>
  </button>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ButtonSizes, ButtonColors, ButtonType } from '@/contracts/design-system'

export default Vue.extend({
  name: 'EvButton',

  props: {
    color: {
      type: String,
      default: ButtonColors.Primary
    } as PropOptions<ButtonColors>,

    isDisabled: {
      type: Boolean,
      default: false
    } as PropOptions<boolean>,

    isLoading: {
      type: Boolean,
      default: false
    } as PropOptions<boolean>,

    size: {
      type: String,
      default: ButtonSizes.Large
    } as PropOptions<ButtonSizes>,

    submit: {
      type: Boolean,
      default: false
    } as PropOptions<Boolean>,

    text: {
      type: String,
      default: ''
    } as PropOptions<String>,

    type: {
      type: String,
      default: ButtonType.Default
    } as PropOptions<ButtonType>
  },

  computed: {
    colorClass (): string {
      return `btn-${this.color}`
    },

    sizeClass (): string {
      return `btn-${this.size}`
    },

    typeClass (): string {
      return `btn-${this.type}`
    }
  },

  methods: {
    onButtonClick (event: MouseEvent): void {
      event.preventDefault()
      this.$emit('click', event)
    }
  }
})
</script>

<style lang="scss" scoped>
  @keyframes loading-btn {
    0% { left: 0% }
    50% { left: 90% }
    100% { left: 0% }
  }

  .ev-button {
    position: relative;
    border-radius: 8px;
    border: 2px solid transparent;
    padding: 13px 20px;
    cursor: pointer;
    line-height: 1.2;
    color: $white-color;

    &:hover {
      opacity: .85;
    }

    &.btn {
      &-sm {
        font-size: 1.8rem;
        padding: 12px 18px;
      }

      &-lg {
        font-size: 2.8rem;
      }

      @each $color, $variable in $text-colors {
        &-#{$color} {
          background-color: #{$variable}
        }
      }

      &-outlined {
        background-color: transparent;
        border-color: $primary-color;
        color: $primary-color;
      }

      &-text {
        border-color: transparent;
        color: $primary-color;
        background-color: transparent;
      }

      &-default {
        background-color: $disabled-color;
        border-color: $secondary-color;
        color: $main-color;
      }
    }

    &.loading {
      &:before {
        position: absolute;
        content: '';
        height: 5px;
        width: 10%;
        left: 0%;
        top: calc(100% - 2px);
        background-color: lighten($primary-color, 30%);
        border-radius: 3px;
        animation: loading-btn 2s infinite;
      }
    }

    &.disabled {
      opacity: .8;
      background-color: $grey-color;
      color: lighten($grey-color, 30%);
      cursor: not-allowed;
      border-color: transparent;
    }
  }
</style>
