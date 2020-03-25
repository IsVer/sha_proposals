<template>
  <svg :width="svgWidth" :height="svgHeight">
    <!-- :style="`transform: translateX(${scale.x(category)}px)`" -->

    <g
      :style="
        `transform: translateX(${margin.left}px) translateY(${margin.top}px);`
      "
    >
      <g
        :style="
          `transform: translateX(${radius *
            0.86603}px) translateY(${radius}px);`
        "
      >
        <g
          v-for="(category, indexCategory) in categories"
          :key="`category-triangle-vote-${indexCategory}`"
          v-tooltip="getTooltipOptions(category)"
        >
          <polygon
            :stroke-width="scale.stroke(data[`${category}_${sizeProperty}`])"
            :class="`hex-triangle ${category}-vote`"
            :points="`0 0, 0 ${radius}, ${radius * 0.86603} ${radius * 0.5}`"
            :style="
              `transform: rotate(${getRotation(
                category
              )}deg) scale(${scale.size(data[`${category}_${sizeProperty}`])})`
            "
          />
          <polygon
            v-for="(category, indexCategory) in categories"
            :key="`category-triangle-support-${indexCategory}`"
            :class="`hex-triangle ${category}-support`"
            :points="`0 0, 0 ${radius}, ${radius * 0.86603} ${radius * 0.5}`"
            :style="
              `transform: rotate(${getRotation(
                category
              )}deg) scale(${scale.size(
                (data[`${category}_${sizeProperty}`] *
                  data[`${category}_${yProperty}`]) /
                  100
              )})`
            "
          />
        </g>
      </g>
      <!-- <circle
              :cx="radius"
              :cy="radius"
              :r="radius"
              fill="none"
              stroke="#e4e4e4"
              stroke-dasharray="3 3"
            />
            <circle
              :cx="radius"
              :cy="radius"
              :r="scale.size(maxSizeProp)"
              fill="none"
              stroke="#e4e4e4"
              stroke-dasharray="3 3"
            />

            <circle
              :cx="radius"
              :cy="radius"
              :r="radius * 0.66"
              fill="none"
              stroke="#e4e4e4"
              stroke-dasharray="3 3"
            />
            <circle
              :cx="radius"
              :cy="radius"
              :r="radius * 0.33"
              fill="none"
              stroke="#e4e4e4"
              stroke-dasharray="3 3"
            />
            <circle
              :cx="radius"
              :cy="radius"
              :r="radius * 0.1"
              fill="none"
              stroke="#e4e4e4"
              stroke-dasharray="3 3"
            />
            <circle :cx="radius" :cy="radius" :r="1" fill="#e4e4e4" /> -->
    </g>
  </svg>
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    chartClass: {
      type: String,
      default: "chart-star"
    },
    svgHeight: {
      type: Number,
      default: 200
    },
    margin: {
      type: Object,
      default() {
        return { top: 3, left: 3, bottom: 3, right: 3 };
      }
    },
    categories: {
      type: Array,
      default() {
        return ["cat1", "cat2", "cat3"];
      }
    },
    yProperty: {
      type: String,
      default: "y"
    },
    sizeProperty: {
      type: String,
      default: "size"
    },
    maxSizeProp: {
      type: Number,
      default: 100
    },
    data: {
      type: Object,
      default() {
        return {
          id: 2010,
          cat1_y: 23,
          cat1_size: 17,
          cat2_y: 18,
          cat2_size: 200,
          cat3_y: 50,
          cat3_size: 20
        };
      }
    }
  },
  computed: {
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    svgWidth() {
      return (this.height / 2) * 0.86603 + this.margin.left + this.margin.right;
    },
    radius() {
      return this.height * 0.5;
    },

    scale() {
      // let y = d3
      //   .scaleLinear()
      //   .domain([this.yDomain[0], this.yDomain[1]])
      //   .rangeRound([this.height, 0]);

      let size = d3
        .scaleSqrt()
        .domain([0, this.maxSizeProp])
        .range([0, 1]);

      let stroke = d3
        .scaleLinear()
        .domain([0, this.maxSizeProp])
        .range([4, 0.7]);

      return { size, stroke };
    }
  },
  methods: {
    getRotation(category) {
      switch (category) {
        case "e":
          return 180;
          break;
        case "s":
          return 60;
          break;
        case "g":
          return 120;
          break;

        default:
          return 180;
          break;
      }
    },
    getTooltipOptions(category) {
      const categoryNames = {
        e: "Environmental",
        s: "Social",
        g: "Governance"
      };
      const content = `
      <span class="fund">${this.data.fund}</span> <br /> 
      supported <span class="emph text--${category}"> <span class="number">${this.data[
        `${category}_support`
      ].toFixed(
        1
      )}&thinsp;%</span></span> of the <span class="emph text--${category}"><span class="number">${
        this.data[`${category}_vote`]
      }</span> ${categoryNames[
        category
      ].toLowerCase()} proposals</span>  they voted on.`;
      return { content: content, html: true };
    }
  },
  mounted() {
    console.log(this.data);
  }
};
</script>
