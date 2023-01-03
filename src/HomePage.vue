<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      bottom
      color="black"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item 
            v-for="item in items"
            :key="item.name"
          >
            <v-btn class="mainFont" color="black">
              {{item.name}}
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-card class="mx-auto">
      <v-app-bar 
        color="black" 
        hide-on-scroll 
        scroll-target="#scrolling-techniques-4"
      >

        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

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
        id="scrolling-techniques-4"
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
              no-gutters
            >
              <div class="mainFont">
                {{ slide }} Slide
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

      <v-container style="background-color:black" fluid>
        <v-row no-gutters>
          <v-col
            v-for="item in dataList"
            :key="item.id"
            cols="6"
            lg="2"
            md="3"
            sm="4"
          >
            <v-card class="ma-3" max-width="200">
              <v-responsive>
                <v-img 
                  :src="require('../src/assets/product_images/Product_Image_1.jpg')" 
                  height="150px"
                  width="200px"
                  class="mx-auto"
                />
              </v-responsive>
              <v-card-title class="mainFont2">{{ item.name }} | {{ item.price }}</v-card-title>

              <div class="text-center">
                <v-dialog
                  v-model="dialog"
                  width="500"
                >
                  <template v-slot:activator="{ attrs }">
                    <v-btn
                      class="mainFont mb-3" 
                      color="black" 
                      flat
                      v-bind="attrs"
                      v-on:click="changeDialog"
                    >
                      Shop
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Privacy Policy
                    </v-card-title>
                  </v-card>
                </v-dialog>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container> 

      <v-footer style="background-color:black"></v-footer>
    </v-card>
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
          dataString: "",
          dataList: [],
          dialog: false,
          drawer: false,
          group: null,
          items: [
            { name: 'Mens' },
            { name: 'Womens' },
            { name: 'Accessories' }
          ],
          slides: [
            'First',
            'Second',
          ],
      };
  },

  watch: {
    group () {
      this.drawer = false
    },
  },

  methods: {
    changeDialog() {
      this.dialog = true
    },

    goToPage(pageName) {
      // Logic to navigate to page
      console.log(pageName)
    },

    retrieveProductData() {
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
      }.bind(this))
    }
  },

  mounted() {
    this.retrieveProductData();
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

  .mainFont2{
     font-family: "Norse";
     font-size: 20px;
  }
</style>