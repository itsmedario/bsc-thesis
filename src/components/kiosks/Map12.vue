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

export default class Map12 extends KiosksTemplate {
  availableKiosks = 6;

  optimalNrOfKiosks = 4;

  nrOfFields = 11;

  map = new Graph(this.nrOfFields);

  fields = [false, false, false, false, false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }

    // Map 2 - 11 vertices, v.o.l.n.u.r., min = 4
    this.map.addEdge(0, 1);
    this.map.addEdge(1, 2);
    this.map.addEdge(2, 3);
    this.map.addEdge(0, 4);
    this.map.addEdge(2, 5);
    this.map.addEdge(5, 6);
    this.map.addEdge(4, 7);
    this.map.addEdge(5, 9);
    this.map.addEdge(7, 8);
    this.map.addEdge(8, 9);
    this.map.addEdge(9, 10);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 0.3%;
  top: -4%;
}

.f1 {
  position: absolute;
  left: 30.8%;
  top: -4%;
}

.f2 {
  position: absolute;
  left: 61.2%;
  top: -4%;
}

.f3 {
  position: absolute;
  left: 90.6%;
  top: -4%;
}

.f4 {
  position: absolute;
  left: 0.3%;
  top: 38%;
}

.f5 {
  position: absolute;
  left: 61.2%;
  top: 38%;
}

.f6 {
  position: absolute;
  left: 90.6%;
  top: 38%;
}

.f7 {
  position: absolute;
  left: 0.3%;
  top: 79.6%;
}

.f8 {
  position: absolute;
  left: 30.8%;
  top: 79.6%;
}

.f9 {
  position: absolute;
  left: 61.2%;
  top: 79.6%;
}

.f10 {
  position: absolute;
  left: 90.6%;
  top: 79.6%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map12.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 50px;
  min-height: 27.5px;
  width: 50vw;
  height: 27.5vw;
}

.square {
  border: 2px dashed transparent;
  background: none;
  border-radius: 25px;
  min-width: 20px;
  min-height: 20px;
  height: 18% !important;
  width: 10% !important;
}

.square img {
  width: 100% !important;
  height: auto;
}

.kiosk-field {
  height: 15% !important;
  width: 100% !important;
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
