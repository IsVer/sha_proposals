<template>
  <v-container
    id="sankey-container"
    :class="
      `${!finishedChartResize ? 'zero-opacity' : ''} fade pa-0 overflow-hidden`
    "
    v-resize.quiet="onResize"
    fluid
  >
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="5">
        <v-container
          id="sankey-content"
          :style="
            `position: relative; transform: translateX(${-sideRevealTranslate}px;`
          "
          :class="
            `transition--side-reveal ${
              breakpoint && breakpoint.smAndDown ? 'pa-7' : ''
            }`
          "
        >
          <ChartSankeyIntro
            :style="`width: ${width}px; transform: translateX(${marginLeft}px)`"
            :totalFiledProposals="dataCurrentYear.filed"
            :yearFiled="currentYear"
          >
            <!-- Todo: Correct the transform-origin to do the flipped ! -->
            <ReusableCurlyBraket
              :width="width"
              :strokeWidth="width / 110"
              :height="width / 15"
              :centerXPosition="0.5"
              :centerYPosition="0.35"
              :cornerRatio="0.05"
            />
          </ChartSankeyIntro>
          <div
            id="sankey-chart"
            :style="
              `position: relative; transform: translateX(${marginLeft}px);`
            "
          >
            <svg id="sankey-svg" :width="svgWidth" :height="svgHeight">
              <g class="start full-width">
                <g class="filed">
                  <rect
                    x="0"
                    y="0"
                    :width="width"
                    :height="startingRectHeight"
                    fill="#FFC400"
                  />
                </g>
                <g class="sec-one-third-blocked-scenario">
                  <polygon :points="secBlockPoints" fill="#FAFAFA" />
                </g>
              </g>
              <g class="links">
                <ChartSankeyLink
                  v-for="(stage, indexStage) in stages"
                  :key="`stage-link-${indexStage}`"
                  :stage="stage.name"
                  :linkHeight="stage.linkHeight"
                  :opacity="stage.opacity"
                  :strokeWidth="getStrokeWidth(dataCurrentYear[stage.name])"
                  :path="getStageLink(stage.name, stage.linkHeight)"
                />
              </g>
            </svg>
            <div id="sankey-chart-modals">
              <ChartSankeyModalSEC
                :width="width"
                :startingRectHeight="startingRectHeight"
                :breakpoint="breakpoint"
              />

              <ChartSankeyModalStageLabel
                v-for="(stage, indexStage) in stages"
                :key="`stage-label-${indexStage}`"
                :percentage="dataCurrentYear[stage.name]"
                :labelHeight="height * stage.labelHeight"
                :labelPosX="getStrokePosX0(stage.name)"
                :containerWidth="getStrokeWidth(dataCurrentYear[stage.name])"
                :fontSizeNumber="getFontSize(dataCurrentYear[stage.name])"
                :fontSizeText="
                  getFontSize(dataCurrentYear[stage.name], 'subline')
                "
                :stageName="stage.name"
              />

              <div
                v-for="(stage, indexStage) in stages.slice(0, -1)"
                :key="`stage-reveal-button-${indexStage}`"
                :id="`side-reveal-button-${stage.name}`"
                class="sankey-chart-side-reveal-button"
                :style="
                  `z-index:9; position: absolute; top:0; left:0; transform: translateX(${width -
                    16}px) translateY(${height * stage.linkHeight - 6}px);`
                "
              >
                <transition name="fade">
                  <v-btn
                    v-if="stage.isSideRevealed || !isAnyStageRevealed"
                    @click="revealSide(stage.name, $event)"
                    class="center-absolute--vertical"
                    fab
                    :small="breakpoint ? breakpoint.mdAndDown : false"
                    color="primary"
                    dark
                  >
                    <v-icon :small="breakpoint ? breakpoint.mdAndDown : false">
                      {{
                        stage.isSideRevealed
                          ? stage.revealIcon.close
                          : stage.revealIcon.reveal
                      }}
                    </v-icon>
                  </v-btn>
                </transition>
              </div>
            </div>
            <div
              id="sankey-content-side"
              :style="
                `width: 100%; position: absolute; top: 0; transform: translateX(${svgWidth}px;`
              "
            >
              <div
                v-for="(stage, indexStage) in stages.slice(0, -1)"
                :key="`stage-side-component-${indexStage}`"
              >
                <transition name="fade-slow">
                  <component
                    :is="
                      indexStage == 0
                        ? 'ChartSankeySideOmitted'
                        : 'ChartSankeySideWithdrawn'
                    "
                    v-if="stage.isSideRevealed"
                    :id="`side-${stage.name}`"
                    :height="height"
                    :linkHeight="stage.linkHeight"
                  >
                    <ChartBarSimple
                      :data="dataAllYears"
                      xProperty="year"
                      xAxisLabel="Year"
                      :yProperty="indexStage == 0 ? 'omitted' : 'withdrawn'"
                      :yAxisLabel="
                        `${
                          indexStage == 0 ? 'Omitted' : 'Withdrawn'
                        } proposals as a percentage of all filed E/S proposals`
                      "
                      barClass="secondary--fill"
                      :customYDomain="indexStage == 0 ? [] : [20, 60]"
                      :svgHeight="220"
                      :svgWidth="sideBarChartWidth"
                    />
                  </component>
                </transition>
              </div>
            </div>
          </div>
          <ReusableCurlyBraket
            class="mt-2"
            :width="barChartWidth"
            :strokeWidth="barChartWidth / 65"
            :height="barChartWidth / 10"
            :centerYPosition="0.35"
            :centerXPosition="getXCenterForVotedBracket()"
            :cornerRatio="0.08"
            :style="`transform: translateX(${marginLeft}px);`"
          />
          <div id="bar-and-line-chart-container" class="position-relative">
            <div
              :style="
                `position: relative; transform: translateX(${marginLeft}px);`
              "
            >
              <div
                :style="
                  `width: ${barChartWidth}px; height:${lineChartMargins.top}px`
                "
              >
                <h4 class="mb-1 body-1 font-weight-bold">
                  Percentage of total votes
                </h4>
                <div class="mb-2 d-flex justify-space-between">
                  <div>0&hairsp;%</div>
                  <div>100&hairsp;%</div>
                </div>
              </div>
              <div :style="`position: relative;`">
                <div
                  v-for="(year, indexYear) in dataAllYears"
                  :key="`bar-year-${indexYear}`"
                  class="position-relative"
                >
                  <div
                    class="bar-chart--year center-absolute--vertical text-right"
                  >
                    <div
                      class="caption"
                      :style="
                        `position: relative; transform: translateX(-110%) rotate(-27deg);`
                      "
                    >
                      {{ year.year }}
                    </div>
                  </div>
                  <div
                    :class="`bar-chart--bar d-flex mb-${bar.marginBottom / 4}`"
                  >
                    <div
                      class="pa-2 div-chart support d-flex justify-center align-center"
                      :style="
                        `width: ${convertPercentageToRatio(
                          year.support_above_30_percent_inclusive
                        ) * barChartWidth}px; height: ${bar.height}px`
                      "
                    >
                      <div
                        v-if="indexYear == dataAllYears.length - 1"
                        class="caption white--text"
                      >
                        <span class="font-weight-bold">High</span> shareholder
                        support&nbsp;>=&nbsp;30&#8239;%
                      </div>
                    </div>
                    <div
                      class="pa-2 div-chart no-support d-flex justify-center align-center"
                      :style="
                        `width: ${convertPercentageToRatio(
                          year.support_below_30_percent_exclusive
                        ) * barChartWidth}px; height: ${bar.height}px`
                      "
                    >
                      <div
                        v-if="indexYear == dataAllYears.length - 1"
                        class="caption"
                      >
                        <span class="font-weight-bold">Low</span> shareholder
                        support&nbsp;<&nbsp;30&#8239;%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="voted-over-years-hint"
              class="position-absolute-tl0"
              :style="
                `height: 100%; transform: translateX(${convertPercentageToRatio(
                  dataAllYears[0].voted
                ) *
                  width +
                  marginLeft}px)`
              "
            >
              <div
                class="pl-3"
                :style="
                  `position: absolute; top:-${svgHeight *
                    0.2}px; left: 0px; height:${lineChartHeight +
                    lineChartMargins.top +
                    10 +
                    svgHeight * 0.2}px; border-left: 1px dashed rgba(0,0,0,0.3)`
                "
              >
                <div style="width:100px;">
                  {{ dataAllYears[0].voted }}&hairsp;% voted
                  <br />
                  (in {{ dataAllYears[0].year }})
                </div>
                <ChartSankeyModalReusable
                  class="ml-2 mt-2"
                  :width="240"
                  :startingRectHeight="startingRectHeight"
                  :breakpoint="breakpoint"
                  iconColor="secondary"
                  iconForDesktop="mdi-alert-circle"
                  iconForMobileButton="mdi-alert-circle-outline"
                />
              </div>
            </div>
            <div
              class="position-absolute-tl0"
              :style="
                `transform: translateX(${marginLeft + lineChartStart}px);`
              "
            >
              <svg :width="lineChartSVGWidth" :height="lineChartSVGHeight">
                <g
                  :style="
                    `transform: translateX(${lineChartMargins.left}px) translateY(${lineChartMargins.top}px);`
                  "
                >
                  <g
                    v-for="(year, indexYear) in dataAllYears"
                    :key="`circle-year-${indexYear}`"
                    :style="
                      `transform: translateY(${(bar.height + bar.marginBottom) *
                        indexYear}px);`
                    "
                  >
                    <line
                      v-if="indexYear < 9"
                      :x1="
                        convertPercentageToRatio(year.voted - votedDomain[0]) *
                          width
                      "
                      :y1="bar.height / 2"
                      :x2="
                        convertPercentageToRatio(
                          dataAllYears[indexYear + 1].voted - votedDomain[0]
                        ) * width
                      "
                      :y2="bar.height + bar.marginBottom + bar.height / 2"
                      class="secondary--stroke stroke--standard-dash"
                    />
                    <circle
                      :cx="
                        convertPercentageToRatio(year.voted - votedDomain[0]) *
                          width
                      "
                      :cy="bar.height / 2"
                      r="8"
                      opacity="0.9"
                      class="secondary--fill"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div
              :style="
                `width: ${width}px; height:${lineChartMargins.top}px; transform: translateX(${marginLeft}px);`
              "
            >
              <div
                class="mb-2 d-flex justify-space-between align-center secondary--text"
              >
                <div>0&hairsp;%</div>
                <div>100&hairsp;%</div>
              </div>
              <h4 class="mb-1 body-1 font-weight-bold secondary--text">
                Percentage of all proposals filed
              </h4>
            </div>
            <div
              :class="
                `${
                  breakpoint && breakpoint.smAndUp
                    ? 'position-absolute-tl0'
                    : ''
                } height-100pc`
              "
              :style="`width: ${width - textNextToLineChartStart}px;`"
            >
              <div
                class="height-100pc d-flex justify-center align-center"
                :style="`transform: translateX(${textNextToLineChartStart}px)`"
              >
                <p
                  :class="
                    `${breakpoint && breakpoint.smAndUp ? 'mt-n12' : 'mt-8'}`
                  "
                >
                  <span class="font-weight-bold"
                    >The average support for environmental and social proposals
                    increased over the past years.
                  </span>
                  More proposals received a higher support (>30%), and lesser
                  proposals received very low support (<30%).
                </p>
              </div>
            </div>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import smoothscroll from "smoothscroll-polyfill";
// ! Useful for the fund activism!
// import { scaleLinear } from "d3";
// const d3 = { scaleLinear };

import data from "../static/data/overview_data_v2.csv";
import ChartSankeyIntro from "~/components/ChartSankeyIntro.vue";
import ReusableCurlyBraket from "~/components/ReusableCurlyBraket.vue";
import ChartSankeyLink from "~/components/ChartSankeyLink.vue";
import ChartSankeyModalSEC from "~/components/ChartSankeyModalSEC.vue";
import ChartSankeyModalStageLabel from "~/components/ChartSankeyModalStageLabel.vue";
import ChartSankeySideOmitted from "~/components/ChartSankeySideOmitted.vue";
import ChartSankeySideWithdrawn from "~/components/ChartSankeySideWithdrawn.vue";
import ChartSankeyModalReusable from "~/components/ChartSankeyModalReusable.vue";
import ChartBarSimple from "~/components/ChartBarSimple.vue";

export default {
  components: {
    ReusableCurlyBraket,
    ChartSankeyIntro,
    ChartSankeyLink,
    ChartSankeyModalSEC,
    ChartSankeyModalStageLabel,
    ChartSankeySideOmitted,
    ChartSankeySideWithdrawn,
    ChartSankeyModalReusable,
    ChartBarSimple
  },
  data() {
    return {
      windowWidth: 1920,
      windowHeight: 1080,
      svgWidth: 900,
      outboundToWidthRatio: 0.03,
      currentYear: 2019,
      dataAllYears: data,
      isHydrated: false,
      finishedChartResize: false,
      portraitMode: false,
      showSECPopOver: false,
      stages: [
        {
          name: "omitted",
          linkHeight: 0.5,
          opacity: 0.33,
          labelHeight: 0.4,
          isSideRevealed: false,
          revealIcon: { reveal: "mdi-chart-bar", close: "mdi-chevron-left" }
        },
        {
          name: "withdrawn",
          linkHeight: 0.76,
          opacity: 0.66,
          labelHeight: 0.55,
          isSideRevealed: false,
          revealIcon: { reveal: "mdi-chart-bar", close: "mdi-chevron-left" }
        },
        {
          name: "voted",
          linkHeight: 1,
          opacity: 1,
          labelHeight: 0.85,
          isSideRevealed: undefined
        }
      ],
      bar: { height: 36, marginBottom: 12 },
      lineChartMargins: { top: 60, left: 40, bottom: 40, right: 40 }
    };
  },
  mounted() {
    this.isHydrated = true;
    smoothscroll.polyfill();
    setTimeout(() => {
      this.onResize();
      // console.log(this.breakpoint);
    }, 500);
    // console.log(this.dataAllYears);
    // console.log(this.barChartWidth);
    // console.log(d3);
    // console.log(this.dataCurrentYear);
    // console.log(this.getStrokePosX0("omitted"));
  },
  computed: {
    width() {
      return this.svgWidth * (1 - 2 * this.outboundToWidthRatio);
    },
    marginLeft() {
      return this.svgWidth * this.outboundToWidthRatio;
    },
    svgHeight() {
      if (this.width > 480) {
        return this.width * 1.8;
      } else {
        return this.width * 2.2;
      }
      // if (this.$vuetify.breakpoint.mdAndDown && this.portraitMode) {
      //   return this.windowHeight * 1.2;
      // } else {
      //   return this.width * 2.25;
      // }
    },
    height() {
      return this.svgHeight;
    },
    startingRectHeight() {
      return this.height * 0.24;
    },
    secBlockPoints() {
      const w = this.width;
      const h = this.startingRectHeight;
      return `
        ${w + 1},${h * 0.35}
        ${w * 0.62},${h * 0.4},
        ${w * 0.66},${h * 0.45},
        ${w * 0.62},${h * 0.5}
        ${w * 0.66},${h * 0.55}
        ${w * 0.63},${h * 0.6}
        ${w * 0.67},${h * 0.65}
        ${w * 0.63},${h * 0.7}
        ${w * 0.68},${h * 0.75}
        ${w * 0.62},${h * 0.8}
        ${w + 1},${h * 0.85}
      `;
    },
    barChartWidth() {
      const currentVotedWidth =
        this.convertPercentageToRatio(this.dataCurrentYear.voted) * this.width;
      if (this.breakpoint) {
        if (this.breakpoint.xs) {
          return this.width;
        } else {
          return currentVotedWidth;
        }
      } else {
        return currentVotedWidth;
      }
    },
    votedDomain() {
      let votedAllYears = this.dataAllYears.map(x => x.voted);
      let votedMin = Math.min(...votedAllYears);
      let votedMax = Math.max(...votedAllYears);
      return [votedMin, votedMax];
    },
    lineChartStart() {
      const start =
        this.convertPercentageToRatio(this.votedDomain[0]) * this.width;
      return start - this.lineChartMargins.left;
    },
    textNextToLineChartStart() {
      const start =
        this.convertPercentageToRatio(this.votedDomain[1]) * this.width;
      if (this.breakpoint && this.breakpoint.smAndUp) {
        return start + this.lineChartMargins.left * 2;
      } else {
        return this.marginLeft;
      }
    },
    lineChartWidth() {
      const domainWidth =
        this.convertPercentageToRatio(
          this.votedDomain[1] - this.votedDomain[0]
        ) * this.width;
      return domainWidth;
    },
    lineChartSVGWidth() {
      return (
        this.lineChartWidth +
        this.lineChartMargins.left +
        this.lineChartMargins.right
      );
    },
    lineChartHeight() {
      const numberOfBars = this.dataAllYears.length;
      const barHeights = numberOfBars * this.bar.height;
      const margins = (numberOfBars - 1) * this.bar.marginBottom;
      return barHeights + margins;
    },
    lineChartSVGHeight() {
      return (
        this.lineChartHeight +
        this.lineChartMargins.top +
        this.lineChartMargins.bottom
      );
    },
    breakpoint() {
      // SUPER IMPORTANT
      // https://github.com/vuetifyjs/vuetify/issues/3436#issuecomment-371872303
      // Needs "data" and "mounted" as well!
      return this.isHydrated ? this.$vuetify.breakpoint : undefined;
    },
    isAnyStageRevealed() {
      return this.stages.map(x => x.isSideRevealed).includes(true);
    },
    sideRevealTranslate() {
      return this.isAnyStageRevealed ? this.width : 0;
    },
    sideBarChartWidth() {
      if (this.breakpoint && this.breakpoint.lgAndUp) {
        return 440;
      } else if (this.breakpoint && this.breakpoint.md) {
        return 380;
      } else if (this.breakpoint && this.breakpoint.sm) {
        return 320;
      } else {
        return 240;
      }
    },
    dataCurrentYear() {
      return this.dataAllYears.find(x => x.year == this.currentYear);
    }
  },
  methods: {
    getStageLink(stageName, stageLinkHeight) {
      const x0 = this.getStrokePosX0(stageName);
      const y0 = this.startingRectHeight - 1;
      let x1 = stageName == "voted" ? x0 : this.svgWidth - this.marginLeft;
      const y1 = this.height * stageLinkHeight;

      return this.getLinkPath(x0, y0, x1, y1);
    },
    getLinkPath(x0, y0, x1, y1) {
      // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d

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
    },
    convertPercentageToRatio(percentage) {
      return percentage / 100;
    },
    getStrokeWidth(percentage) {
      return this.width * this.convertPercentageToRatio(percentage);
    },
    getFontSize(percentage, parameter) {
      if (parameter == "subline") {
        return 9 + this.getStrokeWidth(percentage) * 0.08;
      } else if (parameter == "line-height") {
        return 12 + this.getStrokeWidth(percentage) * 0.04;
      } else {
        return 13 + this.getStrokeWidth(percentage) * 0.2;
      }
    },
    getStrokePosX0(stage) {
      // 1. Everything is calculated from the right end, so we start with width
      // 2. Then we substract the widths of all other stages to move left
      // 3. Then we substract half the width of the stroke
      //      – because the width is calculated from the center

      // Step 1
      let posX0 = this.width;

      // Step 2
      //  We don’t need to do this for the first stage!
      if (stage != "omitted") {
        // This object will be our switch to see wich values we have to sum up
        const otherStages = {
          // omitted: [], // not necessary!
          withdrawn: ["omitted"],
          voted: ["omitted", "withdrawn"]
        };
        // Make an array with the percantages instead of the names
        // and add them up!
        const otherStagesPercentage = otherStages[stage]
          .map(x => this.dataCurrentYear[x])
          .reduce((a, b) => a + b);
        // Substract from the current posX0 value
        posX0 -= this.getStrokeWidth(otherStagesPercentage);
      }

      // Step 3
      posX0 -= this.getStrokeWidth(this.dataCurrentYear[stage]) * 0.5;

      // RETURN
      // console.log(posX0);
      return posX0;
    },
    onResize() {
      this.finishedChartResize = false;
      // 1. Adjust the SVG according to the container width
      // Define
      const setContainerWidth = () => {
        const element = document.querySelector("#sankey-content");
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

      // Also get the window width and height:
      // Define
      const setWindowWidth = () => {
        const width =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;

        const height =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;

        this.windowWidth = width;
        this.windowHeight = height;

        if (width < height) {
          this.portraitMode = true;
        } else {
          this.portraitMode = false;
        }
      };

      // Execute
      setWindowWidth();

      this.finishedChartResize = true;
    },
    toggle(property) {
      this[property] = !this[property];
    },
    revealSide(stageName, event) {
      // console.log(event);
      // console.log(stageName);
      // console.log(this.sideRevealTranslate);
      // console.log(this.isAnyStageRevealed);

      // See if this stage’s side is revealed
      let stageIndex = this.stages.findIndex(x => x.name == stageName);

      if (this.stages[stageIndex].isSideRevealed == false) {
        this.stages[stageIndex].isSideRevealed = true;
      } else {
        this.stages[stageIndex].isSideRevealed = false;
      }

      // Scroll the side to the center of the viewport
      if (this.isAnyStageRevealed) {
        const yOffset = -this.windowHeight * 0.5;
        const element = event.srcElement;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    getXCenterForVotedBracket() {
      if (this.breakpoint && this.breakpoint.smAndDown) {
        return this.convertPercentageToRatio(this.dataCurrentYear.voted) / 2;
      } else {
        return 0.5;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
