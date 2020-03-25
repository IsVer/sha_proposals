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
          <v-icon x-large class="mt-n4" color="primary">mdi-contrast</v-icon>
        </v-col>
        <v-col cols="12" sm="8" md="6">
          <p class="subtitle">
            <span class="font-weight-bold"
              >Shareholder activists and companies often disagree on what should
              appear on corporate proxy statements,</span
            >
            for the rest of the shareholders to vote on. Companies rather prefer
            to leave out topics for public scrutiny brought by shareholders.
          </p>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="d-flex justify-center" cols="12" sm="2" md="1">
          <v-icon x-large class="mt-n4" color="secondary"
            >mdi-file-cancel</v-icon
          >
        </v-col>
        <v-col cols="12" sm="8" md="6">
          <p class="subtitle">
            Companies can exclude a shareholder proposal from its proxy
            materials (Rule 14a-8). The company will then explain why they
            believes that it can
            <span class="font-weight-bold"
              >exclude the proposal, and submit a “no-action”</span
            >
            request with SEC regulators. If successful, the SEC will take
            “no-action” to that exclusion from the ballot, and the shareholder
            proposal won’t be voted on.
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
            <span class="font-weight-bold">
              The overall proportion of omitted resolutions, compared to the
              total that were filed, has been consistent over time.
            </span>
            As shareholder activism has become more widespread, activist
            shareholders seem to know better when and how to submit shareholder
            proposals - preventing superfluous submissions that are easy to
            omit.
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
