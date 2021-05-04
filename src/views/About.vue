<template>
  <div class="about">
    <h1>Über diese Plattform</h1>
    <p> Diese Lernumgebung wurde im Zusammenhang mit dem Buch "einfach Informatik 3/4" erstellt.
    <br/>
    Feedback ist sehr erwünscht:
    <a href="mailto:dnaepfer@student.ethz.ch?subject=Feedback zur Lernumgebung">
      dario@naepfer.ch</a>
    </p>
    <h3>Autor: Dario Naepfer</h3>
    <br/>
    <img :src="require('@/assets/transport/beaver_transport.png')" style="width: 40%"/>
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
export default class About extends Vue {}
</script>

<style scoped>

hr {
  margin: 2em;
}

</style>
