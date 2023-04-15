<template>
  <v-carousel
    id="scrolling-techniques-4"
    cycle
    :interval="8000"
    hide-delimiter-background
    :show-arrows="false"
  >
    <v-sheet color="black" height="100%" width="100%">
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="slide.src"
        class="item"
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
    }
  }
</script>

<style>
  body {
    background-color: "{{ backgroundColor }}";
    color: "{{ textColor }}";
  }

  .mainFont{
     font-family: "Norse";
     font-size: 28px;
  }

  .mainFont2{
     font-family: "Norse";
     font-size: 20px;
  }
</style>