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
export default class Map26 extends TowersTemplate {
  availableTowers = 6;

  optimalNrOfTowers = 4;

  nrOfFields = 7;

  fields = [false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }
    // Skizze 6: 7 Knoten, Start mitte, von oben links im Uhrzeigersinn aussen rum
    for (let i = 1; i <= 6; i += 1) {
      this.map.addEdge(i, (i + 1) % 6);
    }
    for (let i = 0; i < 6; i += 1) {
      this.map.addEdge(0, i + 1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 46%;
  top: 42.6%;
}

.f1 {
  position: absolute;
  left: 25.1%;
  top: 5.2%;
}

.f2 {
  position: absolute;
  left: 67.5%;
  top: 5%;
}

.f3 {
  position: absolute;
  left: 83.6%;
  top: 40%;
}

.f4 {
  position: absolute;
  left: 67.3%;
  top: 80.3%;
}

.f5 {
  position: absolute;
  left: 24.9%;
  top: 80.7%;
}

.f6 {
  position: absolute;
  left: 6.9%;
  top: 47.8%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map26.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 191.4px;
  min-height: 200px;
  width: 48vw;
  height: 50vw;
}

.square {
  border: 2px dashed transparent;
  background: none;
  border-radius: 15px;
  height: 9%;
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
