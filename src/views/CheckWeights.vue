<template>
  <div>
    <Game
     :type="'WeightCheck'"
     :level="1"
     :language="language"
    >
      <p class="title" slot="title">
        {{ text.tasks.checkWeights.title }}
      </p>
      <p slot="intro"></p>
      <p slot="description">
        {{ text.tasks.checkWeights.description }}
      </p>
      <video loop controls muted slot="video">
        <source :src="require('@/assets/tutorials/check-weights.mp4')" />
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

export default class CheckWeights extends Vue {
  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);
}
</script>

<style scoped></style>
