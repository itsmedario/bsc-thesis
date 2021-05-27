<template>
  <div>
    <div class="card info-card" style="max-width: 1500px">
        <img :src="require(`@/assets/faces/face${counter + 1}.png`)"
        style="height: 80px" draggable="false">
        <div id="intro">
          <p>{{ names[(counter)] }} {{ text.tasks.checkWeights.intro }}</p>
        </div>
        <img v-for="i in weights" :key="i" :src="require(`@/assets/weights/size${i}.png`)"
         draggable="false" style="width: auto; min-width: 80px; height: 60px">
    </div>

    <table>
      <tr id="0" v-for="i in boatCapacities.length" :key="i">
        <td>
          <p style="font-size: 1.3em" class="hidden-mobile">Boot {{ i }}</p>
          <img :src="require(`@/assets/transport/boatmax${boatCapacities[i - 1]}.png`)"
           style="width: 40%; min-width: 80px" draggable="false">
        </td>
        <td v-for="j in rows[0].length" :key="j" class="fixedField">
          <img :src="require(`@/assets/weights/size${rows[i - 1][j - 1]}.png`)" draggable="false">
        </td>
      </tr>
    </table>

    <hr>

    <div  class="task-box">
      <div v-for="[n, s] in statements" :key="n" class="statement-box">
        <div @click="toggleBox(n)" class="statement">
          {{ s }}
        </div>
        <div class="buttons">
          <div class="check-button clickable true-button"
            :class=" { activetrue: checkState(n) == 0 }"
            @click="setTrue(n)">
            {{ text.tasks.checkWeights.statements.true }}
          </div>
          <div class="check-button clickable false-button"
            :class=" { activefalse: checkState(n) == 1 }"
            @click="setFalse(n)">
            {{ text.tasks.checkWeights.statements.false }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})

export default class WeightCheck extends Vue {
  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  names = ['Mike', 'Jane', 'Kubko', 'Anna', 'Peter', 'Steffi', 'Jan', 'Bea'];

  counter = 0;

  difficultGames = false;

  eachWeightUsed = true; // s1

  multipleWeightUse = true; // s2

  boatOverload = true; // s3

  statements = [[1, 'Jedes Gewicht ist verwendet worden.'],
    [2, 'Kein Gewicht ist mehrmals verwendet worden.'],
    [3, 'Kein Boot ist zu schwer beladen.'],
    /* [4, 'Es wurde ein Gewicht verwendet, das nicht zum Vorschlag gehört'] */];

  s1 = -1; // user's answer to statement 1

  s2 = -1;

  s3 = -1;

  weights = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12]; // proposed weights

  weightSum = 60; // sum of proposed weights

  boatCapacities = [10, 20, 30];

  actualBoatLoad = [10, 22, 30]; // actual load on each boat

  // actual weight distribution
  rows = [[5, 1, 4, 0, 0, 0], [12, 6, 4, 0, 0, 0], [7, 10, 8, 2, 3, 0]];

  chosenWeights = new Set(this.weights); // weights that are proposed

  actualWeights = new Set(this.weights); // weights that are actually distributed

  beforeMount():void{ // pre-computed function, gets executed when module is loaded/mounted
    this.nextTask();
  }

  // switch answer n to true if false and vice versa
  toggleBox(n:number):void {
    if (n === 1) {
      this.s1 = (this.s1 + 1) % 2;
    } else if (n === 2) {
      this.s2 = (this.s2 + 1) % 2;
    } else if (n === 3) {
      this.s3 = (this.s3 + 1) % 2;
    }
  }

  // set answer n to true
  setTrue(n:number):void {
    if (n === 1) {
      this.s1 = 0;
    } else if (n === 2) {
      this.s2 = 0;
    } else if (n === 3) {
      this.s3 = 0;
    }
  }

  // set answer n to false
  setFalse(n:number):void {
    if (n === 1) {
      this.s1 = 1;
    } else if (n === 2) {
      this.s2 = 1;
    } else if (n === 3) {
      this.s3 = 1;
    }
  }

  // check state of statement n
  checkState(n:number):number {
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
    if (this.difficultGames) {
      do {
        ship1 = Math.floor(1 + Math.random() * 3) * 10;
        ship2 = Math.floor(1 + Math.random() * 3) * 10;
        ship3 = Math.floor(1 + Math.random() * 3) * 10;
        newWeightSum = ship1 + ship2 + ship3;
      } while (newWeightSum > max);
      this.boatCapacities = [ship1, ship2, ship3];
    } else {
      this.boatCapacities = [20, 20, 20];
      newWeightSum = 60;
    }
    // choose weights
    const sentinel = 4;
    let randomWeight = 0;

    while (chosenWeightSum + sentinel <= newWeightSum || this.chosenWeights.size < 5
    || (!this.difficultGames && this.chosenWeights.size > 7)) {
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

    // transform to array
    this.weights = Array.from(this.chosenWeights);
    this.weights.sort((a, b): number => a - b);

    // distribute weights among boats
    const tolerance = 2;

    for (let i = this.weights.length - 1; i >= 0; i -= 1) {
      // distribute weights as well as possible
      for (let j = 0; j < this.boatCapacities.length; j += 1) {
        if (this.weights[i] <= this.boatCapacities[j] - this.actualBoatLoad[j]) {
          this.addWeight(this.weights[i], j);
          this.actualBoatLoad[j] += this.weights[i];
          break;
        }
      }
      // distribute remaining weights even if boat capacity is exceeded
      for (let j = 0; j < this.boatCapacities.length; j += 1) {
        if (this.actualBoatLoad[j] + this.weights[i] <= this.boatCapacities[j] + tolerance
         && !this.actualWeights.has(this.weights[i])
         && !this.boatOverload
         && Math.random() > 0.3) {
          this.addWeight(this.weights[i], j);
          this.actualBoatLoad[j] += this.weights[i];
          break;
        }
      }
    }

    // if boats not yet overloaded, add another random weight
    this.boatOverloadCheck();
    if (!this.boatOverload && Math.random() > 0.3) {
      randomWeight = 1 + Math.floor(Math.random() * (maxWeightSize / 2));
      // eslint-disable-next-line prefer-template
      console.log('Try to distribute extra weight ' + randomWeight);
      for (let j = 0; j < this.boatCapacities.length; j += 1) {
        if (this.actualBoatLoad[j] + randomWeight
         <= this.boatCapacities[j] + tolerance) {
          this.addWeight(randomWeight, j);
          this.actualBoatLoad[j] += randomWeight;
          // eslint-disable-next-line prefer-template
          console.log(randomWeight + ' extra distributed');
          break;
        }
      }
    }
    /*
    // sort weights s.t. its not apparent that a fake weight has been inserted
    for (let i = 0; i < this.rows.length; i += 1) {
      this.rows[i].sort((a, b): number => a - b);
    }
    */
    // check if statements are actually true
    this.weightCheck();
    this.boatOverloadCheck();
  }

  // place weight i in boat j
  addWeight(i:number, j:number):void {
    for (let l = 0; l < this.rows[0].length; l += 1) {
      if (this.rows[j][l] === 0 && i !== 0) {
        this.rows[j][l] = i;
        this.actualWeights.add(i);
        return;
      }
    }
  }

  restart(): void {
    this.s1 = -1;
    this.s2 = -1;
    this.s3 = -1;
  }

  nextTask():void {
    this.counter = (this.counter + 1) % this.names.length;
    this.restart();
    this.rows = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
    this.weights = [0];
    this.actualBoatLoad = [0, 0, 0];
    this.generateSolution();
  }

  // check if how many times each weight is used
  weightCheck():void {
    this.actualWeights.clear();
    this.eachWeightUsed = true;
    this.multipleWeightUse = false;

    for (let i = 0; i < this.rows.length; i += 1) {
      for (let j = 0; j < this.rows[0].length; j += 1) {
        if (this.rows[i][j] !== 0) {
          if (this.actualWeights.has(this.rows[i][j])) {
            this.multipleWeightUse = true;
          }
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

  // check if a boat is overloaded
  boatOverloadCheck():void {
    this.boatOverload = false;
    for (let i = 0; i < this.boatCapacities.length; i += 1) {
      if (this.actualBoatLoad[i] > this.boatCapacities[i]) {
        this.boatOverload = true;
        return;
      }
    }
  }

  // check if user's answers are correct
  checkSolution():void {
    const s1sol = this.s1 === 0;
    const s2sol = this.s2 === 0;
    const s3sol = this.s3 === 0;
    if (this.s1 === -1 || this.s2 === -1 || this.s3 === -1) {
      this.$emit('false-solution', this.text.tasks.checkWeights.tips.tip1);
    } else if (s1sol === this.eachWeightUsed
     && s2sol === !this.multipleWeightUse
     && s3sol === !this.boatOverload) {
      this.$emit('correct-solution');
    } else if (s3sol === this.boatOverload) {
      this.$emit('false-solution', this.text.tasks.checkWeights.tips.tip2);
    } else if (s2sol === this.multipleWeightUse) {
      this.$emit('false-solution', this.text.tasks.checkWeights.tips.tip3);
    } else if (s1sol === !this.eachWeightUsed) {
      this.$emit('false-solution', this.text.tasks.checkWeights.tips.tip4);
    }
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

#intro {
  height: 80px;
  display: flex;
  align-content: flex-end;
}

.task-box {
  position:absolute;
  width: 70%;
}

.statement-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

}

.statement-check {
  position: relative;
  text-align: left !important;
}

.statement {
  display: inline-block;
  font-size: 1.1em;
  margin: 1.1em;
  padding: 0.1em;
  border-bottom: 3px solid transparent;
  transition: all 0.25s linear;
  position: relative;
}

.statement:hover {
  cursor: pointer;
}

.statement:before {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background-color: black;
  position: absolute;
  left: 0;
  bottom: -3px;
  transform-origin: left;
  transform: scale(0);
  transition: 0.25s linear;
}

.statement:hover:before {
  transform: scale(1);
}

.check-button {
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  width: 3em;
  display: inline-block;
}

.true-button {
  background: #28a745;
  border-radius: 10px 0px 0px 10px;
  border: 2px solid #28a745;
}

.false-button {
  background: #dc3545;
  border-radius: 0px 10px 10px 0px;
  border: 2px solid #dc3545;
}

.activetrue {
  border: 3px solid white;
}

.activefalse {
  border: 3px solid white;
}

</style>
