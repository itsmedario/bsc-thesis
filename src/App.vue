<template>
  <div id="app" :key="counter">
    <Warning id="mobile-warning"
     :language="language"
      v-if="displayWarning"
      @close-warning="displayWarning = false"/>
    <Header
     :language="language"
     @switch-language="switchLanguage()"
    />
    <router-view id="container"
     :language="language"
     />
  </div>
</template>

<script lang="ts">
/* eslint-disable import/no-dynamic-require */
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Header from '@/components/layout/Header.vue';
import Warning from '@/components/layout/Warning.vue';

@Component({
  components: {
    Header,
    Warning,
  },
})

export default class App extends Vue {
  counter = 0;

  language = 'de'; // change when needed using a toggle button in the navbar

  languagePool = ['de', 'en'];

  // eslint-disable-next-line global-require
  text = require(`@/text_${this.language}.json`);

  displayWarning = true;

  switchLanguage():void {
    this.counter = (this.counter + 1) % this.languagePool.length;
    this.language = this.languagePool[this.counter];
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

body{
  background-color: #17a2b8;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 1em;
  text-align: center;
  position: relative;
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

#button-menu {
  justify-content: flex-end;
}

#container {
  width: 80%;
  margin: 0 10%;
}

#mobile-warning {
  display: none;
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
  margin: 1em 0 !important;
  box-shadow: none !important;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

.introduction {
  width: 70%;
  max-width: 800px;
}

.item-display {
  height: 2em !important;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-stock {
  position: relative;
  height: 15% !important;
  width: 10% !important;
  max-height: 120px;
  max-width: 90px;
  padding: 1em 0 !important;
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

@media print{
  @page {size: landscape; width: 100vw;}
  #button-menu{display: none !important;}
  }

@media (max-width: 1430px) {
        .hidden-smallscreen {
          display: none !important;
        }
}

@media (max-width: 600px) {
        .hidden-mobile {
          display: none !important;
        }
}

@media (max-height: 400px) {
  #game-button-menu {
    position: fixed !important;
    left: 0;
    top: 20px !important;
    z-index: 9997;
  }
}

@media (max-width: 700px) {
  #mobile-warning { display: block !important; }
  body { width: 100vw !important; height: 100vh !important; }
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
