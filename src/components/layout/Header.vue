<template>
  <div id="header">
    <body>
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
    </body>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {}
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
