<template>
  <v-container 
    class="slideshow-wrapper" 
    fluid 
    height="auto"
    style="background-color:black"
  >
    <transition name="crossfade">
      <v-img
        :key="currentSlideIndex"
        :src="currentSlide.src"
        class="crossfade-image"
      ></v-img>
    </transition>
  </v-container>
</template>

<style>
.slideshow-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 40%;
}

.crossfade-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin:auto;
}

.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 2s;
}

.crossfade-enter,
.crossfade-leave-to {
  opacity: 0;
}
</style>

<script>
export default {
  name: "SlideShow",
  data() {
    return {
      slides: [
        {
          src: require("@/assets/slideshow_images/weights1.jpg"),
        },
        {
          src: require("@/assets/slideshow_images/manLifting1.jpg"),
        },
      ],
      currentSlideIndex: 0,
    };
  },
  computed: {
    currentSlide() {
      return this.slides[this.currentSlideIndex];
    },
  },
  mounted() {
    this.startSlideshow();
  },
  methods: {
    startSlideshow() {
      setInterval(() => {
        this.currentSlideIndex =
          (this.currentSlideIndex + 1) % this.slides.length;
      }, 5000);
    },
  },
};
</script>
