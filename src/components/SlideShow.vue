<template>
  <v-carousel
    id="scrolling-techniques-4"
    cycle
    :interval="8000"
    hide-delimiter-background
    :show-arrows="false"
    height="auto"
  >
    <v-sheet 
      color="black" 
      height="100%" 
      width="100%" 
      align="center"
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
        max-width="1024"
        max-height="576"
        fade
      >
      </v-carousel-item>
    </v-sheet>
  </v-carousel>
</template>

<script>
  export default {

    name: "SlideShow",

    data() {
      return {
        slideHeight: window.innerWidth - 200,
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

    computed: {
      maxCarouselHeight() {
        const sheetHeight = this.$refs.sheet.clientHeight;
        const itemHeight = this.$refs.item.clientHeight;
        return `${(itemHeight / sheetHeight) * 100}%`;
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
        this.slideHeight = window.innerWidth - 200;
      }
    }
  }
</script>