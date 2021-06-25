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
export default class Map28 extends TowersTemplate {
  availableTowers = 6;

  optimalNrOfTowers = 4;

  nrOfFields = 7;

  fields = [false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }
    // Skizze 8: 7 Knoten, Start oben links nach unten rechts
    this.map.addEdge(0, 1);
    this.map.addEdge(0, 3);
    this.map.addEdge(1, 3);
    this.map.addEdge(2, 3);
    this.map.addEdge(3, 4);
    this.map.addEdge(2, 5);
    this.map.addEdge(3, 5);
    this.map.addEdge(3, 6);
    this.map.addEdge(4, 6);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 28.9%;
  top: 8%;
}

.f1 {
  position: absolute;
  left: 63.9%;
  top: 8%;
}

.f2 {
  position: absolute;
  left: 6.7%;
  top: 48%;
}

.f3 {
  position: absolute;
  left: 46%;
  top: 45.8%;
}

.f4 {
  position: absolute;
  left: 85%;
  top: 48%;
}

.f5 {
  position: absolute;
  left: 25%;
  top: 77%;
}

.f6 {
  position: absolute;
  left: 69.3%;
  top: 79%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map28.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 200px;
  min-height: 190.6px;
  width: 40vw;
  height: 38.6vw;
}

.square {
  border: 2px dashed transparent;
  background: none;
  border-radius: 15px;
  height: 10%;
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
