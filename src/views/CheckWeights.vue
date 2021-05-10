<template>
  <div>
    <Game :type="'WeightCheck'">
      <h2 slot="title">Ladungen überprüfen</h2>
      <p slot="intro">-</p>
      <p slot="description" style="font-size: 1.7em">Überprüfe, ob alle Gewichte (<img
        :src="require('@/assets/weights/size6.png')" style="height: 1em"/>)
         korrekt verteilt wurden. Pass auf, dass
         kein Boot zu schwer beladen wird. Jedes Boot darf maximal so viele Kilogramm aufladen,
         wie auf seinem Segel geschrieben steht. Beantworte dann die untenstehenden Fragen,
         indem du auf Richtig oder Falsch klickst. Viel Erfolg!</p>
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

export default class CheckWeights extends Vue {}
</script>

<style scoped></style>
