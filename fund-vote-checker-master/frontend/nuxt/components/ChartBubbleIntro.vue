<template>
  <v-container>
    <div style="height:calc(100vh - 240px)" class="d-flex justify-center aliign-center">
      <div
        v-for="(category, indexCategory) in categories"
        :key="`category-container-${indexCategory}`"
        :class="`${category.name}-container`"
        style="width: 250px; height: 100%"
      >
        <div
          class="lighten-4 position-relative d-flex justify-center align-center"
          style="width: 100%; height: 100%"
        >
          <svg width="100%" height="100%" class="position-absolute-tl0">
            <line
              x1="50%"
              y1="50%"
              :x2="`${textPositions[indexCategory].x}%`"
              :y2="`${textPositions[indexCategory].y}%`"
              stroke="#707070"
              stroke-width="3"
              stroke-dasharray="12 4"
            />
          </svg>
          <v-btn fab :color="category.name" dark depressed>{{ category.name[0].toUpperCase() }}</v-btn>
          <div
            class="category-text-and-table position-absolute-tl0 pa-2 background"
            :style="`width: 150%; top: ${textPositions[indexCategory].y}%; transform: translateX(${textPositions[indexCategory].x-50}%) translateY(-50%);`"
          >
            <div class="category-text">
              <p class="body-2">
                <span class="font-weight-bold">{{ capitalizeWord(category.name) }}.</span>
                {{ category.text }}
              </p>
            </div>
            <div class="category-table">
              <div class="body-2 table">
                <div class="table-row d-flex justify-space-between">
                  <div class="pb-2" style="width: 60%; border-bottom: 1px solid grey">Proposal</div>
                  <div class="pb-2" style="width: 30%; border-bottom: 1px solid grey">Company</div>
                </div>
                <div class="table-row d-flex justify-space-between">
                  <div class="pb-2" style="width: 60%; border-bottom: 1px solid grey">Proposal</div>
                  <div class="pb-2" style="width: 30%; border-bottom: 1px solid grey">Company</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          name: "environmental",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp incididunt ut labore et dolore magna aliqua et dolore:"
        },
        {
          name: "social",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp incididunt ut labore et dolore magna aliqua et dolore:"
        },
        {
          name: "governance",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp incididunt ut labore et dolore magna aliqua et dolore:"
        }
      ],
      textPositions: [
        { x: 0, y: 10 },
        { x: 10, y: 80 },
        { x: 100, y: 20 }
      ]
    };
  },
  methods: {
    capitalizeWord(string) {
      return string[0].toUpperCase() + string.slice(1);
    }
  }
};
</script>
