<template>
  <v-card class="pa-4" width="375">
    <v-card-title>Controls</v-card-title>
    <v-card-text>
      <h4 class="mb-3">For all funds:</h4>

      <v-btn-toggle v-model="toggle_exclusive" multiple rounded>
        <v-btn class="white">
          <v-icon>mdi-eye</v-icon>&nbsp;
          <span class="caption text-capitalize">Show</span>
        </v-btn>
        <v-btn class="white">
          <v-icon>mdi-eyedropper</v-icon>&nbsp;
          <span class="caption text-capitalize">Color</span>
        </v-btn>
        <v-btn class="white">
          <v-icon>mdi-distribute-horizontal-center</v-icon>&nbsp;
          <span class="caption text-none">Spread out</span>
        </v-btn>
      </v-btn-toggle>

      <!-- <h4 class="my-3">Per fund:</h4> -->
      <v-divider class="my-4"></v-divider>
      <div class="my-2 d-flex justify-lg-space-between align-center">
        <span class="red--text">BlackRock</span>
        <v-btn-toggle v-model="toggle_exclusive" multiple tile borderless>
          <v-btn color="red" outlined>
            <v-icon color="red">mdi-eye</v-icon>&nbsp;
            <span class="caption text-capitalize">Show</span>
          </v-btn>
          <v-btn>
            <v-icon>mdi-eyedropper</v-icon>&nbsp;
            <span class="caption text-capitalize">Color</span>
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="my-2 d-flex justify-lg-space-between align-center">
        Vanguard
        <v-btn-toggle v-model="toggle_exclusive" multiple tile>
          <v-btn>
            <v-icon>mdi-eye</v-icon>&nbsp;
            <span class="caption text-capitalize">Show</span>
          </v-btn>
          <v-btn>
            <v-icon>mdi-eyedropper</v-icon>&nbsp;
            <span class="caption text-capitalize">Color</span>
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="my-2 d-flex justify-lg-space-between align-center">
        State Street
        <v-btn-toggle v-model="toggle_exclusive" multiple tile>
          <v-btn>
            <v-icon>mdi-eye</v-icon>&nbsp;
            <span class="caption text-capitalize">Show</span>
          </v-btn>
          <v-btn>
            <v-icon>mdi-eyedropper</v-icon>&nbsp;
            <span class="caption text-capitalize">Color</span>
          </v-btn>
        </v-btn-toggle>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      toggle_exclusive: []
    };
  }
};
</script>