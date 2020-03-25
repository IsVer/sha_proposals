<template>
  <v-container>
    <div>Violin</div>
    <svg :width="width" :height="height">
      <!-- <path stroke="#235687" fill="#4599ff" :d="violinArea" /> -->
      <g class="brush" v-brushArea="brush" />
    </svg>
    <svg :width="width" :height="height">
      <defs>
        <clipPath id="clip">
          <rect :width="width" :height="height" />
        </clipPath>
      </defs>
      <rect class="zoom" :width="width" :height="height" v-zoomArea="zoomReactive" fill="none" />
      <g class="zoom-this">
        <circle :cx="x('s')" :cy="yZoom(50)" r="10" fill="green" />
        <circle :cx="x('s')" :cy="yZoom(40)" r="10" fill="yellow" />
        <circle :cx="x('s')" :cy="yZoom(30)" r="10" fill="red" />
      </g>
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
    },
    zoomArea(el, binding) {
      // console.log(binding);
      const zoom = binding.value.zoom;
      const s = binding.value.selection;
      const height = binding.value.height;
      const eventType = binding.value.eventType;
      // console.log(d3.zoomTransform(d3.select(el)));
      // console.log(d3.select("#transform-store"));
      d3.select(el).call(zoom);

      if (eventType == "brush") {
        d3.select(el).call(
          zoom.transform,
          d3.zoomIdentity.scale(height / (s[1] - s[0])).translate(-s[0], 0)
        );
      }
      // if (eventType == "zoom") {
      //   d3.select(el).call(zoom);
      // }
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
      brushRange: [0, 400],
      brushRange: [0, 400],
      eventType: null,
      zoom: {}
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
        .curve(d3.curveCatmullRom);
      // console.log(area(histogram(supportAverages)));
      return area(histogram(supportAverages));
    },
    zoomReactive() {
      const zoom = this.zoom;
      const eventType = this.eventType;
      const selection = this.brush.brushRange;
      const height = this.height;
      const noMoreCalls = this.noMoreCalls;

      return { zoom, selection, height, eventType, noMoreCalls };
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
    noCall() {
      this.noMoreCalls = true;
    },
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
    },
    zoomed() {
      // console.log(d3.event.transform);
      if (d3.event.sourceEvent && d3.event.type === "zoom") {
        this.eventType = d3.event.type;

        var t = d3.event.transform;

        this.yZoom = d3
          .scaleLinear()
          .range([this.height, 0])
          .domain(t.rescaleY(this.yStatic).domain());

        // !TODO
        // console.log(t.applyY);
        // console.log(t.invertY);
        // console.log(t);
        // console.log(this.yZoom.range());
        // console.log(this.yZoom.domain());

        var transformArrayWrong = this.yZoom
          .range()
          .map(t.invertY, t)
          .reverse();

        // console.log("before", this.eventType);
        // if (this.eventType == "brush") {
        //   console.log("brushed in zoom");
        //   console.log("wrong", transformArrayWrong);
        //   console.log(this.brushRange);
        //   transformArrayWrong[0] += this.brushRange[0];
        // }
        // console.log("after", this.eventType);
        // console.log("right", transformArrayWrong);
        setTimeout(() => {
          this.brushRange = transformArrayWrong;
        }, 250);
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
    this.zoom = d3
      .zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([
        [0, 0],
        [this.width, this.height]
      ])
      .extent([
        [0, 0],
        [this.width, this.height]
      ])
      .on("zoom", this.zoomed);
  },
  mounted() {
    // console.log(this.data);
    setTimeout(() => {
      this.later = true;
    }, 3000);
  }
};
</script>

<style lang="scss">
.zoom {
  cursor: move;
  fill: none;
  pointer-events: all;
}
.zoom-this {
  fill: steelblue;
  clip-path: url(#clip);
}
</style>
