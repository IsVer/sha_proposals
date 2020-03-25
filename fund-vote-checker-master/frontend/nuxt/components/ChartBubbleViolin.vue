<template>
  <v-container class="position-relative" fluid v-resize="onResize">
    <!-- <ChartBubbleViolinControls class="position-absolute-tr0" /> -->
    <v-row class="pa-8">
      <!-- Brush part -->
      <v-col id="brush-column" class="pr-0" cols="1">
        <div :style="`height:${yAxisCategoryLabelsHeight}px`">
          <!-- magnifier top -->
        </div>
        <div class="position-relative">
          <div
            class="position-absolute-tl0 d-flex align-center"
            :style="
              `width: 60px; transform: translateY(${this.scale.y.static(89.5) +
                margin.top}px) translateX(-20px)`
            "
          >
            <div class="axis-label--right center-absolute--vertical">
              <div class="caption font-weight-bold">Support</div>
              as % of proposals the fund voted on
            </div>
          </div>
          <svg id="brush" :width="brushSVGWidth" :height="svgHeight">
            <g
              :style="
                `transform: translateX(${margin.left}px) translateY(${margin.top}px);`
              "
              class="margins"
            >
              <g class="axis-and-grid">
                <g class="axis y-axis" v-axis:y="scale" />
                <line x1="0" :x2="brushWidth" class="horizontal-line" />
                <g :style="`transform:translateY(${height}px)`">
                  <line
                    x1="0"
                    :x2="brushWidth"
                    class="horizontal-line line-bold"
                  />
                </g>
              </g>
              <path
                v-for="(category, indexCategory) in violinAreas"
                :class="
                  `violin ${category.category}--fill ${category.category}--stroke`
                "
                :d="category.path"
              />
            </g>
            <!-- Brush area on mounted -->
          </svg>
        </div>
      </v-col>
      <v-col
        id="bubble-chart-content"
        cols="6"
        style="height: calc(100vh - 160px)"
      >
        <!-- <v-btn @click="test">Test</v-btn> -->
        <div :class="`${chartClass} position-relative `">
          <!-- :style="`width: ${width}px; transform: translateX(${margin.left}px);`" -->
          <div blue :style="`height:${yAxisCategoryLabelsHeight}px`">
            <!-- <div class="body-2">{{ yAxisLabel }}</div> -->
            <div
              class="d-flex align-center category-labels"
              :style="`height: 100%; transform: translateX(${margin.left}px)`"
            >
              <div class="position-relative category-labels">
                <div
                  v-for="(category, indexCategory) in categoriesDetails"
                  :key="`category-tick-${indexCategory}`"
                  :style="
                    `position: absolute; top: 50%; transform: translateX(${scale.x(
                      category.code
                    )}px) translateY(-50%);`
                  "
                >
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        :class="
                          `center-absolute--both category-icon body-1 font-weight-bold text-center`
                        "
                        :color="category.color"
                        :ripple="false"
                        fab
                        depressed
                        max-height="45"
                        max-width="45"
                        dark
                        >{{ category.code.toUpperCase() }}</v-btn
                      >
                    </template>
                    <div class="subtitle-2">{{ category.title }}</div>
                  </v-tooltip>
                </div>
              </div>
            </div>
          </div>
          <div class="position-relative">
            <svg
              @click="onClickSVGClearSelection"
              id="bubble-chart"
              :width="svgWidth"
              :height="svgHeight"
            >
              <defs>
                <clipPath id="clip">
                  <rect :width="width" :height="height + clipGradientHeight" />
                </clipPath>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#fafafa;stop-opacity:0" />
                  <stop
                    offset="100%"
                    style="stop-color:#fafafa;stop-opacity:1"
                  />
                </linearGradient>
                <pattern
                  id="pattern-stripe"
                  width="4"
                  height="4"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <rect
                    width="2"
                    height="4"
                    transform="translate(0,0)"
                    fill="black"
                  />
                </pattern>
              </defs>
              <!-- Margin convention -->
              <g
                :style="
                  `transform: translateX(${margin.left}px) translateY(${margin.top}px);`
                "
                class="margins"
              >
                <!-- Labels -->
                <!-- Axis and grid -->
                <g class="axis-and-grid">
                  <g class="axis y-axis" v-axis:y.zoom="scale" />
                </g>
              </g>
              <g
                :style="
                  `transform: translateX(${margin.left}px) translateY(${margin.top}px);`
                "
                class="center clipped"
              >
                <!-- Bubble chart -->

                <transition name="fade">
                  <path
                    v-if="hoverFundID"
                    :d="getConnectionPath(hoverFund)"
                    class="connecting-path transition--all"
                  />
                </transition>

                <transition-group tag="g" name="fade">
                  <path
                    v-for="(selectedFund,
                    indexSelectedFund) in selectedFundsComputed"
                    :key="`selectedFund-connector-${indexSelectedFund}`"
                    :d="getConnectionPath(selectedFund.nodes)"
                    class="connecting-path transition--all"
                  />
                </transition-group>

                <g class="bubbles">
                  <g
                    v-for="(category, indexCategory) in nodes"
                    :key="`bubble-category-${indexCategory}`"
                    :class="`${categories[indexCategory]} overlap-${overlap}`"
                  >
                    <g
                      v-for="(fund, indexFund) in category"
                      :key="`bubble-${indexFund}`"
                      :style="
                        `transform: translateX(${fund.x}px) translateY(${fund.y}px)`
                      "
                      :class="`transition--all-slow`"
                    >
                      <circle
                        :cx="0"
                        :cy="0"
                        :r="scale.sizes[fund.category](fund[`${sizeProperty}`])"
                        :class="
                          `${bubbleClass} ${getHoverClass(
                            fund.id
                          )} ${getActiveClass(
                            fund.fund_manager,
                            fund.fund_is_esg
                          )} ${getSelectedClass(fund.id)} ${
                            overlap ? '' : 'no-overlap'
                          } ${fund.category}--fill transition--all pointer`
                        "
                        @mouseenter="
                          mouseEnterFundBubble(
                            fund,
                            indexCategory,
                            indexFund,
                            $event
                          )
                        "
                        @mouseleave="mouseLeaveFundBubble(fund, $event)"
                        @click="
                          onClickFundBubble(fund.id, $event, indexCategory)
                        "
                      />
                      <text
                        v-if="hoverFundID && hoverFundID == fund.id"
                        :class="`bubble-label ${fund.category}--fill`"
                        :style="
                          `transform: translateX(${scale.sizes[fund.category](
                            fund[`${sizeProperty}`]
                          ) * 1.8}px)`
                        "
                      >
                        {{ fund.support.toFixed(1) }}&thinsp;%
                      </text>
                      <g
                        :style="
                          `transform: translateY(${-scale.sizes[fund.category](
                            fund[`${sizeProperty}`]
                          ) - 12}px)`
                        "
                      />
                    </g>
                  </g>
                </g>

                <!-- Average connecting path -->
                <path
                  :d="getConnectionPath(averagePerCategory)"
                  :class="
                    `connecting-path average ${getHoverClass(
                      null
                    )} transition--all`
                  "
                />

                <g class="averages">
                  <g
                    v-for="(average, indexAverage) in averagePerCategory"
                    :key="`averages-${indexAverage}`"
                    :style="
                      `transform: translateX(${average.x}px) translateY(${average.y}px)`
                    "
                    class="transition--all"
                  >
                    <circle
                      :cx="0"
                      :cy="0"
                      :r="scale.sizes[average.category](average[sizeProperty])"
                      :class="
                        `average ${hoverAverageAll ? 'hover' : 'non-hover'} ${
                          average.category
                        }--fill secondary--fill ${
                          overlap ? '' : 'no-overlap'
                        }  transition--all`
                      "
                      @mouseenter="mouseEnterAverageAllBubble(average, $event)"
                      @mouseleave="mouseLeaveAverageAllBubble(average, $event)"
                    />
                    <transition name="fade">
                      <text
                        v-if="hoverAverageAll"
                        :class="`bubble-label-average`"
                        :style="
                          `transform: translateX(-${scale.sizes[
                            average.category
                          ](average[`${sizeProperty}`]) * 1.6}px)`
                        "
                      >
                        {{ average.support.toFixed(1) }}&thinsp;%
                      </text>
                    </transition>
                    <text v-if="indexAverage == 2" class="average-label stroke">
                      <tspan x="6px" y="-4px">Average</tspan>
                      <tspan x="6px" y="11px">of all funds</tspan>
                    </text>
                    <text
                      v-if="indexAverage == 2"
                      :class="
                        `average-label ${
                          hoverAverageAll ? 'hover' : 'non-hover'
                        } transition--all`
                      "
                    >
                      <tspan x="6px" y="-4px">Average</tspan>
                      <tspan x="6px" y="11px">of all funds</tspan>
                    </text>
                  </g>
                </g>
              </g>
              <g
                :style="
                  `transform: translateX(${margin.left}px) translateY(${margin.top}px);`
                "
                class="margins"
              >
                <line x1="0" :x2="width" class="horizontal-line" />
                <g :style="`transform:translateY(${height}px)`">
                  <rect
                    :width="width"
                    :height="clipGradientHeight"
                    fill="url(#grad)"
                  />
                  <line x1="0" :x2="width" class="horizontal-line line-bold" />
                </g>
              </g>
            </svg>
            <!-- tooltips -->
            <transition name="fade">
              <ChartBubbleViolinTooltipReusable
                v-if="
                  (hoverFundID || hoverFundID == 0) &&
                    !selectedFundsIDs.includes(hoverFundID)
                "
                :x="hoverFundCoordinates.x"
                :y="hoverFundCoordinates.y"
                :content="hoverFund[0].fund"
                label=""
                orientation="top-right"
              />
            </transition>
            <div
              class="tooltips position-absolute-tl0"
              :style="
                `width: ${width}px; height: ${height + 100}px; 
                transform: translateX(${margin.left}px) translateY(${
                  margin.top
                }px); 
                pointer-events:none; overflow-y: hidden;`
              "
            >
              <ChartBubbleViolinTooltipReusable
                v-for="(node, indexNode) in selectedFundsComputed"
                :key="`tooltip-${indexNode}`"
                :x="node.coordinates.x"
                :y="node.coordinates.y"
                :content="node.data.fund"
                :label="(indexNode + 1).toString()"
                :orientation="
                  getTooltipOrientation(indexNode, node.indexCategory)
                "
              />
            </div>
          </div>
          <!-- <div>Mobile carousel interface</div> -->
        </div>
      </v-col>
      <v-col class="grey lighten-5">
        <!-- Fund pointers -->
        <div
          class="pb-4 d-flex align-center"
          :style="`height:${yAxisCategoryLabelsHeight + margin.top - 1}px`"
        >
          <v-row align="center">
            <transition-group
              name="fade"
              style="display: flex; flex-flow: row-wrap"
            >
              <v-col
                v-for="(fund, indexFund) in selectedFundsComputed"
                :key="`fund-label-${indexFund}`"
                class="d-flex align-center"
              >
                <div
                  class="grey d-flex align-center justify-center primary--text"
                  style="width:42px; height:42px; min-width:42px; min-height:42px; border: 2px solid #fafafa !important; border-radius: 50% 50% 0 50%; z-index: 2; "
                >
                  <div class="body-1 font-weight-bold background--text">
                    {{ indexFund + 1 }}
                  </div>
                </div>
                <div
                  class="pa-4 body-2 font-weight-medium"
                  style="line-height: 1.25"
                >
                  {{ fund.data.fund }}
                </div>
              </v-col>
            </transition-group>
          </v-row>
        </div>
        <!-- Body fund focus -->
        <transition name="fade">
          <div
            v-if="selectedFundsComputed.length > 0"
            key="details"
            :style="
              `height: ${height +
                2}px; border-top: 1px solid grey; border-bottom: 2px solid black`
            "
          >
            <!-- ChartStars -->
            <v-row>
              <v-col
                v-for="(fund, indexFund) in selectedFundsComputed"
                :key="`fund-label-${indexFund}`"
                :class="
                  `d-flex ${getJustification(
                    indexFund,
                    selectedFundsComputed.length
                  )}`
                "
              >
                <ChartHalfHexagonReusable
                  :data="fund.data"
                  :categories="['e', 's', 'g']"
                  yProperty="support"
                  sizeProperty="vote"
                  :maxSizeProp="maxSizePropertyAllCategories"
                  :svgHeight="240"
                  :style="`transform: scaleX(${indexFund == 1 ? -1 : 1})`"
                />
              </v-col>
            </v-row>
            <!-- Table -->
            <div
              v-if="selectedFundsComputed.length > 0"
              style="height: calc(100% - 280px); overflow: auto;"
            >
              <div class="position-relative">
                <v-data-table
                  class="elevation-0 minimal-table caption"
                  :headers="headers"
                  :items="proposalsTable"
                  :items-per-page="-1"
                  :search="search"
                  hide-default-footer
                  dense
                ></v-data-table>
                <div
                  class="transparent-gradient pointer-events-none"
                  style="position: sticky; bottom: -2px; height: 22%; width: 100%;"
                >
                  &nbsp;
                </div>
              </div>
              <v-card width="300" class="pl-4 mt-1 background" elevation="0">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search proposals"
                  hide-details
                ></v-text-field>
              </v-card>
            </div>
            <!-- <p class="caption">Legend</p> -->
          </div>
          <div
            v-else
            key="hint"
            class="d-flex justify-center align-center"
            :style="`height: ${height + 2}px;`"
          >
            <p class="headline grey--text text--lighten-1">
              You can compare up to two funds <br />
              using the text input <br />
              or clicking on one of the circles.
            </p>
          </div>
        </transition>
      </v-col>
    </v-row>

    <!-- <v-btn @click="test">Test</v-btn> -->
  </v-container>
</template>

<script>
import * as d3 from "d3";

import { mapState } from "vuex";

import ChartBubbleViolinControls from "~/components/ChartBubbleViolinControls.vue";
import ChartStarReusable from "~/components/ChartStarReusable.vue";
import ChartHalfHexagonReusable from "~/components/ChartHalfHexagonReusable.vue";
import ChartBubbleViolinTooltipReusable from "~/components/ChartBubbleViolinTooltipReusable.vue";

export default {
  components: {
    ChartBubbleViolinControls,
    ChartStarReusable,
    ChartHalfHexagonReusable,
    ChartBubbleViolinTooltipReusable
  },
  props: {
    chartClass: {
      type: String,
      default: "chart-bubble"
    },
    bubbleClass: {
      type: String,
      default: "bubble"
    },
    svgHeightProp: {
      type: Number,
      default: 600
    },
    svgWidthProp: {
      type: Number,
      default: 900
    },
    margin: {
      type: Object,
      default() {
        return { top: 20, left: 45, bottom: 50, right: 2 };
      }
    },
    categories: {
      type: Array,
      default() {
        return ["cat1", "cat2", "cat3"];
      }
    },
    categoriesDetails: {
      type: Array,
      default() {
        return [
          { code: "cat1", title: "Category 1", color: "#000" },
          { code: "cat2", title: "Category 2", color: "#f55" },
          { code: "cat3", title: "Category 3", color: "#f99" }
        ];
      }
    },
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
    sizeScalePerCategoryProp: {
      type: Boolean,
      default: true
    },
    proposals: {
      type: Array,
      default() {
        return [
          {
            id: 0,
            year: 2009,
            proposal: "Report on climate change impact",
            company: "Amazon",
            fundsYes: [1],
            fundsNo: [0]
          }
        ];
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
    }
  },
  directives: {
    axis(el, binding) {
      // console.log(binding); // the scale object

      const axis = binding.arg; // x or y
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];

      if (binding.arg == "y") {
        const zoom = binding.modifiers.zoom;
        let width = binding.value[axis].brushWidth;
        let scale = binding.value[axis].static;
        let numberOfTicks = 4;

        if (zoom) {
          numberOfTicks = 3;
          scale = binding.value[axis].zoom;
          width = binding.value[axis].width;
        }
        const ticks = d3
          .select(el)
          .call(
            d3[axisMethod](scale)
              .tickFormat(d => `${d} %`)
              .ticks(numberOfTicks)
            // .tickValues(tickValues)
          )
          .selectAll(".tick");
        // stlying in css
        // console.log(width);
        ticks.select("line").attr("x1", () => width);
        ticks.select("text").attr("transform", () => "translate(4,0)");
      } else {
        const scale = binding.value[axis];
        d3.select(el).call(d3[axisMethod](methodArg));
      }
    }
  },
  data() {
    return {
      isHydrated: false,
      reactivity: { brushed: 0, resized: 0, clickedSameID: 0 },
      simulations: [],
      nodes: [],
      coords: [],
      sizeScalePerCategoryComponent: null,
      forcesOverlap: { manyBody: 0, x: 0.15, y: 20, collision: 0 },
      forcesNoOverlap: { manyBody: -20, x: 0.15, y: 20, collision: 0.5 },
      fundManagers: ["BlackRock", "Vanguard", "State Street"],
      hoverFundID: null,
      hoverAverageAll: false,
      yAxisCategoryLabelsHeight: 60,
      svgWidth: this.svgWidthProp,
      svgHeight: this.svgHeightProp,
      resizing: false,
      hoverFundTooltip: [{ x: 0, y: 0, category: "" }],
      hoverFundNew: { indexCategory: -1, indexFund: -1 },
      yZoom: {},
      brushSVGWidth: 150,
      clipGradientHeight: 10,
      search: "",
      currentProposals: [
        {
          year: 2009,
          proposal: "Report on climate change impact",
          company: "Amazon",
          fund1Vote: "For",
          fund2Vote: "Against",
          outcome: "passed"
        }
      ]
    };
  },
  computed: {
    hoverFundCoordinates() {
      if (this.hoverFundNew.indexCategory > -1) {
        const node = this.nodes[this.hoverFundNew.indexCategory][
          this.hoverFundNew.indexFund
        ];
        const x = node.x;
        const y = node.y;
        return { x, y };
      } else {
        return { x: 0, y: 0 };
      }
    },
    width() {
      return this.svgWidth - this.margin.right - this.margin.left;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    brushWidth() {
      const calculatedWidth =
        this.brushSVGWidth - this.margin.right - this.margin.left;
      const width = calculatedWidth > 0 ? calculatedWidth : 0;
      return width;
    },
    dataPerCategory() {
      const dataPerCategory = this.categories.map(c =>
        this.data.map(d => {
          let newObject = {};
          for (const key of Object.keys(d)) {
            if (key.startsWith(c)) {
              newObject[key.slice(2)] = d[key];
            }
            if (key.startsWith("fund") || key.startsWith("id")) {
              newObject[key] = d[key];
              newObject.category = c;
            }
          }
          return newObject;
        })
      );
      return dataPerCategory;
    },
    averagePerCategory() {
      let averagePerCategory = {};

      //
      const totalSizePerCategory = this.dataPerCategory.map(x =>
        x.map(y => y[this.sizeProperty]).reduce((a, b) => a + b)
      );
      //
      const averagePerCategorySizeProperty = totalSizePerCategory.map(
        (x, i) => x / this.dataPerCategory[i].length
      );
      //
      const averagePerCategoryYProperty = this.dataPerCategory.map(
        (x, i) =>
          x
            .map(y => y[this.yProperty] * y[this.sizeProperty])
            .reduce((a, b) => a + b) / totalSizePerCategory[i]
      );

      const averages = this.categories.map((x, i) => {
        let newObject = {};
        newObject["category"] = x;
        newObject["x"] = this.scale.x(x);
        newObject[this.yProperty] = averagePerCategoryYProperty[i];
        newObject["y"] = this.yZoom(averagePerCategoryYProperty[i]);
        newObject[this.sizeProperty] = averagePerCategorySizeProperty[i];
        return newObject;
      });

      return averages;
    },
    maxSizePropertyPerCategory() {
      return this.dataPerCategory.map(x =>
        Math.max(...x.map(y => y[this.sizeProperty]))
      );
    },
    maxSizePropertyAllCategories() {
      return Math.max(...this.maxSizePropertyPerCategory);
    },
    sizeScalePerCategory() {
      if (this.sizeScalePerCategoryComponent === null) {
        return this.sizeScalePerCategoryProp;
      } else {
        return this.sizeScalePerCategoryComponent;
      }
    },
    scale() {
      const x = d3
        .scaleBand()
        .domain(this.categories)
        .rangeRound([0, this.width])
        // centers the bubble
        .paddingInner(1)
        .paddingOuter(0.5);

      let y = {};
      y.zoom = this.yZoom;
      y.static = d3
        .scaleLinear()
        .range([this.height, 0])
        .domain([0, 100]);

      y.width = this.width;
      y.brushWidth = this.brushWidth;
      // y.tickValues = this.niceYAxis.tickValues;

      let sizeScales = [];
      for (
        let index = 0;
        index < this.maxSizePropertyPerCategory.length;
        index++
      ) {
        const element = this.sizeScalePerCategory
          ? this.maxSizePropertyPerCategory[index]
          : this.maxSizePropertyAllCategories;

        let scale = d3
          .scaleSqrt()
          .domain([0, element])
          .rangeRound([this.sizeRange[0], this.sizeRange[1]]);
        sizeScales.push(scale);
      }

      // Convert two arrays to an object:
      // https://stackoverflow.com/questions/39127989/creating-a-javascript-object-from-two-arrays/39128130
      let sizes = Object.assign(
        ...this.categories.map((k, i) => ({ [k]: sizeScales[i] }))
      );

      return { x, y, sizes };
    },
    brush() {
      const brush = d3
        .brushY()
        .extent([
          [0, 0],
          [this.brushWidth, this.height]
        ])
        .on("end", this.brushed);
      return brush;
    },
    violinAreas() {
      const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
      // Not weighted

      const supportAverage = this.data.map(x =>
        parseFloat(
          arrAvg(this.categories.map(c => x[`${c}_${this.yProperty}`])).toFixed(
            2
          )
        )
      );

      const histogram = d3
        .histogram()
        .domain([0, 100])
        .thresholds(this.scale.y.static.ticks(50))
        .value(d => d);

      const supportPerCategory = this.categories.map(c =>
        this.data.map(x => x[`${c}_${this.yProperty}`])
      );

      const histogramsPerCategory = supportPerCategory.map((x, i) => ({
        category: this.categories[i],
        histogram: histogram(x)
      }));

      const maxBinLength = Math.max(
        ...histogramsPerCategory.map(h =>
          Math.max(...h.histogram.map(bin => bin.length))
        )
      );
      // console.log(maxBinLength);
      const maxBinLengths = histogramsPerCategory.map(h =>
        Math.max(...h.histogram.map(bin => bin.length))
      );
      const binLengths = histogramsPerCategory.map(h =>
        h.histogram.map(bin => bin.length)
      );

      const xScale = d3
        .scalePow()
        .exponent(0.5)
        .domain([-maxBinLength, maxBinLength])
        .range([0, this.brushWidth]);

      const yScale = this.scale.y.static;

      const area = d3
        .area()
        .x0(d => xScale(-d.length))
        .x1(d => xScale(d.length))
        .y(d => yScale(d.x0))
        .curve(d3.curveBasis);

      // return area(histogram(supportAverage));
      return histogramsPerCategory.map((h, i) => ({
        category: h.category,
        path: area(histogram(h.histogram)),
        maxBinLength: maxBinLengths[i],
        binLenghts: binLengths[i]
      }));
    },
    forces() {
      if (this.overlap) {
        return this.forcesOverlap;
      } else {
        return this.forcesNoOverlap;
      }
    },
    hoverFund() {
      if (this.hoverFundID || this.hoverFundID == 0) {
        return this.nodes.map(x => x.find(y => y.id == this.hoverFundID));
      } else {
        return [];
      }
    },
    hoverFundData() {
      if (this.hoverFundID || this.hoverFundID == 0) {
        return this.data.find(x => x.id == this.hoverFund[0].id);
      } else {
        return null;
      }
    },
    selectedFundsModel: {
      set(array) {
        this.$store.commit("interfaceFundSearchBar/ChangeSelectedFunds", array);
      },
      get() {
        return this.selectedFunds;
      }
    },
    selectedFundsComputed() {
      const reactivity =
        this.reactivity.brushed +
        this.reactivity.resized +
        this.reactivity.clickedSameID +
        this.overlap;

      const selectedFundsMapped = this.selectedFunds.map(s => {
        // console.log(s);
        const id = s.id;
        const indexCategory = s.indexCategory;
        // console.log(s.id);
        const node = this.nodes[s.indexCategory].find(x => x.id === s.id);
        const coordinates = { x: node.x, y: node.y };
        const nodes = this.nodes.map(x => x.find(y => y.id == s.id));
        const data = this.data.find(x => x.id == s.id);
        return { id, indexCategory, coordinates, nodes, data };
      });
      return selectedFundsMapped;
    },
    selectedFundsIDs() {
      return this.selectedFunds.map(x => x.id);
    },
    headers() {
      const selected = this.selectedFundsIDs.length;
      const reactivity = this.reactivity.clickedSameID + this.overlap;
      let headers = [];
      if (this.selectedFunds.length > 0) {
        headers = headers.concat([
          {
            text: "Year",
            value: "year",
            width: "80px"
          },
          { text: "Proposal", value: "proposal" },
          { text: "Company", value: "company", width: "110px" },
          { text: "1", value: "fund1Vote", width: "60px" }
        ]);
        if (this.selectedFunds.length > 1) {
          headers.push({ text: "2", value: "fund2Vote", width: "60px" });
        }
        headers.push({ text: "Outcome", value: "outcome", width: "105px" });
      }
      return headers;
    },
    proposalsTable() {
      const proposalsLocal = JSON.parse(JSON.stringify(this.proposals));
      const selectedFundsIDsLocal = JSON.parse(
        JSON.stringify(this.selectedFundsIDs)
      );
      const parsedProposals = proposalsLocal.map(x => {
        let parsed = x;
        parsed.funds_yes = JSON.parse(x.funds_yes);
        parsed.funds_no = JSON.parse(x.funds_no);
        return parsed;
      });
      // console.log(parsedProposals);
      const filteredProposals = selectedFundsIDsLocal.map(s =>
        parsedProposals.filter(
          x => x.funds_yes.includes(s) || x.funds_no.includes(s)
        )
      );
      const flatProposals = filteredProposals.flat();
      // console.log(filteredProposals);
      const matchedProposals = flatProposals.map(p => {
        let matched = p;
        matched.fund1Vote = "–";
        if (this.selectedFundsIDs.length > 0) {
          if (p.funds_yes.includes(this.selectedFundsIDs[0])) {
            matched.fund1Vote = "For";
          }
          if (p.funds_no.includes(this.selectedFundsIDs[0])) {
            matched.fund1Vote = "Against";
          }
        }
        if (this.selectedFundsIDs.length > 1) {
          matched.fund2Vote = "–";

          if (p.funds_yes.includes(this.selectedFundsIDs[1])) {
            matched.fund2Vote = "For";
          }
          if (p.funds_no.includes(this.selectedFundsIDs[1])) {
            matched.fund2Vote = "Against";
          }
        }
        return matched;
      });
      // console.log(matchedProposals);

      return matchedProposals;
    },
    ...mapState({
      showManager: state => state.chartBubble.showManager,
      showESG: state => state.chartBubble.showESG,
      toggleAll: state => state.chartBubble.toggleAll,
      selectedFunds: state => state.interfaceFundSearchBar.selectedFunds
    }),
    overlap() {
      return this.toggleAll.includes(1);
    },
    expandManagers() {
      return this.toggleAll.includes(2);
    }
  },
  watch: {
    overlap(change, old) {
      // console.log("overlap changed");
      this.simulationsDefine();
      this.simulationsRun();
    },
    expandManagers(change, old) {
      // console.log("overlap changed");
      this.simulationsDefine();
      this.simulationsRun();
    },
    svgWidth() {
      this.simulationsDefine();
      this.simulationsRun();
    },
    yZoom() {
      this.simulationsDefine();
      this.simulationsRun();
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
    simulationsDefine() {
      let arrayOfSimulations = [];

      // Simulation parameters
      const that = this;
      let alpha = 1; // Starting point, alpha is the "ticks" unit or counter // default: 1, range: [0,1]
      let alphaDecay = 0.0228; // Acceleration of the animation // default: 0.0288, range [0,1]
      let alphaMin = 0.001; // Target! // default: 0.001, range [0,1]
      let velocityDecay = 0.6; // Friction or "mass" // default: 0.4, range [0,1]

      for (let index = 0; index < this.categories.length; index++) {
        // Define a simulation
        let simulation = d3
          .forceSimulation(this.nodes[index])
          .alpha(alpha)
          .alphaDecay(alphaDecay)
          .alphaMin(alphaMin)
          .alphaTarget(0)
          .velocityDecay(velocityDecay)
          .force(
            "charge",
            d3
              .forceManyBody()
              .strength(that.forces.manyBody)
              .theta(0.8) // accuracy, default: 0.9
              .distanceMin(1)
              .distanceMax(600)
          )
          .force(
            "x",
            d3
              .forceX()
              .strength(that.forces.x)
              .x(function(d) {
                if (that.expandManagers) {
                  let spread =
                    that.width /
                    (that.categories.length * that.fundManagers.length);
                  spread *= 0.8;
                  return (
                    that.scale.x(d.category) - spread + spread * d.fund_manager
                  );
                } else {
                  return that.scale.x(d.category);
                }
              })
          )
          .force(
            "y",
            d3
              .forceY()
              .strength(that.forces.y)
              .y(function(d) {
                return that.yZoom(d[`${that.yProperty}`]);
              })
          )
          .force(
            "collision",
            d3
              .forceCollide()
              .radius(function(d) {
                return that.scale.sizes[d.category](
                  d[`${that.sizeProperty}`] + 0.5
                );
              })
              .strength(that.forces.collision)
              .iterations(1)
          )
          // .on("tick", this.ticked)
          // .on("end", this.ended)
          .stop();
        arrayOfSimulations.push(simulation);
      }

      this.simulations = arrayOfSimulations;
    },
    simulationsRun() {
      for (const simulation of this.simulations) {
        for (
          var i = 0,
            n = Math.ceil(
              Math.log(simulation.alphaMin()) /
                Math.log(1 - simulation.alphaDecay())
            );
          i < n;
          ++i
        ) {
          simulation.tick();
        }
      }
    },
    simulationsUpdateCoordinates() {
      this.coords = [];
      let coordsPerCategory = [];
      for (const category of this.dataPerCategory) {
        let coordsInCategory = [];
        for (let index = 0; index < category.length; index++) {
          const node = category[index];
          coordsInCategory.push({
            x: node.x,
            y: node.y
          });
        }
        coordsPerCategory.push(coordsInCategory);
      }
    },
    onClick(event) {
      // console.log(event);
    },
    getActiveClass(sID, fundIsESG) {
      if (this.showManager.includes(sID) && this.showESG.includes(fundIsESG)) {
        return "active";
      } else {
        return "inactive";
      }
    },
    getHoverClass(id) {
      if (this.hoverAverageAll) {
        return "average-all-is-hovered";
      }
      if (this.hoverFundID == null) {
        return "";
      }
      if (id == this.hoverFundID) {
        return "hover";
      } else {
        return "non-hover";
      }
    },
    getSelectedClass(id) {
      // return id == this.selectedFundID ? "selected" : "";
      if (this.selectedFundsIDs.length > 0) {
        // console.log(this.selectedFundID);
        if (this.selectedFundsIDs.includes(id)) {
          return "selected";
        } else {
          return "non-selected";
        }
      } else {
        return "";
      }
    },
    mouseEnterFundBubble(element, indexCategory, indexFund, event) {
      // console.log(element, event);
      // console.log(event.target);
      // console.log(event.target.getBoundingClientRect());
      const elRect = event.target.getBoundingClientRect();

      this.hoverFundTooltip.x = elRect.right;
      this.hoverFundTooltip.y = elRect.top;
      this.hoverFundID = element.id;

      this.hoverFundNew.indexCategory = indexCategory;
      this.hoverFundNew.indexFund = indexFund;

      // console.log(this.nodes[indexCategory][indexFund].x);
      // console.log(this.hoverFundTooltip.x);
      // if (this.hoverFund) {
      //   console.log(this.hoverFund);
      //   console.log();
      // }
      // console.log(this.hoverFund[indexCategory].fund);
    },
    mouseLeaveFundBubble(element, event) {
      this.hoverFundID = null;
      // console.log(this.hoverFund);
    },
    mouseEnterAverageAllBubble(average, event) {
      this.hoverAverageAll = true;
    },
    mouseLeaveAverageAllBubble(average, event) {
      this.hoverAverageAll = false;
    },
    onClickFundBubble(id, event, indexCategory) {
      // check if clicked fund is in selectedFundsArray
      // check if selectedFundsArray.length >= 2
      // if an already selected fund at the selected place is clicked – deselect it
      // if an already selected fund is clicked but at a different place
      const idMatch = this.selectedFunds.findIndex(x => x.id === id);
      const bothMatch = this.selectedFunds.findIndex(
        x => x.id === id && x.indexCategory === indexCategory
      );
      // console.log(categoryMatch);

      let selectedFundsLocal = JSON.parse(JSON.stringify(this.selectedFunds));
      // console.log(id);
      if (bothMatch >= 0) {
        // console.log("complete match");
        selectedFundsLocal.splice(bothMatch, 1);
      } else if (idMatch >= 0) {
        // console.log("partial match");
        selectedFundsLocal[idMatch] = { id, indexCategory };
        this.reactivity.clickedSameID++;
      } else {
        // console.log("no match");
        if (selectedFundsLocal.length < 2) {
          // console.log("pushed");
          selectedFundsLocal.push({ id, indexCategory });
        } else {
          // console.log("unshifted");
          selectedFundsLocal.pop();
          selectedFundsLocal.unshift({ id, indexCategory });
        }
      }

      this.selectedFundsModel = selectedFundsLocal;

      // console.log(this.selectedFunds);
      // console.log(this.headers);
      // console.log(this.selectedFundsComputed);
    },
    onClickSVGClearSelection(event) {
      const elementClickedOn = event.target.tagName;
      if (elementClickedOn != "circle") {
        setTimeout(() => {
          this.selectedFundsModel = [];
        }, 150);
      }
    },
    getJustification(indexFund, length) {
      if (length < 2) {
        return "justify-center";
      } else {
        if (indexFund == 0) {
          return "justify-end";
        } else {
          return "justify-start";
        }
      }
    },
    getTooltipOrientation(indexNode, indexCategory) {
      // node.indexCategory == 0 ? 'top-right' : 'bottom-left'
      if (indexCategory == 0) {
        return "top-right";
      } else {
        return "bottom-left";
      }
    },
    getConnectionPath(array) {
      // console.log(array);
      const start = `M${array[0].x},${array[0].y}`;
      const points = array
        .slice(1)
        .map(p => ` L${p.x},${p.y}`)
        .join("");
      const path = start + points;
      // console.log(path);
      return path;
    },
    onResize() {
      this.resizing = true;
      const setContainerWidth = () => {
        const el = queryString => document.querySelector(queryString);

        const getPxPropOfEl = (queryString, propertyString) => {
          return parseFloat(
            window
              .getComputedStyle(el(queryString), null)
              .getPropertyValue(propertyString)
              .slice(0, -2)
          );
        };

        const getPadding = queryString => {
          let padding = { top: 0, right: 0, bottom: 0, left: 0 };
          for (const property in padding) {
            if (padding.hasOwnProperty(property)) {
              padding[property] = getPxPropOfEl(
                queryString,
                `padding-${property}`
              );
            }
          }
          padding.x = padding.left + padding.right;
          padding.y = padding.top + padding.bottom;
          return padding;
        };

        const updateSizeVariable = (containerQuery, variableName) => {
          const dimension = /width/i.test(variableName)
            ? { name: "Width", padding: "x" }
            : { name: "Height", padding: "y" };
          const padding = getPadding(containerQuery)[dimension.padding];
          // console.log(padding);
          let newSize = el(containerQuery)[`client${dimension.name}`];
          // console.log(el(containerQuery).clientWidth);
          newSize = padding ? newSize - padding : newSize;
          if (newSize && newSize != this[variableName]) {
            this[variableName] = newSize;
            // if (variableName == "svgHeight") {
            //   this.yZoom = d3
            //     .scaleLinear()
            //     .range([this.height, 0])
            //     .domain(this.yZoom.domain());
            // }
          }
        };

        updateSizeVariable("#bubble-chart-content", "svgWidth");
        updateSizeVariable("#bubble-chart-content", "svgHeight");
        updateSizeVariable("#brush-column", "brushSVGWidth");

        this.yZoom = d3
          .scaleLinear()
          .range([this.height, 0])
          .domain(this.yZoom.domain());

        // console.log(el(".brush"));
        d3.select(".brush").remove();

        if (this.isHydrated) {
          // console.log(this.yZoom.domain());
          // console.log(brushRange);
          const brushRange = [1, 0].map(x =>
            this.scale.y.static(this.yZoom.domain()[x])
          );
          d3.select("#brush .margins")
            .append("g")
            .attr("class", "brush")
            .call(this.brush)
            .call(this.brush.move, brushRange);
        }
      };

      // Execute
      setContainerWidth();
      this.reactivity.resized++;
      this.resizing = false;
    },
    test(event) {
      // console.log(event);
      // console.log(event.target.tagName);
      // console.log(this.sizeScalePerCategoryComponent);
      // console.log(this.forces.manyBody);
      // console.log(this.overlap);
      // this.sizeScalePerCategoryComponent = true;
      // if (this.sizeScalePerCategoryComponent == null) {
      //   this.sizeScalePerCategoryComponent = false;
      // } else {
      //   this.sizeScalePerCategoryComponent = !this
      //     .sizeScalePerCategoryComponent;
      // }
      // this.simulationsDefine();
      // this.simulationsRun();
      // console.log(this.nodes[0][0].x);
      //
      // if (element.id == this.hoverFundID) {
      //   // console.log(element);
      // }
    },
    brushed(event) {
      if (d3.event.sourceEvent && d3.event.type === "end") {
        this.eventType = d3.event.type;
        var s = d3.event.selection;
        // console.log(s);
        setTimeout(() => {
          this.yZoom = d3
            .scaleLinear()
            .range([this.height, 0])
            .domain([
              this.scale.y.static.invert(s[1]),
              this.scale.y.static.invert(s[0])
            ]);
          // .nice();
          this.reactivity.brushed++;
        }, 50);

        // console.log(this.yZoom.domain());
      }
    },
    brushedManual(range) {
      // console.log(this.yZoom.domain());
      // console.log(brushRange);
      d3.select(".brush").remove();

      this.yZoom = d3
        .scaleLinear()
        .range([this.height, 0])
        .domain(range);

      const brushRange = [1, 0].map(x =>
        this.scale.y.static(this.yZoom.domain()[x])
      );

      d3.select("#brush .margins")
        .append("g")
        .attr("class", "brush")
        .call(this.brush)
        .call(this.brush.move, brushRange);
    }
  },
  created() {
    this.yZoom = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([0, 100]);
  },
  mounted() {
    this.isHydrated = true;
    this.nodes = this.dataPerCategory;
    this.simulationsDefine();
    this.simulationsRun();
    // console.log(this.proposals);
    // console.log(this.selectedFundsComputed);
    // console.log(this.nodes);
    // this.simulationsUpdateCoordinates();

    // console.log(this.data);
    // console.log(this.dataPerCategory);
    // console.log(this.averagePerCategory);
    // console.log(this.violinAreas);
    // console.log(this.maxSizePropertyPerCategory);
    // console.log(this.scale);
    // console.log(this.scale.y.static);

    d3.select("#brush .margins")
      .append("g")
      .attr("class", "brush")
      .call(this.brush)
      .call(this.brush.move, this.yZoom.range().reverse());

    this.brushedManual([0, 62]);
  }
};
</script>

<style lang="scss">
.clipped {
  clip-path: url(#clip);
}
</style>
