<template>
    <div>
      <component id="gameMap" ref="gameMap" :key="reloadCounter"
       :is="this.maps[counter]"
       :language="language"
       :level="level"
       :s1="s1"
       :s2="s2"
       @correct-solution="correctSolution = true"
       @false-solution="correctSolution = false; tip = $event"
      />

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
import Map1 from '@/components/bridges/Map1.vue';

@Component({
  components: {
    StatementCheck,
    Map1,
  },
})

export default class Bridges extends Vue {
  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  counter = 0;

  reloadCounter = 0; // enables reloading the component to restart by creating a new instance

  restartCounter = 0; // enables reloading the check component to restart by creating a new instance

  correctSolution = false;

  maps = ['Map1'];

  s1 = -1; // user's answer to statement 1

  s2 = -1;

  // eslint-disable-next-line max-len
  statements = [[1, this.text.tasks.checkBridges.statements.s1], [2, this.text.tasks.checkBridges.statements.s2]];

  tip = '';

  checkSolution(level:number):void {
    if (this.correctSolution) {
      this.$emit('correct-solution');
    } else {
      this.$emit('false-solution', this.tip);
    }
  }

  nextTask():void {
    this.restart();
    if (this.level === 1) {
      this.reloadCounter += 1;
    } else {
      this.counter = (this.counter + 1) % this.maps.length;
    }
  }

  restart():void {
    if (this.level === 1) {
      this.restartCounter += 1;
    } else {
      this.reloadCounter -= 1;
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

.kiosk-field {
  height: 15% !important;
  width: 10% !important;
  max-height: 120px;
  max-width: 90px;
  padding: 1em 0 !important;
}

.kiosk-field img {
  width: 40%;
  height: auto;
}
</style>
