<template>
  <div>
    <svg :width="svgWidth" :height="svgHeight">
      <!-- Margin convention -->
      <g :transform="`translate(${margin.left}, ${margin.top})`">
        <!-- Axis and grid -->
        <g class="axis y-axis" v-axis:y="scale" />
        <g class="axis x-axis" v-axis:xGroup="scale" :transform="`translate(${0}, ${height})`" />
        <g class="horizontal-grid">
          <line
            v-for="(gridLinePosition, indexGrid) in niceYAxis.tickValues"
            :key="`grid-line-${indexGrid}`"
            x1="0"
            :x2="width"
            :y1="scale.y(gridLinePosition)"
            :y2="scale.y(gridLinePosition)"
            class="horizontal-grid"
          />
        </g>
        <!-- Grouped bar chart -->
        <g
          v-for="(year, indexYear) in dataToRender"
          :key="`bar-year-group-${indexYear}`"
          :style="`transform: translateX(${scale.xGroup(year.year)}px)`"
        >
          <g
            v-for="(issueType, indexIssueType) in year.values"
            :key="`bar-issueType-${indexIssueType}`"
            :style="
              `transform: translateX(${scale.xWithinGroup(
                issueType.issueTypeCode
              )}px)`
            "
          >
            <rect
              :x="0"
              :y="scale.y(issueType.total)"
              :width="scale.xWithinGroup.bandwidth()"
              :height="height - scale.y(issueType.total)"
              @click="categoriesToggle(issueType.issueTypeCode)"
              :class="`fill-${issueType.issueTypeCode}`"
            />
          </g>
        </g>
        <g class="x-axis-line">
          <line
            x1="0"
            :x2="width"
            :y1="scale.y(niceYAxis.tickValues[0])"
            :y2="scale.y(niceYAxis.tickValues[0])"
            class="horizontal-grid first"
          />
        </g>
        <!-- Stacked bar chart -->
        <!-- <g v-for="(year, yearIndex) in dataToRender">
        <g
          v-for="(issueTypeCode, issueTypeCodeIndex) in year.values"
          :transform="
            `translate(0, ${-getVerticalPosition(year.values, issueTypeCodeIndex)})`
          "
        >
          <rect
            :x="scale.x(year.year)"
            :y="scale.y(year.values[issueTypeCodeIndex].total)"
            :width="scale.x.bandwidth()"
            :height="height - scale.y(year.values[issueTypeCodeIndex].total)"
            :fill="colors[issueTypeCodeIndex]"
            @click="categoriesToggle(year.values[issueTypeCodeIndex].issueTypeCode)"
          />
        </g>
        </g>-->
      </g>
    </svg>
  </div>
</template>

<script>
import data from "../static/data/overview_nested.json";
import * as d3 from "d3";

export default {
  directives: {
    axis(el, binding) {
      // console.log(el); // this is the g
      // console.log(binding); // the scale object
      // console.log(binding.value);

      const axis = binding.arg; // x or y
      const axisMethod = { xGroup: "axisBottom", y: "axisLeft" }[axis];
      const methodArg = binding.value[axis];
      if (binding.arg == "y") {
        const tickValues = binding.value.y.tickValues;
        d3.select(el).call(d3[axisMethod](methodArg).tickValues(tickValues));
      } else {
        d3.select(el).call(d3[axisMethod](methodArg));
      }
    }
  },
  data() {
    return {
      svgHeight: 700,
      svgWidth: 800,
      margin: { top: 40, left: 40, bottom: 40, right: 40 },
      groupedBarChart: {
        groupKey: "year",
        withinGroup: "values"
      },
      colors: ["green", "red", "blue", "grey"],
      indexTypeToggleArray: [
        {
          issueTypeName: "Environmental",
          issueTypeCode: "env",
          activated: true
        },
        { issueTypeName: "Social", issueTypeCode: "soc", activated: true },
        {
          issueTypeName: "Good Governance",
          issueTypeCode: "gg",
          activated: true
        },
        {
          issueTypeName: "No ESG recognized",
          issueTypeCode: "no-esg",
          activated: true
        }
      ],
      data: data
    };
  },
  computed: {
    width() {
      return this.svgWidth - this.margin.right - this.margin.left;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    maxValueInChart() {
      const yearMaxes = this.dataToRender.map(year =>
        Math.max(...year.values.map(issueType => issueType.total))
      );
      const totalMax = Math.max(...yearMaxes);
      return totalMax;
    },
    niceYAxis() {
      //──── Domain end ────────────────────────────────────────────────────────────────────────
      const dividedByFour = this.maxValueInChart / 4;
      const wholeNumber = Math.trunc(dividedByFour);
      const numString = wholeNumber.toString();
      const firstDigit = parseInt(numString[0]);
      const plusOne = firstDigit + 1;
      const numOfDigits = numString.length;
      const newDomainEnd = plusOne * Math.pow(10, numOfDigits - 1) * 4;
      const safeDomainEnd = isNaN(newDomainEnd) ? 0 : newDomainEnd;
      //──── Ticks ─────────────────────────────────────────────────────────────────────────────
      const tickValuesArray = [
        0,
        safeDomainEnd * 0.25,
        safeDomainEnd * 0.5,
        safeDomainEnd * 0.75,
        safeDomainEnd * 1
      ];
      const tickValues = safeDomainEnd > 0 ? tickValuesArray : [];
      return { safeDomainEnd, tickValues };
    },
    scale() {
      const xGroup = d3
        .scaleBand()
        .domain(this.dataToRender.map(x => x[this.groupedBarChart.groupKey]))
        .rangeRound([0, this.width])
        .paddingInner(0.2);
      // console.log(xGroup);
      const xWithinGroup = d3
        .scaleBand()
        .domain(this.categoriesActive)
        .rangeRound([0, xGroup.bandwidth()])
        .padding(0.1);
      const x = d3
        .scaleBand()
        .domain(this.dataToRender.map(x => x.year))
        .rangeRound([0, this.width])
        .padding(0.15);
      let y = d3
        .scaleLinear()
        // .domain([0, Math.max(...this.data.map(x => x.values[0]))])
        .domain([0, this.niceYAxis.safeDomainEnd])
        .rangeRound([this.height, 0]);
      y.tickValues = this.niceYAxis.tickValues;
      return { xGroup, xWithinGroup, x, y };
    },
    categoriesActive() {
      return this.indexTypeToggleArray
        .filter(x => x.activated)
        .map(x => x.issueTypeCode);
    },
    dataToRender() {
      let newArray = [];
      const data = JSON.parse(JSON.stringify(this.data));
      for (let e of data) {
        // console.log(e.values);
        let newValues = e.values.filter(x => {
          return this.categoriesActive.includes(x.issueTypeCode);
        });
        // console.log(newValues);
        newArray.push({ year: e.year, values: newValues });
      }
      return newArray;
    }
  },
  methods: {
    getNiceDomainEnd(num) {
      const dividedByFour = num / 4;
      const wholeNumber = Math.trunc(dividedByFour);
      const numString = wholeNumber.toString();
      const firstDigit = parseInt(numString[0]);
      const plusOne = firstDigit + 1;
      const numOfDigits = numString.length;
      const newDomainEnd = plusOne * Math.pow(10, numOfDigits - 1) * 4;
      const safeDomainEnd = isNaN(newDomainEnd) ? 0 : newDomainEnd;
      return safeDomainEnd;
    },
    // Stacked bar chart
    getVerticalPosition(array, index) {
      if (index > 0) {
        const arrayUpToPosition = array.slice(0, index).map(x => x.value);
        const sum = arrayUpToPosition.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        );
        const height = this.height - this.scale.y(sum);
        return height;
      } else {
        return 0;
      }
    },
    categoriesToggle(issueTypeCode) {
      const issueTypeCodeIndex = this.indexTypeToggleArray
        .map(x => x.issueTypeCode)
        .indexOf(issueTypeCode);
      if (this.indexTypeToggleArray[issueTypeCodeIndex].activated) {
        this.indexTypeToggleArray[issueTypeCodeIndex].activated = false;
      } else {
        this.indexTypeToggleArray[issueTypeCodeIndex].activated = true;
      }
    }
  }
};
</script>
