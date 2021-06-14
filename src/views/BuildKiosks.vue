<template>
  <div>
    <Game
     :type="'Kiosks'"
     :level="2"
     :language="language"
    >
      <p class="title" slot="title">{{ text.tasks.buildKiosks.title }}</p>
      <p class="card description" slot="intro">{{ text.tasks.buildKiosks.intro }}</p>
      <p slot="description">{{ text.tasks.buildKiosks.description }}</p>
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

export default class BuildKiosks extends Vue {
  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);
}
</script>

<style scoped></style>
