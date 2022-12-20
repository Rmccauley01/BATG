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

    <v-container>
      <v-row no-gutters>
        <v-col
          v-for="item in dataList"
          :key="item.id"
          cols="1"
          lg="2"
          md="3"
          sm="4"
        >
          <v-card class="ma-3">
            <v-img 
              :src="require('../src/assets/product_images/Product_Image_1.jpg')" 
              height="150px"
              width="200px"
              position="center"
            />
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-subtitle>{{ item.price }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
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

      this.dataList = this.dataString.split("\n")
      this.dataList.shift()

      // TODO: In the current state, there is an " at the end of the last list item (on the end of the price)
      let i = 0
      let temp = []
      while (i < this.dataList.length) {
        temp = this.dataList[i].split(',')
        this.dataList[i] = ({"name": temp[0], "id": temp[1], "price": temp[2]})
        i += 1
      }

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