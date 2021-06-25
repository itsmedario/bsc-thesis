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

export default class Map3 extends KiosksTemplate {
  availableKiosks = 5;

  optimalNrOfKiosks = 3;

  nrOfFields = 11;

  map = new Graph(this.nrOfFields);

  fields = [false, false, false, false, false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }
    this.map.addEdge(0, 1);
    this.map.addEdge(1, 2);
    this.map.addEdge(3, 4);
    this.map.addEdge(4, 5);
    this.map.addEdge(5, 6);
    this.map.addEdge(6, 7);
    this.map.addEdge(8, 9);
    this.map.addEdge(9, 10);
    this.map.addEdge(0, 4);
    this.map.addEdge(1, 5);
    this.map.addEdge(2, 6);
    this.map.addEdge(4, 8);
    this.map.addEdge(5, 9);
    this.map.addEdge(6, 10);
    this.map.addEdge(0, 3);
    this.map.addEdge(3, 8);
    this.map.addEdge(2, 7);
    this.map.addEdge(7, 10);

    /*
    // Map 1 - 9 vertices, v.o.l.n.u.r., min = 3
    this.map.addEdge(0, 1);
    this.map.addEdge(2, 3);
    this.map.addEdge(1, 4);
    this.map.addEdge(2, 4);
    this.map.addEdge(4, 6);
    this.map.addEdge(4, 7);
    this.map.addEdge(5, 6);
    this.map.addEdge(7, 8);
    this.map.addEdge(0, 5);
    this.map.addEdge(1, 6);
    this.map.addEdge(2, 7);
    this.map.addEdge(3, 8);

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

    // Map 3 - 9 vertices, v.o.l.n.u.r., min = 3
    this.map.addEdge(0, 1);
    this.map.addEdge(1, 2);
    this.map.addEdge(0, 3);
    this.map.addEdge(1, 4);
    this.map.addEdge(2, 5);
    this.map.addEdge(3, 6);
    this.map.addEdge(4, 7);
    this.map.addEdge(5, 8);
    this.map.addEdge(6, 7);
    this.map.addEdge(7, 8);

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

    // Map 5 - 12 vertices, v.o.l.n.u.r., min = 4
    this.map.addEdge(0, 1);
    this.map.addEdge(1, 2);
    this.map.addEdge(2, 3);
    this.map.addEdge(0, 4);
    this.map.addEdge(1, 5);
    this.map.addEdge(2, 6);
    this.map.addEdge(3, 7);
    this.map.addEdge(4, 5);
    this.map.addEdge(5, 6);
    this.map.addEdge(6, 7);
    this.map.addEdge(4, 8);
    this.map.addEdge(5, 9);
    this.map.addEdge(6, 10);
    this.map.addEdge(7, 11);
    this.map.addEdge(8, 9);
    this.map.addEdge(9, 10);
    this.map.addEdge(10, 11);

    // Map 6 - 11 vertices, v.o.l.n.u.r., min = 4
    // Map 7 - 9 vertices, v.o.l.n.u.r., min = 3
    // Map 8 - 12 vertices, v.o.l.n.u.r., min = 6
    */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 26%;
  top: 6%;
}

.f1 {
  position: absolute;
  left: 47%;
  top: 7%;
}

.f2 {
  position: absolute;
  left: 67%;
  top: 6%;
}

.f3 {
  position: absolute;
  left: 5%;
  top: 43%;
}

.f4 {
  position: absolute;
  left: 26%;
  top: 43%;
}

.f5 {
  position: absolute;
  left: 47%;
  top: 43%;
}

.f6 {
  position: absolute;
  left: 68%;
  top: 43%;
}

.f7 {
  position: absolute;
  left: 88%;
  top: 43%;
}

.f8 {
  position: absolute;
  left: 26%;
  top: 80%;
}

.f9 {
  position: absolute;
  left: 46%;
  top: 80%;
}

.f10 {
  position: absolute;
  left: 67%;
  top: 80%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map5.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 453px;
  min-height: 228px;
  width: 60vw;
  height: 30vw;
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
