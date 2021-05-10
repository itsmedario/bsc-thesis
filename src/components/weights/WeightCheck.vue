<template>
  <div>
    <div class="card info-card responsive" style="max-width: 1500px">
        <img :src="require(`@/assets/faces/face${counter + 1}.png`)"
        style="width: 5%" draggable="false">
        <p  style="font-size: 1.2em">{{ names[(counter)] }} wollte diese Gewichte verteilen:</p>
        <img v-for="i in weights" :key="i" :src="require(`@/assets/weights/size${i}.png`)"
         draggable="false" style="width: 5%">
    </div>

    <table>
      <tr id="0" v-for="i in 3" :key="i">
        <td>
          <h3>Boot {{ i }}</h3>
          <img :src="require(`@/assets/transport/boat${boatsCapacities[i - 1]}.png`)"
           style="width: 40%" draggable="false">
        </td>
        <td v-for="j in 6" :key="j" class="fixed-field">
          <img :src="require(`@/assets/weights/size${rows[i - 1][j - 1]}.png`)" draggable="false">
        </td>
      </tr>
    </table>
    <hr>
    <div  class="checkBox">
      <div v-for="[n, s] in statements" :key="n">
        <div class="statements" @click="toggleBox(n)"> {{ s }} </div>
        <div class="check-button clickable false-button"
          :class=" { activefalse: checkState(n) == false }"
          @click="setFalse(n)">
          Falsch
        </div>
        <div class="check-button clickable true-button"
          :class=" { activetrue: checkState(n) == true }"
          @click="setTrue(n)">
          Richtig
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})

export default class WeightCheck extends Vue {
  names = ['Mike', 'Jane', 'Kubko', 'Anna', 'Peter', 'Steffi', 'Jan', 'Bea'];

  counter = 0;

  eachWeightUsed = true; // s1

  multipleWeightUse = true; // s2

  boatOverload = true; // s3

  statements = [[1, 'Jedes Gewicht ist verwendet worden.'],
    [2, 'Kein Gewicht ist mehrmals verwendet worden.'],
    [3, 'Kein Boot ist zu schwer beladen.'],
    /* [4, 'Es wurde ein Gewicht verwendet, das nicht zum Vorschlag gehört'] */];

  s1 = false; // user's answer to statement 1

  s2 = false;

  s3 = false;

  weights = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12]; // proposed weights

  weightSum = -1; // sum of proposed weights

  boatsCapacities = [10, 20, 30];

  actualBoatLoad = [10, 22, 30]; // actual load on each boat

  // actual weight distribution
  rows = [[5, 1, 4, 0, 0, 0], [12, 6, 4, 0, 0, 0], [7, 10, 8, 2, 3, 0]];

  chosenWeights = new Set(this.weights); // weights that are proposed

  actualWeights = new Set([0]); // weights that are actually distributed

  toggleBox(n:number):void {
    if (n === 1) {
      this.s1 = !this.s1;
    } else if (n === 2) {
      this.s2 = !this.s2;
    } else if (n === 3) {
      this.s3 = !this.s3;
    }
  }

  setTrue(n:number):void {
    if (n === 1) {
      this.s1 = true;
    } else if (n === 2) {
      this.s2 = true;
    } else if (n === 3) {
      this.s3 = true;
    }
  }

  setFalse(n:number):void {
    if (n === 1) {
      this.s1 = false;
    } else if (n === 2) {
      this.s2 = false;
    } else if (n === 3) {
      this.s3 = false;
    }
  }

  checkState(n:number):boolean {
    if (n === 1) {
      return this.s1;
    }
    if (n === 2) {
      return this.s2;
    }
    return this.s3;
  }

  generateSolution():void {
    this.chosenWeights.clear();
    this.actualWeights.clear();
    let ship1 = 0;
    let ship2 = 0;
    let ship3 = 0;
    const maxWeightSize = 12;
    const max = 60;
    let newWeightSum = 0;
    let chosenWeightSum = 0;

    // choose ship sizes
    do {
      ship1 = Math.floor(1 + Math.random() * 3) * 10;
      ship2 = Math.floor(1 + Math.random() * 3) * 10;
      ship3 = Math.floor(1 + Math.random() * 3) * 10;
      newWeightSum = ship1 + ship2 + ship3;
    } while (newWeightSum > max);
    this.boatsCapacities = [ship1, ship2, ship3];

    // choose weights
    const sentinel = 4;
    let randomWeight = 0;

    while (chosenWeightSum + sentinel <= newWeightSum) {
      chosenWeightSum = 0;
      this.chosenWeights.clear();
      while (chosenWeightSum <= newWeightSum) {
        randomWeight = Math.floor(1 + Math.random() * maxWeightSize);
        if (!this.chosenWeights.has(randomWeight)) {
          this.chosenWeights.add(randomWeight);
          chosenWeightSum += randomWeight;
        }
      }
      this.chosenWeights.delete(randomWeight);
      chosenWeightSum -= randomWeight;
    }

    // add extra weight exceeding boat capacity
    if (chosenWeightSum + randomWeight < newWeightSum + 5 && Math.random() > 0.3) {
      this.chosenWeights.add(randomWeight);
      chosenWeightSum += randomWeight;
      console.log(chosenWeightSum);
    }

    // transform to array and sort weights
    this.weights = Array.from(this.chosenWeights);
    this.weights.sort((a, b): number => a - b);

    // distribute weights among boats
    const tolerance = 2;

    for (let i = this.weights.length - 1; i >= 0; i -= 1) {
      // distribute weights as well as possible
      for (let j = 0; j < 3; j += 1) {
        if (this.weights[i] <= this.boatsCapacities[j] - this.actualBoatLoad[j]) {
          this.addWeight(i, j);
          this.actualBoatLoad[j] += this.weights[i];
          break;
        }
      }

      // distribute remaining weights even if boat capacity is exceeded
      for (let j = 0; j < 3; j += 1) {
        if (this.weights[i] <= this.boatsCapacities[j] - this.actualBoatLoad[j] + tolerance
         && !this.actualWeights.has(this.weights[i])
         && !this.boatOverload) {
          this.addWeight(i, j);
          this.actualBoatLoad[j] += this.weights[i];
          this.boatOverload = true;
          break;
        }
      }
    }

    // if boats not yet overloaded, add another random weight
    this.boatOverloadCheck();
    if (!this.boatOverload) {
      randomWeight = Math.floor(Math.random() * 12);
      for (let j = 0; j < 3; j += 1) {
        if (this.weights[randomWeight]
         <= this.boatsCapacities[j] - this.actualBoatLoad[j] + tolerance) {
          this.addWeight(randomWeight, j);
          this.actualBoatLoad[j] += this.weights[randomWeight];
          console.log(this.weights[randomWeight]);
          break;
        }
      }
    }

    // check if statements are actually true
    this.weightCheck();
    this.boatOverloadCheck();
  }

  // place weight i in boat j
  addWeight(i:number, j:number):void {
    for (let l = 0; l < 6; l += 1) {
      if (this.rows[j][l] === 0 && this.weights[i] !== 0) {
        this.rows[j][l] = this.weights[i];
        this.actualWeights.add(this.weights[i]);
        return;
      }
    }
  }

  restart(): void {
    this.s1 = false;
    this.s2 = false;
    this.s3 = false;
  }

  nextTask():void {
    this.counter = (this.counter + 1) % 8;
    this.restart();
    this.rows = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
    this.weights = [0];
    this.actualBoatLoad = [0, 0, 0];
    this.generateSolution();
  }

  weightCheck():void {
    this.actualWeights.clear();
    this.eachWeightUsed = true;
    this.multipleWeightUse = false;

    for (let i = 0; i < this.rows.length; i += 1) {
      for (let j = 0; j < 5; j += 1) {
        if (this.actualWeights.has(this.rows[i][j])) {
          this.multipleWeightUse = true;
        }
        if (this.rows[i][j] !== 0) {
          this.actualWeights.add(this.rows[i][j]);
        }
      }
    }
    for (let i = 0; i < this.weights.length; i += 1) {
      if (!this.actualWeights.has(this.weights[i])) {
        this.eachWeightUsed = false;
      }
    }
  }

  boatOverloadCheck():void {
    this.boatOverload = false;
    for (let i = 0; i < 3; i += 1) {
      if (this.actualBoatLoad[i] > this.boatsCapacities[i]) {
        this.boatOverload = true;
        return;
      }
    }
  }

  checkSolution():void {
    if (this.s1 === this.eachWeightUsed
     && this.s2 === !this.multipleWeightUse
     && this.s3 === !this.boatOverload) {
      this.$emit('correct-solution');
    } else {
      this.$emit('false-solution', 'Tipp: Zähle die Gewichte für jedes einzelne Boot zusammen!');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
  border-spacing: 0.3em 0.7em;
}

p, table h3, img {
  display: inline-block;
  margin: 0.5em;
  vertical-align: middle;
}

td img {
  width: 100px;
}

.checkBox {
  position: relative;
  width: 80%;
  align-items: center;
  justify-content: center;
}

.info-card {
  padding: 0em !important;
  margin: 0em !important;
}

.statement-check {
  position: relative;
  text-align: left !important;
}

.statements {
  display: inline-block;
  font-size: 1.1em;
  margin: 0.5em;
  padding: 0.4em;
}

.check-button {
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  float: right;
}

.true-button {
  background: rgb(192, 226, 192) 2px;
  border-radius: 10px 0px 0px 10px;
  border: 2px solid rgb(192, 226, 192);
  border-right: 2px solid black;
}

.false-button {
  background: rgb(230, 124, 124);
  border-radius: 0px 10px 10px 0px;
  border: 2px solid rgb(230, 124, 124);
  border-left: 2px solid black;
}

.activetrue {
  border: 2px solid black;
  background: rgb(48, 194, 48)  !important;
}

.activefalse {
  border: 2px solid black;
  background: rgb(236, 46, 46)  !important;
}

</style>
