<template>
  <div class="about responsive">
    <p class="title">Seite nicht gefunden! Error 404</p>
    <p  style="font-size: 1.5em">Diese Seite wird bald verfügbar sein. <br>
      Feedback hinterlassen:
    <a href="mailto:dnaepfer@student.ethz.ch?subject=Feedback zur Lernumgebung">
      dnaepfer@student.ethz.ch</a>
    </p>
    <img :src="require('@/assets/transport/load_boat.png')" draggable="false"/>
    <hr style="height:1px; border-width:0; color:black; background-color:black">
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
