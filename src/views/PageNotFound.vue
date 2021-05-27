<template>
  <div class="about responsive">
    <p class="title">
      {{ text.pages.notFound.title }}
    </p>
    <p style="font-size: 1.3em">
      {{ text.pages.notFound.text }}
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
export default class PageNotFound extends Vue {
  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);
}
</script>

<style scoped></style>
