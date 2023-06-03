<template>
  <v-container style="background-color:black" fluid>
    <v-row no-gutters justify="center">
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
          <v-card-title class="mainFont2">{{ item.product_name }} | {{ item.price }}</v-card-title>

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
                      <v-row justify="center">
                        <v-card-title class="mainFont"> 
                          {{ getItemById(dataList, windowItem).product_name }} | {{ getItemById(dataList, windowItem).price }} 
                        </v-card-title>
                      </v-row>
                      <v-row class="mb-3" justify="center">
                        <v-card-text class="mainFontDescription" align="center">
                          {{ getItemById(dataList, windowItem).description }}
                        </v-card-text>
                      </v-row>
                      <v-row justify="center">
                        <v-select
                          :items="getItemById(dataList, windowItem).sizes"
                          v-model="size"
                          label="Size"
                          solo
                          class="mainFont"
                        ></v-select>
                      </v-row>
                      <v-card class="mt-6 mb-9" color="grey-lighten-4" elevation="1">
                        <v-row justify="center" class="ma-1">
                          <v-col cols="4" align="center">
                            <v-btn
                              flat
                              color="grey-lighten-4"
                              density="compact" 
                              icon="mdi-minus" 
                              @click="changeQuantity(-1)"
                            />
                          </v-col>
                          <v-col align="center" cols="4" class="mainFont2">
                            {{ quantity }}
                          </v-col>
                          <v-col cols="4" align="center">
                            <v-btn 
                              flat
                              color="grey-lighten-4"
                              density="compact" 
                              icon="mdi-plus" 
                              @click="changeQuantity(1)"
                            />
                          </v-col>
                        </v-row>
                      </v-card>
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

    props: ['dataList','filter'],
    emits: ['update-shopping-cart'],

    data() {
      return {
        cartItem: null,
        dialog: false,
        quantity: 1,
        size: null,
        windowItem: 0,
      }
    },

    methods: {
      addToCart() {
        if (this.size != null) {
          const itemInList = this.getItemById(this.dataList, this.windowItem);
          const cartItem = {
            id: itemInList.id,
            product_name: itemInList.product_name,
            image: itemInList.image,
            price: itemInList.price,
            size: this.size,
            quantity: this.quantity
          };
          
          this.$emit('update-shopping-cart', cartItem);

          this.size = null
          this.quantity = 1
          this.dialog = false
        }
      },

      changeDialog(id) {
        this.dialog = true
        this.windowItem = id
      },

      changeQuantity(amount) {
        if (this.quantity + amount != 0) {
          this.quantity += amount
        }
      },

      getItemById(list, id) {
        return list.find(item => item.id === id);
      },

      isSizeUnavailable(event, sizes, inventory) {
        const index = sizes.indexOf(event);
        return inventory[index] === 0;
      },
    }
  }
</script>

<style scoped>
.mainFontDescription{
  font-family: "Norse";
  font-size: 20px;
}
</style>