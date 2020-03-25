<template>
  <v-container
    id="sankey-container"
    class="pa-0 overflow-hidden"
    v-resize="onResize"
    fluid
  >
    <v-container
      id="sankey-content"
      :style="
        `position: relative; transform: translateX(${-sideRevealTranslate}px`
      "
      class="side-reveal"
    >
      <div id="sankey-content-central">
        <div
          id="sankey-chart-intro"
          :style="`transform: translateX(${marginLeft}px)`"
        >
          <div
            class="pa-6"
            :style="`width: ${Math.ceil(width)}px; background:#FFC400;`"
          >
            <p class="body-2 text-left">
              The full width represents:
              <br />
              <span class="headline font-weight-bold"
                >{{ dataCurrentYear.filed }} shareholder proposals</span
              >
              <br />
              filed in
              {{ currentYear }}
              and concerning environmental and social issues
            </p>
            <v-divider></v-divider>
          </div>
        </div>
        <div
          id="sankey-chart"
          :style="`position: relative; transform: translateX(${marginLeft}px);`"
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
              <path
                class="omitted"
                fill="none"
                stroke="#FFC400"
                stroke-opacity="0.3"
                :stroke-width="getStrokeWidth(dataCurrentYear.omitted)"
                :d="
                  getLinkPath(
                    getStrokePosX0('omitted'),
                    startingRectHeight - 1,
                    svgWidth - marginLeft,
                    height * 0.5
                  )
                "
              />
              <path
                id="withdrawn"
                fill="none"
                stroke="#FFC400"
                stroke-opacity="0.6"
                :stroke-width="getStrokeWidth(dataCurrentYear.withdrawn)"
                :d="
                  getLinkPath(
                    getStrokePosX0('withdrawn'),
                    startingRectHeight - 1,
                    svgWidth - marginLeft,
                    height * 0.76
                  )
                "
              />
              <path
                id="voted"
                fill="none"
                stroke="#FFC400"
                :stroke-width="getStrokeWidth(dataCurrentYear.voted)"
                :d="
                  getLinkPath(
                    getStrokePosX0('voted'),
                    startingRectHeight - 1,
                    getStrokePosX0('voted'),
                    height
                  )
                "
              />
            </g>
            <g class="labels">
              <g
                class="omitted"
                :style="
                  `transform: translateX(${getStrokePosX0(
                    'omitted'
                  )}px) translateY(${height * 0.4}px)`
                "
              >
                <text
                  class="font-weight-bold"
                  text-anchor="middle"
                  :font-size="getFontSize(dataCurrentYear.omitted)"
                  letter-spacing="-0.07em"
                >
                  {{ dataCurrentYear.omitted }}&thinsp;%
                </text>
                <text
                  class="font-weight-bold"
                  :style="
                    `transform: translateY(${getFontSize(
                      dataCurrentYear.omitted,
                      'line-height'
                    )}px)`
                  "
                  text-anchor="middle"
                  :font-size="getFontSize(dataCurrentYear.omitted, 'subline')"
                >
                  Omitted
                </text>
              </g>
              <g
                class="withdrawn"
                :style="
                  `transform: translateX(${getStrokePosX0(
                    'withdrawn'
                  )}px) translateY(${height * 0.55}px)`
                "
              >
                <text
                  class="font-weight-bold"
                  text-anchor="middle"
                  :font-size="getFontSize(dataCurrentYear.withdrawn)"
                  letter-spacing="-0.07em"
                >
                  {{ dataCurrentYear.withdrawn }}&thinsp;%
                </text>
                <text
                  class="font-weight-bold"
                  :style="
                    `transform: translateY(${getFontSize(
                      dataCurrentYear.withdrawn,
                      'line-height'
                    )}px)`
                  "
                  text-anchor="middle"
                  :font-size="getFontSize(dataCurrentYear.withdrawn, 'subline')"
                >
                  Withdrawn
                </text>
              </g>
              <g
                class="voted"
                :style="
                  `transform: translateX(${getStrokePosX0(
                    'voted'
                  )}px) translateY(${height * 0.85}px)`
                "
              >
                <text
                  class="font-weight-bold"
                  text-anchor="middle"
                  :font-size="getFontSize(dataCurrentYear.voted)"
                  letter-spacing="-0.07em"
                >
                  {{ dataCurrentYear.voted }}&thinsp;%
                </text>
                <text
                  class="font-weight-bold"
                  :style="
                    `transform: translateY(${getFontSize(
                      dataCurrentYear.voted,
                      'line-height'
                    )}px)`
                  "
                  text-anchor="middle"
                  :font-size="getFontSize(dataCurrentYear.voted, 'subline')"
                >
                  Voted
                </text>
              </g>
            </g>
          </svg>
          <div id="sankey-chart-modals">
            <div
              id="sec-modal-container"
              :style="
                `z-index:9; position: absolute; top:0; transform: translateY(${startingRectHeight *
                  0.15}px);`
              "
            >
              <div
                class="d-flex justify-center align-center"
                :style="
                  `
              width:${width * 0.33}px; 
              height:${startingRectHeight * 0.4}px;
              transform: translateX(${width * 0.67}px)
              `
                "
              >
                <div style="width:80%;">
                  <div
                    v-if="breakpoint ? breakpoint.mdAndDown : false"
                    class="d-flex justify-center"
                  >
                    <v-btn
                      @click="toggle('showSECPopOver')"
                      color="primary"
                      small
                      fab
                      dark
                    >
                      <v-icon class="mt-n1">mdi-alert-outline</v-icon>
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-icon x-large class="mt-n6 mb-2" color="primary"
                      >mdi-alert</v-icon
                    >
                    <p>
                      <span class="font-weight-bold">By the way!</span> Lorem
                      ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              </div>
              <transition name="fade">
                <div
                  v-if="showSECPopOver"
                  :style="`width:${width}px;`"
                  class="ma-4 d-flex justify-end"
                >
                  <v-card
                    :width="width < 600 ? width : width * 0.5"
                    elevation="7"
                    tile
                  >
                    <v-card-text>
                      <div>By the way!</div>
                      <div class="text--primary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </div>
                    </v-card-text>
                    <v-card-actions class="pa-0 pt-1">
                      <v-btn
                        @click="toggle('showSECPopOver')"
                        color="primary"
                        depressed
                        block
                        tile
                      >
                        <v-icon small class="mr-2">mdi-close</v-icon>Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
              </transition>
            </div>
            <div
              id="side-reveal-buttons"
              :style="
                `z-index:9; position: absolute; top:0; left:0; transform: translateX(${width}px) translateY(${height *
                  0.5}px);`
              "
            >
              <v-btn
                @click="revealSide()"
                class="center-absolute--vertical"
                fab
                color="primary"
                dark
                ><v-icon>mdi-chart-bar</v-icon></v-btn
              >
            </div>
          </div>
          <div
            id="sankey-content-side"
            :style="
              `width: 100%; position: absolute; top: 0; transform: translateX(${svgWidth}px;`
            "
          >
            <div
              class="omitted"
              :style="
                `position: relative; transform: translateY(${height * 0.5}px);`
              "
            >
              <div style="width: 90%;" class="center-absolute--vertical">
                <v-row justify="center">
                  <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
                    <v-icon x-large class="mt-n4" color="primary"
                      >mdi-file-cancel</v-icon
                    >
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <p class="subtitle">
                      <span class="font-weight-bold"
                        >Summary: How can a proposal be omitted? Who is
                        acting?</span
                      >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Volutpat commodo sed egestas egestas fringilla
                      phasellus faucibus scelerisque eleifend. Odio aenean sed
                      adipiscing diam donec.
                    </p>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <v-img
                      max-width="350"
                      src="https://via.placeholder.com/350"
                    />
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
                    <v-icon x-large class="mt-n4" color="secondary"
                      >mdi-tooltip-plus</v-icon
                    >
                  </v-col>
                  <v-col cols="12" sm="8" md="6">
                    <p class="subtitle">
                      <span class="font-weight-bold"
                        >Comment on graph: Activists become more professional /
                        proposals become more realistic</span
                      >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua
                    </p>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import data from "../static/data/overview_data_v1.csv";

export default {
  data() {
    return {
      windowWidth: 1920,
      windowHeight: 1080,
      svgWidth: 900,
      outboundToWidthRatio: 0.03,
      currentYear: 2019,
      dataAllYears: data,
      isHydrated: false,
      portraitMode: false,
      showSECPopOver: false,
      stages: [
        { stage: "omitted", labelHeight: 0.4 },
        { stage: "withdrawn", labelHeight: 0.55 },
        { stage: "voted", labelHeight: 0.85 }
      ],
      sideRevealTranslate: 0,
      isSideRevealed: false
    };
  },
  mounted() {
    this.isHydrated = true;
    console.log(data);
    console.log(this.dataCurrentYear);
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
      return this.width * 2.25;
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
      return this.height * 0.18;
    },
    secBlockPoints() {
      const w = this.width;
      const h = this.startingRectHeight;
      return `
        ${w + 1},${h * 0.1}
        ${w * 0.62},${h * 0.15},
        ${w * 0.66},${h * 0.2},
        ${w * 0.62},${h * 0.25}
        ${w * 0.66},${h * 0.3}
        ${w * 0.63},${h * 0.35}
        ${w * 0.67},${h * 0.4}
        ${w * 0.63},${h * 0.45}
        ${w * 0.68},${h * 0.5}
        ${w * 0.62},${h * 0.55}
        ${w + 1},${h * 0.6}
      `;
    },
    breakpoint() {
      // SUPER IMPORTANT
      // https://github.com/vuetifyjs/vuetify/issues/3436#issuecomment-371872303
      // Needs "data" and "mounted" as well!
      return this.isHydrated ? this.$vuetify.breakpoint : undefined; // "empty" $breakpoint object with initial values
    },
    dataCurrentYear() {
      return this.dataAllYears.find(x => x.year == this.currentYear);
    }
  },
  methods: {
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
        return Math.max(9, this.getStrokeWidth(percentage) * 0.17);
      } else if (parameter == "line-height") {
        return Math.max(11, this.getStrokeWidth(percentage) * 0.19);
      } else {
        return this.getStrokeWidth(percentage) * 0.28;
      }
    },
    getStrokePosX0(stage) {
      // 1. Everything is calculated from the right end, so we start with width
      // 2. Then we substract the widths of all other stages to move left
      // 3. Then we substract half the width of the stroke – because the width is calculated from the center

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
      // 1. Adjust the SVG according to the container width
      // Define
      const setContainerWidth = () => {
        const element = document.querySelector("#sankey-content");
        // const element = this.$el;
        console.log(element);
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
        console.log(newContainerWidth);
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
    },
    toggle(property) {
      this[property] = !this[property];
    },
    revealSide() {
      if (this.isSideRevealed) {
        this.isSideRevealed = false;
        this.sideRevealTranslate = 0;
      } else {
        this.isSideRevealed = true;
        this.sideRevealTranslate = this.width;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
