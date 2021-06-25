<template>
  <div>
    <!--<div>Testdata: sum of all weights = {{ weightSum }},
      boat overloaded: {{ boatOverload }}, sum of loaded weights:  {{ sumArray() }},
      all weights used: {{  allWeightsUsed() }}
    </div>-->

    <table>
      <tr id="i" v-for="i in boatCapacities.length" :key="i">
        <td>
          <img :src="require(`@/assets/transport/boatmax${boatCapacities[i - 1]}.png`)"
           style="width: 55%; min-width:120px; max-width:150px" draggable="false">
        </td>
        <td v-for="j in numberOfFields" :key="j" class="dropzone"
         :class="{ fixedField: isFixedField(i,j) }"
         @click="fieldClicked(i,j)" @dragover.prevent
         @dragstart="dragStart(i,j)"
         @drop.stop.prevent="dropItem(i, j)">
          <img :src="require(`@/assets/weights/size${rows[i - 1][j - 1]}.png`)"
         :draggable="!isFixedField(i,j)">
        </td>
      </tr>
    </table>

    <div class="weight-depot card" v-for="i in weights"
     :key="i" :class="{ selected: selectedItem == i, clickable: !usedWeights.has(i),
      locked: usedWeights.has(i) }" @click="selectWeight(i)"
      @dragstart="selectedItem = i"
      >
      <img :src="require(`@/assets/weights/size${i}.png`)" :draggable="!usedWeights.has(i)">
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
  level!: number;

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  numberOfFields = 5;

  difficultGames = false;

  // given weights to distribute, starts with standard distribution, later random
  weights = [1, 2, 3, 4, 5, 6, 7, 9, 11, 12];

  weightSum = 60;

  boatCapacities = [10, 20, 30];

  boatUsed = [false, false, false]; // is boat i used?

  boatUsedOpt = [true, true, true]; // is boat i used in the optimal case?

  boatOverload = false; // is a boat overloaded?

  // how ships are actually loaded
  rows = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];

  // stores fixed rows for l2
  startRows = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];

  selectedItem = 0; // momentarily chosen weight

  usedWeights = new Set(); // weights the user has distributed

  fixedWeights = new Set(); // weights that are already pre-distributed

  beforeMount():void{ // pre-computed function, gets executed when module is loaded/mounted
    /* if (this.level === 2) {
      this.l3init();
    } */
    this.nextTask();
  }

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
    } else if (!this.usedWeights.has(i)) {
      this.selectedItem = i;
    }
  }

  fieldClicked(i:number, j:number):void { // drop or delete a weight in a ship
    if (!this.fixedWeights.has(this.rows[i - 1][j - 1])) {
      if (this.selectedItem !== 0) {
        this.dropItem(i, j);
      } else {
        this.selectedItem = this.rows[i - 1][j - 1];
        this.usedWeights.delete(this.selectedItem);
        this.rows[i - 1][j - 1] = 0;
        this.selectedItem = 0;
      }
      this.checkSolution(this.level);
    }
  }

  // defines what happens when an element is dragged
  dragStart(i:number, j:number):void {
    if (!this.fixedWeights.has(this.rows[i - 1][j - 1])) {
      this.usedWeights.delete(this.rows[i - 1][j - 1]);
      this.selectedItem = this.rows[i - 1][j - 1];
      this.rows[i - 1][j - 1] = 0;
    }
  }

  // place item on a boat
  dropItem(i:number, j:number):void {
    if (!this.usedWeights.has(this.selectedItem)
     && !this.fixedWeights.has(this.rows[i - 1][j - 1])) {
      this.usedWeights.delete(this.rows[i - 1][j - 1]);
      this.rows[i - 1][j - 1] = this.selectedItem;
      this.usedWeights.add(this.selectedItem);
      this.selectedItem = 0;
      this.checkSolution(this.level);
    }
  }

  isFixedField(i:number, j:number):boolean { // returns boolean if field is pre-loaded/fixed
    return this.fixedWeights.has(this.rows[i - 1][j - 1]);
  }

  l3init():void {
    this.startRows = [[5, 4, 0, 0, 0], [2, 0, 0, 0, 0], [11, 0, 0, 0, 0]];
    this.fixedWeights = new Set([2, 4, 5, 11]);
  }

  restart(): void { // restarts the actual task
    this.selectedItem = 0;
    this.rows = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    this.usedWeights.clear();
    this.boatUsed = [false, false, false];
    if (this.level === 2) {
      for (let i = 0; i < this.rows.length; i += 1) {
        for (let j = 0; j < this.rows[0].length; j += 1) {
          this.rows[i][j] = this.startRows[i][j];
        }
      }
      this.usedWeights = new Set(this.fixedWeights);
    }
  }

  nextTask():void { // generates a new random task
    this.restart();
    if (this.level === 1) {
      this.l1generator();
    } else if (this.level === 2) {
      this.l2generator();
    } else if (this.level === 3) {
      this.l3generator();
    }
  }

  l1generator():void { // random generator for level 1
    let ship1 = 0;
    let ship2 = 0;
    let ship3 = 0;
    let maxWeightSize = 12;
    const max = 60;
    const tolerance = 4;
    let newWeightSum = 0;

    // choose ship sizes
    do {
      ship1 = Math.floor(1 + Math.random() * 3) * 10;
      ship2 = Math.floor(1 + Math.random() * 3) * 10;
      ship3 = Math.floor(1 + Math.random() * 3) * 10;
      newWeightSum = ship1 + ship2 + ship3;
    } while (newWeightSum > max);
    this.boatCapacities = [ship1, ship2, ship3];
    this.boatCapacities.sort();

    // prevent impossible assignments for boats with low capacities, e.g. 11kg weight to 10kg boat
    if (ship1 === ship2 && ship2 === ship3 && ship3 === 10) {
      maxWeightSize = 10;
    } else if ((ship1 === ship2 && ship2 === 10)
     || (ship2 === ship3 && ship3 === 10)
     || (ship1 === ship3 && ship3 === 10)) {
      maxWeightSize = 11;
    }

    // choose weights
    this.chooseWeights(newWeightSum, maxWeightSize, tolerance);
  }

  l2generator():void { // random generator for level 2
    do {
      this.l1generator();
    } while (this.fixedWeights.size < 2 || this.fixedWeights.size > this.weights.length / 2);
    for (let i = 0; i < this.rows.length; i += 1) {
      for (let j = 0; j < this.rows[0].length; j += 1) {
        this.startRows[i][j] = this.rows[i][j];
      }
    }
  }

  l3generator():void { // random generator for level 3
    /*
    // generate weight sum
    let newWeightSum = 0;
    let ship1 = 0;
    let ship2 = 0;
    let ship3 = 0;
    const max = 60;

    // choose ship sizes
    do {
      ship1 = Math.floor(1 + Math.random() * 3) * 10;
      ship2 = Math.floor(1 + Math.random() * 3) * 10;
      ship3 = Math.floor(1 + Math.random() * 3) * 10;
      newWeightSum = ship1 + ship2 + ship3;
    } while (newWeightSum > max);
    this.boatCapacities = [ship1, ship2, ship3];
    this.boatCapacities.sort();

    // generate weight sum
    newWeightSum = ((Math.random() * (newWeightSum - 20)) % 10) + 20;
    console.log(newWeightSum); */

    // delete when randomizing weights
    const newWeightSum = 30; // Math.floor(1 + Math.random() * 6) * 10;
    console.log(newWeightSum);

    // choose boats that are used in the optimal case
    let remainingCapacity = newWeightSum;
    this.boatUsedOpt = [false, false, false];

    for (let i = this.boatCapacities.length - 1; i >= 0; i -= 1) {
      if (remainingCapacity - this.boatCapacities[i] >= 0) {
        remainingCapacity -= this.boatCapacities[i];
        this.boatUsedOpt[i] = true;
      }
    }

    this.chooseWeights(newWeightSum, 12, 9);

    if (this.boatUsedOpt[2] === true && this.weightSum === 30) {
      if (this.weights.length >= 6) {
        console.log('special case');
        this.boatUsedOpt = [true, true, false];
      }
    }
  }

  // chooses random weights according to the inputs
  chooseWeights(newWeightSum:number, maxWeightSize:number, sentinel:number):void {
    const startIndex = Math.floor(Math.random() * maxWeightSize);
    let remainingBoatCaps = [...this.boatCapacities];
    const chosenWeights = new Set([1]);
    let chosenWeightSum = 0;

    // start with every weight size once to see which distribution is possible
    for (let l = 0; l < maxWeightSize; l += 1) {
      chosenWeightSum = 0;
      remainingBoatCaps = [...this.boatCapacities];
      chosenWeights.clear();
      this.rows = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
      this.fixedWeights.clear();
      this.usedWeights.clear();

      for (let i = maxWeightSize; i > 0; i -= 1) {
        for (let j = 0; j < this.boatCapacities.length; j += 1) {
          const index = ((i + startIndex + l) % maxWeightSize) + 1;
          if (this.boatUsedOpt[j] && !chosenWeights.has(index)
          && remainingBoatCaps[j] - index >= 0) {
            remainingBoatCaps[j] -= index;
            chosenWeights.add(index);
            chosenWeightSum += index;

            // for l2, add pre-distributed weights
            if (this.level === 2 && Math.random() < 0.4) {
              this.fixWeight(index, j);
              console.log(i, j);
            }
          }
        }
      }
      if (chosenWeightSum + sentinel > newWeightSum) {
        break;
      }
    }

    // eslint-disable-next-line prefer-template
    console.log(remainingBoatCaps + ' caps, ' + chosenWeightSum + ' total');
    this.weights = Array.from(chosenWeights);
    this.weights.sort((a, b): number => a - b);
    this.addUpWeights();
  }

  // for l2, adds pre-distributed weights
  fixWeight(i: number, j:number):void {
    for (let l = 0; l < this.rows[0].length; l += 1) {
      if (this.rows[j][l] === 0) {
        this.rows[j][l] = i;
        this.fixedWeights.add(i);
        this.usedWeights.add(i);
        return;
      }
    }
  }

  // tests if the user has solved the task correctly
  checkSolution(level:number):void {
    const optimalWeightSum = this.sumArray();
    const allUsed = this.allWeightsUsed();
    const isOptimal = this.isOptimalSolution(level);
    if (optimalWeightSum === this.weightSum && allUsed && !this.boatOverload
     && isOptimal) {
      this.$emit('correct-solution');
    } else if (!allUsed) {
      this.$emit('false-solution', this.text.tasks.optimizeWeights.tips.tip1);
    } else if (this.boatOverload) {
      this.$emit('false-solution', this.text.tasks.optimizeWeights.tips.tip2);
    } else if (!isOptimal) {
      this.$emit('false-solution', this.text.tasks.optimizeWeights.tips.tip3);
    }
  }

  // for l3, tests if the solution is optimal, i.e. weights are maximally loaded
  isOptimalSolution(level:number):boolean {
    if (level <= 2) {
      return true;
    }

    for (let i = 0; i < this.boatUsed.length; i += 1) {
      if (this.boatUsed[i] !== this.boatUsedOpt[i]) {
        return false;
      }
    }

    return true;
  }

  // calculate sum of used weights
  sumArray():number {
    let rowSum = 0; // stores the sum for each row to test if a boat is overloaded

    let totalSum = 0; // sum of the weights that are loaded at this moment

    this.boatOverload = false;

    this.boatUsed = [false, false, false];

    for (let i = 0; i < this.boatUsed.length; i += 1) {
      for (let j = 0; j < this.numberOfFields; j += 1) {
        rowSum += this.rows[i][j];
        if (this.rows[i][j] !== 0) {
          this.boatUsed[i] = true;
        }
      }
      if (rowSum > this.boatCapacities[i]) {
        this.boatOverload = true;
      }
      totalSum += rowSum;
      rowSum = 0;
    }

    return totalSum;
  }

  // test if all weights are used
  allWeightsUsed():boolean {
    if (this.usedWeights.size === this.weights.length) {
      return true;
    }

    return false;
  }

  switchDifficulty():void {
    this.difficultGames = !this.difficultGames;
    this.nextTask();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
  border-spacing: 0.6em 1.4em;
}

tr p, img {
  display: inline-block;
  margin: 0.5em;
  vertical-align: middle;
}

td img {
  max-width: 100px;
}

.weight-depot {
  display: inline-block;
  vertical-align: middle;
}

.weight-depot img {
  width: 80px;
}
</style>
