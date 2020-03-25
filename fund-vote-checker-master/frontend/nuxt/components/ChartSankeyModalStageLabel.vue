<template>
  <div
    class="position-absolute-tl0"
    :style="
      `transform: translateX(${labelPosX}px) translateY(${labelHeight}px)`
    "
  >
    <div
      class="center-absolute--both text-center font-weight-bold"
      :style="`width: ${containerWidth}px`"
    >
      <span :style="`font-size: ${fontSizeNumber}px; line-height:1.1;`"
        >{{ percentage }}&thinsp;%</span
      >
      <br />
      <span :style="`font-size: ${fontSizeText}px; line-height:1.1;`">{{
        capitalize(stageName)
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 9.9
    },
    labelPosX: {
      type: Number,
      default: 300
    },
    labelHeight: {
      type: Number,
      default: 0.4
    },
    containerWidth: {
      type: Number,
      default: 150
    },
    fontSizeNumber: {
      type: Number,
      default: 20
    },
    fontSizeText: {
      type: Number,
      default: 20
    },
    stageName: {
      type: String,
      default: "omitted"
    }
  },
  methods: {
    capitalize(string) {
      if (typeof string !== "string") return "";
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped></style>
