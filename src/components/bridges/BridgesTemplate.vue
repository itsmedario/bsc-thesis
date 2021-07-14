<template>
  <div class="bridge-game">
    <div class="map-container">
      <!-- eslint-disable-next-line vue/no-duplicate-attributes, vue/no-parsing-error, max-len -->
      <div :id="`f${i - 1}`" :class="{ borderDisplay: bridgeSelected && !fields[i - 1] && (level == 4 || availableBridges >= 1) }"
       v-for="i in nrOfEdges" :key="i" class="square"
       @click="fieldClicked(i - 1)" @dragover.prevent
       @drop.stop.prevent="dropBridge(i - 1)">
        <img :src="require(`@/assets/bridges/bridge_${fields[i - 1]}.png`)"
         :draggable="level !== 1"
         @dragstart="moveBridge(i - 1)">
      </div>
    </div>
    <div class="item-stock">
      <div class="bridge-field card clickable" v-if="level !== 1"
       @click="selectBridge()"
       @dragstart="dragBridge()" draggable="false"
       :class="{ locked: availableBridges < 1 && level != 4,
        selected: bridgeSelected == true && (level == 4 || availableBridges >= 1) }">
        <img :src="require('/src/assets/bridges/bridge.png')"
         :draggable="availableBridges >= 1  || level == 4">
      </div>
      <div class="card item-display" v-if="level !== 4 && level !== 1">
        <div>{{ availableBridges }}&#215;</div>
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

export default class BridgesTemplate extends Vue {
  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  @Prop({ required: true })
  s1!: number;

  @Prop({ required: true })
  s2!: number;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  availableBridges = 0;

  optimalNrOfBridges = 0;

  correctProposition = false;

  optimalProposition = false;

  nrOfEdges = 0;

  nrOfVertices = 0;

  // eslint-disable-next-line max-len
  statements = [[1, this.text.tasks.checkBridges.statements.s1], [2, this.text.tasks.checkBridges.statements.s2]];

  // eslint-disable-next-line max-len
  edges = [[0, 0], [1, 1]];

  map = new Graph(this.nrOfVertices);

  usedFields = new Set();

  bridgeSelected = false;

  fields = [false];

  beforeMount():void {
    this.initGraph();
    if (this.level === 1) {
      const r = new RandomGenerator();
      // eslint-disable-next-line max-len
      this.fields = r.generateSolution(this.fields, (this.optimalNrOfBridges > 1 ? this.optimalNrOfBridges - 1 : 1), this.availableBridges);
      for (let i = 0; i < this.fields.length; i += 1) {
        if (this.fields[i] === true) {
          this.usedFields.add(i);
          // eslint-disable-next-line prefer-template
          console.log(i + ' taken');
        }
      }
      const testMap = new Graph(this.usedFields.size);
      for (let i = 0; i < this.nrOfVertices; i += 1) {
        testMap.addVertex(i);
      }
      for (let i = 0; i < this.edges.length; i += 1) {
        if (this.usedFields.has(i)) {
          testMap.addEdge(this.edges[i][0], this.edges[i][1]);
        }
      }
      testMap.printGraph();
      this.correctProposition = testMap.isMST();
      this.optimalProposition = this.usedFields.size <= this.optimalNrOfBridges;
      this.checkSolution(this.level);
    }
  }

  checkSolution(level:number):void {
    if (level === 1) {
      const s1sol = this.s1 === 0;
      const s2sol = this.s2 !== 0;
      if (this.s1 === -1 || this.s2 === -1) {
        this.$emit('false-solution', this.text.tasks.checkKiosks.tips.tip1);
      } else if (s1sol !== this.correctProposition && s2sol === this.optimalProposition) {
        this.$emit('false-solution', this.text.tasks.checkKiosks.tips.tip2);
      } else if (s1sol === this.correctProposition && s2sol !== this.optimalProposition) {
        this.$emit('false-solution', this.text.tasks.checkKiosks.tips.tip3);
      } else if (s1sol === this.correctProposition && s2sol === this.optimalProposition) {
        this.$emit('correct-solution');
      }
    } else {
      const testMap = new Graph(this.nrOfVertices);
      for (let i = 0; i < this.nrOfVertices; i += 1) {
        testMap.addVertex(i);
      }
      for (let i = 0; i < this.edges.length; i += 1) {
        if (this.usedFields.has(this.edges[i])) {
          testMap.addEdge(this.edges[i][0], this.edges[i][1]);
        }
      }
      testMap.printGraph();
      const isMST = testMap.isMST();
      if (level === 2) {
        if (isMST) {
          this.$emit('correct-solution');
        } else {
          this.$emit('false-solution', this.text.tasks.buildBridges.tips.tip1);
        }
      } else if (level === 4) {
        console.log(isMST);
        if (isMST && this.optimalNrOfBridges === this.usedFields.size) {
          this.$emit('correct-solution');
        } else if (isMST) {
          this.$emit('false-solution', this.text.tasks.optimizeBridges.tips.tip2);
        } else {
          this.$emit('false-solution', this.text.tasks.optimizeBridges.tips.tip1);
        }
      }
    }
    this.initGraph();
  }

  dragBridge():void {
    if (this.level === 4 || this.availableBridges > 0) {
      this.bridgeSelected = true;
    }
  }

  dropBridge(i:number):void {
    if (this.bridgeSelected && (this.level === 4 || this.availableBridges > 0)) {
      this.bridgeSelected = true; // ensure propagation
      this.fields[i] = true;
      this.usedFields.add(this.edges[i]);
      this.bridgeSelected = false; // ensure propagation
      this.checkSolution(this.level);
      this.availableBridges -= 1;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getID(i:number):string {
    // eslint-disable-next-line prefer-template
    return 'f' + i;
  }

  initGraph():void {
    for (let i = 0; i < this.nrOfVertices; i += 1) {
      this.map.addVertex(i);
    }
  }

  fieldClicked(i:number):void {
    if (this.bridgeSelected && this.level !== 1) {
      this.dropBridge(i);
    } else if (this.fields[i] && this.level !== 1) {
      this.bridgeSelected = true; // ensure propagation
      this.fields[i] = false;
      this.usedFields.delete(this.edges[i]);
      this.availableBridges += 1;
      this.bridgeSelected = false; // ensure propagation
      this.checkSolution(this.level);
    }
  }

  moveBridge(i:number):void {
    if (this.fields[i] && this.level !== 1) {
      this.fieldClicked(i);
      this.bridgeSelected = true;
    }
  }

  restart():void {
    for (let i = 0; i < this.fields.length; i += 1) {
      this.fields[i] = false;
    }
    this.bridgeSelected = false;
    this.usedFields = new Set();
  }

  selectBridge():void { // select the bridge in the inventory
    if (this.availableBridges > 0 || this.level === 4) {
      if (this.bridgeSelected) {
        this.bridgeSelected = false;
      } else {
        this.bridgeSelected = true;
      }
    }
  }

  // switch answer n to true if false and vice versa
  toggleBox(n:number):void {
    if (n === 1) {
      this.s1 = (this.s1 + 1) % 2;
    } else if (n === 2) {
      this.s2 = (this.s2 + 1) % 2;
    }
    this.checkSolution(this.level);
  }

  // set answer n to true
  setTrue(n:number):void {
    if (n === 1) {
      this.s1 = 0;
    } else if (n === 2) {
      this.s2 = 0;
    }
    this.checkSolution(this.level);
  }

  // set answer n to false
  setFalse(n:number):void {
    if (n === 1) {
      this.s1 = 1;
    } else if (n === 2) {
      this.s2 = 1;
    }
    this.checkSolution(this.level);
  }

  // check state of statement n
  checkState(n:number):number {
    if (n === 1) {
      return this.s1;
    }
    return this.s2;
  }
}
</script>

<style scoped>
.square {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
