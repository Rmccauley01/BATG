<template>
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
              :src="require('@/assets/product_images/Product_Image_1.jpg')" 
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
                        :src="require('@/assets/product_images/Product_Image_1.jpg')" 
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
</template>

<script>
  export default{

    name: "ProductArray",

    props: ['dataList','quantities'],

    data() {
      return {
        dialog: false,
        quantity: 1,
        size: null,
        windowItem: 0,
      }
    },

    watch: {
    },

    mounted() {
    },

    unmounted() {
    },

    methods: {
      addToCart() {
        if (this.size != null) {
          console.log(this.windowItem, this.quantity, this.size)
          this.size = null
          this.quantity = 1
          this.dialog = false
        }
      },

      changeDialog(id) {
        this.dialog = true
        this.windowItem = id
      },
    }
  }
</script>