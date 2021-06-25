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
export default class Map23 extends TowersTemplate {
  availableTowers = 5;

  optimalNrOfTowers = 3;

  nrOfFields = 8;

  fields = [false, false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }

    // Skizze 2: 8 Knoten, Start unten links nach oben rechts
    for (let i = 0; i < 4; i += 1) {
      this.map.addEdge(i, i + 1);
    }
    this.map.addEdge(4, 6);
    this.map.addEdge(5, 6);
    this.map.addEdge(6, 7);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 5.6%;
  top: 77%;
}

.f1 {
  position: absolute;
  left: 5.6%;
  top: 42%;
}

.f2 {
  position: absolute;
  left: 26.1%;
  top: 42%;
}

.f3 {
  position: absolute;
  left: 46.5%;
  top: 42%;
}

.f4 {
  position: absolute;
  left: 67%;
  top: 42%;
}

.f5 {
  position: absolute;
  left: 87.4%;
  top: 77%;
}

.f6 {
  position: absolute;
  left: 87.4%;
  top: 42%;
}

.f7 {
  position: absolute;
  left: 87.4%;
  top: 7%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map23.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 100;
  min-height: 59.4px;
  width: 50vw;
  height: 29.7vw;
}

.square {
  border: 2px dashed transparent;
  background: none;
  border-radius: 30%;
  height: 11%;
  width: 6%;
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
