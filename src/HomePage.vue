<template>
  <v-app style="background-color:black">
    <NavigationBar 
      :drawer="drawer"
      :items="items"
      :cartOpen="cartOpen"
      :shoppingCart="shoppingCart"
      @change-drawer="toggleDrawer"
      @open-cart="openCart"
      @update-quantity="updateQuantity"
      @delete-cart-item="deleteCartItem"
      @show-form-dialog="showFormDialog"
      @update-filter="updateFilter"
    />

    <SlideShow/>

    <ProductArray
      :dataList="dataList"
      :quantities="quantities"
      @update-shopping-cart="updateShoppingCart"
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
          <!-- Your form content here -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="submitForm">Submit</v-btn>
          <v-btn @click="closeFormDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
          formDialogVisible: false,
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
      console.log("You're shopping for ", type, " clothing.")
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