<template>
  <div id="header">
    <div id="nav"  :key="reloadCounter">
      <span id="button-menu" class="flex-item flex-row flex-wrap">
        <router-link to="/feedback" v-if="this.$route.name === 'Home'">
          <button class="card clickable" style="font-size:1.125em">
            Feedback
          </button>
        </router-link>
        <router-link to="/" v-if="this.$route.name !== 'Home'">
          <button class="card clickable home">
            <img :src="require('/src/assets/icons/home.png')" style="width:1.5em"/>
          </button>
        </router-link>
        <button class="card clickable" onclick="window.print()">
          <img :src="require('/src/assets/icons/print.png')" style="width:1.5em"/>
        </button>
        <router-link to="/about">
          <button class="card clickable">
            <img :src="require('/src/assets/icons/info.png')" style="width:1.5em"/>
          </button>
        </router-link>
        <button v-if="fullScreenSupport()"
         class="card clickable"
         @click="toggleFullscreen()">
          <img :src="require('/src/assets/icons/full-screen.png')" style="width:1.5em"/>
        </button>
      </span>
    </div>
    <!--<body>
      <div class="main">
        <input type="checkbox">
          <span></span>
          <span></span>
          <span></span>
          <div class="menu">
            <li><a href="/home">Home</a></li>
            <li><a href="#">Gewichte</a></li>
            <li><a href="#">Türme</a></li>
            <li><a href="/about">Über</a></li>
          </div>
      </div>
    </body>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  reloadCounter = 0;

  elem = document.documentElement;

  beforeMount():void {
    console.log(this.$route.name);
  }

  // eslint-disable-next-line class-methods-use-this
  fullScreenSupport():boolean {
    return document.fullscreenEnabled;
  }

  toggleFullscreen():void {
    if (!document.fullscreenElement) {
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  openFullscreen():void {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  closeFullscreen():void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    margin: 0;
    padding: 0;
}
body, .main, .menu {
    display: flex;
    justify-content: center;
    align-items: center;
}

hr {
    height:1px;
    border-width:0;
    color:black;
    background-color:black;
    margin-top: 0.2em;
    margin-bottom: 0em;
}

.home {
  float: left;
}

.main {
    position: relative;
    background-color: #f8f9fa;
    padding: 20px;
    transition: 0.5s;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 8px 15px rgba(0,0,0,.2);
}
.menu {
    margin: 0;
    padding: 0;
    width: 0;
    overflow: hidden;
    transition: 0.5s;
}
.main input:checked ~ .menu {
    width: 500px;
}
.menu li {
    list-style: none;
    margin: 0 10px;
}
.menu li a {
    text-decoration: none;
    color: black  ;
    text-transform: uppercase;
    font-weight: 300;
    transition: 0.5s;
}
.menu li a:hover {
    color: #161919;
}
.main input {
    width: 40px;
    height: 40px;
    cursor: pointer;
    opacity: 0;
}
.main span {
    position: absolute;
    left: 30px;
    width: 30px;
    height: 4px;
    border-radius: 50px;
    background-color: #666;
    pointer-events: none;
    transition: 0.5s;
}
.main input:checked ~ span {
    background-color: #FF4D50;
}
.main span:nth-child(2) {
    transform: translateY(-8px);
}
.main input:checked ~ span:nth-child(2) {
    transform: translateY(0) rotate(-45deg);
}
.main span:nth-child(3) {
    transform: translateY(8px);
}
.main input:checked ~ span:nth-child(3) {
    transform: translateY(0) rotate(45deg);
}
.main input:checked ~ span:nth-child(4) {
    display: none;
}
</style>
