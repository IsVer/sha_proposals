<template>
  <div>
    <h2 class="ma-4">Square root scale!</h2>
    <ChartStar :data="data" :categories="['e', 's', 'g']" yProperty="support" sizeProperty="vote" />
  </div>
</template>

<script>
import data from "../static/data/bubble_chart.csv";

import ChartStar from "~/components/ChartStar.vue";

export default {
  components: { ChartStar },
  data() {
    return {
      data: data
    };
  }
};
</script>

<style lang="scss" scoped>
</style>