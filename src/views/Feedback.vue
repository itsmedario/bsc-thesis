<template>
  <div id="feedback" class="responsive">
    <p class="title">
      {{ text.pages.feedback.title }}
    </p>
    <div id="text-field">
      {{ text.pages.feedback.text }}
      <a href="https://forms.gle/pg2zMFHspbVQMrr9A" target="_blank">
        {{ text.pages.feedback.click }}
      </a>
    </div>
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

#text-field {
  font-size: 1.3em;
  margin: 2em;
  text-align: center;
}

hr {
  margin-top: 0;
  margin-bottom: 2em;
}
</style>
