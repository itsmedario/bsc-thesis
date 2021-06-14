<template>
  <div>
    <div id="button-menu" class="buttons">
      <router-link to="/#start">
        <button class="flex-item flex-center card clickable responsive">
          <p>{{ text.game.buttons.back }}</p>
          <img :src="require('/src/assets/icons/back.png')"/>
        </button>
      </router-link>

      <button class="flex-item flex-center card clickable responsive" @click="$emit('next-task')">
        <p>{{ text.game.buttons.next }}</p>
        <img :src="require('/src/assets/icons/skip.png')"/>
      </button>

      <button class="flex-item flex-center card clickable responsive" @click="$emit('restart')">
        <p>{{ text.game.buttons.restart }}</p>
        <img :src="require('/src/assets/icons/restart.png')"/>
      </button>

      <button class="flex-item flex-center card clickable responsive"
      @click="$emit('check-solution')">
        <p>{{ text.game.buttons.check }}</p>
        <img :src="require('/src/assets/icons/check.png')"/>
      </button>

      <button class="flex-item flex-center card clickable responsive"
       @click="$emit('show-tutorial')">
        <p>{{ text.game.buttons.help }}</p>
        <img :src="require('/src/assets/icons/help.png')"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
  },
})

export default class Buttons extends Vue {
  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);

  showAnimation = false;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.buttons {
  position: fixed !important;
  left: 0;
  top: 170px;
  z-index: 9997;
}

.buttons a{
  text-decoration: none;
}

.buttons button{
  padding: 15px;
}

.buttons button img{
  width: 4vw;
  min-width: 30px;
  max-width: 50px;
}

.buttons p{
  margin: 0 0.5em 0 0;
  font-size: 1.1em !important;
  display: none;
}

.buttons button:hover p {
  display: block;
}

</style>
