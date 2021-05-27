<template>
  <div id="Game">
    <Tutorial
     :show-modal=showTutorial
     @close-tutorial="showTutorial = false">
      <slot name="description" slot="description"/>
      <slot name="video" slot="video"
      />
    </Tutorial>

    <Verifier
     :showSolution=showSolution
     :correctSolution="correctSolution"
     :tip="tip"
     @close-verifier="showSolution = false"
     />

    <Buttons
     :levels="type==='WeightCheck'"
     @next-task="$refs.gameComp.nextTask()"
     @restart="$refs.gameComp.restart()"
     @check-solution="$refs.gameComp.checkSolution(level); showSolution = true"
     @show-tutorial="showTutorial = true"
     @switch-difficulty="$refs.gameComp.switchDifficulty()"
     />

    <div class="flex-center flex-row">
      <slot name="title">Unintentionally empty title!</slot>
      <slot name="intro">Unintentionally empty description!</slot>
    </div>

    <component
      :is="this.type" :level="level" ref="gameComp"
      @correct-solution="correctSolution = true"
      @false-solution="showTip"
    />

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Tutorial from '@/components/tools/Tutorial.vue';
import Verifier from '@/components/tools/Verifier.vue';
import Buttons from '@/components/tools/Buttons.vue';
import Towers from '@/components/towers/Towers.vue';
import Bridges from '@/components/bridges/Bridges.vue';
import Weights from '@/components/weights/Weights.vue';
import WeightCheck from '@/components/weights/WeightCheck.vue';

@Component({
  components: {
    Tutorial,
    Verifier,
    Buttons,
    Towers,
    Bridges,
    Weights,
    WeightCheck,
  },
})

export default class Game extends Vue {
  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  level!: number;

  showTutorial = false;

  correctSolution = false;

  showSolution = false;

  tip = 'Guter Versuch! Probiere es noch einmal!';

  get currentGameComponent(): string {
    return this.type;
  }

  showTip(msg: string):void {
    this.correctSolution = false;
    this.tip = msg;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
