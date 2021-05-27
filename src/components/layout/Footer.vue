<template>
  <div id="footer" class="responsive cards">
    <hr style="height:0.5px; border-width:0; color:black; background-color:black">
    <div id="links">
      <div id="logo-ethz">
        <a href="https://ethz.ch" target="blank">
          <img src="@/assets/ethz-logo.svg" style="height:40px; margin-top:10px;"
          draggable="false"/>
        </a>
      </div>
      <div id="logo-abz">
        <a href="https://abz.inf.ethz.ch/" target="blank">
          <img src="@/assets/logo_abz_weiss.png" style="height:65px;" draggable="false"/>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#footer {
  padding: 2em 0;
}

#links {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

#logo-ethz {
  margin: 1em;
}

#logo-abz {
  margin: 1em;
}
</style>
