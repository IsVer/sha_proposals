<template>
  <transition name="fade-slow">
    <div
      v-if="showInterface"
      class="ml-2 px-6 d-flex align-center"
      style="width: 89%"
    >
      <div>Fund checker</div>
      <v-autocomplete
        class="mt-3 mb-n4 mx-12"
        v-model="autocompleteModel"
        @change="changeInput"
        :items="funds"
        item-text="fund"
        item-value="id"
        prepend-inner-icon="mdi-magnify"
        color="primary"
        clearable
        label="Search your fund"
        outlined
        multiple
        chips
        small-chips
        dense
      >
        <template v-slot:item="{ item }">
          <v-list-item-avatar
            :color="fundManagers[item.fund_manager].color"
            class="body-1 font-weight-light white--text"
            >{{ esgTags[item.fund_is_esg] }}</v-list-item-avatar
          >
          <v-list-item-content>
            <v-list-item-title
              v-text="fundManagers[item.fund_manager].name"
            ></v-list-item-title>
            <v-list-item-subtitle v-text="item.fund"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon :color="fundManagers[item.fund_manager].color">{{
              fundManagers[item.fund_manager].icon
            }}</v-icon>
          </v-list-item-action>
        </template>
        <template v-slot:selection="{ item }">
          <v-chip small close @click="remove(item)" @click:close="remove(item)">
            {{ item.fund }}
          </v-chip>
        </template>
      </v-autocomplete>
      <v-spacer />

      <div class="mx-3 caption">Chart options</div>
      <ChartBubbleViolinControls />
    </div>
  </transition>
</template>

<script>
// Todo: replace later
import bubbleData from "../static/data/bubble_chart.csv";

import { mapState } from "vuex";

import ChartBubbleViolinControls from "~/components/ChartBubbleViolinControls.vue";

export default {
  components: { ChartBubbleViolinControls },
  // This controls the opening and closing of the navigation drawer
  data: () => ({
    modelIDs: null,
    funds: bubbleData,
    fundManagers: [
      { name: "BlackRock", color: "#000", icon: "mdi-square" },
      { name: "Vanguard", color: "#9D0022", icon: "mdi-ferry" },
      { name: "State Street", color: "#003285", icon: "mdi-ferry" }
    ],
    esgTags: ["all", "ESG"]
  }),
  computed: {
    ...mapState({
      showManager: state => state.chartBubble.showManager,
      showESG: state => state.chartBubble.showESG,
      toggleAll: state => state.chartBubble.toggleAll,
      selectedFunds: state => state.interfaceFundSearchBar.selectedFunds,
      showInterface: state => state.interfaceFundSearchBar.showInterface
    }),
    autocompleteModel: {
      set(array) {
        // console.log(array);
        // Fund is already selected

        let arrayCopy = array;
        if (arrayCopy.length > 2) {
          arrayCopy.shift();
        }
        const arrayWithCategory = arrayCopy.map(x => {
          let indexCategory = 0;
          const matchWithCurrent = this.selectedFunds.find(s => s.id == x);
          if (matchWithCurrent) {
            indexCategory = matchWithCurrent.indexCategory;
          } else {
            console.log("happened");
            const possibleCategories = [0, 1, 2];
            const usedCategories = this.selectedFunds.map(x => x.indexCategory);
            const openCategories = possibleCategories.filter(
              x => usedCategories.indexOf(x) === -1
            );
            console.log(openCategories);
            indexCategory = openCategories[0];
            console.log(indexCategory);
          }
          return {
            id: x,
            indexCategory: indexCategory
          };
        });
        this.$store.commit(
          "interfaceFundSearchBar/ChangeSelectedFunds",
          arrayWithCategory
        );
      },
      get() {
        return this.selectedFunds.map(x => x.id);
      }
    }
  },
  mounted() {
    // console.log(this.funds);
  },
  methods: {
    changeInput() {
      // console.log(this.modelIDs);
      // console.log(this.selectedFunds);
    },
    remove(item) {
      console.log(item);
      let selectedFundsLocal = JSON.parse(JSON.stringify(this.selectedFunds));
      const foundIndex = selectedFundsLocal.findIndex(x => x.id === item.id);
      selectedFundsLocal.splice(foundIndex, 1);
      this.$store.commit(
        "interfaceFundSearchBar/ChangeSelectedFunds",
        selectedFundsLocal
      );
    }
  }
};
</script>
