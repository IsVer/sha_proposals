<template>
  <div
    class="ml-8 omitted"
    :style="
      `position: relative; transform: translateY(${height * linkHeight}px);`
    "
  >
    <div style="width: 80%;" class="center-absolute--vertical">
      <v-row justify="center">
        <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
          <v-icon x-large class="mt-n4" color="secondary"
            >mdi-account-tie-voice</v-icon
          >
        </v-col>
        <v-col cols="12" sm="8" md="6">
          <p class="subtitle">
            <span class="font-weight-bold"
              >After proposals are submitted and not omitted, activist
              shareholders and companies can engage in talks to see whether they
              can compromise on the issue brought by the shareholder.</span
            >
            If the shareholder is satisfied with the company willingness to
            implement sufficient change on the issue, they can withdraw the
            shareholder proposal.
          </p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
          <v-icon x-large class="mt-n4" color="primary">mdi-ear-hearing</v-icon>
        </v-col>
        <v-col cols="12" sm="8" md="6">
          <p class="subtitle">
            <span class="font-weight-bold"
              >In the last 2 years, more environmental and social shareholder
              proposals have been withdrawn.</span
            >
            This could have a few reasons. It is not unlikely that boards have
            become more attentive to shareholder requests, especially on
            environmental and social issues. If companies are faced with a
            shareholder proposal that is likely to win, or result in negative
            publicity if opposed, boards frequently negotiate for a withdrawal.
          </p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="d-flex justify-center" cols="12" sm="2" md="1"></v-col>
        <v-col class="d-flex justify-center" cols="12" sm="8" md="6">
          <slot></slot>
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
            A deeper look in the
            <a href="https://onlinelibrary.wiley.com/doi/abs/10.1111/corg.12109"
              >data shows</a
            >
            that proposals filed by influential investors are more likely to be
            withdrawn than proposals filed by private investors. Companies will
            be more likely to do concessions for the largest shareholders.
          </p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 500
    },
    linkHeight: {
      type: Number,
      default: 0.5
    }
  }
};
</script>
