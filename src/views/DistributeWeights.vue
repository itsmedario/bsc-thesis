<template>
  <div>
    <Game :type="'Weights'" :level="1">
      <p class="title" slot="title">Boote beladen</p>
      <p slot="intro">Verteile alle Gewichte auf die drei Boote so,
         dass kein Boot zu schwer beladen ist.</p>
      <p slot="description" style="font-size: 1.5em">Verteile die Gewichte (<img
        :src="require('@/assets/weights/size1.png')" style="height: 1em"/>)
         auf die Boote: Klicke auf ein Gewicht und ziehe
         es an den gewünschten Platz. Klicke auf ein Gewicht, um es wieder aus dem Boot zu
         entfernen. Jedes Gewicht soll genau einmal verwendet werden. Pass auf, dass kein Boot zu
         schwer beladen wird. Jedes Boot darf <ins>höchstens</ins> so viele Kilogramm aufladen, wie
         auf seinem Segel geschrieben steht. Viel Erfolg!</p>
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

export default class DistributeWeights extends Vue {}
</script>

<style scoped></style>
