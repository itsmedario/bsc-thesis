<template>
  <div>
    <hr>
    <div class="task-box">
      <div v-for="[n, s] in statements" :key="n" class="statement-box">
        <div @click="toggleBox(n); $emit('toggle-box', n)" class="statement">
          {{ s }}
        </div>
        <div class="buttons">
          <div class="check-button clickable true-button"
            :class=" { activetrue: checkState(n) == 0 }"
            @click="setTrue(n); $emit('set-true', n)">
            {{ text.tasks.checkWeights.statements.true }}
          </div>
          <div class="check-button clickable false-button"
            :class=" { activefalse: checkState(n) == 1 }"
            @click="setFalse(n); $emit('set-false', n)">
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

export default class StatementCheck extends Vue {
  @Prop({ required: true })
  statements!: string[];

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  s1 = -1; // user's answer to statement 1

  s2 = -1;

  s3 = -1;

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

  // check if user's answers are correct
  checkSolution():void {
    const s1sol = this.s1 === 0;
    const s2sol = this.s2 === 0;
    const s3sol = this.s3 === 0;
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  border: 2px solid white;
}

.activefalse {
  border: 2px solid white;
}

</style>
