<template>
  <div class="tower-game">
    <div class="map-container">
      <div id="i" v-for="i in nrOfFields"
       :key="i"
       class="square"
       :class="getClass(i - 1)"
       @click="fieldClicked(i - 1)"
       @dragover.prevent
       @drop.stop.prevent="dropTower(i - 1)">
        <img :src="require(`@/assets/bridges/tower_${fields[i - 1]}.png`)"
         :draggable="level !== 1"
         @dragstart="fieldClicked(i - 1); towerSelected = true"
        />
      </div>
    </div>

    <div class="item-stock">
      <div class="tower-field card clickable"
      v-if="level !== 1"
      @click="selectTower()"
      @dragstart="towerSelected = true"
      draggable="false"
      :class="{ locked: availableTowers < 1 && level != 4,
       selected: towerSelected == true && (level == 4 || availableTowers >= 1)}">
        <img :src="require('/src/assets/bridges/tower.png')"
         :draggable="availableTowers >= 1 || level == 4">
      </div>
      <div class="card item-display" v-if="level !== 4 && level !== 1">
        <div>
          {{ getAvailableTowers() }}&#215;
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */
import { Component, Vue, Prop } from 'vue-property-decorator';
import Graph from '@/components/Graphs';
import RandomGenerator from '@/components/RandomGenerator';

@Component({
  components: {},
})

export default class TowersTemplate extends Vue {
  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  @Prop({ required: true })
  s1!: number;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  availableTowers = 0;

  maxAvailableTowers = 0;

  optimalNrOfTowers = 0;

  nrOfFields = 0;

  map = new Graph(this.nrOfFields);

  usedFields = new Set();

  correctProposition = false;

  optimalProposition = false;

  // eslint-disable-next-line max-len
  statements = [[1, this.text.tasks.checkTowers.statements.s1]];

  towerSelected = false;

  fields = [false];

  beforeMount():void {
    this.initGraph();
    this.maxAvailableTowers = this.availableTowers;
    if (this.level === 1) {
      const r = new RandomGenerator();
      // eslint-disable-next-line max-len
      this.fields = r.generateSolution(this.fields, (this.optimalNrOfTowers > 1 ? this.optimalNrOfTowers : 1), this.availableTowers + 1);
      for (let i = 0; i < this.fields.length; i += 1) {
        if (this.fields[i] === true) {
          this.usedFields.add(i);
        }
      }
      const arr = Array.from(this.usedFields);
      this.correctProposition = this.map.isVertexCover(arr);
      this.optimalProposition = this.usedFields.size <= this.optimalNrOfTowers;
      this.checkSolution(this.level);
    }
  }

  checkSolution(level:number):void {
    if (level === 1) {
      const s1sol = this.s1 === 0;
      if (this.s1 === -1) {
        this.$emit('false-solution', this.text.tasks.checkTowers.tips.tip1);
      } else if (s1sol !== this.correctProposition) {
        this.$emit('false-solution', this.text.tasks.checkTowers.tips.tip2);
      } else if (s1sol === this.correctProposition) {
        this.$emit('correct-solution');
      }
    } else if (level === 2) {
      const arr = Array.from(this.usedFields);
      const isVC = this.map.isVertexCover(arr);
      if (isVC) {
        this.$emit('correct-solution');
      } else {
        this.$emit('false-solution', this.text.tasks.buildTowers.tips.tip2);
      }
    } else if (level === 4) {
      const arr = Array.from(this.usedFields);
      const isVC = this.map.isVertexCover(arr);
      if (isVC && this.optimalNrOfTowers === this.usedFields.size) {
        this.$emit('correct-solution');
      } else if (isVC) {
        this.$emit('false-solution', this.text.tasks.optimizeTowers.tips.tip2);
      } else {
        this.$emit('false-solution', this.text.tasks.optimizeTowers.tips.tip1);
      }
    }
    this.initGraph();
  }

  dropTower(i:number):void {
    if ((this.level === 4 || this.availableTowers > 0) && this.fields[i] === false) {
      this.towerSelected = true; // ensure propagation
      this.fields[i] = true;
      this.usedFields.add(i);
      this.towerSelected = false; // ensure propagation
      this.checkSolution(this.level);
      this.availableTowers -= 1;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getClass(i:number):string {
    // eslint-disable-next-line prefer-template
    return 'f' + i;
  }

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }
  }

  fieldClicked(i:number):void {
    if (this.towerSelected && this.level !== 1) {
      this.dropTower(i);
    } else if (this.fields[i] && this.level !== 1) {
      this.towerSelected = true; // ensure propagation
      this.fields[i] = false;
      this.usedFields.delete(i);
      this.availableTowers += 1;
      this.towerSelected = false; // ensure propagation
      this.checkSolution(this.level);
    }
  }

  getAvailableTowers():string {
    // eslint-disable-next-line prefer-template
    return 'max ' + this.maxAvailableTowers;
  }

  restart():void {
    for (let i = 0; i < this.fields.length; i += 1) {
      this.fields[i] = false;
    }
    this.towerSelected = false;
    this.usedFields = new Set();
  }

  selectTower():void { // select the tower in the inventory
    if (this.availableTowers > 0 || this.level !== 2) {
      if (this.towerSelected) {
        this.towerSelected = false;
      } else {
        this.towerSelected = true;
      }
    }
  }

  // switch answer n to true if false and vice versa
  toggleBox(n:number):void {
    if (this.s1 !== 0) {
      this.s1 = 0;
    } else {
      this.s1 = 1;
    }
    this.checkSolution(this.level);
  }

  // set answer n to true
  setTrue(n:number):void {
    if (n === 1) {
      this.s1 = 0;
    }
    this.checkSolution(this.level);
  }

  // set answer n to false
  setFalse(n:number):void {
    if (n === 1) {
      this.s1 = 1;
    }
    this.checkSolution(this.level);
  }

  // check state of statement n
  checkState(n:number):number {
    return this.s1;
  }
}
</script>

<style scoped>

.task-box {
  width: 100%;
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
