<template>
  <v-container :class="chartClass" fluid>
    <v-row justify="center">
      <div
        class="position-relative ma-1 grey lighten-5"
        :style="`width: ${svgWidth}px`"
      >
        <!-- <div
          class="position-absolute-tl0 pa-2 overline width-80pc"
          style="line-height: 1.15"
        >{{ data.fund }}</div>-->
        <svg :width="svgWidth" :height="svgHeight">
          <!-- :style="`transform: translateX(${scale.x(category)}px)`" -->
          <g
            :style="
              `transform: translateX(${margin.left}px) translateY(${margin.top}px);`
            "
          >
            <circle
              :cx="rectLength"
              :cy="rectLength"
              :r="scale.size(maxSizeProp) * 1 + rectWidth * 0.5 - 2"
              fill="none"
              stroke="#e4e4e4"
              stroke-dasharray="3 3"
            />
            <circle
              :cx="rectLength"
              :cy="rectLength"
              :r="rectLength * 0.66"
              fill="none"
              stroke="#e4e4e4"
              stroke-dasharray="3 3"
            />
            <circle
              :cx="rectLength"
              :cy="rectLength"
              :r="rectLength * 0.33"
              fill="none"
              stroke="#e4e4e4"
              stroke-dasharray="3 3"
            />
            <circle
              :cx="rectLength"
              :cy="rectLength"
              :r="rectLength * 0.1"
              fill="none"
              stroke="#e4e4e4"
              stroke-dasharray="3 3"
            />
            <g
              :style="
                `transform: translateX(${rectLength -
                  rectWidth * 0.5}px) translateY(${rectLength}px)`
              "
            >
              <g
                v-for="(category, indexCategory) in categories"
                :key="`rect-group-${indexCategory}`"
                :class="category"
                :style="
                  `transform-origin: ${rectWidth *
                    0.5}px 0px; transform: rotate(${(360 / categories.length) *
                    indexCategory +
                    180}deg) translateY(${rectWidth * 0.31}px)`
                "
              >
                <rect
                  :width="rectWidth"
                  :height="scale.size(data[`${category}_${sizeProperty}`])"
                  fill="none"
                  :class="`${category}--stroke only-stroke`"
                />
                <rect
                  :width="rectWidth"
                  :height="
                    scale.size(
                      (data[`${category}_${yProperty}`] / 100) *
                        data[`${category}_${sizeProperty}`]
                    )
                  "
                  :class="`${category}--fill`"
                />
              </g>
            </g>
            <circle :cx="rectLength" :cy="rectLength" :r="1" fill="#e4e4e4" />
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
        return { top: 10, left: 10, bottom: 10, right: 10 };
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
    maxSizeProp: {
      type: Number,
      default: 100
    },
    data: {
      type: Object,
      default() {
        return {
          id: 2010,
          cat1_y: 23,
          cat1_size: 17,
          cat2_y: 18,
          cat2_size: 200,
          cat3_y: 50,
          cat3_size: 20
        };
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
    scale() {
      // let y = d3
      //   .scaleLinear()
      //   .domain([this.yDomain[0], this.yDomain[1]])
      //   .rangeRound([this.height, 0]);

      let size = d3
        .scaleLinear()
        .domain([0, this.maxSizeProp])
        .range([0, this.rectLength]);

      return { size };
    }
  },
  mounted() {
    // console.log(this.data);
    // console.log(this.maxSizeProp);
    // const duplicatesPrep = this.data.map(x => x.fund.toLowerCase().trim());
    // const findDuplicates = arr => {
    //   let sorted_arr = arr.slice().sort(); // You can define the comparing function here.
    //   // JS by default uses a crappy string compare.
    //   // (we use slice to clone the array so the
    //   // original array won't be modified)
    //   let results = [];
    //   for (let i = 0; i < sorted_arr.length - 1; i++) {
    //     if (sorted_arr[i + 1] == sorted_arr[i]) {
    //       results.push(sorted_arr[i]);
    //     }
    //   }
    //   return results;
    // };
    // console.log(duplicatesPrep.sort());
    // console.log(findDuplicates(duplicatesPrep));
    // console.log(
    //   this.categories.map(x => this.data[0][`${x}_${this.yProperty}`])
    // );
  }
};
</script>
