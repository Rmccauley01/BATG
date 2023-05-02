<template>
  <v-navigation-drawer
    location="right"
    v-model="drawer"
    disable-resize-watcher="true"
    color="black"
  >
    <v-list>
      <v-list-item-title class="mainFont">
        Shopping Cart
      </v-list-item-title>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default{

    name: "ShoppingCart",

    props: ['cartOpen'],

    data() {
      return {
      }
    },

    computed: {
      drawer: {
        get() {
          return this.cartOpen;
        },
        set(value) {
          this.$emit('update:cartOpen', value);
        }
      }
    },

    watch: {
    },
  }
</script>