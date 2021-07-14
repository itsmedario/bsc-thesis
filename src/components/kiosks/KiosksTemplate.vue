<template>
  <div class="kiosk-game">
    <div class="map-container">
      <div id="i" v-for="i in nrOfFields" :key="i" class="square"
       :class="getClass(i - 1)"
       @click="fieldClicked(i - 1)"
       @dragover.prevent
       @drop.stop.prevent="dropKiosk(i - 1)">
        <img :src="require(`@/assets/bridges/kiosk_${fields[i - 1]}.png`)"
        :draggable="level !== 1"
         @dragstart="fieldClicked(i - 1); kioskSelected = true">
      </div>
    </div>
    <div class="item-stock">
      <div class="kiosk-field card clickable"
      v-if="level !== 1"
      @click="selectKiosk()"
      @dragstart="kioskSelected = true"
      draggable="false"
      :class="{ locked: availableKiosks < 1 && level != 4,
        selected: kioskSelected == true }">
        <img :src="require('/src/assets/bridges/kiosk_true.png')"
         :draggable="availableKiosks >= 1  || level == 4">
      </div>
      <div class="card item-display" v-if="level !== 4 && level !== 1">
        <div>
          {{ getAvailableKiosks() }}&#215;
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

export default class KiosksTemplate extends Vue {
  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  @Prop({ required: true })
  s1!: number;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  availableKiosks = 0;

  maxAvailableKiosks = 0;

  optimalNrOfKiosks = 0;

  nrOfFields = 0;

  map = new Graph(this.nrOfFields);

  usedFields = new Set();

  correctProposition = false;

  optimalProposition = false;

  // eslint-disable-next-line max-len
  statements = [[1, this.text.tasks.checkKiosks.statements.s1]];

  kioskSelected = false;

  fields = [false];

  beforeMount():void {
    this.initGraph();
    this.maxAvailableKiosks = this.availableKiosks;
    if (this.level === 1) {
      const r = new RandomGenerator();
      // eslint-disable-next-line max-len
      this.fields = r.generateSolution(this.fields, (this.optimalNrOfKiosks > 1 ? this.optimalNrOfKiosks : 1), this.availableKiosks + 1);
      for (let i = 0; i < this.fields.length; i += 1) {
        if (this.fields[i] === true) {
          this.usedFields.add(i);
        }
      }
      const arr = Array.from(this.usedFields);
      this.correctProposition = this.map.isDominatingSet(arr);
      this.optimalProposition = this.usedFields.size <= this.optimalNrOfKiosks;
      this.checkSolution(this.level);
    }
  }

  checkSolution(level:number):void {
    if (level === 1) {
      const s1sol = this.s1 === 0;
      if (this.s1 === -1) {
        this.$emit('false-solution', this.text.tasks.checkKiosks.tips.tip1);
      } else if (s1sol !== this.correctProposition) {
        this.$emit('false-solution', this.text.tasks.checkKiosks.tips.tip2);
      } else if (s1sol === this.correctProposition) {
        this.$emit('correct-solution');
      }
    } else if (level === 2) {
      const arr = Array.from(this.usedFields);
      const isDS = this.map.isDominatingSet(arr);
      if (isDS) {
        this.$emit('correct-solution');
      } else {
        this.$emit('false-solution', this.text.tasks.buildKiosks.tips.tip1);
      }
    } else if (level === 4) {
      const arr = Array.from(this.usedFields);
      const isDS = this.map.isDominatingSet(arr);
      if (isDS && this.optimalNrOfKiosks === this.usedFields.size) {
        this.$emit('correct-solution');
      } else if (isDS) {
        this.$emit('false-solution', this.text.tasks.optimizeKiosks.tips.tip2);
      } else {
        this.$emit('false-solution', this.text.tasks.optimizeKiosks.tips.tip1);
      }
    }
    this.initGraph();
  }

  dropKiosk(i:number):void {
    if ((this.level === 4 || this.availableKiosks > 0) && this.fields[i] === false) {
      this.kioskSelected = true; // ensure propagation
      this.fields[i] = true;
      this.usedFields.add(i);
      this.kioskSelected = false; // ensure propagation
      this.checkSolution(this.level);
      this.availableKiosks -= 1;
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
    if (this.kioskSelected && this.level !== 1) {
      this.dropKiosk(i);
    } else if (this.fields[i] && this.level !== 1) {
      this.kioskSelected = true; // ensure propagation
      this.fields[i] = false;
      this.usedFields.delete(i);
      this.availableKiosks += 1;
      this.kioskSelected = false; // ensure propagation
      this.checkSolution(this.level);
    }
  }

  getAvailableKiosks():string {
    // eslint-disable-next-line prefer-template
    return 'max ' + this.maxAvailableKiosks;
  }

  restart():void {
    for (let i = 0; i < this.fields.length; i += 1) {
      this.fields[i] = false;
    }
    this.kioskSelected = false;
    this.usedFields = new Set();
  }

  selectKiosk():void { // select the kiosk in the inventory
    if (this.availableKiosks > 0 || this.level !== 2) {
      if (this.kioskSelected) {
        this.kioskSelected = false;
      } else {
        this.kioskSelected = true;
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
