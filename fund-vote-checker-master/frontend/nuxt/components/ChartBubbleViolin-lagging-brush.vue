<template>
  <v-container class="position-relative" fluid v-resize="onResize">
    <!-- <ChartBubbleViolinControls class="position-absolute-tr0" /> -->
    <v-row class="pa-8">
      <v-col cols="1">
        <div class="grey lighten-2" :style="`height:${yAxisCategoryLabelsHeight + margin.top}px`"></div>
        <div class="grey lighten-4">
          <svg width="50" :height="height">
            <g class="brush" v-brushArea="brush" />

            <!-- <path stroke="#235687" fill="#4599ff" :d="violinArea" /> -->
            <!-- <g class="brush" v-brushArea="brush" /> -->
          </svg>
        </div>
      </v-col>
      <v-col id="bubble-chart-content">
        <!-- <v-btn @click="test">Test</v-btn> -->
        <div :class="`${chartClass} position-relative`">
          <!-- :style="`width: ${width}px; transform: translateX(${margin.left}px);`" -->
          <div :style="`height:${yAxisCategoryLabelsHeight}px`">
            <!-- <div class="body-2">{{ yAxisLabel }}</div> -->
            <div
              class="d-flex align-center category-labels"
              :style="`height: 100%; transform: translateX(${margin.left}px)`"
            >
              <div class="position-relative category-labels">
                <div
                  v-for="(category, indexCategory) in categoriesDetails"
                  :key="`category-tick-${indexCategory}`"
                  :style="`position: absolute; top: 50%; transform: translateX(${scale.x(category.code)}px) translateY(-50%);`"
                >
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        :class="`center-absolute--both category-icon body-1 font-weight-bold text-center`"
                        :color="category.color"
                        :ripple="false"
                        fab
                        depressed
                        max-height="45"
                        max-width="45"
                        dark
                      >{{category.code.toUpperCase()}}</v-btn>
                    </template>
                    <div class="subtitle-2">{{ category.title }}</div>
                  </v-tooltip>
                </div>
              </div>
            </div>
          </div>
          <div
            class="position-absolute-tl0"
            :style="`width: 60px; transform: translateY(${yAxisCategoryLabelsHeight+30}px) translateX(-20px)`"
          >
            <div class="axis-label--right">
              <div class="caption font-weight-bold">Support</div>as % of proposals the fund voted on
            </div>
          </div>
          <svg :width="svgWidth" :height="svgHeight">
            <!-- Margin convention -->
            <g
              :style="`transform: translateX(${margin.left}px) translateY(${margin.top}px);`"
              class="margins"
            >
              <!-- Labels -->
              <!-- Axis and grid -->
              <g class="axis-and-grid">
                <g class="axis y-axis" v-axis:y="scale" />
                <!-- <text>{{ yAxisLabel }}</text> -->
                <!-- <g class="axis x-axis" v-axis:x="scale" :transform="`translate(${0}, ${height})`" /> -->
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
              <!-- Bubble chart -->
              <circle :cx="width/2" :cy="yZoom(50)" r="40" fill="teal" />
              <!-- v-if="hoverFund.length > 1" -->
              <transition name="fade">
                <path
                  v-if="hoverFundID"
                  :d="getConnectionPath(hoverFund)"
                  class="connecting-path transition--all"
                />
              </transition>

              <transition name="fade">
                <!-- v-if="hoverFund.length > 1" -->
                <path
                  v-if="selectedFundID"
                  :d="getConnectionPath(selectedFund)"
                  class="connecting-path transition--all"
                />
              </transition>

              <g class="bubbles">
                <g
                  v-for="(category, indexCategory) in nodes"
                  :key="`bubble-category-${indexCategory}`"
                  :class="`${categories[indexCategory]} overlap-${overlap}`"
                >
                  <g
                    v-for="(fund, indexFund) in category"
                    :key="`bubble-${indexFund}`"
                    :style="`transform: translateX(${fund.x}px) translateY(${fund.y}px)`"
                    :class="`transition--all-slow`"
                  >
                    <circle
                      :cx="0"
                      :cy="0"
                      :r="scale.sizes[fund.category](fund[`${sizeProperty}`])"
                      :class="`${bubbleClass} ${getHoverClass(fund.id)} ${getActiveClass(fund.fund_manager, fund.fund_is_esg)} ${getSelectedClass(fund.id)} ${overlap ? '' : 'no-overlap'} ${fund.category}--fill transition--all pointer`"
                      @mouseenter="mouseEnterFundBubble(fund, indexCategory, $event)"
                      @mouseleave="mouseLeaveFundBubble(fund, $event)"
                      @click="onClickFundBubble(fund.id, $event)"
                    />

                    <!-- :style="`transform: translateX(${-scale.sizes[fund.category](fund[`${sizeProperty}`])-12}px)`" -->
                    <g
                      :style="`transform: translateY(${-scale.sizes[fund.category](fund[`${sizeProperty}`])-12}px)`"
                    >
                      <!-- alignment-baseline="middle" -->
                      <!-- <text
                        v-if="indexCategory == 1 && (fund.id == hoverFundID || fund.id == selectedFundID)"
                        font-size="14"
                        text-anchor="middle"
                        stroke="#fafafa"
                        stroke-width="6"
                        stroke-linejoin="round"
                      >{{fund.fund}}</text>
                      <text
                        v-if="indexCategory == 1 && (fund.id == hoverFundID || fund.id == selectedFundID)"
                        font-size="14"
                        text-anchor="middle"
                      >{{fund.fund}}</text>-->
                    </g>
                  </g>
                </g>
              </g>

              <!-- Average connecting path -->
              <path
                :d="getConnectionPath(averagePerCategory)"
                :class="`connecting-path average ${getHoverClass(null)} transition--all`"
              />

              <g class="averages">
                <g
                  v-for="(average, indexAverage) in averagePerCategory"
                  :key="`averages-${indexAverage}`"
                  :style="`transform: translateX(${average.x}px) translateY(${average.y}px)`"
                  class="transition--all"
                >
                  <!-- :cx="scale.x(average.category)"
                  :cy="scale.y(average[yProperty])"-->
                  <circle
                    :cx="0"
                    :cy="0"
                    :r="scale.sizes[average.category](average[sizeProperty])"
                    :class="`average ${hoverAverageAll ? 'hover' : ''} ${average.category}--fill secondary--fill ${overlap ? '' : 'no-overlap'}  transition--all`"
                    @mouseenter="mouseEnterAverageAllBubble(average, $event)"
                    @mouseleave="mouseLeaveAverageAllBubble(average, $event)"
                  />
                  <text v-if="indexAverage == 2" class="average-label stroke">Average of all funds</text>
                  <text v-if="indexAverage == 2" class="average-label">Average of all funds</text>
                </g>
              </g>
            </g>
          </svg>
          <!-- <div>Mobile carousel interface</div> -->
        </div>
      </v-col>
      <v-col>
        <!-- <div style="width:32.7%">
          <div :style="`height:${yAxisCategoryLabelsHeight + margin.top}px`"></div>
          <div style="height: 240px; border-top: 1px dashed grey; border-bottom: 2px solid black">
            <p class="caption">Legend</p>
          </div>
        </div>-->
      </v-col>
    </v-row>
    <!-- <div>Test</div> -->
    <transition name="fade">
      <div
        v-if="hoverFundID"
        :style="`position:absolute; left:${hoverFundTooltip.x}px; top:${hoverFundTooltip.y}px;`"
        class="d-flex mt-2"
      >
        <div
          class="secondary d-flex align-center justify-center primary--text"
          style="width:30px; height:30px; border: 2px solid #fafafa !important; border-radius: 0px 50% 50% 50%; z-index: 2; "
        >
          <div class="body-2 font-weight-bold">1</div>
        </div>
        <div
          class="grey darken-2 pt-4 pb-5 pl-7 pr-4 ml-n6 mt-2 d-flex align-center"
          style=" max-width: 160px; border-radius:2px"
        >
          <div
            class="caption font-weight-bold white--text"
            style="line-height:1.2 !important;"
          >{{hoverFund[0].fund}}</div>
        </div>
      </div>
    </transition>
  </v-container>
</template>

<script>
import * as d3 from "d3";

import { mapState } from "vuex";

import ChartBubbleViolinControls from "~/components/ChartBubbleViolinControls.vue";

export default {
  components: { ChartBubbleViolinControls },
  props: {
    chartClass: {
      type: String,
      default: "chart-bubble"
    },
    bubbleClass: {
      type: String,
      default: "bubble"
    },
    svgHeight: {
      type: Number,
      default: 760
    },
    svgWidthProp: {
      type: Number,
      default: 900
    },
    margin: {
      type: Object,
      default() {
        return { top: 20, left: 50, bottom: 50, right: 20 };
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
      // console.log(el); // this is the g
      // console.log(binding); // the scale object
      // console.log(binding.value);
      const axis = binding.arg; // x or y
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];
      if (binding.arg == "y") {
        const tickValues = binding.value.y.tickValues;
        d3.select(el).call(
          d3[axisMethod](methodArg)
            .tickFormat(d => `${d} %`)
            .tickValues(tickValues)
        );
      } else {
        d3.select(el).call(d3[axisMethod](methodArg));
      }
    },
    brushArea(el, binding) {
      // console.log(binding);
      // console.log(binding.value);
      const brush = binding.value.brush;
      const range = binding.value.brushRange;
      d3.select(el).call(brush);

      d3.select(el).call(brush.move, range);
    }
  },
  data() {
    return {
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
      resizing: false,
      hoverFundTooltip: [{ x: 0, y: 0, category: "" }],
      brushRange: [0, 400]

      // overlap: false, // moved to computed
      // showManager: [0, 1, 2], // moved to store
      // showESG: [0, 1] // moved to store
    };
  },
  computed: {
    width() {
      return this.svgWidth - this.margin.right - this.margin.left;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
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
        newObject["y"] = this.scale.y(averagePerCategoryYProperty[i]);
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
    yDomain() {
      if (this.customYDomain.length == 2) {
        return this.customYDomain;
      } else {
        const maxPerCategory = this.categories.map(c =>
          Math.max(...this.data.map(d => d[`${c}_${this.yProperty}`]))
        );
        const maxAllCategories = parseInt(Math.max(...maxPerCategory));
        return [0, this.getNiceYDomainEnd(maxAllCategories)];
      }
      // return [this.yZoom[0], this.getNiceYDomainEnd(this.yZoom[1])];
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

      let y = d3
        .scaleLinear()
        .domain([this.yDomain[0], this.yDomain[1]])
        .rangeRound([this.height, 0]);
      y.tickValues = this.niceYAxis.tickValues;

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
          [this.width, this.height]
        ])
        .on("brush end", this.brushed);

      const brushRange = this.brushRange;
      return { brush, brushRange };
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
    selectedFund() {
      if (this.selectedFundID || this.selectedFundID == 0) {
        return this.nodes.map(x => x.find(y => y.id == this.selectedFundID));
      } else {
        return [];
      }
    },
    ...mapState({
      showManager: state => state.chartBubble.showManager,
      showESG: state => state.chartBubble.showESG,
      toggleAll: state => state.chartBubble.toggleAll,
      selectedFundID: state => state.interfaceFundSearchBar.selectedFundID
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
                return that.scale.y(d[`${that.yProperty}`]);
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
      if (this.selectedFundID) {
        // console.log(this.selectedFundID);
        if (id == this.selectedFundID) {
          return "selected";
        } else {
          return "non-selected";
        }
      } else {
        return "";
      }
    },
    mouseEnterFundBubble(element, indexCategory, event) {
      console.log(element, event);
      this.hoverFundTooltip.x = event.clientX;
      this.hoverFundTooltip.y = event.clientY;
      this.hoverFundID = element.id;
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
    onClickFundBubble(id, event) {
      this.$store.commit("interfaceFundSearchBar/ChangeSelectedFundID", id);
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
        const element = document.querySelector("#bubble-chart-content");
        // const element = this.$el;
        // console.log(element);
        const getPropertyValue = property =>
          parseFloat(
            window
              .getComputedStyle(element, null)
              .getPropertyValue(property)
              .slice(0, -2)
          );
        const paddingX =
          getPropertyValue("padding-left") + getPropertyValue("padding-right");

        let newContainerWidth = element.clientWidth;
        if (paddingX) {
          newContainerWidth -= paddingX;
        }
        // console.log(newContainerWidth);
        if (newContainerWidth) {
          if (this.svgWidth != newContainerWidth) {
            this.svgWidth = newContainerWidth;
          }
        }
      };

      // Execute
      setContainerWidth();
      this.resizing = false;
    },
    brushed(event) {
      if (d3.event.sourceEvent && d3.event.type === "brush") {
        this.eventType = d3.event.type;
        var s = d3.event.selection;
        // console.log(s);
        setTimeout(() => {
          this.yZoom = d3
            .scaleLinear()
            .range([this.height, 0])
            .domain([this.yStatic.invert(s[1]), this.yStatic.invert(s[0])]);
        }, 500);

        // console.log(this.yZoom.domain());
        this.brushRange = s;
      }
    },
    test(element) {
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
    }
  },
  created() {
    this.yZoom = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([0, 100]);
    this.yStatic = d3
      .scaleLinear()
      .range([this.height, 0])
      .domain([0, 100]);
  },
  mounted() {
    this.nodes = this.dataPerCategory;
    this.simulationsDefine();
    this.simulationsRun();
    // this.simulationsUpdateCoordinates();

    console.log(this.dataPerCategory);
    console.log(this.averagePerCategory);
    // console.log(this.maxSizePropertyPerCategory);
    // console.log(this.scale);
  }
};
</script>
