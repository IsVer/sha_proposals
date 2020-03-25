<template>
  <v-container>
    <h1>Sankey tests</h1>
    <svg :width="svgWidth" :height="svgHeight">
      <g :transform="`translate(${margin.left}, ${margin.top})`">
        <g class="nodes">
          <g class="nodes">
            <rect x="0" y="0" :width="width" :height="10" fill="black" />
          </g>
        </g>
        <g class="links">
          <path
            id="omitted"
            fill="none"
            stroke="red"
            :stroke-width="width*(10/100)"
            :d="getLinkPath(width - width*(10/100)/2,10,width+40,height/4)"
          />
          <path
            id="withdrawn"
            fill="none"
            stroke="red"
            :stroke-width="width*(20/100)"
            :d="getLinkPath(width - width*(10/100) - width*(20/100)/2,10,width+40,height/4*2)"
          />
          <path
            id="voted"
            fill="none"
            stroke="red"
            :stroke-width="width*(60/100)"
            :d="getLinkPath(width - width*(10/100) - width*(20/100) - width*(60/100)/2,10,width+40,height*0.8)"
          />
          <path
            id="voted-passed"
            fill="none"
            stroke="blue"
            :stroke-width="width*(10/100)"
            :d="getLinkPath(width - width*(10/100) - width*(20/100) - width*(60/100) - width*(10/100)/2,10,width - width*(10/100) - width*(20/100) - width*(60/100) - width*(10/100)/2,height)"
          />
        </g>
      </g>
    </svg>
  </v-container>
</template>

<script>
import * as d3 from "d3";
import * as sankeyPlugin from "d3-sankey";

import data from "../static/data/data_sankey.json";

export default {
  data() {
    return {
      svgWidth: 300,
      svgHeight: 800,
      margin: { top: 40, left: 0, bottom: 40, right: 120 }
    };
  },
  mounted() {
    console.log(data);
    // console.log(this.nodes);
    // console.log(this.links);
  },
  computed: {
    width() {
      return this.svgWidth - this.margin.right - this.margin.left;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    }
  },
  methods: {
    getLinkPath(x0, y0, x1, y1) {
      // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d

      // const bendingFactor = 0.5;
      // const dCubic = `M${x0},${y0} C${x0},${bendingFactor *
      //   y1} ${x0},${y1} ${x1},${y1}`;
      // const dQuadratic = `M${x0},${y0} L${x0},${y1 -
      //   x1} Q${x0},${y1} ${x1},${y1}`;
      const arcRadius = x1 - x0;
      const startPoint = { x: x0, y: y0 };
      const intermediatePoint = { x: x0, y: y1 - arcRadius };
      const endPoint = { x: x1, y: y1 };
      const dArc = `
      M ${startPoint.x} ${startPoint.y}
      L ${intermediatePoint.x} ${intermediatePoint.y}
      A ${arcRadius} ${arcRadius},
      0,
      0
      0,
      ${endPoint.x} ${endPoint.y}
      `;

      return dArc;
    }
  }
};
</script>

<style lang="scss" scoped></style>
