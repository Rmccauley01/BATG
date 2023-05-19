<template>
  <v-app>
    <NavigationBar 
      :drawer="drawer"
      :items="items"
      :cartOpen="cartOpen"
      :shoppingCart="shoppingCart"
      @change-drawer="toggleDrawer"
      @open-cart="openCart"
      @update-quantity="updateQuantity"
      @delete-cart-item="deleteCartItem"
    />

    <SlideShow/>

    <ProductArray
      :dataList="dataList"
      :quantities="quantities"
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
          items: [
            { name: 'Mens' },
            { name: 'Womens' },
            { name: 'Accessories' }
          ],
          quantities: [1,2,3,4,5],
          shoppingCart: [],
      };
  },

  methods: {

    deleteCartItem(item) {
      const index = this.shoppingCart.findIndex(cartItem => {
        return Object.keys(item).every(key => cartItem[key] === item[key]);
      });

      if (index !== -1) {
        this.shoppingCart.splice(index, 1);
      }
    },

    goToPage(pageName) {
      // Logic to navigate to page
      console.log(pageName)
    },

    openCart(keepOpen) {
      if (keepOpen != true) {
        this.cartOpen = !this.cartOpen
      } else if (!this.cartOpen) {
        this.cartOpen = !this.cartOpen
      }
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

    updateQuantity(item, amount) {
      const index = this.shoppingCart.findIndex(cartItem => {
        return Object.keys(item).every(key => cartItem[key] === item[key]);
      });

      if (index !== -1) {
        this.shoppingCart[index].quantity += amount;

        if (this.shoppingCart[index].quantity == 0) {
          this.deleteCartItem(item)
        }
      }
    },

    updateShoppingCart(cartItem) {
      const index = this.shoppingCart.findIndex(item => item.product_name === cartItem.product_name && item.size === cartItem.size);
      if (index === -1) {
        // if the item doesn't exist in the cart, add it as a new item
        this.shoppingCart.push(cartItem);
      } else {
        // if the item already exists in the cart, create a new object with the updated size
        const updatedItem = { ...this.shoppingCart[index], size: cartItem.size };
        this.shoppingCart.splice(index, 1, updatedItem);
      }
      this.openCart(true);
    },
  },

  mounted() {
    this.retrieveProductData();
  }
};
</script>