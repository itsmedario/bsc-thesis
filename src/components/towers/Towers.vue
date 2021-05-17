<template>
  <div class="tower-game">
    <div class="map-container" :style="{'background-image':'url(https://raw.githubusercontent.com/itsmedario/bsc-thesis/master/src/assets/maps/map3_empty.png)'}">
      <table>
        <tr id="i" v-for="i in colNr" :key="i">
          <td id="j" v-for="j in rowNr" :key="j" class="square"
           @click="fieldClicked(i - 1, j - 1)" @dragover.prevent
           @drop.stop.prevent="fieldClicked(i - 1, j - 1)">
            <img :src="require(`@/assets/bridges/tower_${cells[i - 1][j - 1]}.png`)"
            style="width:40%" draggable="true"
            @dragstart="fieldClicked(i - 1, j - 1); itemSelected = true">
          </td>
        </tr>
      </table>
    </div>
    <div class="tower-field card clickable" @click="selectItem()"
      @dragstart="itemSelected = true" draggable="false"
      :class="{ selected: itemSelected == true }">
      <img :src="require('/src/assets/bridges/tower.png')" draggable="true">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})

export default class Towers extends Vue {
  @Prop({ required: true })
  level!: number;

  colNr = 3;

  rowNr = 3;

  itemSelected = false;

  cells = [[false, false, false], [false, false, false], [false, false, false]];

  checkSolution():boolean {
    return this.cells[0][0];
  }

  getcells(i:number, j:number):boolean {
    return this.cells[i][j];
  }

  selectItem():void { // select a weight in the inventory
    if (this.itemSelected) {
      this.itemSelected = false;
    } else {
      this.itemSelected = true;
    }
  }

  fieldClicked(i:number, j:number):void {
    if (this.itemSelected) {
      this.cells[i][j] = true;
    } else if (this.cells[i][j]) {
      this.itemSelected = true; // ensure propagation
      this.cells[i][j] = false;
      this.itemSelected = false; // ensure propagation
    }
    this.itemSelected = false;
  }

  nextTask():void {
    this.restart();
  }

  restart():void {
    this.cells = [[false, false, false], [false, false, false], [false, false, false]];
    this.itemSelected = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tower-game {
  position: relative;
  display: flex;
  justify-content: center;
  width: auto;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('/src/assets/bridges/map3_empty.png');
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
  padding: 0.1em 0 !important;
}

.tower-field img {
  width: 40%;
  height: auto;
}

.tower-game table {
  position: absolute;
  top: 0;
  left: 0;
  border-spacing: 5.5em 1.3em;
}

tr {
  padding: 0em;
}

td {
  padding: 0em;
}

</style>
