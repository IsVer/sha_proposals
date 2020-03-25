<template>
  <v-container>
    <v-row justify="center">
      <div :class="chartClass">
        <div
          class="body-2"
          :style="`width: ${width}px; transform: translateX(${margin.left}px);`"
        >{{ yAxisLabel }}</div>
        <svg :width="svgWidth" :height="svgHeight">
          <!-- Margin convention -->
          <g :style="`transform: translateX(${margin.left}px) translateY(${margin.top}px);`">
            <!-- Labels -->
            <!-- Axis and grid -->
            <g class="axis y-axis" v-axis:y="scale" />
            <g class="axis x-axis" v-axis:x="scale" :transform="`translate(${0}, ${height})`" />
            <g class="horizontal-grid">
              <line
                v-for="(gridLinePosition, indexGrid) in niceYAxis.tickValues"
                :key="`grid-line-${indexGrid}`"
                x1="0"
                :x2="width"
                :y1="scale.y(gridLinePosition)"
                :y2="scale.y(gridLinePosition)"
                class="horizontal-grid"
              />
            </g>
            <!-- Bubble chart -->
            <g
              v-for="(category, indexCategory) in categories"
              :key="`bubble-group-${indexCategory}`"
              :class="category"
              :style="`transform: translateX(${scale.x(category)}px)`"
            >
              <circle
                v-for="(element, indexElement) in data"
                :key="`bubble-${indexElement}`"
                cx="0"
                :cy="scale.y(element[`${category}_${yProperty}`])"
                :r="scale.size(element[`${category}_${sizeProperty}`])"
                :class="`${category}--fill ${bubbleClass}`"
              />
            </g>
            <!-- X axis line  -->
            <g class="x-axis-line">
              <line
                x1="0"
                :x2="width"
                :y1="scale.y(niceYAxis.tickValues[0])"
                :y2="scale.y(niceYAxis.tickValues[0])"
                class="horizontal-grid first"
              />
            </g>
          </g>
        </svg>
        <div
          class="body-2 text-right"
          :style="`width: ${width}px; transform: translateX(${margin.left}px);`"
        >{{ xAxisLabel }}</div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
// import data from "../static/data/bubble_chart.csv";
import * as d3 from "d3";

export default {
  props: {
    chartClass: {
      type: String,
      default: "chart-bubble"
    },
    svgHeight: {
      type: Number,
      default: 800
    },
    svgWidth: {
      type: Number,
      default: 600
    },
    margin: {
      type: Object,
      default() {
        return { top: 30, left: 40, bottom: 35, right: 40 };
      }
    },
    categories: {
      type: Array,
      default() {
        return ["cat1", "cat2", "cat3"];
      }
    },
    // xProperty: {
    //   type: String,
    //   default: "category"
    // },
    xAxisLabel: {
      type: String,
      default: "Category"
    },
    yProperty: {
      type: String,
      default: "y"
    },
    yAxisLabel: {
      type: String,
      default: "PropY"
    },
    sizeProperty: {
      type: String,
      default: "size"
    },
    sizeDomain: {
      type: Array,
      default() {
        return [0, 100];
      }
    },
    sizeRange: {
      type: Array,
      default() {
        return [1, 10];
      }
    },
    data: {
      type: Array,
      default() {
        return [
          {
            id: 2010,
            cat1_y: 23,
            cat1_size: 17,
            cat2_y: 18,
            cat2_size: 90,
            cat3_y: 50,
            cat3_size: 20
          },
          {
            id: 2011,
            cat1_y: 8,
            cat1_size: 30,
            cat2_y: 10,
            cat2_size: 44,
            cat3_y: 10,
            cat3_size: 26
          },
          {
            id: 2012,
            cat1_y: 77,
            cat1_size: 54,
            cat2_y: 38,
            cat2_size: 19,
            cat3_y: 81,
            cat3_size: 78
          },
          {
            id: 2013,
            cat1_y: 20,
            cat1_size: 32,
            cat2_y: 18,
            cat2_size: 20,
            cat3_y: 65,
            cat3_size: 71
          },
          {
            id: 2014,
            cat1_y: 13,
            cat1_size: 15,
            cat2_y: 74,
            cat2_size: 34,
            cat3_y: 56,
            cat3_size: 33
          },
          {
            id: 2015,
            cat1_y: 49,
            cat1_size: 68,
            cat2_y: 53,
            cat2_size: 74,
            cat3_y: 13,
            cat3_size: 8
          }
        ];
      }
    },
    customYDomain: {
      type: Array,
      default() {
        return [];
      }
    },
    customYDomain: {
      type: Array,
      default() {
        return [];
      }
    },
    bubbleClass: {
      type: String,
      default: "bubble"
    }
  },
  directives: {
    axis(el, binding) {
      // console.log(el); // this is the g
      // console.log(binding); // the scale object
      // console.log(binding.value);
      const axis = binding.arg; // x or y
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];
      if (binding.arg == "y") {
        const tickValues = binding.value.y.tickValues;
        d3.select(el).call(d3[axisMethod](methodArg).tickValues(tickValues));
      } else {
        d3.select(el).call(d3[axisMethod](methodArg));
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    width() {
      return this.svgWidth - this.margin.right - this.margin.left;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    dataToRender() {
      const data = JSON.parse(JSON.stringify(this.data));
      return data;
    },
    yDomain() {
      if (this.customYDomain.length == 2) {
        return this.customYDomain;
      } else {
        const maxPerCategory = this.categories.map(c =>
          Math.max(...this.dataToRender.map(d => d[`${c}_${this.yProperty}`]))
        );
        const maxAllCategories = parseInt(Math.max(...maxPerCategory));
        return [0, this.getNiceYDomainEnd(maxAllCategories)];
      }
    },
    niceYAxis() {
      //──── Ticks ─────────────────────────────────────────────────────────────────────────────
      const yDomainStart = this.yDomain[0];
      const yDomainEnd = this.yDomain[1];
      const yDomainDifference = yDomainEnd - yDomainStart;
      const tickValuesArray = [
        yDomainStart,
        yDomainStart + yDomainDifference * 0.25,
        yDomainStart + yDomainDifference * 0.5,
        yDomainStart + yDomainDifference * 0.75,
        yDomainStart + yDomainDifference * 1
      ];

      const tickValues = yDomainDifference > 0 ? tickValuesArray : [];
      return { yDomainEnd, tickValues };
    },
    scale() {
      const x = d3
        .scaleBand()
        .domain(this.categories)
        .rangeRound([0, this.width])
        // centers the bubble
        .padding(1);

      let y = d3
        .scaleLinear()
        .domain([this.yDomain[0], this.yDomain[1]])
        .rangeRound([this.height, 0]);
      y.tickValues = this.niceYAxis.tickValues;

      let size = d3
        .scaleSqrt()
        .domain([this.sizeDomain[0], this.sizeDomain[1]])
        .rangeRound([this.sizeRange[0], this.sizeRange[1]]);

      return { x, y, size };
    }
  },
  methods: {
    getNiceYDomainEnd(num) {
      const dividedByFour = num / 4;
      const wholeNumber = Math.trunc(dividedByFour);
      const numString = wholeNumber.toString();
      const firstDigit = parseInt(numString[0]);
      const plusOne = firstDigit + 1;
      const numOfDigits = numString.length;
      const newYDomainEnd = plusOne * Math.pow(10, numOfDigits - 1) * 4;
      const yDomainEnd = isNaN(newYDomainEnd) ? 0 : newYDomainEnd;
      return yDomainEnd;
    },
    onClick(event) {
      console.log(event);
    }
  },
  mounted() {
    // console.log(this.categories);
  }
};
</script>
