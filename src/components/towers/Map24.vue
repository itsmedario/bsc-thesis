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
export default class Map24 extends TowersTemplate {
  availableTowers = 6;

  nrOfFields = 10;

  fields = [false, false, false, false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }
    // Skizze 4: 10 Knoten, Start oben links nach unten rechts
    this.map.addEdge(0, 1);
    this.map.addEdge(1, 2);
    this.map.addEdge(2, 3);
    this.map.addEdge(1, 4);
    this.map.addEdge(3, 5);
    this.map.addEdge(4, 7);
    this.map.addEdge(5, 9);
    this.map.addEdge(6, 7);
    this.map.addEdge(7, 8);
    this.map.addEdge(8, 9);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 6.5%;
  top: 5%;
}

.f1 {
  position: absolute;
  left: 32.9%;
  top: 5%;
}

.f2 {
  position: absolute;
  left: 59.2%;
  top: 5%;
}

.f3 {
  position: absolute;
  left: 85.4%;
  top: 5%;
}

.f4 {
  position: absolute;
  left: 32.9%;
  top: 42%;
}

.f5 {
  position: absolute;
  left: 85.4%;
  top: 41.5%;
}

.f6 {
  position: absolute;
  left: 6.5%;
  top: 78%;
}

.f7 {
  position: absolute;
  left: 32.8%;
  top: 78%;
}

.f8 {
  position: absolute;
  left: 59.2%;
  top: 77.8%;
}

.f9 {
  position: absolute;
  left: 85.4%;
  top: 77.8%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map24.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 200;
  min-height: 155;
  width: 50vw;
  height: 38.8vw;
}

.square {
  border: 2px dashed transparent;
  background: none;
  border-radius: 15px;
  height: 12%;
  width: 8%;
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
