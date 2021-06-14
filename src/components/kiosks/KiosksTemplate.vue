<template>
  <div class="kiosk-game">
    <div class="map-container">
      <div id="i" v-for="i in nrOfFields" :key="i" class="square" :class="getClass(i - 1)"
           @click="fieldClicked(i - 1)" @dragover.prevent
           @drop.stop.prevent="dropKiosk(i - 1)">
            <img :src="require(`@/assets/bridges/kiosk_${fields[i - 1]}.png`)"
            draggable="true"
            @dragstart="fieldClicked(i - 1); kioskSelected = true">
      </div>
    </div>
    <div class="kiosk-field card clickable" v-if="level !== 1"
     @click="selectKiosk()"
     @dragstart="kioskSelected = true" draggable="false"
     :class="{ selected: kioskSelected == true }">
      <img :src="require('/src/assets/bridges/kiosk_true.png')" draggable="true">
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

export default class KiosksTemplate extends Vue {
  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  availableKiosks = 0;

  nrOfFields = 0;

  map = new Graph(this.nrOfFields);

  usedFields = new Set();

  kioskSelected = false;

  fields = [false];

  beforeMount():void {
    this.initGraph();
  }

  checkSolution(level:number):void {
    const arr = Array.from(this.usedFields);
    if (this.map.isDominatingSet(arr)) {
      this.$emit('correct-solution');
    } else {
      this.$emit('false-solution', this.text.tasks.buildKiosks.tips.tip1);
    }
    this.initGraph();
  }

  dropKiosk(i:number):void {
    this.kioskSelected = true; // ensure propagation
    this.fields[i] = true;
    this.usedFields.add(i);
    this.kioskSelected = false; // ensure propagation
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
    if (this.kioskSelected && this.level !== 1) {
      this.dropKiosk(i);
    } else if (this.fields[i] && this.level !== 1) {
      this.kioskSelected = true; // ensure propagation
      this.fields[i] = false;
      this.usedFields.delete(i);
      this.kioskSelected = false; // ensure propagation
      this.checkSolution(this.level);
    }
  }

  restart():void {
    for (let i = 0; i < this.fields.length; i += 1) {
      this.fields[i] = false;
    }
    this.kioskSelected = false;
    this.usedFields = new Set();
  }

  selectKiosk():void { // select the kiosk in the inventory
    if (this.kioskSelected) {
      this.kioskSelected = false;
    } else {
      this.kioskSelected = true;
    }
  }
}
</script>
