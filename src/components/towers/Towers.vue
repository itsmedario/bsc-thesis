<template>
  <div class="tower-game">
    <div class="map-container">
      <!--:style="{'background-image':'url(https://raw.githubusercontent.com/itsmedario/bsc-thesis/master/src/assets/maps/map3_empty.png)'}"-->
      <table>
        <tr id="i" v-for="i in colNr" :key="i">
          <td id="j" v-for="j in rowNr" :key="j" class="square"
           @click="fieldClicked(i - 1, j - 1)" @dragover.prevent
           @drop.stop.prevent="dropTower(i - 1, j - 1)">
            <img :src="require(`@/assets/bridges/tower_${cells[i - 1][j - 1]}.png`)"
            style="width:40%" draggable="true"
            @dragstart="fieldClicked(i - 1, j - 1); towerSelected = true">
          </td>
        </tr>
      </table>
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

export default class Towers extends Vue {
  @Prop({ required: true })
  level!: number;

  counter = 1;

  colNr = 3;

  rowNr = 3;

  map3 = new Graph(9);

  map5 = new Graph(11);

  usedFields = new Set();

  towerSelected = false;

  cells = [[false, false, false], [false, false, false], [false, false, false]];

  beforeMount():void {
    this.initGraphs();
  }

  checkSolution(level:number):void {
    if (this.isVertexCover()) {
      this.$emit('correct-solution');
    } else {
      this.$emit('false-solution', 'Noch nicht alle Kanäle sind überwacht.');
    }
  }

  dropTower(i:number, j:number):void {
    this.towerSelected = true; // ensure propagation
    this.cells[i][j] = true;
    this.usedFields.add(3 * i + j);
    this.towerSelected = false; // ensure propagation
  }

  getCell(i:number, j:number):boolean {
    return this.cells[i][j];
  }

  initGraphs():void {
    this.initGraph3();
    this.initGraph5();
  }

  initGraph3():void {
    for (let i = 0; i < 9; i += 1) {
      this.map3.addVertex(i);
    }
    this.map3.addEdge(0, 1);
    this.map3.addEdge(1, 2);
    this.map3.addEdge(3, 4);
    this.map3.addEdge(4, 5);
    this.map3.addEdge(6, 7);
    this.map3.addEdge(7, 8);
    this.map3.addEdge(0, 3);
    this.map3.addEdge(1, 4);
    this.map3.addEdge(2, 5);
    this.map3.addEdge(3, 6);
    this.map3.addEdge(4, 7);
    this.map3.addEdge(5, 8);
    this.map3.addEdge(0, 6);
    this.map3.addEdge(2, 8);
  }

  initGraph5():void {
    for (let i = 0; i < 11; i += 1) {
      this.map5.addVertex(i);
    }
    this.map5.addEdge(0, 1);
    this.map5.addEdge(1, 2);
    this.map5.addEdge(3, 4);
    this.map5.addEdge(4, 5);
    this.map5.addEdge(5, 6);
    this.map5.addEdge(6, 7);
    this.map5.addEdge(8, 9);
    this.map5.addEdge(9, 10);
    this.map5.addEdge(0, 4);
    this.map5.addEdge(1, 5);
    this.map5.addEdge(2, 6);
    this.map5.addEdge(4, 8);
    this.map5.addEdge(5, 9);
    this.map5.addEdge(6, 10);
    this.map5.addEdge(0, 3);
    this.map5.addEdge(3, 8);
    this.map5.addEdge(2, 7);
    this.map5.addEdge(7, 10);
  }

  isVertexCover():boolean { // checks the placed towers actually form a vertex cover
    const arr = Array.from(this.usedFields);
    for (let i = 0; i < arr.length; i += 1) {
      this.map3.removeVertex(Number(arr[i]));
    }
    /* for (const v in this.map3) {
      if (v.length > 0) {
        this.initGraphs();
        return false;
      }
    } */
    // this.initGraphs();
    return true;
  }

  fieldClicked(i:number, j:number):void {
    if (this.towerSelected) {
      this.dropTower(i, j);
    } else if (this.cells[i][j]) {
      this.towerSelected = true; // ensure propagation
      this.cells[i][j] = false;
      this.usedFields.delete(3 * i + j);
      this.towerSelected = false; // ensure propagation
    }
  }

  nextTask():void {
    this.restart();
    this.counter += 1;
  }

  restart():void {
    this.cells = [[false, false, false], [false, false, false], [false, false, false]];
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

.map-container {
  position: relative;
  align-content: center;
  background-image: url('map3_empty.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 541px;
  height: 286px;
}

.square {
  border: 2px dashed #324197;
  background: none;
  border-radius: 5px;
  height: 60px !important;
  width: 60px !important;
  padding: 0 !important;
  margin: 0 !important;
}

.square img {
  width: 50% !important;
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

.tower-game {
  position: relative;
  display: flex;
  justify-content: center;
}

.tower-game table {
  position: absolute;
  top:-15px;
  left: -20px;
  border-spacing: 5.7em 2em;
}

</style>
