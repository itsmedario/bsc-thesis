<template>
  <div class="about">
    <p class="title">
      {{ text.pages.about.title }}
    </p>
    <p style="font-size: 1.3em">
      {{ text.pages.about.descrption }}
    </p>
    <br>
    <img :src="require('@/assets/transport/beaver_transport.png')"
     style="width: 40%"
     draggable="false"
     usemap="#workmap"/>
    <map name="workmap">
      <area shape="rect"
       coords="200,110,250,160"
       alt="Computer"
       @click="openEasterEgg()">
    </map>
    <p v-if="showEE">Wow, you discovered the secret easter egg!</p>
    <p>
      {{ text.pages.about.author }}
    </p>
    <hr style="height:1px; border-width:0; color:black; background-color:black; width: 10%;
     margin: 0.5em auto">
    <div>
      {{ text.pages.about.version }}
      <br>
      {{ text.pages.about.oldVersion }}
    </div>
    <hr style="height:1px; border-width:0; color:black; background-color:black; width: 10%;
     margin: 0.5em auto">
    <div id="credits">
      Credits:
      <div>All graphics are under licence by <i>Klett und Balmer Verlag</i> &copy; 2021</div>
      <div>Home &amp; print and full screen icon made by
        <a href="https://www.freepik.com" title="Freepik" target="_blank">Freepik</a> and
        <a href="https://www.flaticon.com/authors/vignesh-oviyan" title="Vignesh Oviyan" target="_blank">Vignesh Oviyan</a>
      respectively from <a href="https://www.flaticon.com/" target="_blank">www.flaticon.com</a>
      </div>
      <div>Help and check icon by
        <a href="https://freeicons.io/profile/726" target="_blank">Free Preloaders</a> and
        <a href="https://freeicons.io/profile/714" target="_blank">Raj Dev</a>
        respectively on <a href="https://freeicons.io" target="_blank">freeicons.io</a>
      </div>
      <div>Info, go back, refresh and skip icon by
        <a href="https://freeicons.io/profile/3" target="_blank">icon king1</a>,
        on <a href="https://freeicons.io" target="_blank">freeicons.io</a>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class About extends Vue {
  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  showEE = false;

  openEasterEgg():void {
    this.showEE = true;
  }
}
</script>

<style scoped>
hr {
  margin-top: 0;
  margin-bottom: 2em;
}

#credits {
  font-size: 0.7em;
}

</style>
