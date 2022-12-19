<template>
  <v-app>
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

    <v-container color = "black">

      <v-row color="black"></v-row>
    </v-container>

    <v-footer></v-footer>
  </v-app>
</template>

<script>

import axios from 'axios';

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
          dataString: "",
          dataList: [],
      };
  },

  mounted() {
    axios({
      method: 'get',
      url: 'https://docs.google.com/spreadsheets/d/1NFbXtCu2DqdEMWCk70BbInQkY4TAIq4d3p3W-JQJ5No/edit#gid=0',
    }) .then(function (response) {
      this.dataString = response.data.split("Sheet1")[1]
      this.dataString = this.dataString.substring(2,this.dataString.indexOf('>'))

      // TODO: instead of splitting by Stop, split by '\n'
      this.dataList = this.dataString.split("Stop")

      console.log(this.dataList)
    }.bind(this))
  }
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