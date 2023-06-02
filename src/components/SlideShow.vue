<template>
  <v-container
    fluid
    height="auto"
    align="center"
    style="background-color:black"
  >
    <v-img
      :src="require('@/assets/slideshow_images/weights1.jpg')"
      max-width="1024"
      max-height="576"
    >
    </v-img>
  </v-container>
</template>

<script>

  export default {

    name: "SlideShow",

    data() {
      return {
        slides: [
          {
            src: require('@/assets/slideshow_images/weights1.jpg')
          },
          {
            src: require('@/assets/slideshow_images/manLifting1.jpg')
          },
        ],
      }
    },
  }
</script>