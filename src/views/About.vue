<template>
  <div class="about">
    <h1>About this platform</h1>
    <p> This Platform was created in accordance with the ABZ textbook "einfach Informatik 3/4".
    <br/>
    Feedback is warmly welcomed:
    <a href="mailto:dario@naepfer.ch?subject=Feedback for online learning platform">
      dario@naepfer.ch</a>
    </p>
    <h3>Author: Dario Naepfer</h3>
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
