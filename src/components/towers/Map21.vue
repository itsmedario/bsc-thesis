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
export default class Map21 extends TowersTemplate {
  availableTowers = 5;

  optimalNrOfTowers = 4;

  nrOfFields = 7;

  fields = [false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }

    // Skizze 1: 7 Knoten, Start mitte oben im Uhrzeigersinn
    for (let i = 0; i < 7; i += 1) {
      this.map.addEdge(i, (i + 1) % 7);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 45.5%;
  top: 3%;
}

.f1 {
  position: absolute;
  left: 77.4%;
  top: 18.5%;
}

.f2 {
  position: absolute;
  left: 85.3%;
  top: 53.5%;
}

.f3 {
  position: absolute;
  left: 63.3%;
  top: 83%;
}

.f4 {
  position: absolute;
  left: 26.8%;
  top: 82.5%;
}

.f5 {
  position: absolute;
  left: 5.5%;
  top: 54%;
}

.f6 {
  position: absolute;
  left: 13%;
  top: 19%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map21.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 200px;
  min-height: 196px;
  width: 50vw;
  height: 49vw;
}

.square {
  border: 0px dashed #324197;
  background: none;
  border-radius: 15px;
  height: 10%;
  width: 10%;
}

.square img {
  width: 51% !important;
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
