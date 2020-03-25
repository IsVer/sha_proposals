<template>
  <div>
    <h2 class="ma-4">Square root scale!</h2>
    <v-row class="pa-8">
      <ChartHalfHexagonReusable
        v-for="(fund, indexFund) in data"
        :key="`fund-star-${indexFund}`"
        :data="fund"
        :categories="['s', 'g', 'e']"
        yProperty="support"
        sizeProperty="vote"
        :svgHeight="240"
        :maxSizeProp="1764"
        style="transform: scaleX(-1)"
      />
    </v-row>
  </div>
</template>

<script>
import data from "../static/data/bubble_chart.csv";

import ChartHalfHexagonReusable from "~/components/ChartHalfHexagonReusable.vue";

export default {
  components: { ChartHalfHexagonReusable },
  data() {
    return {
      data: data,
      temp: [
        {
          id: 22,
          fund: "Temp",
          e_support: 25,
          s_support: 50,
          g_support: 95,
          e_vote: 1750,
          s_vote: 1750,
          g_vote: 1750,
          fund_manager: 1,
          fund_is_esg: 0
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
