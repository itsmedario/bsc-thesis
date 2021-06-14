<template>
  <div class="bridge-game">
    <div class="map-container">
      <div id="i" v-for="i in nrOfFields" :key="i" class="square" :class="getClass(i - 1)"
           @click="fieldClicked(i - 1)" @dragover.prevent
           @drop.stop.prevent="dropBridge(i - 1)">
            <img :src="require(`@/assets/bridges/bridge_${fields[i - 1]}.png`)"
            draggable="true"
            @dragstart="fieldClicked(i - 1); bridgeSelected = true">
      </div>
    </div>
    <div class="bridge-field card clickable" v-if="level !== 1"
     @click="selectBridge()"
     @dragstart="bridgeSelected = true" draggable="false"
     :class="{ selected: bridgeSelected == true }">
      <img :src="require('/src/assets/bridges/bridge.png')" draggable="true">
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */
import { Component, Vue, Prop } from 'vue-property-decorator';
import Graph from '@/components/Graphs';

@Component({
  components: {},
})

export default class BridgesTemplate extends Vue {
  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  availableBridges = 0;

  nrOfFields = 0;

  map = new Graph(this.nrOfFields);

  usedFields = new Set();

  bridgeSelected = false;

  fields = [false];

  beforeMount():void {
    this.initGraph();
  }

  checkSolution(level:number):void {
    const arr = Array.from(this.usedFields);
    if (this.map.isVertexCover(arr)) {
      this.$emit('correct-solution');
    } else {
      this.$emit('false-solution', this.text.tasks.buildBridges.tips.tip1);
    }
    this.initGraph();
  }

  dropBridge(i:number):void {
    this.bridgeSelected = true; // ensure propagation
    this.fields[i] = true;
    this.usedFields.add(i);
    this.bridgeSelected = false; // ensure propagation
    this.checkSolution(this.level);
  }

  // eslint-disable-next-line class-methods-use-this
  getClass(i:number):string {
    // eslint-disable-next-line prefer-template
    return 'f' + i;
  }

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }

    /* if (this.level === 1) {
      this.fields = this.map.createProposition(5, 7);
      console.log(this.fields);
    } */
  }

  fieldClicked(i:number):void {
    if (this.bridgeSelected && this.level !== 1) {
      this.dropBridge(i);
    } else if (this.fields[i] && this.level !== 1) {
      this.bridgeSelected = true; // ensure propagation
      this.fields[i] = false;
      this.usedFields.delete(i);
      this.bridgeSelected = false; // ensure propagation
      this.checkSolution(this.level);
    }
  }

  restart():void {
    for (let i = 0; i < this.fields.length; i += 1) {
      this.fields[i] = false;
    }
    this.bridgeSelected = false;
    this.usedFields = new Set();
  }

  selectBridge():void { // select the bridge in the inventory
    if (this.bridgeSelected) {
      this.bridgeSelected = false;
    } else {
      this.bridgeSelected = true;
    }
  }
}
</script>
<style scoped>
.square {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
