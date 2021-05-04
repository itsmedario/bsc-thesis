<template>
  <div>
    <Game :type="'Weights'">
      <h2 slot="title">Ladungen überprüfen</h2>
      <p slot="intro">Überprüfe, ob alle Gewichte korrekt verteilt wurden</p>
      <p slot="description">Überprüfe, ob alle Gewichte korrekt verteilt wurden. Pass auf, dass
         kein Boot zu schwer beladen wird. Jedes Boot darf maximal so viele Kilogramm aufladen,
         wie auf seinem Segel geschrieben steht. Zur Überprüfung kannst du die Gewichte so auf die
          Boote verteilen, wie es vorgeschlagen wurde. Viel Erfolg!</p>
      <video loop controls muted slot="video">
        <source :src="require('@/assets/tutorials/distribute-weights.mp4')" />
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

export default class DistributeWeights extends Vue {}
</script>

<style scoped></style>
