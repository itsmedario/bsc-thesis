<template>
  <div>
  <div  @click="checkSolution()">Testdata:  Sum = {{ sum }} solution:  {{ sumArray() }}</div>
    <table>
      <tr id="0">
        <td>
          <h3>Boot 1</h3>
          <img src="@/assets/transport/boat1.png" style="width: 30%">
        </td>
        <td v-for="i in colNumbers" :key="i" class="dropzone responsive" @click="dropItem(i, 1)"
         @dragstart="dropItem(i, 1)" @dragover.prevent @dragend.prevent
         @drop.stop.prevent="dropItem(i, 1)">
          <img :src="require(`@/assets/weights/size${rows[0][i-1]}.png`)"
           v-if="rows[0][i-1] != 0">
        </td>
      </tr>
      <tr>
        <td>
          <h3>Boot 2</h3>
          <img src="@/assets/transport/boat1.png" style="width: 30%">
        </td>
        <td v-for="i in colNumbers" :key="i" class="dropzone responsive" @click="dropItem(i, 2)"
         @dragstart="dropItem(i, 2)" @dragover.prevent @dragend.prevent
         @drop.stop.prevent="dropItem(i, 2)">
          <img :src="require(`@/assets/weights/size${rows[1][i-1]}.png`)"
           v-if="rows[1][i-1] != 0">
        </td>
      </tr>
      <tr>
        <td>
          <h3>Boot 3</h3>
          <img src="@/assets/transport/boat1.png" style="width: 30%">
        </td>
        <td v-for="i in colNumbers" :key="i" class="dropzone responsive" @click="dropItem(i, 3)"
         @dragstart="dropItem(i, 3)" @dragover.prevent @dragend.prevent
         @drop.stop.prevent="dropItem(i, 3)">
          <img :src="require(`@/assets/weights/size${rows[2][i-1]}.png`)"
           v-if="rows[2][i-1] != 0">
        </td>
      </tr>
    </table>

    <div class="weight-depot card clickable" v-for="i in weights"
     :key="i" :class="{ selected: selectedItem == i }" @click="selectedItem = i"
      @dragstart="selectedItem = i">
      <img :src="require(`@/assets/weights/size${i}.png`)">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})

export default class Weights extends Vue {
  @Prop({ required: true })
  restartGame!: boolean;

  weights = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];

  colNumbers = [1, 2, 3, 4, 5, 6];

  rows = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

  selectedItem = 0;/* selectedItem = [0, -1, -1]; */

  sum = 0;

  i = 0;

  correctSolution = false;

  items: Array<{
    id: number;
    type: number;
    value: number;
    max: number;
    img: string;
  }> = [
    {
      id: 1,
      type: 1,
      value: 1,
      max: 1,
      img: '/weights/size1.png',
    },
  ];

  /*
  checkField(i:number, j:number): void {
    if (this.row1[i - 1] === 0) {
      this.dropItem(i, j);
    }
  } */

  dropItem(i:number, j:number): void {
    this.rows[j - 1][i - 1] = this.selectedItem;
    this.selectedItem = 0;
  }

  restart(): void {
    this.selectedItem = 0;
    this.rows = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
  }

  checkSolution():void {
    this.sum = 1;
    if (this.sumArray()) {
      // this.$emit('correct-solution');
    }
  }

  sumArray():boolean {
    let rowSum = 0;

    let totalSum = 0;

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 6; j += 1) {
        rowSum += this.rows[i][j];
      }
      if (rowSum > 20) {
        return false;
      }
      totalSum += rowSum;
    }

    return totalSum === 48;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
  border-spacing: 0.7em;
}

tr h3, img {
  display: inline-block;
  margin: 0.5em;
}

td img {
  width: 100px;
}

.weight-depot {
  display: inline-block;
  vertical-align: middle;
}

.weight-depot img {
  width: 100px;
}
</style>
