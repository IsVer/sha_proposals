<template>
  <div id="sankey-chart-intro">
    <p class="text-center">
      <span class="headline font-weight-bold"
        >{{ totalFiledProposals }} shareholder proposals filed in
        {{ yearFiled }}</span
      >
      <br />
      concerning environmental and social issues
    </p>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    totalFiledProposals: {
      type: Number,
      default: 333
    },
    yearFiled: {
      type: Number,
      default: 2019
    }
  }
};
</script>

<style lang="scss" scoped></style>
