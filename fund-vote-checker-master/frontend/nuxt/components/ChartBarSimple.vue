<template>
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
        <!-- Bar chart -->
        <g
          v-for="(element, index) in dataToRender"
          :key="`bar-group-${index}`"
          :style="`transform: translateX(${scale.x(element[xProperty])}px)`"
        >
          <rect
            :x="0"
            :y="scale.y(element[yProperty])"
            :width="scale.x.bandwidth()"
            :height="height - scale.y(element[yProperty])"
            fill="red"
            :class="barClass"
            @click="onClick"
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
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    chartClass: {
      type: String,
      default: "chart-bar-small"
    },
    svgHeight: {
      type: Number,
      default: 400
    },
    svgWidth: {
      type: Number,
      default: 400
    },
    margin: {
      type: Object,
      default() {
        return { top: 30, left: 30, bottom: 35, right: 30 };
      }
    },
    xProperty: {
      type: String,
      default: "year"
    },
    xAxisLabel: {
      type: String,
      default: "Year"
    },
    yProperty: {
      type: String,
      default: "value"
    },
    yAxisLabel: {
      type: String,
      default: "Value"
    },
    data: {
      type: Array,
      default() {
        return [
          { year: 2010, value: 2 },
          { year: 2011, value: 10 },
          { year: 2012, value: 20 },
          { year: 2013, value: 300 },
          { year: 2014, value: 400 },
          { year: 2015, value: 50 }
        ];
      }
    },
    customYDomain: {
      type: Array,
      default() {
        return [];
      }
    },
    barClass: {
      type: String,
      default: "bar"
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
    maxValueInChart() {
      const yArr = this.dataToRender.map(y => y[this.yProperty]);
      const yMax = Math.max(...yArr);
      const yMaxInt = parseInt(yMax);
      return yMaxInt;
    },
    yDomain() {
      if (this.customYDomain.length > 0) {
        return this.customYDomain;
      } else {
        return [0, this.getNiceYDomainEnd(this.maxValueInChart)];
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
        .domain(this.dataToRender.map(x => x[this.xProperty]))
        .rangeRound([0, this.width])
        .padding(0.15);
      let y = d3
        .scaleLinear()
        .domain([this.yDomain[0], this.yDomain[1]])
        .rangeRound([this.height, 0]);
      y.tickValues = this.niceYAxis.tickValues;
      return { x, y };
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
  }
};
</script>
