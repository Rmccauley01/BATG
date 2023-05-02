<template>
  <v-app>
    <NavigationBar 
      :drawer="drawer"
      :items="items"
      :cartOpen="cartOpen"
      :shoppingCart="shoppingCart"
      @change-drawer="toggleDrawer"
      @open-cart="openCart"
    />

    <SlideShow/>

    <ProductArray
      :dataList="dataList"
      :quantities="quantities"
      :shoppingCart="shoppingCart"
      @update-shopping-cart="updateShoppingCart"
    /> 

    <v-footer style="background-color:black"></v-footer>
  </v-app>
</template>

<script>

//import axios from 'axios';
import NavigationBar from './components/NavigationBar.vue'
import SlideShow from './components/SlideShow.vue'
import ProductArray from './components/ProductArray.vue'

import db from '@/fb'
import { getDocs, collection } from "firebase/firestore"

export default {
    
  name: "HomePage",

  components: {
    NavigationBar,
    SlideShow,
    ProductArray
  },

  data() {
      return {
          cartOpen: false,
          colRef: null,
          dataString: "",
          dataList: [],
          drawer: false,
          group: null,
          items: [
            { name: 'Mens' },
            { name: 'Womens' },
            { name: 'Accessories' }
          ],
          quantities: [1,2,3,4,5],
          shoppingCart: [],
      };
  },

  watch: {
    group () {
      this.drawer = false
    },
  },

  methods: {

    goToPage(pageName) {
      // Logic to navigate to page
      console.log(pageName)
    },

    openCart() {
      this.cartOpen = !this.cartOpen
    },

    retrieveProductData() {

      this.colRef = collection(db, 'products')

      getDocs(this.colRef)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.dataList.push({ ...doc.data(), id: doc.id })
          })
        })
        .catch( err => {
          console.log(err.message)
        })
    },

    toggleDrawer() {
      this.drawer = !this.drawer;
    },

    updateShoppingCart(cartItem) {
      this.shoppingCart.push(cartItem)
      this.openCart()
    },
  },

  mounted() {
    this.retrieveProductData();
  }
};
</script>