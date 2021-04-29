<template>
<div>

  <div id="img-container">
    <img :src="require('/src/assets/maps/map3_empty.png')" draggable="false">
  </div>

  <img :src="require('/src/assets/bridges/tower.png')" style="width:4%">

</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ItemSelection from '@/components/ItemSelection.vue';

@Component({
  components: {
    ItemSelection,
  },
})

export default class Towers extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tower-game {
  position: relative;
  display: flex;
  justify-content: center;
  width: auto;
}

.img-background {
  content: url("/src//assets/maps/map3_empty.png");
  background-repeat: no-repeat;
  position: absolute;
  width: 100%;
  height: 100%;
}

.img-container {
  position: relative;
}

.tower-field {
  height: 15% !important;
  width: 5% !important;
}

.tower-game table {
  position: absolute;
  top:0;
  left: 0;
  align-content:center;
  align-self: center;
  border-spacing: 50px;
  padding: 1em;
  width: 60%;
  z-index: 2;
}

tr {
  padding: 1em;
}

td {
  padding: 1em;
}

</style>
