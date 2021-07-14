<template>
  <div>
    <Game
     :type="'Weights'"
     :level="3"
     :language="language"
    >
      <p class="title" slot="title">
        {{ text.tasks.optimizeWeights.title }}
      </p>
      <p class="card description" slot="intro">
        {{ text.tasks.optimizeWeights.intro }}
      </p>
      <p slot="description" style="font-size: 1.7em">
        {{ text.tasks.optimizeWeights.description }}
      </p>
      <video loop controls muted slot="video">
        <source :src="require('@/assets/tutorials/optimize-weights.mp4')" />
        Your browser does not support the video tag.
      </video>
    </Game>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Game from '../components/Game.vue';

@Component({
  components: {
    Game,
  },
})

export default class OptimizeWeights extends Vue {
  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);
}
</script>

<style scoped></style>
