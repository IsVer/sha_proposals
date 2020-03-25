<template>
  <v-container :class="chartClass" fluid>
    <v-row justify="center">
      <div
        v-for="(element, indexElement) in data"
        :key="`star-${indexElement}`"
        class="position-relative ma-1 grey lighten-4"
        :style="`width: ${svgWidth}px`"
      >
        <div
          class="position-absolute-tl0 pa-2 overline width-80pc"
          style="line-height: 1.15"
        >{{ element.fund }}</div>
        <svg :width="svgWidth" :height="svgHeight">
          <!-- :style="`transform: translateX(${scale.x(category)}px)`" -->
          <g :style="`transform: translateX(${margin.left}px) translateY(${margin.top}px);`">
            <g :style="`transform: translateX(${rectLength}px) translateY(${rectLength}px)`">
              <g
                v-for="(category, indexCategory) in categories"
                :key="`rect-group-${indexCategory}`"
                :class="category"
                :style="`transform-origin: ${rectWidth * 0.5}px 0px; transform: rotate(${360/categories.length * indexCategory +180}deg) translateY(${rectWidth * 0.31}px)`"
              >
                <rect
                  :width="rectWidth"
                  :height="scale.size(element[`${category}_${sizeProperty}`])"
                  fill="none"
                  :class="`${category}--stroke only-stroke`"
                />
                <rect
                  :width="rectWidth"
                  :height="scale.size(element[`${category}_${yProperty}`] / 100 * element[`${category}_${sizeProperty}`])"
                  :class="`${category}--fill`"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    chartClass: {
      type: String,
      default: "chart-star"
    },
    svgHeight: {
      type: Number,
      default: 200
    },
    svgWidth: {
      type: Number,
      default: 200
    },
    margin: {
      type: Object,
      default() {
        return { top: 2, left: 2, bottom: 2, right: 2 };
      }
    },
    rectWidth: {
      type: Number,
      default: 15
    },
    categories: {
      type: Array,
      default() {
        return ["cat1", "cat2", "cat3"];
      }
    },
    yProperty: {
      type: String,
      default: "y"
    },
    sizeProperty: {
      type: String,
      default: "size"
    },
    data: {
      type: Array,
      default() {
        return [
          {
            id: 2010,
            cat1_y: 23,
            cat1_size: 17,
            cat2_y: 18,
            cat2_size: 200,
            cat3_y: 50,
            cat3_size: 20
          },
          {
            id: 2011,
            cat1_y: 8,
            cat1_size: 30,
            cat2_y: 10,
            cat2_size: 44,
            cat3_y: 10,
            cat3_size: 26
          },
          {
            id: 2012,
            cat1_y: 77,
            cat1_size: 54,
            cat2_y: 38,
            cat2_size: 19,
            cat3_y: 81,
            cat3_size: 78
          },
          {
            id: 2013,
            cat1_y: 20,
            cat1_size: 32,
            cat2_y: 18,
            cat2_size: 20,
            cat3_y: 65,
            cat3_size: 71
          },
          {
            id: 2014,
            cat1_y: 13,
            cat1_size: 15,
            cat2_y: 74,
            cat2_size: 34,
            cat3_y: 56,
            cat3_size: 33
          },
          {
            id: 2015,
            cat1_y: 49,
            cat1_size: 68,
            cat2_y: 53,
            cat2_size: 74,
            cat3_y: 13,
            cat3_size: 8
          }
        ];
      }
    }
  },
  // data() {
  //   return { data: data };
  // },
  computed: {
    width() {
      return this.svgWidth - this.margin.right - this.margin.left;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    rectLength() {
      return this.width * 0.5;
    },
    maxSize() {
      const maxPerCategory = this.categories.map(c =>
        Math.max(...this.data.map(d => d[`${c}_${this.sizeProperty}`]))
      );
      const maxAllCategories = parseInt(Math.max(...maxPerCategory));
      return maxAllCategories;
    },
    scale() {
      // let y = d3
      //   .scaleLinear()
      //   .domain([this.yDomain[0], this.yDomain[1]])
      //   .rangeRound([this.height, 0]);

      let size = d3
        .scaleLinear()
        .domain([0, this.maxSize])
        .rangeRound([0, this.rectLength]);

      return { size };
    }
  },
  mounted() {
    console.log(this.data);
    console.log(this.maxSize);
    const duplicatesPrep = this.data.map(x => x.fund.toLowerCase().trim());
    const findDuplicates = arr => {
      let sorted_arr = arr.slice().sort(); // You can define the comparing function here.
      // JS by default uses a crappy string compare.
      // (we use slice to clone the array so the
      // original array won't be modified)
      let results = [];
      for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
          results.push(sorted_arr[i]);
        }
      }
      return results;
    };
    console.log(duplicatesPrep.sort());
    console.log(findDuplicates(duplicatesPrep));
    // console.log(
    //   this.categories.map(x => this.data[0][`${x}_${this.yProperty}`])
    // );
  }
};
</script>