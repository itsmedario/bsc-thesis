<template>
  <div>
    <Game
     :type="'Towers'"
     :level="1"
     :language="language"
    >
      <p class="title" slot="title">{{ text.tasks.buildTowers.title }}</p>
      <p slot="intro">{{ text.tasks.buildTowers.intro }}</p>
      <p slot="description">{{ text.tasks.buildTowers.description }}</p>
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

export default class BuildBridges extends Vue {
  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);
}
</script>

<style scoped></style>
