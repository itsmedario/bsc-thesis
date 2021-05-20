<template>
  <div>
    <Game  :type="'Bridges'">
      <p class="title" slot="title">Brücken bauen</p>
      <p slot="intro">Baue so viele Brücken, dass man von jedem
         Landteil zu jedem anderen Landteil kommt.</p>
      <p slot="description">Baue so viele Brücken, dass man von jedem
         Landteil zu jedem anderen Landteil kommt.</p>
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
