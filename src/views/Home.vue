<template>
  <div id="home">
    <div id="start">
      <p id="top" class="title">
        {{ text.pages.home.title }}
        <br>
        "{{ text.title }}"
      </p>
      <p class="introduction">
        {{ text.pages.home.introduction }}
      </p>
      <a href="#task-selector">
        <button class="card clickable">
          {{ text.pages.home.bottom }}
        </button>
      </a>
      <img :src="require('@/assets/transport/beaver_transport2.png')" draggable="false"/>
    </div>
    <hr style="height:1px; border-width:0; color:black; background-color:black; margin: 3em">
    <div id="task-selector">
      <div class="cards">
        <div v-for="task in text.tasks" :key="task.id"
        class="card clickable">
          <router-link :to="task.path">
            <div class="card-container">
              <div>
                {{ task.title }}
              </div>
              <div class="card-image">
                <img :src="require(`@/assets${task.img}`)" style="max-width: 150px;
                max-height: 70px; padding:15px"/>
                <img :src="require(`@/assets/beavers/beaver${task.level}.png`)"
                style="height: 30px; padding-bottom:30px"/>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <hr style="height:1px; border-width:0; color:black; background-color:black; margin-bottom: 0">
      <a href="#nav" id="top-button">
        <button class="card clickable">
          {{ text.pages.home.top }}
        </button>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Footer from '@/components/layout/Footer.vue';
import views from '@/views/Views';

@Component({
  components: {
    Footer,
  },
})
export default class Home extends Vue {
  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  // eslint-disable-next-line class-methods-use-this
  getItems(): { id: number; path: string; title: string;
   img: string; view: string; component: string; }[] {
    return views;
  }
}
</script>

<style scoped>
#home {
  height: 100%;
}

#start {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
}

#start img {
  width: 90%;
  max-width: 700px;
  margin-top: 2em;
}

#task-selector {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  grid-auto-rows: auto;
  grid-gap: 1em;
}
.card-image {
  height: 3em;
  display: inline-block !important;
}
.card-image > img {
  border-radius: 5px 5px 0 0;
}
.card-container {
  margin-top: 6px;
  padding: 2px 16px;
}

.line {
  background-color: black;
  height: 30px;
  width: 2px;
}

/* router-link */
a {
  text-decoration: none;
  color: black;
}

hr {
  margin-top: 0;
  margin-bottom: 1em;
}
</style>
