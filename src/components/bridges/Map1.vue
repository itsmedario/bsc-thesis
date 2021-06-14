<script lang="ts">
/* eslint-disable no-restricted-syntax */
import { Component } from 'vue-property-decorator';
import BridgesTemplate from '@/components/bridges/BridgesTemplate.vue';
import Graph from '@/components/Graphs';

@Component({
  components: {
    BridgesTemplate,
  },
})

export default class Map1 extends BridgesTemplate {
  availableBridges = 8;

  nrOfFields = 15;

  map = new Graph(this.nrOfFields);

  // eslint-disable-next-line max-len
  fields = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

  initGraph():void {
    for (let i = 0; i < this.nrOfFields; i += 1) {
      this.map.addVertex(i);
    }
    this.map.addEdge(0, 1);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.f0 {
  position: absolute;
  left: 27%;
  top: 5%;
}

.f1 {
  position: absolute;
  left: 44%;
  top: 19%;
}

.f2 {
  position: absolute;
  left: 58%;
  top: 13%;
}

.f3 {
  position: absolute;
  left: 34%;
  top: 28%;
}

.f4 {
  position: absolute;
  left: 56%;
  top: 31%;
}

.f5 {
  position: absolute;
  left: 20%;
  top: 34%;
}

.f6 {
  position: absolute;
  left: 68%;
  top: 36%;
}

.f7 {
  position: absolute;
  left: 31%;
  top: 50%;
}

.f8 {
  position: absolute;
  left: 40%;
  top: 60%;
}

.f9 {
  position: absolute;
  left: 57%;
  top: 47%;
}

.f10 {
  position: absolute;
  left: 24%;
  top: 60%;
}

.f11 {
  position: absolute;
  left: 6%;
  top: 47%;
}

.f12 {
  position: absolute;
  left: 34%;
  top: 83%;
}

.f13 {
  position: absolute;
  left: 52%;
  top: 58%;
}

.f14 {
  position: absolute;
  left: 77%;
  top: 55%;
}

.map-container {
  position: relative;
  align-content: center;
  background-image: url('maps/map1.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-width: 200px;
  min-height: 128px;
  width: 50vw;
  height: 32vw;
}

.square {
  border: 2px dashed #324197;
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

.bridge-field {
  height: 15% !important;
  width: 10% !important;
  max-height: 120px;
  max-width: 90px;
  padding: 1em 0 !important;
}

.bridge-field img {
  width: 60%;
  height: auto;
}

.bridge-game {
  position: relative;
  display: flex;
  justify-content: center;
}

</style>
