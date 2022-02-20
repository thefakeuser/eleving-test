<template>
  <div class="ev-box">
    <slot name="default" />
  </div>
</template>

<style lang="scss" scoped>
  .ev-box {
    background-color: $white-color;
    box-shadow: 0px 3px 18px rgba(0, 0, 0, 0.16);
    border-radius: 16px;
  }
</style>
