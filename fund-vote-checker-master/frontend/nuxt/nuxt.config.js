import colors from "vuetify/es5/util/colors";

export default {
  mode: "universal",
  // To serve inside the network only development"
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["@assets/scss/main.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/vue-apexcharts", mode: "client" },
    { src: "~/plugins/v-tooltip" }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/scss/vuetify-variables.scss"],
    theme: {
      dark: false, // was true before
      themes: {
        light: {
          // https://vuetifyjs.com/en/customization/theme
          primary: "#004882", // galileo primary color
          background: colors.grey.lighten5, // background color for the page: a very light grey
          environmental: "#81C784", // E
          social: "#e25f68", // S
          governance: "#4a5b7e", // G
          secondary: colors.amber
          // accent: colors.pink.darken3, // all others have to be matched later
          // info: colors.teal.lighten1,
          // warning: colors.amber.base,
          // error: colors.deepOrange.accent4,
          // success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.csv$/,
        loader: "csv-loader",
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      });
    }
  }
};
