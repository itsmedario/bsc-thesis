<template>
  <div id="home">
    <p class="title">Willkommen zur Lernplattform</p>
    <img :src="require('@/assets/transport/beaver_transport2.png')" draggable="false"/>
    <hr style="height:1px; border-width:0; color:black; background-color:black">
  <!--    <div v-for="task in getItems()" :key="task.id"
     class="card clickable">
      <router-link :to="task.path">
        <div class="card-container">
          <div style="display: inline-block">{{ task.title }}</div>
          <div class="card-image flex-item flex-center responsive" style="display: inline-block">
            <img :src="require(`@/assets/${task.img}`)" style="max-width: 150px;
            max-height: 70px; padding:15px"/>
          </div>
        </div>
      </router-link>
    </div>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Footer from '@/components/layout/Footer.vue';
import views from '@/views/Views';

@Component({
  components: {
    Footer,
  },
})
export default class Home extends Vue {
  // eslint-disable-next-line class-methods-use-this
  getItems(): { id: number; path: string; title: string;
   img: string; view: string; component: string; }[] {
    return views;
  }

views2: Array<{
  id: number;
  path: string;
  title: string;
  img: string;
  view: string;
  component: string;
}> = [
  {
    id: 1,
    path: '/weights/check',
    title: 'Ladungen überprüfen',
    img: 'transport/wood.png',
    view: 'CheckWeights',
    component: 'CheckWeights',
  },
  {
    id: 2,
    path: '/bridges/check',
    title: 'Brücken überprüfen',
    img: 'bridges/bridge_long.png',
    view: 'CheckWeights',
    component: 'CheckWeights',
  },
  {
    id: 3,
    path: '/towers/check',
    title: 'Türme überprüfen',
    img: 'bridges/tower.png',
    view: 'CheckTowers',
    component: 'CheckWeights',
  },
  {
    id: 4,
    path: '/boats/load',
    title: 'Boote laden',
    img: 'wood.png',
    view: 'LoadBoats',
    component: 'LoadBoats',
  },
  {
    id: 5,
    path: '/bridges/build',
    title: 'Brücken bauen',
    img: 'wood.png',
    view: 'BuildBridges',
    component: 'BuildBridges',
  },
  {
    id: 6,
    path: '/towers/build',
    title: 'Türme bauen',
    img: 'wood.png',
    view: 'BuildTowers',
    component: 'BuildTowers',
  },
];
}
</script>

<style scoped>
#home {
   background-image: url('/src/assets/logo.jpg');
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1em;
}
.card-image {
  height: 3em;
}
.card-image > img {
  border-radius: 5px 5px 0 0;
}
.card-container {
  margin-top: 6px;
  padding: 2px 16px;
}
/* router-link */
a {
  text-decoration: none;
  color: black;
}
</style>
