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

export default class Map14 extends KiosksTemplate {
  availableKiosks = 7;

  optimalNrOfKiosks = 6;

  nrOfFields = 12;

  map = new Graph(this.nrOfFields);

  fields = [false, false, false, false, false, false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }

    // Map 4 - 12 vertices, v.o.l.n.u.r., min = 6
    this.map.addEdge(0, 1);
    this.map.addEdge(1, 2);
    this.map.addEdge(2, 3);
    this.map.addEdge(1, 5);
    this.map.addEdge(2, 6);
    this.map.addEdge(4, 5);
    this.map.addEdge(5, 6);
    this.map.addEdge(6, 7);
    this.map.addEdge(5, 9);
    this.map.addEdge(6, 10);
    this.map.addEdge(8, 9);
    this.map.addEdge(9, 10);
    this.map.addEdge(10, 11);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 0%;
  top: -6%;
}

.f1 {
  position: absolute;
  left: 30.4%;
  top: -6%;
}

.f2 {
  position: absolute;
  left: 61%;
  top: -6%;
}

.f3 {
  position: absolute;
  left: 90.4%;
  top: -6%;
}

.f4 {
  position: absolute;
  left: 0%;
  top: 36%;
}

.f5 {
  position: absolute;
  left: 30.4%;
  top: 36%;
}

.f6 {
  position: absolute;
  left: 61%;
  top: 36%;
}

.f7 {
  position: absolute;
  left: 90.4%;
  top: 35.5%;
}

.f8 {
  position: absolute;
  left: 0%;
  top: 77.6%;
}

.f9 {
  position: absolute;
  left: 30.4%;
  top: 77.6%;
}

.f10 {
  position: absolute;
  left: 61%;
  top: 77.6%;
}

.f11 {
  position: absolute;
  left: 90.3%;
  top: 77.2%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map14.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 50vw;
  height: 27.5vw;
}

.square {
  border: 2px dashed transparent;
  background: none;
  border-radius: 25px;
  height: 20% !important;
  width: 11% !important;
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
