<template>
  <v-footer style="background-color:black">
    <v-row>
      <v-col cols="3">
        <v-container fluid>
          <v-card color="black">
            <v-card-title class="mainFont">
              Footer Menu
            </v-card-title>
            <v-card-subtitle 
              v-for="(link, i) in links" 
              :key="i" 
              class="mainFontDescription my-3"
            >
              {{ link.name }}
            </v-card-subtitle>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols="6">
        <v-container fluid>
          <v-card color="black">
            <v-card-title class="mainFont">
              Newsletter
            </v-card-title>
            <v-card-subtitle class="mainFontDescription mt-1">
              Join our newsletter for 10% of ALL purchases.
            </v-card-subtitle>
            <v-text-field class="mainFont mt-6">
              Email
            </v-text-field>
            <v-btn color="black" class="mainFont">
              Submit
            </v-btn>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols="3">
        <v-container fluid>
          <v-card color="black">
            <v-card-title class="mainFont">
              Social Media
            </v-card-title>
            <v-btn icon color="black" class="ma-1">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon color="black" class="ma-1">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default{
  name: "FooterBar",

  props: [],
  emits: [],

  data() {
    return {
      links: [
        {name: "About Us",},
        {name: "Contact Us",},
        {name: "Become an Affiliate",},
        {name: "Returns",},
      ]
    }
  }
}
</script>

<style scoped>
.mainFontDescription{
  font-family: "Norse";
  font-size: 20px;
}
</style>