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
  left: 26%;
  top: 8.5%;
  transform: rotate(295deg);
  width: 14% !important;
}

.f1 {
  position: absolute;
  left: 44%;
  top: 24%;
  transform: rotate(300deg);
}

.f2 {
  position: absolute;
  left: 55%;
  top: 20%;
  transform: rotate(50deg);
}

.f3 {
  position: absolute;
  left: 32%;
  top: 28%;
  transform: rotate(20deg);
}

.f4 {
  position: absolute;
  left: 54%;
  top: 37%;
  transform: rotate(310deg);
  width: 13% !important;
}

.f5 {
  position: absolute;
  left: 18%;
  top: 38%;
  transform: rotate(290deg);
}

.f6 {
  position: absolute;
  left: 65%;
  top: 38.5%;
  transform: rotate(70deg);
  width: 13% !important;
}

.f7 {
  position: absolute;
  left: 29%;
  top: 52%;
  transform: rotate(10deg);
}

.f8 {
  position: absolute;
  left: 39%;
  top: 64%;
  transform: rotate(80deg);
  width: 8% !important;
}

.f9 {
  position: absolute;
  left: 54%;
  top: 52%;
  transform: rotate(25deg);
  width: 12% !important;
}

.f10 {
  position: absolute;
  left: 20.5%;
  top: 66%;
  transform: rotate(60deg);
}

.f11 {
  position: absolute;
  left: 6%;
  top: 53%;
  transform: rotate(350deg);
  width: 9% !important;
}

.f12 {
  position: absolute;
  left: 44%;
  top: 80%;
  transform: rotate(40deg);
  width: 9% !important;
}

.f13 {
  position: absolute;
  left: 47%;
  top: 64.5%;
  transform: rotate(60deg);
  width: 13% !important;
}

.f14 {
  position: absolute;
  left: 77%;
  top: 55%;
  transform: rotate(25deg);
  width: 9% !important;
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
  height: 8%;
  width: 11%;
}

.square img {
  width: 100% !important;
  height: 60%;
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
