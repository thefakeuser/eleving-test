<template>
  <div class="el-text-field d-flex flex-column">
    <label
      :for="id || `${componentUUID}-text-field`"
      class="main--text font-weight-bold text-regular"
    >
      {{ label }}
    </label>

    <input
      :id="id || `${componentUUID}-text-field`"
      :name="name"
      :value="value"
      type="text"
      class="text-regular main--text font-weight-regular"
      @input="(event) => updateData(event, InputEventTypes.Input)"
      @change="(event) => updateData(event, InputEventTypes.Change)"
    >
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { InputEventTypes } from '@/contracts/shared'

export default Vue.extend({
  name: 'EvTextField',

  props: {
    id: {
      type: String,
      default: ''
    } as PropOptions<String>,

    name: {
      type: String,
      default: ''
    } as PropOptions<String>,

    label: {
      type: String,
      default: ''
    } as PropOptions<String>,

    value: {
      type: String,
      default: ''
    } as PropOptions<String>
  },

  data () {
    return {
      InputEventTypes: Object.freeze(InputEventTypes),
      componentUUID: null
    }
  },

  mounted () {
    this.componentUUID = (this as any)._uid
  },

  methods: {
    updateData (event: Event, eventType: InputEventTypes): void {
      const { value } = event.target as HTMLFormElement
      this.$emit(eventType, value)
    }
  }
})
</script>

<style lang="scss" scoped>
  .el-text-field {
    label {
      margin-bottom: 8px;
    }

    input {
      border: 2px solid $secondary-color;
      border-radius: 8px;
      padding: 12px 17px;
      line-height: 1;
      outline: none;

      &:focus {
        border-color: $primary-color;
      }
    }
  }
</style>
