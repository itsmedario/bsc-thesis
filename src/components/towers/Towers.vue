<template>
  <div>
    <div class="backgroundimage" :style="{'background-image':'url(https://raw.githubusercontent.com/itsmedario/bsc-thesis/master/src/assets/maps/map3_empty.png)'}">
      <table>
        <tr id="i" v-for="i in colNr" :key="i">
          <td id="j" v-for="j in rowNr" :key="j" class="square"
           @click="fieldClicked(i,j)" @dragover.prevent
           @drop.stop.prevent="fieldClicked(i, j)">
            <img :src="require('@/assets/bridges/tower.png')"
            v-if="getCell(0,0)" style="width:40%">
          </td>
        </tr>
      </table>
    </div>
    <div class="card clickable tower-field" @click="selectItem()"
      @dragstart="itemSelected = true"
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

  cell = [[true, false, false], [false, false, false], [false, false, false]];

  getCell(i:number, j:number):boolean {
    return this.cell[i][j];
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
      this.cell[i][j] = true;
    } else if (this.cell[i][j]) {
      this.cell[i][j] = false;
    }
    this.itemSelected = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
  border-spacing: 5.6em 1.3em;
}

.tower-game {
  position: relative;
  display: flex;
  justify-content: center;
  width: auto;
}

.backgroundimage {
  background-image: url(https://raw.githubusercontent.com/itsmedario/bsc-thesis/master/src/assets/maps/map3_empty.png://itsmedario.github.io/img/map3_empty.ee45eda9.png.png);
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}

.img-container {
  position: relative;
}

.square {
  border: 2px dashed #324197;
  background: none;
  border-radius: 5px;
  height: 2em !important;
  width: 2em !important;
}

.tower-field {
  height: 15% !important;
  width: 10% !important;
  max-height: 120px;
  max-width: 90px;
  padding: 0.5em;
}

.tower-field img {
  width: 50%;
  height: auto;
}

.tower-game table {
  position: absolute;
  top:0;
  left: 0;
  align-content:center;
  align-self: center;
  border-spacing: 50px;
  padding: 1em;
  width: 60%;
  z-index: 2;
}

tr {
  padding: 1em;
}

td {
  padding: 1em;
}

</style>
