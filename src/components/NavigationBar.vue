<template>
  <v-navigation-drawer
    v-model="isDrawerOpen"
    disable-resize-watcher="true"
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

  <v-navigation-drawer
    location="right"
    v-model="cartDrawer"
    disable-resize-watcher="true"
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
              </v-row>
              <v-row no-gutters align="center">
                <v-col cols="6" align="left">
                  {{ item.size }}
                </v-col>
                <v-col cols="6" align="left">
                  <v-btn color="black" class="mainFont2" density="compact">
                    Remove Item
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-card class="mx-auto">
    <v-app-bar 
      color="black" 
      scroll-target="#scrolling-techniques-4"
      scroll-behavior="elevate"
    >

      <v-app-bar-nav-icon @click="$emit('change-drawer')"></v-app-bar-nav-icon>

      <v-img
        :src="require('@/assets/batg_logo1.png')"
        class="my-3"
        height="200"
        max-width="140"
      />

      <v-spacer></v-spacer>

      <v-card color="black" v-if="!isMobile">
        <v-btn v-for="item in items" :key="item.name" class="mainFont">
          {{item.name}}
        </v-btn>
      </v-card>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn @click="$emit('open-cart');" icon >
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
    </v-app-bar>
  </v-card>
</template>

<script>
  export default{

    name: "NavigationBar",

    props: ['drawer','items','cartOpen','shoppingCart'],
    emits: ['change-drawer'],

    data() {
      return {
        isDrawerOpen: this.drawer,
        isMobile: window.innerWidth <= 1000,
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

    watch: {
      drawer(newVal) {
        this.isDrawerOpen = newVal
      }
    },

    mounted() {
      window.addEventListener("resize", this.handleResize);
    },

    unmounted() {
      window.removeEventListener("resize", this.handleResize);
    },

    methods: {
      handleResize() {
        this.screenWidth = window.innerWidth;
        this.isMobile = window.innerWidth <= 1000;
      }
    }
  }
</script>

<style>

.mainFont{
  font-size: 30px;
}

</style>