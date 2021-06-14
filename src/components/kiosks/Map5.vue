<template>
  <div class="tower-game">
    <div class="map-container">
      <div id="i" v-for="i in nrOfFields" :key="i" class="square" :class="getClass(i - 1)"
           @click="fieldClicked(i - 1)" @dragover.prevent
           @drop.stop.prevent="dropTower(i - 1)">
            <img :src="require(`@/assets/bridges/kiosk_${fields[i - 1]}.png`)"
            style="width:40%" draggable="true"
            @dragstart="fieldClicked(i - 1); towerSelected = true">
      </div>
    </div>
    <div class="tower-field card clickable"
     @click="selectTower()"
     @dragstart="towerSelected = true" draggable="false"
     :class="{ selected: towerSelected == true }">
      <img :src="require('/src/assets/bridges/kiosk_true.png')" draggable="true">
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

export default class Map5 extends Vue {
  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  availableKiosks = 5;

  nrOfFields = 10;

  map = new Graph(this.nrOfFields);

  usedFields = new Set();

  towerSelected = false;

  fields = [false, false, false, false, false, false, false, false, false, false];

  isVC = false;

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
    for (let i = 0; i < 10; i += 1) {
      this.map.addVertex(i);
    }
    this.map.addEdge(1, 2);
    this.map.addEdge(3, 4);
    this.map.addEdge(4, 5);
    this.map.addEdge(8, 9);
    this.map.addEdge(0, 3);
    this.map.addEdge(1, 3);
    this.map.addEdge(1, 4);
    this.map.addEdge(2, 5);
    this.map.addEdge(2, 6);
    this.map.addEdge(3, 7);
    this.map.addEdge(3, 8);
    this.map.addEdge(4, 8);
    this.map.addEdge(5, 9);
    this.map.addEdge(6, 9);
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
    this.fields = [false, false, false, false, false, false, false, false, false, false];
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
  left: 2%;
  top: 10%;
}

.f1 {
  position: absolute;
  left: 35%;
  top: 9.5%;
}

.f2 {
  position: absolute;
  left: 74%;
  top: 8.5%;
}

.f3 {
  position: absolute;
  left: 18.5%;
  top: 46%;
}

.f4 {
  position: absolute;
  left: 35.5%;
  top: 46.5%;
}

.f5 {
  position: absolute;
  left: 73.5%;
  top: 47%;
}

.f6 {
  position: absolute;
  left: 92%;
  top: 47%;
}

.f7 {
  position: absolute;
  left: 2%;
  top: 84%;
}

.f8 {
  position: absolute;
  left: 35.5%;
  top: 84%;
}

.f9 {
  position: absolute;
  left: 73.5%;
  top: 83%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map8.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 500px;
  min-height: 265px;
  width: 60vw;
  height: 31.5vw;
}

.square {
  border: 0px dashed #324197;
  background: none;
  border-radius: 25px;
  min-width: 20px;
  min-height: 20px;
  height: 14% !important;
  width: 7% !important;
}

.square img {
  width: 100% !important;
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
  width: 60%;
  height: auto;
}

.tower-game {
  position: relative;
  display: flex;
  justify-content: center;
}

</style>
