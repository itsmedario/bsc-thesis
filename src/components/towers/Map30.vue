<template>
  <div class="tower-game">
    <div class="map-container">
      <div id="i" v-for="i in nrOfFields" :key="i" class="square" :class="getClass(i - 1)"
           @click="fieldClicked(i - 1)" @dragover.prevent
           @drop.stop.prevent="dropTower(i - 1)">
            <img :src="require(`@/assets/bridges/tower_${fields[i - 1]}.png`)"
            style="width:40%" draggable="true"
            @dragstart="fieldClicked(i - 1); towerSelected = true">
      </div>
    </div>
    <div class="tower-field card clickable" @click="selectTower()"
      @dragstart="towerSelected = true" draggable="false"
      :class="{ selected: towerSelected == true }">
      <img :src="require('/src/assets/bridges/tower.png')" draggable="true">
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */
import { Component } from 'vue-property-decorator';
import TowersTemplate from '@/components/towers/TowersTemplate.vue';

@Component({
  components: {
    TowersTemplate,
  },
})

export default class Map4 extends TowersTemplate {
  availableTowers = 4;

  nrOfFields = 9;

  fields = [false, false, false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < 9; i += 1) {
      this.map.addVertex(i);
    }
    this.map.addEdge(0, 1);
    this.map.addEdge(1, 2);
    this.map.addEdge(3, 4);
    this.map.addEdge(6, 7);
    this.map.addEdge(7, 8);
    this.map.addEdge(0, 3);
    this.map.addEdge(1, 4);
    this.map.addEdge(1, 5);
    this.map.addEdge(3, 6);
    this.map.addEdge(4, 7);
    this.map.addEdge(5, 7);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 10%;
  top: 7%;
}

.f1 {
  position: absolute;
  left: 44%;
  top: 8%;
}

.f2 {
  position: absolute;
  left: 79%;
  top: 7%;
}

.f3 {
  position: absolute;
  left: 9%;
  top: 44%;
}

.f4 {
  position: absolute;
  left: 44%;
  top: 43%;
}

.f5 {
  position: absolute;
  left: 75%;
  top: 44%;
}

.f6 {
  position: absolute;
  left: 24%;
  top: 72%;
}

.f7 {
  position: absolute;
  left: 44%;
  top: 72%;
}

.f8 {
  position: absolute;
  left: 76%;
  top: 77%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map4_empty.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 439px;
  min-height: 354px;
  width: 50vw;
  height: 40vw;
}

.square {
  border: 0px dashed #324197;
  background: none;
  border-radius: 15px;
  height: 15%;
  width: 12%;
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
