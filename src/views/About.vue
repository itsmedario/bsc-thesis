<template>
  <div class="about">
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

hr {
  margin: 2em;
}

</style>
