<template>
  <v-app>
    <NavigationBar 
      :drawer="drawer"
      :items="items"
      @change-drawer="toggleDrawer"  
    />

    <v-card>
      <SlideShow/>

      <ProductArray
        :dataList="dataList"
        :quantities="quantities"
      /> 

      <v-footer style="background-color:black"></v-footer>
    </v-card>
  </v-app>
</template>

<script>

//import axios from 'axios';
import NavigationBar from './components/NavigationBar.vue'
import SlideShow from './components/SlideShow.vue'
import ProductArray from './components/ProductArray.vue'

export default {
    
  name: "HomePage",

  components: {
    NavigationBar,
    SlideShow,
    ProductArray
  },

  data() {
      return {
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

    retrieveProductData() {
      //axios({
      //  method: 'get',
      //  url: 'https://docs.google.com/spreadsheets/d/1NFbXtCu2DqdEMWCk70BbInQkY4TAIq4d3p3W-JQJ5No/edit#gid=0',
      //}) .then(function (response) {
      //  this.dataString = response.data.split("Sheet1")[1]
      //  this.dataString = this.dataString.substring(2,this.dataString.indexOf('>'))
      //
      //  this.dataList = this.dataString.split("\n")
      //  this.dataList.shift()
      //
      //  // TODO: In the current state, there is an " at the end of the last list item (on the end of the price)
      //  let i = 0
      //  let temp = []
      //  while (i < this.dataList.length) {
      //    temp = this.dataList[i].split(',')
      //    this.dataList[i] = ({"name": temp[0], "id": temp[1], "price": temp[2], "sizes": ["Small", "Medium", "Large"]})
      //    i += 1
      //  }
      //}.bind(this))
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