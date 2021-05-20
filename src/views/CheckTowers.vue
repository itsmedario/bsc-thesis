<template>
  <div>
    <Game :type="'TowerCheck'" :level="1">
      <p class="title" slot="title">Türme überprüfen</p>
      <p slot="intro">Überprüfe, ob man mit den
         Türmen alle Kanäle überwachen kann.</p>
      <p slot="description">Überprüfe, ob man mit den
      Türmen alle Kanäle überwachen kann.</p>
      <video loop controls muted slot="video">
        <source :src="require('@/assets/tutorials/add-weights.mp4')" />
        Your browser does not support the video tag.
      </video>
    </Game>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Game from '../components/Game.vue';

@Component({
  components: {
    Game,
  },
})

export default class CheckBridges extends Vue {}
</script>

<style scoped></style>
