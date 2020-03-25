<template>
  <v-container>
    <div>Violin</div>
    <svg width="400" height="400">
      <path stroke="#235687" fill="#4599ff" :d="violinArea" />
      <g class="axis y-axis" v-brushArea="brush" />
    </svg>
  </v-container>
</template>

<script>
import * as d3 from "d3";
import data from "../static/data/bubble_chart.csv";

export default {
  directives: {
    brushArea(el, binding) {
      console.log(el); // this is the g
      console.log(binding); // the scale object
      // console.log(binding.value);
      const methodArg = binding.value;
      d3.select(el)
        .call(methodArg)
        .call(methodArg.move, [0, 400]);

      // const axis = binding.arg; // x or y
      // const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      // const methodArg = binding.value[axis];
      // if (binding.arg == "y") {
      //   const tickValues = binding.value.y.tickValues;
      //   d3.select(el).call(
      //     d3[axisMethod](methodArg)
      //       .tickFormat(d => `${d} %`)
      //       .tickValues(tickValues)
      //   );
      // } else {
      //   d3.select(el).call(d3[axisMethod](methodArg));
      // }
    }
  },
  data() {
    return {
      data: data,
      categories: ["e", "s", "g"],
      yProperty: "support"
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
      console.log(supportAverages);
      const histogram = d3
        .histogram()
        .domain([0, 100])
        .thresholds([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
        .value(d => d);
      console.log(histogram(supportAverages));
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
        .curve(d3.curveCatmullRom);
      console.log(area(histogram(supportAverages)));
      return area(histogram(supportAverages));
    },
    brush() {
      return d3
        .brushY()
        .extent([
          [0, 0],
          [200, 400]
        ])
        .on("brush end", this.brushed);
    }
  },
  methods: {
    brushed() {
      console.log("brushed");
      console.log(d3.event.selection);
    }
  },
  created() {},
  mounted() {
    console.log(this.data);
  }
};
</script>
