<template>
  <footer id="footer" class="responsive cards">
    <div class="logo-ethz">
      <a href="https://ethz.ch" target="blank">
        <img src="@/assets/ethz-logo.svg" style="height:40px; margin-top:10px;"
         draggable="false"/>
      </a>
    </div>
    <div class="seperator"></div>
    <div class="logo-abz">
      <a href="https://abz.inf.ethz.ch/" target="blank">
        <img src="@/assets/abz-logo.png" style="height:80px;"  draggable="false"/>
      </a>
    </div>
  </footer>
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

footer {
  display: flex;
  padding: 0em 1.5em;
}

footer .seperator{
  width: 3px;
  height: 50px;
  margin: 0px 15px;
  background: #111111;
}

h1 {
  margin: 40px 0 0 0;
  margin-left: 20px;
  margin-right: 20px;
  float: right;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
