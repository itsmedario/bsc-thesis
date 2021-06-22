<template>
  <div class="responsive">
    <div id="nav">
      <span id="button-menu" class="flex-item flex-row flex-wrap">
        <router-link  to="/">
          <button class="card clickable">
            <img :src="require('/src/assets/icons/home.png')" style="width:1em"/>
          </button>
        </router-link>
        <!--<button class="card clickable" onclick="window.print()">
          Drucken
        </button>--><!--<button class="card clickable">
          Vollbildschirm
        </button>-->
      </span>
    </div>
    <hr style="height:1px; border-width:0; color:black; background-color:black">
    <p class="title">
      {{ text.pages.feedback.title }}
    </p>
    <p style="font-size: 1.3em">
      {{ text.pages.feedback.text }}
    <a href="https://forms.gle/pg2zMFHspbVQMrr9A">{{ text.pages.feedback.click }}</a>
    </p>
    <img :src="require('@/assets/transport/load_boat.png')" draggable="false"/>
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
export default class Feedback extends Vue {
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
  margin-top: 0;
  margin-bottom: 2em;
}
</style>
