<template>
  <div>
    <div
      v-if="orientation == 'bottom-left'"
      :style="
        `position:absolute; left:${x}px; top:${y}px; transform: translateX(-100%)`
      "
      class="d-flex transition--all"
    >
      <div
        :class="
          `${
            hasLabel ? 'mr-n7' : ''
          } mt-2 pt-3 pb-4 pl-4 pr-6 d-flex align-center elevation-4`
        "
        style="min-width: 180px; max-width: 180px; border: 1px solid #fff !important; background:rgba(245,245,245, 0.8) !important;"
      >
        <div
          class="body-2 font-weight-medium"
          style="line-height:1.3 !important;"
        >
          {{ content }}
        </div>
      </div>
      <div
        v-if="hasLabel"
        class="grey d-flex align-center justify-center primary--text elevation-5"
        style="width:40px; height:40px; border: 2px solid #fafafa !important; border-radius: 50% 0 50% 50%; z-index: 2; "
      >
        <div class="body-1 font-weight-bold background--text">{{ label }}</div>
      </div>
    </div>
    <div
      v-if="orientation == 'top-right'"
      :style="
        `position:absolute; left:${x}px; top:${y}px; transform: translateY(-100%)`
      "
      class="d-flex align-end"
    >
      <div
        v-if="hasLabel"
        class="grey d-flex align-center justify-center primary--text elevation-5"
        style="width:40px; height:40px; border: 2px solid #fafafa !important; border-radius: 50% 50% 50% 0; z-index: 2; "
      >
        <div class="body-1 font-weight-bold background--text">{{ label }}</div>
      </div>
      <div
        :class="
          `${
            hasLabel ? 'ml-n6' : ''
          } mb-2 pt-3 pb-4 pl-7 pr-4 d-flex align-center elevation-3`
        "
        style=" max-width: 180px; border-radius:1px; border: 1px solid #fff !important; background:rgba(245,245,245, 0.8) !important;"
      >
        <div
          class="body-2 font-weight-medium"
          style="line-height:1.3 !important;"
        >
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    content: {
      type: String,
      default: "Tooltip content"
    },
    label: {
      type: String,
      default: "A"
    },
    orientation: {
      type: String,
      default: "bottom-left"
    }
  },
  computed: {
    hasLabel() {
      return this.label.length > 0;
    }
  },
  mounted() {
    // console.log("mounted tooltip");
    // console.log(this.$el);
    // Reference: http://www.html5rocks.com/en/tutorials/speed/animations/
    // let last_known_scroll_position = 0;
    // let ticking = false;
    // function doSomething(scroll_pos) {
    //   console.log(scroll_pos);
    // }
    // window.addEventListener("scroll", function(e) {
    //   last_known_scroll_position = window.scrollY;
    //   if (!ticking) {
    //     window.requestAnimationFrame(function() {
    //       doSomething(last_known_scroll_position);
    //       ticking = false;
    //     });
    //     ticking = true;
    //   }
    // });
  },
  beforeDestroy() {
    // console.log("destroying tooltip");
  }
};
</script>
