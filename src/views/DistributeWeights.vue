<template>
  <div>
    <Game :type="'Weights'">
      <h2 slot="title">Boote laden</h2>
      <p slot="intro">Verteile die Gewichte auf die Boote,
         ohne dass ein Boot zu schwer beladen ist.</p>
      <p slot="description">Verteile die Gewichte auf die Boote: Klicke auf ein Gewicht und ziehe
         es an den gewünschten Platz. Klicke auf ein Gewicht, um es wieder aus dem Boot zu
         entfernen. Jedes Gewicht soll genau einmal verwendet werden. Pass auf, dass kein Boot zu
         schwer beladen wird. Jedes Boot darf maximal so viele Kilogramm aufladen, wie auf seinem
         Segel geschrieben steht. Viel Erfolg!</p>
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

export default class CheckWeights extends Vue {
  x = 'Test';
}
</script>

<style scoped></style>
