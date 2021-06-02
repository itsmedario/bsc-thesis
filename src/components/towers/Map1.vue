<template>
  <div class="tower-game">
    <div class="map-container">
      <div id="i" v-for="i in nrOfFields" :key="i" class="square" :class="getClass(i - 1)"
           @click="fieldClicked(i - 1)" @dragover.prevent
           @drop.stop.prevent="dropTower(i - 1)">
            <img :src="require(`@/assets/bridges/tower_${fields[i - 1]}.png`)"
            style="width:40%" draggable="true"
            @dragstart="fieldClicked(i - 1); towerSelected = true">
      </div>
    </div>
    <div class="tower-field card clickable" @click="selectTower()"
      @dragstart="towerSelected = true" draggable="false"
      :class="{ selected: towerSelected == true }">
      <img :src="require('/src/assets/bridges/tower.png')" draggable="true">
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */
import { Component, Vue, Prop } from 'vue-property-decorator';
import Graph from '@/components/towers/Graphs';

@Component({
  components: {},
})

export default class Map1 extends Vue {
  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  availableTowers = 6;

  nrOfFields = 9;

  map = new Graph(this.nrOfFields);

  usedFields = new Set();

  towerSelected = false;

  fields = [false, false, false, false, false, false, false, false, false];

  beforeMount():void {
    this.initGraph();
  }

  checkSolution(level:number):void {
    const arr = Array.from(this.usedFields);
    if (this.map.isVertexCover(arr)) {
      this.$emit('correct-solution');
    } else {
      this.$emit('false-solution', this.text.tasks.buildTowers.tips.tip1);
    }
    this.initGraph();
  }

  dropTower(i:number):void {
    this.towerSelected = true; // ensure propagation
    this.fields[i] = true;
    this.usedFields.add(i);
    this.towerSelected = false; // ensure propagation
    this.checkSolution(this.level);
  }

  // eslint-disable-next-line class-methods-use-this
  getClass(i:number):string {
    // eslint-disable-next-line prefer-template
    return 'f' + i;
  }

  initGraph():void {
    for (let i = 0; i < 9; i += 1) {
      this.map.addVertex(i);
    }
    this.map.addEdge(0, 1);
    this.map.addEdge(1, 2);
    this.map.addEdge(3, 4);
    this.map.addEdge(4, 5);
    this.map.addEdge(6, 7);
    this.map.addEdge(7, 8);
    this.map.addEdge(0, 3);
    this.map.addEdge(1, 4);
    this.map.addEdge(2, 5);
    this.map.addEdge(3, 6);
    this.map.addEdge(4, 7);
    this.map.addEdge(5, 8);
    this.map.addEdge(0, 6);
    this.map.addEdge(2, 8);
  }

  fieldClicked(i:number):void {
    if (this.towerSelected) {
      this.dropTower(i);
    } else if (this.fields[i]) {
      this.towerSelected = true; // ensure propagation
      this.fields[i] = false;
      this.usedFields.delete(i);
      this.towerSelected = false; // ensure propagation
      this.checkSolution(this.level);
    }
  }

  nextTask():void {
    this.restart();
  }

  restart():void {
    this.fields = [false, false, false, false, false, false, false, false, false];
    this.towerSelected = false;
    this.usedFields = new Set();
  }

  selectTower():void { // select the tower in the inventory
    if (this.towerSelected) {
      this.towerSelected = false;
    } else {
      this.towerSelected = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 14%;
  top: 4%;
}

.f1 {
  position: absolute;
  left: 47%;
  top: 5%;
}

.f2 {
  position: absolute;
  left: 78%;
  top: 7%;
}

.f3 {
  position: absolute;
  left: 16%;
  top: 40%;
}

.f4 {
  position: absolute;
  left: 47%;
  top: 40%;
}

.f5 {
  position: absolute;
  left: 76%;
  top: 40%;
}

.f6 {
  position: absolute;
  left: 15%;
  top: 73%;
}

.f7 {
  position: absolute;
  left: 47%;
  top: 74%;
}

.f8 {
  position: absolute;
  left: 78%;
  top: 72%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('map3_empty.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 541px;
  min-height: 286px;
  width: 50vw;
  height: 26vw;
}

.square {
  border: 0px dashed #324197;
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
  padding: 1em 0 !important;
  min-width: 85px !important;
}

.tower-field img {
  width: 38%;
  height: auto;
}

.tower-game {
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

</style>
