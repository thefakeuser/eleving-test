<template>
  <h1 class="primary--text text-heading font-weight-bold">
    <slot name="default">
      {{ text }}
    </slot>
  </h1>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'EvHeadingText',

  props: {
    text: {
      type: String,
      default: ''
    } as PropOptions<String>
  }
})
</script>
