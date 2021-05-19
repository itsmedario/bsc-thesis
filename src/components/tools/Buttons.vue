<template>
<div>
  <div class="buttons">
    <router-link to="/">
      <button class="flex-item flex-center card clickable responsive">
        <p>Zurück</p>
        <img :src="require('/src/assets/icons/back.png')"/>
      </button>
    </router-link>

    <button class="flex-item flex-center card clickable responsive" @click="$emit('next-task')">
      <p>Nächste Aufgabe</p>
      <img :src="require('/src/assets/icons/skip.png')"/>
    </button>

    <button class="flex-item flex-center card clickable responsive" @click="$emit('restart')">
      <p>Neu starten</p>
      <img :src="require('/src/assets/icons/restart.png')"/>
    </button>

    <button class="flex-item flex-center card clickable responsive"
     @click="$emit('check-solution')">
      <p>Überprüfen</p>
      <img :src="require('/src/assets/icons/check.png')"/>
    </button>

    <button class="flex-item flex-center card clickable responsive" @click="$emit('show-tutorial')">
      <p>Anleitung</p>
      <img :src="require('/src/assets/icons/help.png')"/>
    </button>
  </div>

</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Buttons extends Vue {
  showAnimation = false;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.buttons {
  position: fixed !important;
  left: 0;
  top: 120px;
  z-index: 9997;
}

.buttons a{
  text-decoration: none;
}

.buttons button{
  padding: 20px;
}

.buttons button img{
  width: 55px;
}

.buttons p{
  margin: 0 0.5em 0 0;
  font-size: 1.1em !important;
  display: none;
}

.buttons button:hover p {
  display: block;
}

</style>
