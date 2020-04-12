<template>
  <!-- v-container is the basic page container in vuetify -->
  <!-- "fluid" is an attribute that sizes the container to the full page width -->
  <!-- A v-container has a default padding, which we remove, 
  because we’ll use one more nesting of containers-->
  <!-- the pa-0 class stands for "Padding All Zero" -->
  <!-- On spacing classes: https://vuetifyjs.com/en/styles/spacing -->
  <!-- <v-container class="pa-0" fluid> -->
  <v-container class="pa-0" fluid>
    <!-- a regular container is not scaled to the full width on larger screens and centered -->
    <v-container class="pa-6">
      <!-- Vuetify’s grid system works with rows (v-row) and columns (v-col) -->
      <!-- https://vuetifyjs.com/en/components/grids#grid-system -->
      <!-- In v-row there are shortcuts to flexbox css attributes available -->
      <!-- align for vertical; justify for horizontal positioning -->
      <v-row style="height:calc(100vh - 110px)" align="center">
        <!-- TODO: fade in after everything is loaded :) -->
        <transition name="fade-slow">
          <v-col v-if="isHydrated">
            <!-- Vuetify provides typography helper classes: -->
            <!-- https://vuetifyjs.com/en/styles/typography#typography -->
            <h2 class="overline">How activists use the capitalist toolbox</h2>
            <h1 class="display-3 font-weight-thin">
              The impact of companies
              <br />and the engagement of shareholders
            </h1>
          </v-col>
        </transition>
      </v-row>

      <v-row class="mb-10">
        <v-col>
          <h3 class="display-1 font-weight-thin">
            Shareholder activism. – What do we mean by “activism”?
          </h3>
        </v-col>
      </v-row>
      <v-row justify="center">
        <!-- With cols="10" we can set a narrower container on the page -->
        <v-col cols="12" lg="10">
          <!-- It’s also possible to nest v-cols and v-rows -->
          <v-row justify="center">
            <!-- Are we make a even narrower container -->
            <v-col cols="12" sm="10" md="7">
              <h4 class="title">
                The role of shareholder meetings.
                <span class="font-weight-regular"
                  >– Who can propose and who can vote?</span
                >
              </h4>
            </v-col>
          </v-row>
          <v-row class="mt-4" justify="center">
            <!-- With cols="1" and cols="6" we split up the 7 columns we used above -->
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <!-- This is how you can use an icon -->
              <!-- https://vuetifyjs.com/en/customization/icons#icons -->
              <!-- you can size it by just using these attributes:
              (x-small, small, medium (default), large, and x-large)
              without a value-->
              <!-- By default you can use these icons: https://materialdesignicons.com/ -->
              <v-icon x-large class="mt-n4" color="secondary"
                >mdi-account-group</v-icon
              >
            </v-col>

            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold"
                  >Shareholder proposals in shareholder meetings.</span
                >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec. Tincidunt id aliquet risus feugiat in ante metus.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="primary"
                >mdi-comment-search</v-icon
              >
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold">
                  We’re interested in: Who is voting for what? – The role of
                  mutual funds (Who is voting for whom?)
                </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon
                x-large
                class="mt-n4"
                color="secondary"
                style="transform: rotate(180deg)"
                >mdi-navigation</v-icon
              >
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold">
                  The path of a shareholder proposal. [Regulations – What is the
                  SEC?]
                </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec.
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <ChartSankey class="my-10" />
    <v-container class="mt-12">
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <v-row justify="center">
            <v-col cols="12" sm="10" md="7">
              <h4 class="title">
                Conclusions.
                <span class="font-weight-regular"
                  >Lorem ipsum dolor sit amet.</span
                >
              </h4>
            </v-col>
          </v-row>
          <v-row class="mt-4" justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="secondary"
                >mdi-plus-thick</v-icon
              >
            </v-col>

            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold">Point 1.</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec. Tincidunt id aliquet risus feugiat in ante metus.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="primary"
                >mdi-plus-thick</v-icon
              >
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold">Point 2.</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon
                x-large
                class="mt-n4"
                color="secondary"
                style="transform: rotate(180deg)"
                >mdi-plus-thick</v-icon
              >
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold">Point 3.</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec.
              </p>
            </v-col>
          </v-row>
          <v-row class="my-12" justify="center">
            <v-col cols="12" sm="10" md="7">
              <p class="display-1 font-weight-thin text-center">
                <span>
                  Bridge text: How do these conclusions relate to the voting
                  behavior of the “most passive shareholders"?
                </span>
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mt-12 pa-6">
      <v-row class="mb-10">
        <v-col>
          <h3 class="display-1 font-weight-thin">
            The role and impact of funds
          </h3>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <v-row justify="center">
            <v-col cols="12" sm="10" md="7">
              <h4 class="title">
                What can a fund do? How much influence do they have?
              </h4>
            </v-col>
          </v-row>
          <v-row class="mt-4" justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="secondary"
                >mdi-account-multiple-plus</v-icon
              >
            </v-col>

            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold">
                  Everyone who has a pension fund owns some kind of mutual
                  funds..
                </span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec. Tincidunt id aliquet risus feugiat in ante metus.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="primary"
                >mdi-arrow-decision</v-icon
              >
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold">Funds vote on your behalf!</span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
              <v-icon x-large class="mt-n4" color="primary"
                >mdi-chart-arc</v-icon
              >
            </v-col>
            <v-col cols="12" sm="8" md="6">
              <p class="subtitle">
                <span class="font-weight-bold"
                  >Funds have a large influence.</span
                >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec.
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="mt-n6">
        <v-col cols="12" class="d-flex justify-center">
          <ChartPie />
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mt-12 pa-6">
      <v-row class="mb-10">
        <v-col>
          <h3 class="display-1 font-weight-thin">What is at stake?</h3>
        </v-col>
      </v-row>
    </v-container>
    <!-- :categories="['e', 's', 'g']" -->
    <!-- <ChartBubbleViolin
      v-intersect.quiet="onIntersect"
      :data="bubbleData"
      :proposals="proposals"
      :categories="['e', 's', 'g']"
      :categoriesDetails="categoriesDetails"
      yProperty="support"
      yAxisLabel="Support as a percentage of the proposals the fund voted on"
      :customYDomain="[0, 100]"
      sizeProperty="vote"
      :sizeDomain="[0, 1000]"
      :sizeRange="[1, 15]"
    /> -->
  </v-container>
</template>

<script>
import bubbleData from "../static/data/bubble_chart.csv";
import proposals from "../static/data/proposals.csv";
// import bubbleData from "../static/data/funds_only_e.csv";

import ChartSankey from "~/components/ChartSankey.vue";
import ChartPie from "~/components/ChartPie.vue";
import ChartBubbleViolin from "~/components/ChartBubbleViolin.vue";

export default {
  // For components in the pages folder you can use the layout property
  // to select one of the layouts defined in the layouts folder
  layout: "default",
  components: { ChartSankey, ChartPie, ChartBubbleViolin },
  data() {
    return {
      isHydrated: false,
      bubbleData: bubbleData,
      proposals: proposals,
      categoriesDetails: [
        { code: "e", title: "Environmental", color: "#81C784" },
        { code: "s", title: "Social", color: "#E25F68" },
        { code: "g", title: "Governance", color: "#4A5B7E" }
      ]
    };
  },
  mounted() {
    this.isHydrated = true;
    // console.log(this.proposals);
  },
  methods: {
    onIntersect(event) {
      // console.log(event);
      if (event[0].isIntersecting) {
        this.$store.commit("interfaceFundSearchBar/ChangeShowInterface", true);
      } else {
        this.$store.commit("interfaceFundSearchBar/ChangeShowInterface", false);
      }
    }
  }
};
</script>
