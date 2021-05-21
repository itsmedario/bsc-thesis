<template>
  <div id="app">
    <div id="nav">
      <div id="button-menu" class="flex-item flex-row flex-center flex-wrap">
        <router-link to="/check-weights">
          <button class="card clickable">Ladungen überprüfen</button>
        </router-link>
        <router-link to="/distribute-weights">
          <button class="card clickable">Boote beladen</button>
        </router-link>
        <router-link to="/add-weights">
          <button class="card clickable">Ladungen ergänzen</button>
        </router-link>
        <router-link to="/optimize-weights">
          <button class="card clickable">Boote maximal beladen</button>
        </router-link>
        <router-link to="/*"> <!-- Link to come -->
          <button class="card clickable">Türme überprüfen</button>
        </router-link>
        <router-link  to="/about">
          <button class="card clickable" @click="selectedTab = 'About'">Impressum</button>
        </router-link>
        <!--<router-link to="/build-towers">
          <button class="card clickable">Türme bauen</button>
        </router-link>
        <router-link to="/build-bridges">
          <button class="card clickable">Brücken bauen</button>
        </router-link>-->
      </div>
    </div>
    <hr style="height:1px; border-width:0; color:black; background-color:black">
    <router-view id="container"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class App extends Vue {
  selectedTab = 'Home';
}
</script>

<style>

body{
  background-color: #17a2b8;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

hr{
  border: 1px solid #000;
  margin: 1em;
}

button {
  color: black;
  font-family: Georgia, 'Times New Roman', Times, serif !important;
  padding: 0.7em;
  font-size: 1em;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
canvas {
  max-width: 100%;
  max-height: 100%;
}
#app {
  text-align: center;
  margin: 0 auto;
  max-width: 1500px;
}

#container {
  width: 80%;
  margin: 2em 10%;
}

.card {
  border-radius: 10px;
  background: #f8f9fa;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
  transition: 0.3s;
  margin: 1em;
}
.clickable:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 1);
  cursor: pointer;
}
.clickable:active {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
  transform: scale(0.95);
}

.description {
  padding: 1em;
  box-shadow: none !important;
  font-size: 1.2em
}

.exit-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  width: 2em;
  height: 2em;
  text-align: center;
  padding: 0;
  background: whitesmoke;
  font-size: 1.5em;
  line-height: 1.7em;
  border-radius: 3px;
}

.flex-item {
  display: flex;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-center {
  align-items: center;
  justify-content: center;
}
.flex-center-horizontally {
  justify-content: center;
}
.flex-center-vertically {
  align-items: center;
}
.flex-stretch {
  align-items: stretch;
}
.flex-space-between {
  justify-content: space-between;
}
.flex-row {
  flex-direction: row;
}
.flex-col {
  flex-direction: column;
}
.flex-flex {
  flex: 1;
}

.dropzone {
  border: 2px dashed black;
  background: none;
  border-radius: 5px;
  min-height: 5em;
  min-width: 8em;
  margin: 1em;
}

.fixedField {
  border: 2px solid black !important;
  background: none;
  border-radius: 5px;
}

.info-card {
  padding: 0em !important;
  margin: 1em !important;
  box-shadow: none !important;
}

.equal-space {
  flex: 1 1 0px;
}
.big-text {
  font-size: 2em;
}
.responsive > img,
video {
  box-sizing: border-box;
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
}
.selected {
  background: #4ea1ee !important;
}
.locked {
  background: rgb(184, 183, 183) !important;
}

.locked img {
  opacity: 0.5;
}

.locked:hover {
  animation: shake ease-out 0.15s;
}

.title {
  font-size: 2em;
}

@media (max-width: 1430px) {
        .hidden-mobile {
          display: none !important;
        }
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
