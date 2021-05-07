<template>
  <div>
    <!--<div>Testdata: sum of all weights = {{ weightSum }},
      boat overloaded: {{ boatOverload }}, sum of loaded weights:  {{ sumArray() }},
      all weights used: {{  allWeightsUsed() }}
    </div>-->

    <table>
      <tr id="i" v-for="i in boatsCapacities.length" :key="i">
        <td>
          <h3 class="hidden-mobile">Boot {{ i }}</h3>
          <img :src="require(`@/assets/transport/boat${boatsCapacities[i - 1]}.png`)"
           style="width: 55%; min-width:120px; max-width:150px" draggable="false">
        </td>
        <td v-for="j in 5" :key="j" class="dropzone { selected: selectedItem == j }"
         @click="fieldClicked(i,j)" @dragover.prevent
         @dragstart="dragStart(i,j)"
         @drop.stop.prevent="dropItem(i, j)">
          <img :src="require(`@/assets/weights/size${rows[i - 1][j - 1]}.png`)">
        </td>
      </tr>
    </table>

    <div class="weight-depot card clickable" v-for="i in weights"
     :key="i" :class="{ selected: selectedItem == i,
      locked: usedWeights.has(i) }" @click="selectWeight(i)"
      @dragstart="selectedItem = i"
      >
      <img :src="require(`@/assets/weights/size${i}.png`)" draggable="usedWeights.has(i)">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})

export default class Weights extends Vue {
  level = 0;

  weights = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];

  weightSum = 0;

  boatsCapacities = [10, 20, 30];

  boatsMaxLoad = 0;

  boatOverload = false;

  rows = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

  selectedItem = 0;

  usedWeights = new Set();

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
      this.usedWeights.delete(this.selectedItem);
      this.rows[i - 1][j - 1] = 0;
      this.selectedItem = 0;
    }
    this.checkSolution();
  }

  dragStart(i:number, j:number):void {
    this.selectedItem = this.rows[i - 1][j - 1];
    this.rows[i - 1][j - 1] = 0;
    this.usedWeights.delete(this.selectedItem);
  }

  // place item on a boat
  dropItem(i:number, j:number):void {
    if (!this.usedWeights.has(this.selectedItem)) {
      this.usedWeights.delete(this.rows[i - 1][j - 1]);
      this.rows[i - 1][j - 1] = this.selectedItem;
      this.usedWeights.add(this.selectedItem);
      this.selectedItem = 0;
      this.checkSolution();
    }
  }

  restart(): void {
    this.selectedItem = 0;
    this.rows = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    this.usedWeights.clear();
  }

  nextTask():void {
    this.restart();
    let ship1 = 0;
    let ship2 = 0;
    let ship3 = 0;
    let maxWeightSize = 12;
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

    // prevent impossible assignments for boats with low capacities
    if (ship1 === ship2 && ship2 === ship3 && ship3 === 10) {
      maxWeightSize = 10;
    } else if ((ship1 === ship2 && ship2 === 10)
     || (ship2 === ship3 && ship3 === 10)
     || (ship1 === ship3 && ship3 === 10)) {
      maxWeightSize = 11;
    }

    // choose weights
    const sentinel = 4 - this.level;
    let w = 0;
    while (chosenWeightSum + sentinel <= newWeightSum) {
      chosenWeightSum = 0;
      chosenWeights.clear();
      while (chosenWeightSum <= newWeightSum) {
        w = Math.floor(1 + Math.random() * maxWeightSize);
        if (!chosenWeights.has(w)) {
          chosenWeights.add(w);
          chosenWeightSum += w;
        }
      }
      chosenWeights.delete(w);
    }
    this.weights = Array.from(chosenWeights);
    this.weights.sort((a, b): number => a - b);
  }

  checkSolution():void {
    const optimalWeightSum = this.sumArray();
    const allUsed = this.allWeightsUsed();
    if (optimalWeightSum === this.weightSum && allUsed && !this.boatOverload) {
      this.$emit('correct-solution');
    } else if (!allUsed) {
      this.$emit('false-solution', 'Tipp: Du hast noch nicht alle Gewichte verwendet');
    } else if (optimalWeightSum !== this.weightSum) {
      this.$emit('false-solution', 'Tipp: Verwende jedes Gewicht nur einmal');
    } else if (this.boatOverload) {
      this.$emit('false-solution', 'Tipp: Pass auf, dass kein Boot zu schwer beladen ist!');
    }
  }

  // calculate sum of used weights
  sumArray():number {
    this.addUpWeights();

    let rowSum = 0; // stores the sum for each row to test if a boat is overloaded

    let totalSum = 0; // sum of the weights that are loaded at this moment

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

    return totalSum;
  }

  // test if all weights are used
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
