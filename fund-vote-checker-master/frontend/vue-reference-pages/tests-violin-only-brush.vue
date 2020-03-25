<template>
  <v-container>
    <div>Violin</div>
    <svg :width="width" :height="height">
      <!-- <path stroke="#235687" fill="#4599ff" :d="violinArea" /> -->
      <g class="brush" v-brushArea="brush" />
    </svg>
    <svg :width="width" :height="height">
      <!-- <defs>
        <clipPath id="clip">
          <rect :width="width" :height="height" />
        </clipPath>
      </defs>-->

      <circle :cx="x('s')" :cy="yZoom(50)" r="10" fill="green" />
      <circle :cx="x('s')" :cy="yZoom(40)" r="10" fill="yellow" />
      <circle :cx="x('s')" :cy="yZoom(30)" r="10" fill="red" />
    </svg>
  </v-container>
</template>

<script>
import * as d3 from "d3";
import data from "../static/data/bubble_chart.csv";

export default {
  directives: {
    brushArea(el, binding) {
      // console.log(binding); // this is the g
      // console.log(binding); // the scale object
      // console.log(binding.value);
      const brush = binding.value.brush;
      const range = binding.value.brushRange;
      // console.log("moved");
      d3.select(el)
        .call(brush)
        .call(brush.move, range);
    }
  },
  data() {
    return {
      data: data,
      categories: ["e", "s", "g"],
      yProperty: "support",
      width: 200,
      height: 400,
      x: {},
      yZoom: {},
      ySatic: {},
      brushRange: [0, 400]
    };
  },
  computed: {
    violinArea() {
      const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
      // Not weighted
      const supportAverages = this.data.map(x =>
        parseFloat(
          arrAvg(this.categories.map(c => x[`${c}_${this.yProperty}`])).toFixed(
            2
          )
        )
      );
      // console.log(supportAverages);
      const histogram = d3
        .histogram()
        .domain([0, 100])
        .thresholds([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
        .value(d => d);
      // console.log(histogram(supportAverages));
      const xScale = d3
        .scaleLinear()
        .domain([-67, 67])
        .range([0, 200]);

      const yScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([400, 0]);

      const area = d3
        .area()
        .x0(d => xScale(-d.length))
        .x1(d => xScale(d.length))
        .y(d => yScale(d.x0))
        .curve(d3.curveBasis);
      // console.log(area(histogram(supportAverages)));
      return area(histogram(supportAverages));
    },
    brush() {
      const brush = d3
        .brushY()
        .extent([
          [0, 0],
          [this.width, this.height]
        ])
        .on("brush end", this.brushed);

      const brushRange = this.brushRange;
      return { brush, brushRange };
    }
  },
  watch: {
    brushRange() {
      // console.log(this.brushRange);
    }
  },
  methods: {
    brushed(event) {
      // console.log(d3.event);
      if (d3.event.sourceEvent && d3.event.type === "brush") {
        this.eventType = d3.event.type;
        var s = d3.event.selection;

        this.yZoom = d3
          .scaleLinear()
          .range([this.height, 0])
          .domain([this.yStatic.invert(s[1]), this.yStatic.invert(s[0])]);

        this.brushRange = s;
        console.log(s);

        // d3.select("#transform-store").call(
        //   this.zoom.transform,
        //   d3.zoomIdentity.scale(this.height / (s[1] - s[0])).translate(-s[0], 0)
        // );
      }
    }
  },
  created() {
    this.x = d3
      .scaleBand()
      .rangeRound([0, this.width])
      .domain(this.categories);
    this.yZoom = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([0, 100]);
    this.yStatic = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([0, 100]);
  }
};
</script>


