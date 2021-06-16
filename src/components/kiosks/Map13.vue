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

export default class Map13 extends KiosksTemplate {
  availableKiosks = 6;

  optimalNrOfKiosks = 3;

  nrOfFields = 9;

  map = new Graph(this.nrOfFields);

  fields = [false, false, false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }

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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 21%;
  top: -3%;
}

.f1 {
  position: absolute;
  left: 46.5%;
  top: -3%;
}

.f2 {
  position: absolute;
  left: 72%;
  top: -3%;
}

.f3 {
  position: absolute;
  left: 0.4%;
  top: 39%;
}

.f4 {
  position: absolute;
  left: 46.5%;
  top: 39%;
}

.f5 {
  position: absolute;
  left: 92.7%;
  top: 39%;
}

.f6 {
  position: absolute;
  left: 21%;
  top: 80.5%;
}

.f7 {
  position: absolute;
  left: 46.5%;
  top: 80.5%;
}

.f8 {
  position: absolute;
  left: 72%;
  top: 80.5%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map13.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 50vw;
  height: 22.9vw;
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
