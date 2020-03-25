<template>
  <div>
    <v-menu v-model="menu" :close-on-content-click="false" offset-y nudge-bottom="15">
      <template v-slot:activator="{ on }">
        <!-- <v-btn v-on="on" large color="secondary" class="text--primary" tile> -->

        <v-btn v-on="on" color="primary" elevation="3" rounded fab small>
          <v-icon>{{ menu ? 'mdi-close' : 'mdi-dots-horizontal' }}</v-icon>
          <!-- &nbsp; -->
          <!-- <span class="caption text-capitalize">{{ menu ? 'Close' : 'Menu' }}</span> -->
        </v-btn>
      </template>
      <!-- <v-card class="pa-3" width="340" color="primary" tile> -->
      <v-card class="pa-3" width="340" style="background:rgba(255,255,255,0.97)" tile>
        <v-card-title>Chart controls</v-card-title>
        <v-card-text>
          <!--  -->
          <v-btn-toggle class="width-100pc transparent" v-model="showManagerModel" multiple dense>
            <div class="width-100pc">
              <div
                v-for="(manager, indexManager) in managers"
                :key="`button-group-${indexManager}`"
                class="my-2 width-100pc d-flex justify-space-between align-center"
              >
                <div class="body-2">{{ manager.name }}</div>
                <v-btn @click="onClick" class="white" rounded outlined>
                  <v-icon>{{ showManager.includes(indexManager) ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>&nbsp;
                  <span
                    class="caption text-capitalize"
                  >{{ showManager.includes(indexManager) ? 'Hide' : 'Show' }}</span>
                </v-btn>
              </div>
            </div>
          </v-btn-toggle>

          <div class="my-4 d-flex justify-space-between align-center">
            <div class="body-2">Fund focus</div>
            <v-btn-toggle v-model="showESGModel" multiple rounded dense>
              <v-btn @click="onClick" class="white">
                <v-icon>{{ showESG.includes(0) ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>&nbsp;
                <span class="caption text-capitalize">General</span>
              </v-btn>
              <v-btn class="white">
                <v-icon>{{ showESG.includes(1) ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon>&nbsp;
                <span class="caption text-capitalize">ESG</span>
              </v-btn>
            </v-btn-toggle>
          </div>

          <v-divider class="my-6"></v-divider>
          <div class="d-flex justify-space-between align-center">
            <div class="mb-3 body-2">Chart</div>

            <v-btn-toggle class="mb-2" v-model="toggleAllModel" multiple rounded dense>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn @click="onClick" color="white" dark v-on="on">
                    <v-icon>{{toggleAllModel.includes(0) ? 'mdi-eye-off' : 'mdi-eye'}}</v-icon>
                  </v-btn>
                </template>
                <span>{{toggleAllModel.includes(0) ? 'Hide all options' : 'Show all options'}}</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn color="white" dark v-on="on">
                    <v-icon>{{toggleAllModel.includes(1) ? 'mdi-chart-bubble' : 'mdi-format-horizontal-align-center'}}</v-icon>
                  </v-btn>
                </template>
                <span>{{toggleAllModel.includes(1) ? 'Unfold funds' : 'Overlap funds'}}</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn color="white" dark v-on="on">
                    <v-icon>{{toggleAllModel.includes(2) ? 'mdi-roman-numeral-1' : 'mdi-roman-numeral-3'}}</v-icon>
                  </v-btn>
                </template>
                <span>{{toggleAllModel.includes(2) ? 'Collapse managers' : 'Expand managers'}}</span>
              </v-tooltip>
            </v-btn-toggle>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // showManager: [],
      // showESG: [],
      // toggleAll: [],

      // buttonsPerManager: [{ label: "Show", icon: "mdi-eye" }],
      managers: [
        { name: "BlackRock" },
        { name: "Vanguard" },
        { name: "State Street" }
      ],
      menu: false
    };
  },
  computed: {
    ...mapState({
      showManager: state => state.chartBubble.showManager,
      showESG: state => state.chartBubble.showESG,
      toggleAll: state => state.chartBubble.toggleAll
    }),
    showManagerModel: {
      set(array) {
        this.$store.commit("chartBubble/ChangeControlArray", {
          name: "showManager",
          update: array
        });
      },
      get() {
        return this.showManager;
      }
    },
    showESGModel: {
      set(array) {
        this.$store.commit("chartBubble/ChangeControlArray", {
          name: "showESG",
          update: array
        });
      },
      get() {
        return this.showESG;
      }
    },
    toggleAllModel: {
      set(array) {
        // check if there’s a difference between old and new:
        if (!this.toggleAll.includes(0) && array.includes(0)) {
          this.$store.commit("chartBubble/ChangeControlArray", {
            name: "showESG",
            update: [0, 1]
          });
          this.$store.commit("chartBubble/ChangeControlArray", {
            name: "showManager",
            update: [0, 1, 2]
          });
        } else if (this.toggleAll.includes(0) && !array.includes(0)) {
          this.$store.commit("chartBubble/ChangeControlArray", {
            name: "showESG",
            update: []
          });
          this.$store.commit("chartBubble/ChangeControlArray", {
            name: "showManager",
            update: []
          });
        }
        // if (array.includes(0)) {
        //   this.
        // }
        this.$store.commit("chartBubble/ChangeControlArray", {
          name: "toggleAll",
          update: array
        });
      },
      get() {
        let toggleArray = JSON.parse(JSON.stringify(this.toggleAll));
        // Todo – checks based on variables
        if (this.showManager.length < 3 || this.showESG.length < 2) {
          toggleArray = toggleArray.filter(x => x != 0);
          this.$store.commit("chartBubble/ChangeControlArray", {
            name: "toggleAll",
            update: toggleArray
          });
        } else {
          if (!toggleArray.includes(0)) {
            toggleArray.push(0);
          }
        }
        return toggleArray;
      }
    }
  },
  methods: {
    onClick() {
      setTimeout(() => {
        console.log("manager", this.showManager);
        console.log("esg", this.showESG);
        console.log("all", this.toggleAll);
      }, 500);
    }
  }
};
</script>