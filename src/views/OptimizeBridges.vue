<template>
  <div>
    <Game
     :type="'Bridges'"
     :language="language"
     :level="4"
    >
      <p class="title" slot="title">
        {{ text.tasks.optimizeBridges.title }}
      </p>
      <p class="card description" slot="intro">
        {{ text.tasks.optimizeBridges.intro }}
      </p>
      <p slot="description">
        {{ text.tasks.optimizeBridges.description }}
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
import { Component, Prop } from 'vue-property-decorator';
import Game from '../components/Game.vue';

@Component({
  components: {
    Game,
  },
})

export default class OptimizeBridges extends Vue {
  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);
}
</script>

<style scoped></style>
