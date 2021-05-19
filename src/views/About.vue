<template>
  <div class="about">
    <p class="title">Über diese Plattform</p>
    <p style="font-size: 1.5em">
      Diese Lernumgebung wurde im Zusammenhang mit dem Buch "einfach Informatik 3/4" erstellt.
    <br/>
    Feedback ist sehr erwünscht:
    <a href="mailto:dnaepfer@student.ethz.ch?subject=Feedback zur Lernumgebung">
      dnaepfer@student.ethz.ch</a>
    </p>
    <br/>
    <img :src="require('@/assets/transport/beaver_transport.png')" style="width: 40%"
     draggable="false"/>
    <p>Autor: Dario Naepfer</p>
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
export default class About extends Vue {}
</script>

<style scoped>

hr {
  margin: 2em;
}

</style>
