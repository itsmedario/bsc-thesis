<template>
  <div>
    <Game :type="'Weights'">
      <h2 slot="title">Ladungen überprüfen</h2>
      <p slot="description">Überprüfe, ob alle Gewichte korrekt verteilt wurden</p>
      <p>Text als Test</p>
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

export default class DistributeWeights extends Vue {}
</script>

<style scoped></style>
