<template>
  <div class="about">
    <p class="title">Über diese Plattform</p>
    <p style="font-size: 1.3em">
      Diese Lernumgebung wurde im Zusammenhang mit dem Buch "einfach Informatik 3/4" erstellt.
      <br>
      Feedback ist sehr erwünscht:
      <a href="mailto:dnaepfer@student.ethz.ch?subject=Feedback zur Lernumgebung">
        dnaepfer@student.ethz.ch</a>
    </p>
    <br>
    <img :src="require('@/assets/transport/beaver_transport.png')" style="width: 40%"
     draggable="false"/>
    <p>Autor: Dario Naepfer
      <hr style="height:1px; border-width:0; color:black; background-color:black; width: 10%;
       margin: 0.5em auto">
      Version 2.0 -- Updates: Neues Gesamt-Design, fixiertes Buttonmenü,
       Tutorial-Layout überarbeitet.<br>
       Version 2.1 -- Neu: Schwierigkeitsstufen für Ladungen überprüfen.
    <p>
    <hr style="height:1px; border-width:0; color:black; background-color:black">
    <Footer/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';

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
