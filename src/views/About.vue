<template>
  <div class="about">
    <div id="nav">
      <span id="button-menu" class="flex-item flex-row flex-wrap">
        <router-link  to="/">
          <img :src="require('/src/assets/icons/home.png')" style="width:3vw; margin-top: 0.5em"/>
        </router-link>
        <!--<button class="card clickable" onclick="window.print()">
          Drucken
        </button>--><!--<button class="card clickable">
          Vollbildschirm
        </button>-->
      </span>
    </div>
    <hr style="height:1px; border-width:0; color:black; background-color:black">
    <p class="title">{{ text.pages.about.title }}</p>
    <p style="font-size: 1.3em">
      {{ text.pages.about.descrption }}
    </p>
    <br>
    <img :src="require('@/assets/transport/beaver_transport.png')" style="width: 40%"
     draggable="false"/>
    <p>{{ text.pages.about.author }}
      <hr style="height:1px; border-width:0; color:black; background-color:black; width: 10%;
       margin: 0.5em auto">
      {{ text.pages.about.version }}
      <br>
      {{ text.pages.about.oldVersion }}
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
}
</script>

<style scoped>

#button-menu {
  justify-content: flex-start;
}

hr {
  margin: 2em;
}

</style>
