<script lang="ts">
/* eslint-disable no-restricted-syntax */
import { Component } from 'vue-property-decorator';
import TowersTemplate from '@/components/towers/TowersTemplate.vue';

@Component({
  components: {
    TowersTemplate,
  },
})

// TowersTemplate contains all important functions for the Tower game
export default class Map25 extends TowersTemplate {
  availableTowers = 5;

  optimalNrOfTowers = 3;

  nrOfFields = 7;

  fields = [false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }
    // Skizze 5: 7 Knoten, Start mitte im Uhrzeigersinn aussen rum
    for (let i = 0; i < 6; i += 1) {
      this.map.addEdge(i, i + 1);
    }
    this.map.addEdge(1, 6);
    this.map.addEdge(0, 3);
    this.map.addEdge(0, 5);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 44.7%;
  top: 44.5%;
}

.f1 {
  position: absolute;
  left: 44.6%;
  top: 3.6%;
}

.f2 {
  position: absolute;
  left: 81.8%;
  top: 21%;
}

.f3 {
  position: absolute;
  left: 81.7%;
  top: 64.5%;
}

.f4 {
  position: absolute;
  left: 44.6%;
  top: 84%;
}

.f5 {
  position: absolute;
  left: 8%;
  top: 64.5%;
}

.f6 {
  position: absolute;
  left: 8%;
  top: 21.2%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map25.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 31px;
  min-height: 40px;
  width: 31.7vw;
  height: 40vw;
}

.square {
  border: 2px dashed transparent;
  background: none;
  border-radius: 15px;
  height: 8%;
  width: 10%;
}

.square img {
  width: 60% !important;
  height: auto;
}

.tower-field {
  height: 15% !important;
  width: 10% !important;
  padding: 1em 0 !important;
  min-width: 85px !important;
}

.tower-field img {
  width: 38%;
  height: auto;
}

.tower-game {
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

</style>
