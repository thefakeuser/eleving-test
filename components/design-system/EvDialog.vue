<template>
  <div
    v-if="value"
    class="ev-dialog"
    @click.self="closeDialog"
  >
    <transition name="dialog">
      <div
        class="ev-dialog__body"
        :style="{ width, height }"
      >
        <slot name="default" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { InputEventTypes } from '@/contracts/shared'

export default Vue.extend({
  name: 'EvDialog',

  props: {
    value: {
      type: Boolean,
      default: false
    } as PropOptions<boolean>,

    closeOutside: {
      type: Boolean,
      default: true
    },

    height: {
      type: String,
      default: 'auto'
    } as PropOptions<string>,

    width: {
      type: String,
      default: '600px'
    } as PropOptions<string>
  },

  methods: {
    closeDialog (): void {
      if (this.closeOutside) {
        this.$emit(InputEventTypes.Input, false)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.ev-dialog {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(9px);
  display: table;
  transition: opacity 0.3s ease;

  &__body {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
