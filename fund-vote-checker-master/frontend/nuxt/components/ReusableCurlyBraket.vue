<template>
  <svg
    class="reusable-curly-braket"
    :width="width"
    :height="height"
    :style="
      `transform-origin: center; transform: rotate(${flipped ? 180 : 0}deg)`
    "
  >
    <!-- :d="
          `M0,${h} C0,${-h * 0.6} ${w * 0.4},${h} ${w * 0.5},0 C${w *
            0.6},${h} ${w},${-h * 0.6} ${w},${h}`
    "-->
    <g :style="`transform:  translateX(${margin}px) translateY(${margin * 2}px)`">
      <path
        :d="
          `M0,${h} C0,${h * 0.6} ${cornerLength-cornerLength/3},${centerY+strokeWidth/2} ${cornerLength},${centerY+strokeWidth/2} L${centerX-cornerLength},${centerY+strokeWidth/2} C${centerX-cornerLength+cornerLength/3},${centerY+strokeWidth/2} ${centerX-cornerLength/6},${centerY+strokeWidth/2} ${centerX},${0+strokeWidth} C${centerX+cornerLength/6},${centerY+strokeWidth/2} ${centerX+cornerLength-cornerLength/3},${centerY+strokeWidth/2} ${centerX+cornerLength},${centerY+strokeWidth/2} L${width-cornerLength},${centerY+strokeWidth/2} C${width-cornerLength+cornerLength/3},${centerY+strokeWidth/2} ${w},${h * 0.6} ${w},${h} L${w},${h-strokeWidth} C${w},${h*0.6-strokeWidth} ${width-cornerLength+cornerLength/3},${centerY-strokeWidth/2} ${width-cornerLength},${centerY-strokeWidth/2} L${centerX+cornerLength},${centerY-strokeWidth/2} C${centerX+cornerLength-cornerLength/2},${centerY-strokeWidth/2} ${centerX+cornerLength/7},${centerY*0.75} ${centerX},0 C${centerX-cornerLength/7},${centerY*0.75} ${centerX-cornerLength+cornerLength/2},${centerY-strokeWidth/2} ${centerX-cornerLength},${centerY-strokeWidth/2} L${cornerLength},${centerY-strokeWidth/2} C${cornerLength-cornerLength/3},${centerY-strokeWidth/2} 0,${h*0.6-strokeWidth} 0,${h-strokeWidth} z`
        "
        :fill="color"
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeCap"
        :stroke-linejoin="strokeJoin"
        stroke="none"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
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
      default: 1
    },
    outlineWidth: {
      type: Number,
      default: 0
    },
    cornerRatio: {
      type: Number,
      default: 0.1
    },
    centerXPosition: {
      type: Number,
      default: 0.5
    },
    centerYPosition: {
      type: Number,
      default: 0.5
    },
    strokeCap: {
      type: String,
      default: "butt"
    },
    color: {
      type: String,
      default: "black"
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
      return this.outlineWidth * 0.5;
    },
    w() {
      return this.width - this.outlineWidth;
    },
    h() {
      return this.height - this.outlineWidth * 3;
    },
    cornerLength() {
      return this.width * this.cornerRatio;
    },
    centerX() {
      return this.w * this.centerXPosition;
    },
    centerY() {
      return this.h * this.centerYPosition;
    }
  }
};
</script>

<style lang="scss" scoped></style>
