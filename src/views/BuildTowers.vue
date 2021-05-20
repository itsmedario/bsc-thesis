<template>
  <div>
    <Game :type="'Towers'" :level="1">
      <p class="title" slot="title">Türme bauen</p>
      <p slot="intro">Setze die Türme so, dass man mit
         den Türmen alle Kanäle überwachen kann.</p>
      <p slot="description">Setze die Türme so, dass man mit
         den Türmen alle Kanäle überwachen kann.</p>
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

export default class BuildBridges extends Vue {}
</script>

<style scoped></style>
