<template>
  <div>
    <div id="button-menu" class="buttons">
      <router-link to="/">
        <button class="flex-item flex-center card clickable responsive">
          <p>Zur Hauptseite</p>
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

      <button class="flex-item flex-center card clickable responsive"
       @click="$emit('show-tutorial')">
        <p>Anleitung</p>
        <img :src="require('/src/assets/icons/help.png')"/>
      </button>

      <div v-if="levels" class="switch">
        <p>Schwierige</p>
        <div class="toggle-button r" id="button-1" @click="$emit('switch-difficulty')">
          <input type="checkbox" class="checkbox" checked>
          <div class="knobs"></div>
          <div class="layer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})

export default class Buttons extends Vue {
  @Prop({ required: true })
  levels!: boolean;

  showAnimation = false;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.buttons {
  position: fixed !important;
  left: 0;
  top: 110px;
  z-index: 9997;
}

.buttons a{
  text-decoration: none;
}

.buttons button{
  padding: 15px;
}

.buttons button img{
  width: 50px;
}

.buttons p{
  margin: 0 0.5em 0 0;
  font-size: 1.1em !important;
  display: none;
}

.buttons button:hover p {
  display: block;
}

.knobs, .layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.toggle-button {
    position: relative;
    top: 50%;
    width: 74px;
    height: 36px;
    margin: auto auto 0 auto;
    overflow: hidden;
}

.toggle-button.r, .toggle-button.r .layer {
    border-radius: 100px;
}

.toggle-button.b2 {
    border-radius: 2px;
}

.checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
}

.knobs {
    z-index: 2;
}

.layer {
    width: 100%;
    background-color: #f8f9fa;
    transition: 0.3s ease all;
    z-index: 1;
}

/* Button 1 */
#button-1 .knobs:before {
    content: 'AN';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 10px;
    color: #f8f9fa;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: #03A9F4;
    border-radius: 50%;
    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
}

#button-1 .checkbox:checked + .knobs:before {
    content: 'AUS';
    left: 42px;
    background-color: #f44336;
}

#button-1 .checkbox:checked ~ .layer {
    background-color: #f8f9fa;
}

#button-1 .knobs, #button-1 .knobs:before, #button-1 .layer
{
    transition: 0.3s ease all;
}

.switch {
  position: fixed;
  left: 20px;
}

</style>
