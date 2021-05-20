<template>
  <div>
    <Game :type="'Weights'" :level="3">
      <p class="title" slot="title">Boote maximal beladen</p>
      <p slot="intro">Verteile alle Gewichte auf <ins>möglichst wenig</ins> Boote.
       Jedes Boot soll <ins>genau</ins> so schwer beladen sein,
        wie auf seinem Segel geschrieben steht.
      <br>-<br>
       Tipp: Berechne zuerst die Summe aller Gewichte.</p>
      <p slot="description" style="font-size: 1.7em">Verteile alle Gewichte (<img
      :src="require('@/assets/weights/size6.png')" style="height: 1em"/>)
       auf so wenig Boote wie möglich: Klicke auf ein Gewicht und ziehe es an den gewünschten Platz.
       Klicke auf
       ein Gewicht, um es wieder aus dem Boot zu entfernen. Jedes Gewicht soll genau einmal
       verwendet werden. Jedes Boot soll
       <ins>genau</ins> so viele Kilogramm aufladen, wie auf seinem Segel geschrieben steht. Wenn es
         mehrere Lösungen gibt, wähle die Boote mit weniger Gewicht auf dem Segel. Viel Erfolg!
      </p>
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

export default class OptimizeWeights extends Vue {}
</script>

<style scoped></style>
