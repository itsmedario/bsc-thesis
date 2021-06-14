<template>
    <div>
      <component id="gameMap" ref="gameMap" :key="reloadCounter"
       :is="this.maps[counter]"
       :language="language"
       :level="level"
       @correct-solution="correctSolution = true"
       @false-solution="correctSolution = false"/>
    </div>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */
import { Component, Vue, Prop } from 'vue-property-decorator';
import Map1 from '@/components/bridges/Map1.vue';

@Component({
  components: {
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

  correctSolution = false;

  maps = ['Map1'];

  checkSolution(level:number):void {
    if (this.correctSolution) {
      this.$emit('correct-solution');
    } else {
      this.$emit('false-solution', this.text.tasks.buildBridges.tips.tip1);
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
    this.reloadCounter += 1;
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
