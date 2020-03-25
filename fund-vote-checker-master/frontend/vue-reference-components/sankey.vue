<template>
  <v-container>
    <h1>Sankey tests</h1>
    <svg style="transform:rotate(90deg)" :width="svgWidth" :height="svgHeight">
      <g class="nodes">
        <g class="node">
          <rect
            v-for="(node, indexNode) in nodes"
            :key="`node-${indexNode}`"
            class="node"
            fill="rgba(0,0,0,0.8)"
            :x="node.x0"
            :y="node.y0"
            :width="node.x1 - node.x0"
            :height="node.y1 - node.y0"
          />
        </g>
      </g>
      <g class="links">
        <path
          v-for="(link, indexLink) in links"
          :key="`link-${indexLink}`"
          class="link"
          stroke="rgba(0,0,0,0.5)"
          :stroke-width="link.width"
          fill="none"
          :d="getLinkPath(link)"
        />

        <!-- <path fill="none" stroke="black" stroke-width="10" :d="pathD" /> -->
      </g>
    </svg>
  </v-container>
</template>

<script>
import * as d3 from "d3";
import * as sankeyPlugin from "d3-sankey";

import data from "../static/data/data_sankey.json";
// import source from "../static/data/data_sankey.csv";

export default {
  data() {
    return {
      svgWidth: 900,
      svgHeight: 900
    };
  },
  mounted() {
    // console.log(this.nodes);
    // console.log(this.links);
  },
  computed: {
    sankeySettingsFuntion() {
      const mySankey = sankeyPlugin
        .sankey()
        .size([this.svgWidth, this.svgHeight])
        .nodeId(d => d.id)
        .nodeWidth(10)
        .nodePadding(10)
        .nodeAlign(sankeyPlugin.sankeyLeft);
      return mySankey;
    },
    nodes() {
      return this.sankeySettingsFuntion(data).nodes;
    },
    links() {
      return this.sankeySettingsFuntion(data).links;
    }
  },
  methods: {
    getLinkPath(link) {
      console.log(link);
      // const source = link.source;
      // const target = link.target;
      const linkGenerator = d3
        .linkHorizontal()
        .source(function() {
          return [link.source.x1, link.y0];
        })
        .target(function() {
          return [link.target.x0, link.y1];
        });
      const path = linkGenerator();
      // console.log(path);
      return path;
    }
  }
};
</script>

<style lang="scss" scoped></style>
