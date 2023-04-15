<template>
  <v-app>
    <NavigationBar 
      :drawer="drawer"
      :items="items"
      @change-drawer="toggleDrawer"  
    />

    <v-card>
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
                      v-on:click="changeDialog(item.id)"
                    >
                      Shop
                    </v-btn>
                  </template>

                  <v-card>
                    <v-container>
                      <v-row justify="center">
                        <v-col cols="6">
                          <v-img 
                            :src="require('../src/assets/product_images/Product_Image_1.jpg')" 
                            height="300px"
                            width="400px"
                            class="mx-auto"
                          />
                        </v-col>
                        <v-col class="mx-2" cols="6">
                          <v-row class="mb-3" justify="center">
                            <v-card-title class="mainFont"> {{dataList[windowItem-1].name}} | {{dataList[windowItem-1].price}} </v-card-title>
                          </v-row>
                          <v-row justify="center">
                            <v-select
                              :items="dataList[windowItem-1].sizes"
                              v-model="size"
                              label="Size"
                              solo
                              class="mainFont"
                            ></v-select>
                          </v-row>
                          <v-row justify="center">
                            <v-select
                              :items="quantities"
                              v-model="quantity"
                              label="Qty"
                              solo
                              class="mainFont"
                            ></v-select>
                          </v-row>
                          <v-row justify="center">
                            <v-btn
                              class="mainFont mb-3"
                              color="black"
                              v-on:click="addToCart()"
                            >
                              Add to Cart
                            </v-btn>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-container>
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
import NavigationBar from './components/NavigationBar.vue'

export default {
    
  name: "HomePage",

  components: {
    NavigationBar
  },

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
          quantities: [1,2,3,4,5],
          quantity: 1,
          size: null,
          slides: [
            'First',
            'Second',
          ],
          windowItem: 0,
      };
  },

  watch: {
    group () {
      this.drawer = false
    },
  },

  methods: {
    addToCart() {
      if (this.size != null) {
        console.log(this.quantity, this.size)
        this.size = null
        this.quantity = 1
        this.dialog = false
      }
    },

    changeDialog(id) {
      this.dialog = true
      this.windowItem = id
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
          this.dataList[i] = ({"name": temp[0], "id": temp[1], "price": temp[2], "sizes": ["Small", "Medium", "Large"]})
          i += 1
        }
      }.bind(this))
    },

    toggleDrawer() {
      this.drawer = !this.drawer;
    },
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