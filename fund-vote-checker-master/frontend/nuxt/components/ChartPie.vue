<template>
  <client-only>
    <apexchart
      class="pie-chart"
      :width="size"
      :height="size"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </client-only>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [10, 20, 30];
      }
    },
    labels: {
      type: Array,
      default() {
        return ["A", "B", "C"];
      }
    }
  },
  data() {
    return {
      isHydrated: false,
      series: this.data,
      chartOptions: {
        labels: this.labels,
        chart: {
          type: "pie"
        },
        plotOptions: {
          pie: {
            customScale: 1,
            expandOnClick: false
          }
        },
        theme: {
          monochrome: {
            enabled: true,
            color: "#ffc400",
            shadeTo: "light",
            shadeIntensity: 0.6
          }
        },
        stroke: {
          show: true,
          colors: "#fafafa",
          width: 3
        },
        dataLabels: {
          // enabled: true,
          textAnchor: "end",
          formatter: function(value, { seriesIndex, w }) {
            // console.log(seriesIndex, w);
            return `${w.config.labels[seriesIndex]}: ${value.toFixed(1)}%`;
          },
          // offsetX: "10px",
          // offsetY: 0,
          style: {
            fontSize: 18,
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            colors: ["rgba(0,0,0,0.87)"]
          },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.45
          }
        },
        tooltip: {
          enabled: false
        },
        states: {
          normal: {
            filter: {
              type: "none",
              value: 0
            }
          },
          hover: {
            filter: {
              type: "none",
              value: 0
            }
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: "none",
              value: 0
            }
          }
        },
        legend: {
          show: false
        }
      }
    };
  },
  computed: {
    breakpoint() {
      // SUPER IMPORTANT
      // https://github.com/vuetifyjs/vuetify/issues/3436#issuecomment-371872303
      // Needs "data" and "mounted" as well!
      return this.isHydrated ? this.$vuetify.breakpoint : undefined;
    },
    size() {
      if (this.breakpoint && this.breakpoint.width) {
        return this.breakpoint.width > this.breakpoint.height
          ? this.breakpoint.width * 0.4
          : this.breakpoint.width * 0.7;
      } else {
        return 280;
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.isHydrated = true;
    }, 500);
  }
};
</script>

<style lang="scss" scoped></style>
