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
export default class Map27 extends TowersTemplate {
  availableTowers = 3;

  optimalNrOfTowers = 1;

  nrOfFields = 6;

  fields = [false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }
    // Skizze 7:  Stern aus 5 Knoten, Start oben links nach unten rechts
    this.map.addEdge(0, 2);
    this.map.addEdge(1, 2);
    this.map.addEdge(2, 3);
    this.map.addEdge(2, 4);
    this.map.addEdge(2, 5);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 44.2%;
  top: 8.2%;
}

.f1 {
  position: absolute;
  left: 9.4%;
  top: 38%;
}

.f2 {
  position: absolute;
  left: 44%;
  top: 48.3%;
}

.f3 {
  position: absolute;
  left: 81%;
  top: 29%;
}

.f4 {
  position: absolute;
  left: 24.5%;
  top: 79%;
}

.f5 {
  position: absolute;
  left: 80.8%;
  top: 61.3%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map27.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 40px;
  min-height: 38px;
  width: 40vw;
  height: 38.1vw;
}

.square {
  border: 2px dashed transparent;
  background: none;
  border-radius: 15px;
  height: 11%;
  width: 9%;
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
