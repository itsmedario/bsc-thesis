<template>
  <div>
  <div  @click="checkSolution()">Testdata:  load sum = {{ loadSum }},
     boat overloaded: {{ boatOverload }}, solution:  {{ sumArray() }},
     all used: {{  allWeightsUsed() }}</div>
    <table>
      <tr id="0">
        <td>
          <h3>Boot 1</h3>
          <img :src="require(`@/assets/transport/boat${boatsMaxLoad[0]}.png`)"
           style="width: 55%" draggable="false">
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
            <img :src="require(`@/assets/transport/boat${boatsMaxLoad[1]}.png`)"
             style="width: 55%" draggable="false">
        </td>
        <td v-for="i in colNumbers" :key="i" class="dropzone responsive " @click="dropItem(i, 2)"
         @dragstart="dropItem(i, 2)" @dragover.prevent @dragend.prevent
         @drop.stop.prevent="dropItem(i, 2)">
          <img :src="require(`@/assets/weights/size${rows[1][i-1]}.png`)"
           v-if="rows[1][i-1] != 0">
        </td>
      </tr>
      <tr>
        <td>
          <h3>Boot 3</h3>
          <img :src="require(`@/assets/transport/boat${boatsMaxLoad[2]}.png`)"
           style="width: 55%" draggable="false">
        </td>
        <td v-for="i in colNumbers" :key="i" class="dropzone responsive" @click="cardClicked(i, 3)"
         @dragstart="dropItem(i, 3)" @dragover.prevent @dragend.prevent
         @drop.stop.prevent="dropItem(i, 3)">
          <img :src="require(`@/assets/weights/size${rows[2][i-1]}.png`)"
           v-if="rows[2][i-1] != 0">
        </td>
      </tr>
    </table>

    <div class="weight-depot card clickable" v-for="i in weights"
     :key="i" :class="{ selected: selectedItem == i }" @click="selectWeight(i)"
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

  boatsMaxLoad = [10, 20, 30];

  boatOverload = false;

  loadSum = 0;

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

  addUpWeights():void {
    let sum = 0;
    for (let i = 0; i < this.weights.length; i += 1) {
      sum += this.weights[i];
    }
    this.loadSum = sum;
  }

  selectWeight(i:number):void {
    if (this.selectedItem === i) {
      this.selectedItem = 0;
    } else {
      this.selectedItem = i;
    }
  }

  cardClicked(i:number, j:number):void {
    if (this.rows[j - 1][i - 1] !== 0) {
      this.rows[j - 1][i - 1] = 0;
    } else {
      this.dropItem(i, j);
    }
  }

  dropItem(i:number, j:number): void {
    this.rows[j - 1][i - 1] = this.selectedItem;
    this.selectedItem = 0;
    this.checkSolution();
  }

  restart(): void {
    this.selectedItem = 0;
    this.rows = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
  }

  checkSolution():void {
    if (this.sumArray() && this.allWeightsUsed()) {
      this.$emit('correct-solution');
    } else {
      this.$emit('false-solution');
    }
  }

  sumArray():boolean {
    this.addUpWeights();

    let rowSum = 0;

    let totalSum = 0;

    this.boatOverload = false;

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 6; j += 1) {
        rowSum += this.rows[i][j];
      }
      if (rowSum > this.boatsMaxLoad[i]) {
        this.boatOverload = true;
      }
      totalSum += rowSum;
      rowSum = 0;
    }

    return totalSum === this.loadSum && !this.boatOverload; // achtung falscher Bool
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
