<template>
  <svg
    class="reusable-curly-braket"
    :width="width"
    :height="height"
    :style="
      `transform-origin: center; transform: rotate(${flipped ? 180 : 0}deg)`
    "
  >
    <g :style="`transform:  translateX(${margin}px) translateY(${margin * 2}px)`">
      <path
        :d="
          `M0,${h} C0,${-h * 0.6} ${w * 0.4},${h} ${w * 0.5},0 C${w *
            0.6},${h} ${w},${-h * 0.6} ${w},${h}`
        "
        fill="none"
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeCap"
        :stroke-linejoin="strokeJoin"
        :stroke="color"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "black"
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 60
    },
    strokeWidth: {
      type: Number,
      default: 10
    },
    strokeCap: {
      type: String,
      default: "butt"
    },
    strokeJoin: {
      type: String,
      default: "arc"
    },
    flipped: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    margin() {
      return this.strokeWidth * 0.5;
    },
    w() {
      return this.width - this.strokeWidth;
    },
    h() {
      return this.height - this.strokeWidth * 3;
    }
  }
};
</script>

<style lang="scss" scoped></style>
