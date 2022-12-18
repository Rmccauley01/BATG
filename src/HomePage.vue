<template>
  <v-app>
    <v-content>
      <v-app-bar color = "black">

        <v-img
          :src="require('../src/assets/batg_logo1.png')"
          class="my-3"
          height="200"
          max-width="140"
        />

        <v-spacer></v-spacer>

        <v-btn class="mainFont">
          Mens
        </v-btn>

        <v-btn class="mainFont">
          Womens
        </v-btn>

        <v-btn class="mainFont">
          Accessories
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </v-app-bar>

      <v-carousel 
        cycle
        height="400"
        hide-delimiter-background
        :show-arrows="false"
      >
        <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
        >
          <v-sheet
            :color="colors[i]"
            height="100%"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <div class="mainFont">
                {{ slide }} Slide
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

      <v-footer></v-footer>

    </v-content>
  </v-app>
</template>

<script>
export default {
    
    name: "HomePage",

    data() {
        return {
            colors: [
              'black',
              'black',
            ],
            slides: [
              'First',
              'Second',
            ],
        };
    },
};
</script>

<style>
  body {
    background-color: "{{ backgroundColor }}";
    color: "{{ textColor }}";
  }

  .mainFont{
     font-family: "Norse";
     font-size: 28px;
  }
</style>