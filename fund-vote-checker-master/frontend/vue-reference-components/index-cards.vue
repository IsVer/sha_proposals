<template>
  <!-- v-container is the basic page container in vuetify -->
  <!-- "fluid" is an attribute that sizes the container to the full page width -->
  <!-- A v-container has a default padding, which we remove, 
  because we’ll use one more nesting of containers-->
  <!-- the pa-0 class stands for "Padding All Zero" -->
  <!-- On spacing classes: https://vuetifyjs.com/en/styles/spacing -->
  <v-container class="pa-0" fluid>
    <!-- a regular container is not scaled to the full width on larger screens and centered -->
    <v-container>
      <!-- Vuetify’s grid system works with rows (v-row) and columns (v-col) -->
      <!-- https://vuetifyjs.com/en/components/grids#grid-system -->
      <!-- In v-row there are shortcuts to flexbox css attributes available -->
      <!-- align for vertical; justify for horizontal positioning -->
      <v-row style="height:calc(100vh - 110px)" align="center">
        <div>
          <!-- Vuetify provides typography helper classes: -->
          <!-- https://vuetifyjs.com/en/styles/typography#typography -->
          <h2 class="overline">This is an overline</h2>
          <h1 class="ml-n3 display-4 font-weight-thin">Fund vote checker</h1>
        </div>
      </v-row>

      <v-row class="mb-10">
        <h3 class="display-1 font-weight-thin">What are we looking at?</h3>
      </v-row>

      <v-row justify="center">
        <!-- With cols="10" we can set a narrower container on the page -->
        <v-col cols="10">
          <!-- It’s also possible to nest v-cols and v-rows -->
          <v-row justify="center">
            <!-- Are we make a even narrower container -->
            <v-col cols="7">
              <h4 class="title">Mutual Funds introduction</h4>
            </v-col>
          </v-row>
          <v-row justify="center">
            <!-- With cols="1" and cols="6" we split up the 7 columns we used above -->
            <v-col class="d-flex justify-center" cols="1">
              <!-- This is how you can use an icon -->
              <!-- https://vuetifyjs.com/en/customization/icons#icons -->
              <!-- you can size it by just using these attributes:
              (x-small, small, medium (default), large, and x-large)
              without a value-->
              <!-- By default you can use these icons: https://materialdesignicons.com/ -->
              <v-icon x-large class="mt-n4" color="primary">mdi-finance</v-icon>
            </v-col>
            <v-col cols="6">
              <p class="subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec. Tincidunt id aliquet risus feugiat in ante metus.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="1">
              <v-icon x-large class="mt-n4" color="secondary">mdi-alarm</v-icon>
            </v-col>
            <v-col cols="6">
              <p class="subtitle">
                Tellus in hac habitasse platea. Volutpat diam ut venenatis
                tellus in metus.
              </p>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="7">
              <v-divider class="mt-2 mb-6"></v-divider>
            </v-col>
          </v-row>

          <div class="d-flex justify-center flex-wrap">
            <!-- v-card is a pracitcal container that you can use to make
            a container that is also visually a separate entity-->
            <!-- tile sets the border-radius to 0 -->
            <!-- If you don’t want a drop shadow you can use
            elevation="0"-->
            <!-- See more on cards: https://vuetifyjs.com/en/components/cards#cards -->
            <!-- I’m also using a v-for loop to ensure the cards 
            for each issue type are exactly the same-->
            <v-card
              v-for="(card, indexCard) in issueCards"
              :key="`issue-card-${indexCard}`"
              class="pa-2 pb-3 ma-5"
              min-width="240"
              max-width="280"
              tile
            >
              <!-- Here we are using a card just for a background color -->
              <v-card tile elevation="0" :color="card.color" height="200px">
                <v-card-text class="white--text text-center">Icon here?</v-card-text>
              </v-card>
              <!-- Vuetify elements often have so called slots for sub-elements
              with additional options / formatting – in this case the v-card-title-->
              <v-card-title>{{ card.title }}</v-card-title>
              <v-card-text class="text--primary">
                <div
                  v-for="(paragraph, indexParagraph) in card.paragraphs"
                  :key="`issue-card-paragraph-${indexParagraph}`"
                >{{ paragraph }}</div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <v-row class="mt-12 mb-10">
        <h3 class="display-1 font-weight-thin">The development of shareholder activism</h3>
      </v-row>

      <v-row justify="center">
        <v-col cols="11">
          <v-row justify="center">
            <v-col cols="8">
              <h4 class="title">What is our definition of shareholder activism?</h4>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center" cols="1">
              <v-icon x-large class="mt-n4" color="primary">mdi-exclamation-thick</v-icon>
            </v-col>
            <v-col cols="7">
              <p class="subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Volutpat commodo sed egestas egestas fringilla phasellus
                faucibus scelerisque eleifend. Odio aenean sed adipiscing diam
                donec. Tincidunt id aliquet risus feugiat in ante metus.
              </p>
              <!-- https://vuetifyjs.com/en/components/expansion-panels#expansion-panels -->
              <v-expansion-panels flat tile class="mt-n4 pl-0">
                <v-expansion-panel class="transparent">
                  <v-expansion-panel-header
                    class="pl-0 font-weight-medium"
                  >Learn more about our methodology</v-expansion-panel-header>
                  <v-expansion-panel-content class="pa-0">
                    <!-- Usually the expansion-panel-content is indented -->
                    <!-- I use ml-n6 to align the content with the header 
                    it stands for: Margin Left - Negative 6-->
                    <div class="ml-n6">
                      <p class="font-italic">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                      <!-- v-tbn is the standard button component -->
                      <!-- https://vuetifyjs.com/en/components/buttons#buttons -->
                      <v-btn link href="#" outlined color="primary">See our documentation</v-btn>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="8"></v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="8">
              <v-divider class="mt-2 mb-6"></v-divider>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row style="height:calc(100vh - 110px)" justify="center" align="center">
        <!-- The convention on tags is to use kebab-case -->
        <!-- vue automatically makes this available 
        when you imported your component in PascalCase-->
        <chart-bar-grouped />
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import ChartBarGrouped from "~/components/ChartBarGrouped.vue";

export default {
  // For components in the pages folder you can use the layout property
  // to select one of the layouts defined in the layouts folder
  layout: "default",
  components: { ChartBarGrouped },
  data() {
    return {
      issueCards: [
        {
          icon: "",
          color: "environmental",
          title: "Environmental issues",
          paragraphs: [
            "Lorem ipsum…",
            "Here we can describe in two sentences what we shareholder proposals in this category are"
          ]
        },
        {
          icon: "",
          color: "social",
          title: "Social issues",
          paragraphs: [
            "Lorem ipsum…",
            "Here we can describe in two sentences what we shareholder proposals in this category are"
          ]
        },
        {
          icon: "",
          color: "governance",
          title: "Governance issues",
          paragraphs: [
            "Lorem ipsum…",
            "Here we can describe in two sentences what we shareholder proposals in this category are"
          ]
        }
      ]
    };
  }
};
</script>
