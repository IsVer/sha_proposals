<template>
  <v-app id="default-layout" class="vuetify-responsive-typography">
    <!-- :collapse-on-scroll="true" -->
    <!-- https://vuetifyjs.com/en/components/app-bars#app-bars -->
    <v-app-bar app color="background" clipped-left :elevate-on-scroll="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <!--  -->
      <!-- This will be a component! -->
      <!-- <InterfaceFundSearchBar /> -->
      <!-- End of component -->
      <!--  -->

      <v-spacer />
      <v-toolbar-title>
        <v-img src="/img/gga_logo_retina.png" alt="Galileo Logo" height="25" width="120" contain></v-img>
      </v-toolbar-title>
    </v-app-bar>

    <!-- The order is important here! – The drawer will not move the top bar,
    if it is defined previouly-->
    <!-- https://vuetifyjs.com/en/components/navigation-drawers#navigation-drawers -->
    <v-navigation-drawer color="background" v-model="drawer" app clipped floating>
      <!-- Navigation items in a v-list -->
      <!-- https://vuetifyjs.com/en/components/lists#lists -->
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Intoduction</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Fund vote checker</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- The v-content container provides stylings for paragraphs -->
    <!-- https://vuetifyjs.com/en/styles/content#content -->
    <v-content>
      <!-- The <nuxt />  -->
      <!-- This is where the pages are rendered -->
      <nuxt />
    </v-content>

    <!-- <v-footer color="secondary" app dark>
      <v-spacer />
      <span>&copy; 2020</span>
    </v-footer>-->
  </v-app>
</template>

<script>
import InterfaceFundSearchBar from "~/components/InterfaceFundSearchBar.vue";

export default {
  name: "default",
  components: { InterfaceFundSearchBar },
  data: () => ({
    // This controls the opening and closing of the navigation drawer
    drawer: false
  })
};
</script>