<template>
  <div
    id="sec-modal-container"
    :style="
      `z-index:9; position: absolute; top:0; transform: translateY(${startingRectHeight *
        0.4}px);`
    "
  >
    <div
      class="d-flex justify-center align-center"
      :style="
        `
              width:${width * 0.33}px; 
              height:${startingRectHeight * 0.4}px;
              transform: translateX(${width * 0.67}px)
              `
      "
    >
      <div style="width:80%;">
        <div
          v-if="breakpoint ? breakpoint.lgAndDown : false"
          class="d-flex justify-center"
        >
          <v-btn
            @click="toggle('showSECPopOver')"
            color="primary"
            small
            fab
            dark
          >
            <v-icon class="mt-n1">mdi-alert-outline</v-icon>
          </v-btn>
        </div>
        <div v-else>
          <v-icon x-large class="mt-n6 mb-2" color="primary">mdi-alert</v-icon>
          <p class="body-2">
            By the way, past November, the Securities and Exchange Commission,
            <a href="https://www.sec.gov/rules/proposed/2019/34-87458.pdf"
              >SEC, proposed a rule change to increase threshold for submitting
              shareholder resolutions.</a
            >
            It would significantly affect the eligibility of environmental and
            social proposals.
          </p>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="showSECPopOver"
        :style="`width:${width}px;`"
        class="ma-4 d-flex justify-end"
      >
        <v-card :width="width < 600 ? width : width * 0.5" elevation="7" tile>
          <v-btn
            @click="toggle('showSECPopOver')"
            class="d-flex justify-end align-center"
            color="primary"
            block
            depressed
            tile
          >
            <v-icon small class="mr-2">mdi-close</v-icon>
            <div class="caption text-capitalize font-weight-bold">Close</div>
          </v-btn>
          <v-card-text>
            <div>By the way …</div>
            <div class="text--primary">
              Past November, the Securities and Exchange Commission,
              <a href="https://www.sec.gov/rules/proposed/2019/34-87458.pdf"
                >SEC, proposed a rule change to increase threshold for
                submitting shareholder resolutions.</a
              >
              It would significantly affect the eligibility of environmental and
              social proposals.
            </div>
          </v-card-text>
        </v-card>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 900
    },
    startingRectHeight: {
      type: Number,
      default: 50
    },
    breakpoint: Object
  },
  data() {
    return {
      showSECPopOver: false
    };
  },
  methods: {
    toggle(prop) {
      this[prop] = !this[prop];
    }
  }
};
</script>

<style lang="scss" scoped></style>
