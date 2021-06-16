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

export default class Map16 extends KiosksTemplate {
  availableKiosks = 7;

  optimalNrOfKiosks = 4;

  nrOfFields = 11;

  map = new Graph(this.nrOfFields);

  fields = [false, false, false, false, false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }
    // Map 6 - 11 vertices, v.o.l.n.u.r., min = 4
    this.map.addEdge(0, 3);
    this.map.addEdge(1, 4);
    this.map.addEdge(1, 6);
    this.map.addEdge(2, 7);
    this.map.addEdge(3, 4);
    this.map.addEdge(4, 5);
    this.map.addEdge(5, 6);
    this.map.addEdge(6, 7);
    this.map.addEdge(3, 8);
    this.map.addEdge(4, 9);
    this.map.addEdge(6, 9);
    this.map.addEdge(7, 10);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 0%;
  top: -5%;
}

.f1 {
  position: absolute;
  left: 47.3%;
  top: -5%;
}

.f2 {
  position: absolute;
  left: 92.7%;
  top: -5%;
}

.f3 {
  position: absolute;
  left: 0%;
  top: 37%;
}

.f4 {
  position: absolute;
  left: 23.6%;
  top: 37%;
}

.f5 {
  position: absolute;
  left: 47.3%;
  top: 37%;
}

.f6 {
  position: absolute;
  left: 70%;
  top: 37%;
}

.f7 {
  position: absolute;
  left: 92.7%;
  top: 37%;
}

.f8 {
  position: absolute;
  left: 0%;
  top: 78.5%;
}

.f9 {
  position: absolute;
  left: 47.3%;
  top: 78.5%;
}

.f10 {
  position: absolute;
  left: 92.7%;
  top: 78.5%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map16.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 50vw;
  height: 21.25vw;
}

.square {
  border: 2px dashed transparent;
  background: none;
  border-radius: 25px;
  min-width: 20px;
  min-height: 20px;
  height: 17% !important;
  width: 8% !important;
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
