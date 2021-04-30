<template>
  <div class="about">
    <h1>Page not found! Error 404</h1>
    <p>Feedback is warmly welcomed:
    <a href="mailto:dario@naepfer.ch?subject=Feedback for online learning platform">
      dario@naepfer.ch</a>
    </p>
    <img :src="require('@/assets/transport/load_boat.png')"/>
    <hr/>
    <Footer/>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class PageNotFound extends Vue {}
</script>

<style scoped>

hr {
  margin: 2em;
}

</style>
