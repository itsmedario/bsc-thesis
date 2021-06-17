<template>
  <div class="tower-game">
    <div class="map-container">
      <div id="i" v-for="i in nrOfFields" :key="i" class="square" :class="getClass(i - 1)"
           @click="fieldClicked(i - 1)" @dragover.prevent
           @drop.stop.prevent="dropTower(i - 1)">
            <img :src="require(`@/assets/bridges/tower_${fields[i - 1]}.png`)"
            draggable="true"
            @dragstart="fieldClicked(i - 1); towerSelected = true">
      </div>
    </div>
    <div class="item-stock">
      <div class="tower-field card clickable" v-if="level !== 1"
      @click="selectTower()"
      @dragstart="towerSelected = true" draggable="false"
      :class="{ locked: availableTowers < 1 && level != 4,
       selected: towerSelected == true && (level == 4 || availableTowers >= 1)}">
        <img :src="require('/src/assets/bridges/tower.png')"
         :draggable="availableTowers >= 1 || level == 4">
      </div>
      <div class="card item-display" v-if="level !== 4 && level !== 1">
        <div>{{ availableTowers }}&#215;</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */
import { Component, Vue, Prop } from 'vue-property-decorator';
import Graph from '@/components/Graphs';
import RandomGenerator from '@/components/RandomGenerator';

@Component({
  components: {},
})

export default class TowersTemplate extends Vue {
  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  availableTowers = 0;

  optimalNrOfTowers = 0;

  nrOfFields = 0;

  map = new Graph(this.nrOfFields);

  usedFields = new Set();

  correctProposition = false;

  towerSelected = false;

  fields = [false];

  beforeMount():void {
    this.initGraph();
    if (this.level === 1) {
      const r = new RandomGenerator();
      // eslint-disable-next-line max-len
      this.fields = r.generateSolution(this.fields, this.optimalNrOfTowers - 2, this.availableTowers);
      const arr = Array.from(this.usedFields);
      this.correctProposition = this.map.isVertexCover(arr);
    }
  }

  checkSolution(level:number):void {
    const arr = Array.from(this.usedFields);
    const isVC = this.map.isVertexCover(arr);
    if (level === 2) {
      if (isVC) {
        this.$emit('correct-solution');
      } else {
        this.$emit('false-solution', this.text.tasks.buildTowers.tips.tip1);
      }
    } else if (level === 4) {
      if (isVC && this.optimalNrOfTowers === this.usedFields.size) {
        this.$emit('correct-solution');
      } else if (isVC) {
        this.$emit('false-solution', this.text.tasks.optimizeTowers.tips.tip2);
      } else {
        this.$emit('false-solution', this.text.tasks.optimizeTowers.tips.tip1);
      }
    }
    this.initGraph();
  }

  dropTower(i:number):void {
    if (this.level === 4 || this.availableTowers > 0) {
      this.towerSelected = true; // ensure propagation
      this.fields[i] = true;
      this.usedFields.add(i);
      this.towerSelected = false; // ensure propagation
      this.checkSolution(this.level);
      this.availableTowers -= 1;
    }
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
    if (this.towerSelected && this.level !== 1) {
      this.dropTower(i);
    } else if (this.fields[i] && this.level !== 1) {
      this.towerSelected = true; // ensure propagation
      this.fields[i] = false;
      this.usedFields.delete(i);
      this.availableTowers += 1;
      this.towerSelected = false; // ensure propagation
      this.checkSolution(this.level);
    }
  }

  restart():void {
    for (let i = 0; i < this.fields.length; i += 1) {
      this.fields[i] = false;
    }
    this.towerSelected = false;
    this.usedFields = new Set();
  }

  selectTower():void { // select the tower in the inventory
    if (this.availableTowers > 0) {
      if (this.towerSelected) {
        this.towerSelected = false;
      } else {
        this.towerSelected = true;
      }
    }
  }
}
</script>
