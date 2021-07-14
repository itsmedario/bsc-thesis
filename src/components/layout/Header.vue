<template>
  <div id="header">
    <div id="nav">
      <span id="button-menu" class="flex-item flex-row flex-wrap">
        <router-link to="/feedback" v-if="this.$route.name === 'Home'">
          <button class="card clickable hidden-mobile" style="font-size:1em; height: 60px">
            {{ text.pages.feedback.button }}
          </button>
        </router-link>
        <router-link to="/" v-if="this.$route.name !== 'Home'">
          <button class="card clickable nav-button">
            <img :src="require('/src/assets/icons/home.png')" style="width:1.7em"/>
          </button>
        </router-link>
        <button class="card clickable nav-button hidden-mobile"
         v-if="this.$route.name !== 'Home'"
          onclick="window.print()">
          <img :src="require('/src/assets/icons/print.png')" style="width:1.5em"/>
        </button>
        <button class="card clickable nav-button"
         v-if="this.$route.name === 'Home'"
          @click="$emit('switch-language')">
          {{ this.language }}
        </button>
        <router-link to="/about" v-if="this.$route.name === 'Home'">
          <button class="card clickable nav-button">
            <img :src="require('/src/assets/icons/info.png')" style="width:1.7em"/>
          </button>
        </router-link>
        <button v-if="fullScreenSupport()"
         class="card clickable nav-button"
         @click="toggleFullscreen()">
          <img :src="require('/src/assets/icons/full-screen.png')" style="width:1.1em"/>
        </button>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable import/no-dynamic-require */
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require
  text = require(`@/text_${this.language}.json`);

  elem = document.documentElement;

  // eslint-disable-next-line class-methods-use-this
  closeFullscreen():void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  fullScreenSupport():boolean {
    return document.fullscreenEnabled;
  }

  openFullscreen():void {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    }
  }

  toggleFullscreen():void {
    if (!document.fullscreenElement) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-button {
  height: 60px;
  width: 60px;
}
</style>
