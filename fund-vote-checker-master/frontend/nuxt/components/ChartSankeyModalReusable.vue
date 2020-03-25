<template>
  <div class="z-index--9">
    <div
      class="d-flex justify-start align-center"
      :style="`width:${width}px; `"
    >
      <div>
        <div v-if="breakpoint ? breakpoint.mdAndDown : false">
          <v-btn
            @click="toggle('showPopOver')"
            :color="iconColor"
            small
            fab
            dark
          >
            <v-icon>{{ iconForMobileButton }}</v-icon>
          </v-btn>
        </div>
        <div v-else>
          <v-icon x-large class="mt-2 mb-2" :color="iconColor">{{
            iconForDesktop
          }}</v-icon>
          <p>
            <span class="font-weight-bold">Compared to 2010</span> less
            proposals made it to the voting stage. This indicates that companies
            are trying to resolve issues at an earlier stage.
          </p>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="showPopOver" style="transform: translateX(-50%)" class="ma-4">
        <v-card elevation="7" tile>
          <v-btn
            @click="toggle('showPopOver')"
            class="d-flex justify-end align-center"
            :style="`width:${width}px;`"
            :color="iconColor"
            block
            depressed
            tile
          >
            <v-icon small class="mr-2">mdi-close</v-icon>
            <div class="caption text-capitalize font-weight-bold">Close</div>
          </v-btn>
          <v-card-text class="pb-6">
            <div>Compared to 2010 …</div>
            <div class="text--primary">
              Less proposals made it to the voting stage. This indicates that
              companies are trying to resolve issues at an earlier stage.
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
      default: 240
    },
    iconColor: {
      type: String,
      default: "primary"
    },
    iconForDesktop: {
      type: String,
      default: "mdi-alert-circle"
    },
    iconForMobileButton: {
      type: String,
      default: "mdi-alert-outline"
    },
    breakpoint: Object
  },
  data() {
    return {
      showPopOver: false
    };
  },
  methods: {
    toggle(prop) {
      console.log(prop);
      this[prop] = !this[prop];
    }
  }
};
</script>

<style lang="scss" scoped></style>
