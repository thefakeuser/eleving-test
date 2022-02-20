<template>
  <div class="el-option-text-field d-flex flex-column">
    <label
      :for="id || `${componentUUID}-option-text-field`"
      class="main--text font-weight-bold text-regular"
    >
      {{ label }}
    </label>

    <div class="el-option-text-field__control">
      <div class="el-option-text-field__control_select">
        <select
          :id="id || `${componentUUID}-option-text-field_select`"
          @change="updateOption"
        >
          <option
            v-for="option in options"
            :key="`option_${option.value}`"
            :value="option.value"
            :disabled="option.disabled === true ? true : false"
            :selected="option.value.toUpperCase() === ((value || {}).option || {}).value.toUpperCase()"
          >
            {{ option.text }}
          </option>
        </select>
      </div>

      <input
        :id="id || `${componentUUID}-option-text-field`"
        ref="input"
        :name="name"
        :value="value.value"
        :style="{ 'padding-left': inputLeftPadding }"
        :type="type"
        class="text-regular main--text font-weight-regular"
        @change="(event) => updateValue(event, InputEventTypes.Change)"
        @input="(event) => updateValue(event, InputEventTypes.Input)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import {
  OptionTextValue,
  SelectOption,
  TextInputTypes
} from '@/contracts/design-system'
import { InputEventTypes } from '@/contracts/shared'

export default Vue.extend({
  name: 'EvOptionTextField',

  props: {
    id: {
      type: String || undefined,
      default: undefined
    } as PropOptions<String | undefined>,

    type: {
      type: String,
      default: TextInputTypes.Text
    } as PropOptions<TextInputTypes>,

    name: {
      type: String || undefined,
      default: undefined
    } as PropOptions<String | undefined>,

    label: {
      type: String,
      default: ''
    } as PropOptions<String>,

    value: {
      type: Object,
      default: () => {}
    } as PropOptions<OptionTextValue>,

    options: {
      type: Array,
      default: () => []
    } as PropOptions<SelectOption[]>
  },

  data () {
    return {
      InputEventTypes: Object.freeze(InputEventTypes),
      componentUUID: null,
      inputLeftPadding: '15px'
    }
  },

  mounted () {
    this.componentUUID = (this as any)._uid

    const select = this.$el.querySelector('select')
    this.inputLeftPadding = `${(select?.clientWidth || 0) + 15}px`
  },

  methods: {
    updateOption (event: Event): void {
      const { value } = this.$refs.input as HTMLFormElement
      const { value: inputValue } = event.target as HTMLInputElement
      const option = this.options.find((option: SelectOption) => option.value === inputValue)

      this.$emit(InputEventTypes.Input, {
        value,
        option
      })
    },

    updateValue (event: Event, eventType: string): void {
      const { value } = event.target as HTMLInputElement

      this.$emit(eventType, {
        value,
        option: this.value.option
      })
    }
  }
})
</script>

<style lang="scss" scoped>
  .el-option-text-field {
    label {
      margin-bottom: 8px;
    }

    &__control {
      position: relative;
      width: 100%;

      &_select {
        position: absolute;
        background-color: $disabled-color;
        border-right: 2px solid $secondary-color;
        border-radius: 6px 0 0 6px;
        height: calc(100% - 4px);
        top: 2px;
        left: 2px;

        &:before {
          content: '';
          position: absolute;
          top: calc(50% - 3px);
          right: 15px;
          border: 6px solid transparent;
          border-top-color: $main-color;
          pointer-events: none;
        }

        select {
          appearance: none;
          outline: none;
          background-color: transparent;
          border-radius: 6px 0 0 6px;
          height: 100%;
          border: none;
          padding: 0 35px 0 15px;
        }
      }

      input {
        width: 100%;
        border: 2px solid $secondary-color;
        border-radius: 8px;
        padding: 12px 17px;
        line-height: 1;
        outline: none;
        margin: 0;

        &:focus {
          border-color: $primary-color;
        }
      }
    }
  }
</style>
