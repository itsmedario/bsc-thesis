<template>
    <div>
      <component id="gameMap" ref="gameMap" :key="reloadCounter"
       :is="this.maps[counter]"
       :language="language"
       :level="level"
       :s1="s1"
       :s2="s2"
       @correct-solution="correctSolution = true"
       @false-solution="correctSolution = false; tip = $event"/>

      <StatementCheck v-if="level == 1"
      :key="restartCounter"
      :language="language"
      :statements="statements"
      @toggle="$refs.gameMap.toggleBox($event)"
      @set-false="$refs.gameMap.setFalse($event)"
      @set-true="$refs.gameMap.setTrue($event)"
      />
    </div>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */
import { Component, Vue, Prop } from 'vue-property-decorator';
import StatementCheck from '@/components/tools/StatementCheck.vue';
import Map20 from '@/components/towers/Map20.vue';
import Map21 from '@/components/towers/Map21.vue';
import Map22 from '@/components/towers/Map22.vue';
import Map23 from '@/components/towers/Map23.vue';
import Map24 from '@/components/towers/Map24.vue';
import Map25 from '@/components/towers/Map25.vue';
import Map26 from '@/components/towers/Map26.vue';
import Map27 from '@/components/towers/Map27.vue';
import Map28 from '@/components/towers/Map28.vue';
import Map29 from '@/components/towers/Map29.vue';
import Map30 from '@/components/towers/Map30.vue';

@Component({
  components: {
    StatementCheck,
    Map20,
    Map21,
    Map22,
    Map23,
    Map24,
    Map25,
    Map26,
    Map27,
    Map28,
    Map29,
    Map30,
  },
})

export default class Towers extends Vue {
  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  counter = 0;

  reloadCounter = 0; // enables reloading the map component to restart by creating a new instance

  restartCounter = 0; // enables reloading the check component to restart by creating a new instance

  s1 = -1; // user's answer to statement 1

  s2 = -1;

  // eslint-disable-next-line max-len
  statements = [[1, this.text.tasks.checkTowers.statements.s1], [2, this.text.tasks.checkTowers.statements.s2]];

  correctSolution = false;

  tip = '';

  maps = ['Map27', 'Map21', 'Map25', 'Map22', 'Map23', 'Map24', 'Map26', 'Map28', 'Map29'/* , 'Map30' */];

  checkSolution(level:number):void {
    if (this.correctSolution) {
      this.$emit('correct-solution');
    } else {
      this.$emit('false-solution', this.tip);
    }
  }

  nextTask():void {
    this.restart();
    this.counter = (this.counter + 1) % this.maps.length;
  }

  restart():void {
    if (this.level === 1) {
      this.restartCounter += 1;
    } else {
      this.reloadCounter += 1;
    }
    this.correctSolution = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#gameMap {
  margin: 3em;
}

.square {
  border: 1px dashed #324197;
  background: none;
  border-radius: 15px;
  height: 18%;
  width: 10%;
}

.square img {
  width: 60% !important;
  height: auto;
}

.tower-field {
  height: 15% !important;
  width: 10% !important;
  max-height: 120px;
  max-width: 90px;
  padding: 1em 0 !important;
}

.tower-field img {
  width: 40%;
  height: auto;
}
</style>
