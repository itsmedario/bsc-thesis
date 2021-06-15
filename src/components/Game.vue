<template>
  <div id="game">
    <Warning id="mobile-warning" :language="language"/>
    <Tutorial
     :language="language"
     :show-modal=showTutorial
     @close-tutorial="showTutorial = false">
      <slot name="description" slot="description"/>
      <slot name="video" slot="video"
      />
    </Tutorial>

    <Verifier
     :language="language"
     :showSolution=showSolution
     :correctSolution="correctSolution"
     :tip="tip"
     @close-verifier="showSolution = false"
     />

    <Buttons
     :language="language"
     @next-task="$refs.gameComp.nextTask()"
     @restart="$refs.gameComp.restart()"
     @check-solution="$refs.gameComp.checkSolution(level); showSolution = true"
     @show-tutorial="showTutorial = true"
     @switch-difficulty="$refs.gameComp.switchDifficulty()"
     />

    <div id="game-page">
      <div id="task-description">
        <div v-if="this.type=='WeightCheck'" class="switch">
          <img :src="require('@/assets/beavers/beaver.png')" draggable="false"/>
          <div class="toggle-button r" id="difficulty-switch"
           @click="$refs.gameComp.switchDifficulty()">
            <input type="checkbox" class="checkbox">
            <div class="knobs"></div>
            <div class="layer"></div>
          </div>
          <img :src="require('@/assets/beavers/beaver2.png')" draggable="false"/>
        </div>
        <slot name="title">Unintentionally empty title!</slot>
        <slot name="intro">Unintentionally empty description!</slot>
      </div>

      <component id="gameComp" ref="gameComp"
       :is="this.type"
       :language="language"
       :level="level"
       @correct-solution="correctSolution = true"
       @false-solution="showTip"
      />
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Tutorial from '@/components/tools/Tutorial.vue';
import Verifier from '@/components/tools/Verifier.vue';
import Buttons from '@/components/tools/Buttons.vue';
import Towers from '@/components/towers/Towers.vue';
import Kiosks from '@/components/kiosks/Kiosks.vue';
import Bridges from '@/components/bridges/Bridges.vue';
import Weights from '@/components/weights/Weights.vue';
import WeightCheck from '@/components/weights/WeightCheck.vue';
import Warning from '@/components/tools/Warning.vue';

@Component({
  components: {
    Tutorial,
    Verifier,
    Buttons,
    Towers,
    Kiosks,
    Bridges,
    Weights,
    WeightCheck,
    Warning,
  },
})

export default class Game extends Vue {
  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  correctSolution = false;

  showSolution = false;

  showTutorial = false;

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
<style scoped>
#game {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#game-page {
  position: relative;
  width: 100%;
}

.knobs, .layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.toggle-button {
    position: relative;
    top: 50%;
    width: 74px;
    height: 36px;
    margin: auto auto 0 auto;
    overflow: hidden;
}

.toggle-button.r, .toggle-button.r .layer {
    border-radius: 100px;
}

.toggle-button.b2 {
    border-radius: 2px;
}

.checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
}

.knobs {
    z-index: 2;
}

.layer {
    width: 100%;
    background-color: #f8f9fa;
    transition: 0.3s ease all;
    z-index: 1;
}

/* Button 1 */
#difficulty-switch .knobs:before {
    content: '1';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 10px;
    color: #f8f9fa;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: #f44336;
    border-radius: 50%;
    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
}

#difficulty-switch .checkbox:checked + .knobs:before {
    content: '2';
    left: 42px;
    background-color: #03A9F4;
}

#difficulty-switch .checkbox:checked ~ .layer {
    background-color: #f8f9fa;
}

#difficulty-switch .knobs, #difficulty-switch .knobs:before, #difficulty-switch .layer
{
    transition: 0.3s ease all;
}

.switch {
  position: absolute;
  right: 20px;
  display: flex;
}

.switch img {
  height: 35px;
  margin: 0 0.5em;
}
</style>
