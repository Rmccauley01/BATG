<template>
  <v-app style="background-color:black">
    <NavigationBar 
      :cartOpen="cartOpen"
      :shoppingCart="shoppingCart"
      @change-drawer="toggleDrawer"
      @delete-cart-item="deleteCartItem"
      @open-cart="openCart"
      @show-form-dialog="showFormDialog"
      @update-filter="updateFilter"
      @update-quantity="updateQuantity"
    />

    <SlideShow/>

    <ProductArray
      :dataList="dataList"
      :filter="filter"
      @update-shopping-cart="updateShoppingCart"
      @update-filter="updateFilter"
    />

    <v-dialog 
      v-model="formDialogVisible" 
      fullscreen 
      hide-overlay
      >
      <v-card color="black">
        <v-card-title>
          <span class="headline">Form Title</span>
        </v-card-title>
        <v-card-text>
          <PayPal/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="submitForm">Submit</v-btn>
          <v-btn @click="closeFormDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <FooterBar/>
  </v-app>
</template>

<script>

//import axios from 'axios';
import PayPal from './components/PayPal.vue'
import FooterBar from './components/FooterBar.vue'
import NavigationBar from './components/NavigationBar.vue'
import SlideShow from './components/SlideShow.vue'
import ProductArray from './components/ProductArray.vue'

import db from '@/fb'
import { getDocs, collection } from "firebase/firestore"

export default {
    
  name: "HomePage",

  components: {
    PayPal,
    FooterBar,
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
          filter: "None",
          formDialogVisible: false,
          shoppingCart: [],
      };
  },

  methods: {

    closeFormDialog() {
      this.formDialogVisible = false;
    },

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
          console.log(this.dataList)
        })
        .catch( err => {
          console.log(err.message)
        })
    },

    showFormDialog() {
      this.formDialogVisible = true;
    },

    submitForm() {
      // Handle form submission logic
      // You can access form data using Vue data properties
      // and perform any necessary actions
      this.closeFormDialog();
    },

    toggleDrawer() {
      this.drawer = !this.drawer;
    },

    updateFilter(type) {
      this.filter = type
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