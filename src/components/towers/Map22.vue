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
export default class Map22 extends TowersTemplate {
  availableTowers = 5;

  nrOfFields = 6;

  fields = [false, false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }

    // Skizze 3: 6 Knoten, Start oben links nach unten rechts
    this.map.addEdge(0, 1);
    this.map.addEdge(1, 2);
    this.map.addEdge(0, 3);
    this.map.addEdge(0, 4);
    this.map.addEdge(1, 4);
    this.map.addEdge(2, 4);
    this.map.addEdge(2, 5);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 6%;
  top: 7%;
}

.f1 {
  position: absolute;
  left: 44.6%;
  top: 7%;
}

.f2 {
  position: absolute;
  left: 83.5%;
  top: 7%;
}

.f3 {
  position: absolute;
  left: 6%;
  top: 76.5%;
}

.f4 {
  position: absolute;
  left: 44.6%;
  top: 76%;
}

.f5 {
  position: absolute;
  left: 83.6%;
  top: 76%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map22.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 200px;
  min-height: 157.8px;
  width: 50vw;
  height: 38.2vw;
}

.square {
  border: 2px dashed transparent;
  background: none;
  border-radius: 15px;
  height: 14%;
  width: 10%;
}

.square img {
  width: 52% !important;
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
