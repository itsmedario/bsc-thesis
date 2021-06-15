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
export default class Map20 extends TowersTemplate {
  availableTowers = 6;

  optimalNrOfTowers = 5;

  nrOfFields = 9;

  fields = [false, false, false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }
    this.map.addEdge(0, 1);
    this.map.addEdge(1, 2);
    this.map.addEdge(3, 4);
    this.map.addEdge(4, 5);
    this.map.addEdge(6, 7);
    this.map.addEdge(7, 8);
    this.map.addEdge(0, 3);
    this.map.addEdge(1, 4);
    this.map.addEdge(2, 5);
    this.map.addEdge(3, 6);
    this.map.addEdge(4, 7);
    this.map.addEdge(5, 8);
    this.map.addEdge(0, 6);
    this.map.addEdge(2, 8);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 14%;
  top: 4%;
}

.f1 {
  position: absolute;
  left: 47%;
  top: 5%;
}

.f2 {
  position: absolute;
  left: 78%;
  top: 7%;
}

.f3 {
  position: absolute;
  left: 16%;
  top: 40%;
}

.f4 {
  position: absolute;
  left: 47%;
  top: 40%;
}

.f5 {
  position: absolute;
  left: 76%;
  top: 40%;
}

.f6 {
  position: absolute;
  left: 15%;
  top: 73%;
}

.f7 {
  position: absolute;
  left: 47%;
  top: 74%;
}

.f8 {
  position: absolute;
  left: 78%;
  top: 72%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map20.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 541px;
  min-height: 286px;
  width: 50vw;
  height: 26vw;
}

.square {
  border: 0px dashed #324197;
  background: none;
  border-radius: 15px;
  height: 18%;
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
