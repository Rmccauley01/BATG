<template>
  <v-navigation-drawer
    v-model="drawer"
    v-bind:disable-resize-watcher="true"
    bottom
    color="black"
  >
    <v-list
      nav
      dense
    >
      <v-list-item 
        v-for="item in items"
        :key="item.name"
      >
        <v-btn
          @click="drawer=!drawer; $emit('update-filter', item.name);" 
          class="mainFont" 
          color="black"
        >
          {{item.name}}
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer
    location="right"
    v-model="cartDrawer"
    v-bind:disable-resize-watcher="true"
    color="black"
  >
    <v-list>
      <v-list-item-title class="mainFont my-3">
        Shopping Cart
        <v-btn 
          color="black" 
          icon="mdi-close" 
          @click="$emit('open-cart');"
        ></v-btn>
      </v-list-item-title>
      <v-list-item v-if="notEmpty" class="mainFont2 my-3">
        Cart is Empty
      </v-list-item>
      <v-list-item v-for="item in shoppingCart" :key="item.id">
        <v-row align="center">
          <v-col cols="4">
            <v-img
              :src="require('@/assets/product_images/Product_Image_1.jpg')"
            />
          </v-col>

          <v-col>
            <v-card color="black" class="mainFont3">
              <v-row no-gutters align="center">
                <v-col cols="12" align="left" class="mainFont2">
                  {{ item.product_name }}
                </v-col>
              </v-row>
              <v-row no-gutters align="center">
                <v-col cols="6" align="left">
                  {{ item.price }}
                </v-col>
                <v-col cols="6" align="left">
                  <v-card>
                    <v-row no-gutters align="center">
                      <v-col cols="4">
                        <v-btn 
                          flat 
                          density="compact" 
                          icon="mdi-minus" 
                          @click="changeQuantity(item, -1)"
                        />
                      </v-col>
                      <v-col align="center" cols="4">
                        {{ item.quantity }}
                      </v-col>
                      <v-col cols="4">
                        <v-btn 
                          flat 
                          density="compact" 
                          icon="mdi-plus" 
                          @click="changeQuantity(item, 1)"
                        />
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
              <v-row no-gutters align="center">
                <v-col cols="6" align="left">
                  {{ item.size }}
                </v-col>
                <v-col cols="6" align="left">
                  <v-btn 
                    color="black" 
                    class="mainFont2" 
                    density="compact"
                    @click="deleteCartItem(item)"
                  >
                    Remove Item
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
    <v-btn @click="$emit('show-form-dialog');" v-if="!notEmpty" class="mainFont my-12 button" color="black">Checkout</v-btn>
  </v-navigation-drawer>

<v-app-bar 
    color="black" 
    scroll-target="#scrolling-techniques-4"
    scroll-behavior="elevate"
    dense
  >

    <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

    <v-img
      :src="require('@/assets/batg_logo1.png')"
      class="mt-1"
      height="200"
      max-width="140"
    />

    <v-spacer></v-spacer>

    <v-card color="black" class="hidden-sm-and-down">
      <v-btn
        @click="$emit('update-filter', item.name);"
        v-for="item in items" 
        :key="item.name" 
        class="mainFont"
      >
        {{item.name}}
      </v-btn>
    </v-card>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn @click="$emit('open-cart');" icon v-if="!cartDrawer">
      <v-icon>mdi-cart-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
  export default{

    name: "NavigationBar",

    props: ['cartOpen','shoppingCart'],
    emits: ['change-drawer', 'open-cart', 'update-quantity', 'delete-cart-item', 'show-form-dialog', 'update-filter'],

    data() {
      return {
        drawer: false,
        isMobile: window.innerWidth <= 1000,
        items: [
          { name: 'Mens' },
          { name: 'Womens' },
          { name: 'Accessories' }
        ],
        screenWidth: window.innerWidth,
      }
    },

    computed: {
      cartDrawer: {
        get() {
          return this.cartOpen;
        },
        set(value) {
          this.$emit('update:cartOpen', value);
        }
      },

      notEmpty() {
        return this.shoppingCart.length == 0;
      },
    },

    methods: {

      changeQuantity(item, amount) {
        this.$emit('update-quantity', item, amount)
      },

      checkout() {
        console.log("Checkout!!!")
      },

      deleteCartItem(item) {
        this.$emit('delete-cart-item', item)
      },
    }
  }
</script>

<style>

.button{
  outline: solid;
  outline-color: white;
  outline-width: thin;
}

.mainFont{
  font-size: 30px;
}

</style>