<template>
  <path
    fill="none"
    :class="`${stage} secondary--stroke`"
    :stroke-opacity="opacity"
    :stroke-width="strokeWidth"
    :d="path"
  />
</template>

<script>
export default {
  props: {
    stage: {
      type: String,
      default: "omitted"
    },
    opacity: {
      type: Number,
      default: 0.3
    },
    strokeWidth: {
      type: Number,
      default: 100
    },
    path: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped></style>
