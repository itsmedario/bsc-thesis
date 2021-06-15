<template>
    <div>
      <component id="gameMap" ref="gameMap" :key="reloadCounter"
       :is="this.maps[counter]"
       :language="language"
       :level="level"
       @correct-solution="correctSolution = true"
       @false-solution="correctSolution = false; tip = $event"/>
    </div>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */
import { Component, Vue, Prop } from 'vue-property-decorator';
import Map3 from '@/components/kiosks/Map3.vue';
import Map5 from '@/components/kiosks/Map5.vue';
/* import Map20 from '@/components/towers/Map20.vue';
import Map21 from '@/components/towers/Map21.vue';
import Map22 from '@/components/towers/Map22.vue';
import Map23 from '@/components/towers/Map23.vue';
import Map24 from '@/components/towers/Map24.vue';
import Map25 from '@/components/towers/Map25.vue';
import Map26 from '@/components/towers/Map26.vue';
import Map27 from '@/components/towers/Map27.vue';
import Map28 from '@/components/towers/Map28.vue';
import Map29 from '@/components/towers/Map29.vue'; */

@Component({
  components: {
    Map3,
    Map5,
    /* Map20,
    Map21,
    Map22,
    Map23,
    Map24,
    Map25,
    Map26,
    Map27,
    Map28,
    Map29, */
  },
})

export default class Kiosks extends Vue {
  @Prop({ required: true })
  level!: number;

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  counter = 0;

  reloadCounter = 0; // enables reloading the component to restart by creating a new instance

  correctSolution = false;

  tip = '';

  maps = ['Map5', 'Map3'];

  // maps = ['Map1', 'Map5', 'Map2', 'Map3', 'Map4'];

  maps2 = ['Map20', 'Map21', 'Map22', 'Map23', 'Map24', 'Map25', 'Map26', 'Map27', 'Map28', 'Map29'];

  checkSolution(level:number):void {
    if (this.correctSolution) {
      this.$emit('correct-solution');
    } else {
      this.$emit('false-solution', this.tip);
    }
  }

  nextTask():void {
    this.restart();
    if (this.level === 1) {
      this.reloadCounter += 1;
    } else {
      this.counter = (this.counter + 1) % this.maps.length;
    }
  }

  restart():void {
    this.reloadCounter += 1;
    this.correctSolution = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#gameMap {
  margin: 3em;
}

.square {
  border: 1px dashed #324197;
  background: none;
  border-radius: 15px;
  height: 18%;
  width: 10%;
}

.square img {
  width: 60% !important;
  height: auto;
}

.kiosk-field {
  height: 15% !important;
  width: 10% !important;
  max-height: 120px;
  max-width: 90px;
  padding: 1em 0 !important;
}

.kiosk-field img {
  width: 40%;
  height: auto;
}
</style>
