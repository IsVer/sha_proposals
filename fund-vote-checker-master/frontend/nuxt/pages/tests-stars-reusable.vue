<template>
  <div>
    <h2 class="ma-4">Square root scale!</h2>
    <ChartStarReusable
      v-for="(fund, indexFund) in data"
      :key="`fund-star-${indexFund}`"
      :data="fund"
      :categories="['e', 's', 'g']"
      yProperty="support"
      sizeProperty="vote"
    />
  </div>
</template>

<script>
import data from "../static/data/bubble_chart.csv";

import ChartStarReusable from "~/components/ChartStarReusable.vue";

export default {
  components: { ChartStarReusable },
  data() {
    return {
      data: data
    };
  }
};
</script>

<style lang="scss" scoped></style>
