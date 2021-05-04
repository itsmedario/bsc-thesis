<template>
  <div>
    <div>Testdata: sum of all weights = {{ weightSum }},
      boat overloaded: {{ boatOverload }}, sum of loaded weights:  {{ sumArray() }},
      all weights used: {{  allWeightsUsed() }}
    </div>

    <table>
      <tr id="0">
        <td>
          <h3>Boot 1</h3>
          <img :src="require(`@/assets/transport/boat${boatsCapacities[0]}.png`)"
           style="width: 55%" draggable="false">
        </td>
        <td v-for="i in colNumbers" :key="i" class="dropzone { selected: selectedItem == i }"
         @click="fieldClicked(1,i)" @dragover.prevent
         @dragstart="selectedItem = rows[0][i - 1]; rows[0][i - 1] = 0"
         @drop.stop.prevent="dropItem(1, i)">
          <img :src="require(`@/assets/weights/size${rows[0][i-1]}.png`)"
           >
        </td>
      </tr>
      <tr id="1">
        <td>
          <h3>Boot 2</h3>
          <img :src="require(`@/assets/transport/boat${boatsCapacities[1]}.png`)"
           style="width: 55%" draggable="false">
        </td>
        <td v-for="i in colNumbers" :key="i" class="dropzone { selected: selectedItem == i }"
         @click="fieldClicked(2,i)" @dragover.prevent
         @dragstart="selectedItem = rows[1][i - 1]; rows[1][i - 1] = 0"
         @drop.stop.prevent="dropItem(2, i)">
          <img :src="require(`@/assets/weights/size${rows[1][i-1]}.png`)"
           >
        </td>
      </tr>
      <tr id="2">
        <td>
          <h3>Boot 3</h3>
          <img :src="require(`@/assets/transport/boat${boatsCapacities[2]}.png`)"
           style="width: 55%" draggable="false">
        </td>
        <td v-for="i in colNumbers" :key="i" class="dropzone { selected: selectedItem == i }"
         @click="fieldClicked(3,i)" @dragover.prevent
         @dragstart="selectedItem = rows[2][i - 1]; rows[2][i - 1] = 0"
         @drop.stop.prevent="dropItem(3, i)">
          <img :src="require(`@/assets/weights/size${rows[2][i-1]}.png`)"
           >
        </td>
      </tr>
    </table>

    <div class="weight-depot card clickable" v-for="i in weights"
     :key="i" :class="{ selected: selectedItem == i,
      locked: usedWeights.has(i) }" @click="selectWeight(i)"
      @dragstart="selectedItem = i">
      <img :src="require(`@/assets/weights/size${i}.png`)">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})

export default class Weights extends Vue {
  weights = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];

  weightSum = 0;

  boatsCapacities = [10, 20, 30];

  boatsMaxLoad = 0;

  boatOverload = false;

  colNumbers = [1, 2, 3, 4, 5, 6];

  rows = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

  selectedItem = 0;/* selectedItem = [0, -1, -1]; */

  usedWeights = new Set();

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

  addUpWeights():void { // calculates the sum of all given weights
    let sum = 0;
    for (let i = 0; i < this.weights.length; i += 1) {
      sum += this.weights[i];
    }
    this.weightSum = sum;
  }

  selectWeight(i:number):void { // select a weight in the inventory
    if (this.selectedItem === i) {
      this.selectedItem = 0;
    } else {
      this.selectedItem = i;
    }
  }

  fieldClicked(i:number, j:number):void { // drop or delete a weight in a ship
    if (this.selectedItem !== 0) {
      this.dropItem(i, j);
    } else {
      this.selectedItem = this.rows[i - 1][j - 1];
      this.rows[i - 1][j - 1] = 0;
      this.selectedItem = 0;
    }
    this.checkSolution();
  }

  dropItem(i:number, j:number):void {
    this.rows[i - 1][j - 1] = this.selectedItem;
    this.selectedItem = 0;
    this.checkSolution();
  }

  restart(): void {
    this.selectedItem = 0;
    this.rows = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
  }

  nextTask():void {
    this.restart();
    let ship1 = 0;
    let ship2 = 0;
    let ship3 = 0;
    const max = 60;
    let newWeightSum = 0;
    let chosenWeightSum = 0;
    const chosenWeights = new Set([1]);

    // choose ship sizes
    do {
      ship1 = Math.floor(1 + Math.random() * 3) * 10;
      ship2 = Math.floor(1 + Math.random() * 3) * 10;
      ship3 = Math.floor(1 + Math.random() * 3) * 10;
      newWeightSum = ship1 + ship2 + ship3;
    } while (newWeightSum > max);
    this.boatsCapacities = [ship1, ship2, ship3];

    // choose weights
    let w = 0;
    while (chosenWeightSum <= newWeightSum) {
      w = Math.floor(1 + Math.random() * 12);
      if (!chosenWeights.has(w)) {
        chosenWeights.add(w);
        chosenWeightSum += w;
      }
    }
    chosenWeights.delete(w);
    this.weights = Array.from(chosenWeights).sort();
  }

  checkSolution():void {
    if (this.sumArray() === this.weightSum && this.allWeightsUsed() && !this.boatOverload) {
      this.$emit('correct-solution');
    } else {
      this.$emit('false-solution'); // add tip what to improve (conditioned on what bool is false, include in emit)
    }
  }

  sumArray():number { // calculate sum of used weights
    this.addUpWeights();

    let rowSum = 0;

    let totalSum = 0;

    this.boatOverload = false;

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 6; j += 1) {
        rowSum += this.rows[i][j];
      }
      if (rowSum > this.boatsCapacities[i]) {
        this.boatOverload = true;
      }
      totalSum += rowSum;
      rowSum = 0;
    }

    return totalSum; // achtung falscher Bool
  }

  allWeightsUsed():boolean {
    this.usedWeights.clear();

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 6; j += 1) {
        if (this.usedWeights.has(this.rows[i][j]) && (this.rows[i][j] !== 0)) {
          return false;
        }
        this.usedWeights.add(this.rows[i][j]);
      }
    }

    if (this.usedWeights.size === this.weights.length + 1) {
      return true;
    }

    return false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
  border-spacing: 0.6em 1.4em;
}

tr h3, img {
  display: inline-block;
  margin: 0.5em;
  vertical-align: middle;
}

td img {
  width: 100px;
}

.weight-depot {
  display: inline-block;
  vertical-align: middle;
}

.weight-depot img {
  width: 80px;
}
</style>
