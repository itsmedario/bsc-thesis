<script lang="ts">
/* eslint-disable no-restricted-syntax */
import { Component } from 'vue-property-decorator';
import KiosksTemplate from '@/components/kiosks/KiosksTemplate.vue';
import Graph from '@/components/Graphs';

@Component({
  components: {
    KiosksTemplate,
  },
})

export default class Map5 extends KiosksTemplate {
  availableKiosks = 5;

  nrOfFields = 10;

  map = new Graph(this.nrOfFields);

  fields = [false, false, false, false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }
    this.map.addEdge(1, 2);
    this.map.addEdge(3, 4);
    this.map.addEdge(4, 5);
    this.map.addEdge(8, 9);
    this.map.addEdge(0, 3);
    this.map.addEdge(1, 3);
    this.map.addEdge(1, 4);
    this.map.addEdge(2, 5);
    this.map.addEdge(2, 6);
    this.map.addEdge(3, 7);
    this.map.addEdge(3, 8);
    this.map.addEdge(4, 8);
    this.map.addEdge(5, 9);
    this.map.addEdge(6, 9);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 2%;
  top: 10%;
}

.f1 {
  position: absolute;
  left: 35%;
  top: 9.5%;
}

.f2 {
  position: absolute;
  left: 74%;
  top: 8.5%;
}

.f3 {
  position: absolute;
  left: 18.5%;
  top: 46%;
}

.f4 {
  position: absolute;
  left: 35.5%;
  top: 46.5%;
}

.f5 {
  position: absolute;
  left: 73.5%;
  top: 47%;
}

.f6 {
  position: absolute;
  left: 92%;
  top: 47%;
}

.f7 {
  position: absolute;
  left: 2%;
  top: 84%;
}

.f8 {
  position: absolute;
  left: 35.5%;
  top: 84%;
}

.f9 {
  position: absolute;
  left: 73.5%;
  top: 83%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map8.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 250;
  min-height: 132.5px;
  width: 60vw;
  height: 31.5vw;
}

.square {
  border: 0px dashed #324197;
  background: none;
  border-radius: 25px;
  min-width: 20px;
  min-height: 20px;
  height: 14% !important;
  width: 7% !important;
}

.square img {
  width: 100% !important;
  height: auto;
}

.kiosk-field {
  height: 15% !important;
  width: 10% !important;
  max-height: 120px;
  max-width: 90px;
  padding: 1em 0 !important;
}

.kiosk-field img {
  width: 60%;
  height: auto;
}

.kiosk-game {
  position: relative;
  display: flex;
  justify-content: center;
}

</style>
