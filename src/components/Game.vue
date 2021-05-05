<template>
  <div id="Game">
    <Tutorial :show-modal=showTutorial @close-tutorial="showTutorial = false">
      <slot name="description" slot="description"/>
      <slot name="video" slot="video"/>
    </Tutorial>

    <Verifier :showSolution=showSolution :correctSolution="correctSolution"
     :tip="tip"
     @close-verifier="showSolution = false">
    </Verifier>

    <Buttons @next-task="$refs.gameComp.nextTask()"
     @restart="$refs.gameComp.restart()"
     @check-solution="$refs.gameComp.checkSolution(); showSolution = true"
     @show-tutorial="showTutorial = true"/>

    <div class="flex-center flex-row">
      <slot name="title">Unintentionally empty title!</slot>
      <slot name="intro">Unintentionally empty description!</slot>
    </div>

    <component
      :is="this.type" ref="gameComp"
      @correct-solution="correctSolution = true"
      @false-solution="correctSolution = false"
    />

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Tutorial from '@/components/Tutorial.vue';
import Verifier from '@/components/Verifier.vue';
import Buttons from '@/components/Buttons.vue';
import Towers from '@/components/towers/Towers.vue';
import Bridges from '@/components/bridges/Bridges.vue';
import Weights from '@/components/weights/Weights.vue';
import Weights2 from '@/components/weights/Weights2.vue';

@Component({
  components: {
    Tutorial,
    Verifier,
    Buttons,
    Towers,
    Bridges,
    Weights,
    Weights2,
  },
})
export default class Game extends Vue {
  @Prop({ required: true })
  type!: string;

  showTutorial = false;

  correctSolution = false;

  showSolution = false;

  tip = 'Guter Versuch! Probiere es noch einmal!';

  get currentGameComponent(): string {
    return this.type;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#Game{
  margin-left: 0%;
}
</style>
