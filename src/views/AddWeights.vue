<template>
  <div>
    <Game
     :type="'Weights'"
     :level="2"
     :language="language"
    >
      <p class="title" slot="title">
        {{ text.tasks.addWeights.title }}
      </p>
      <p class="card description" slot="intro">
        {{ text.tasks.addWeights.intro }}
      </p>
      <p slot="description" style="font-size: 1.7em">
        {{ text.tasks.addWeights.description }}
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

export default class AddWeights extends Vue {
  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);
}
</script>

<style scoped></style>
