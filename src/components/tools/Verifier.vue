<template>
  <div id="tutorial-wrapper" v-if="showSolution" class="modal-mask"
   @mousedown.stop="showSolution = false; $emit('close-verifier')">
    <div class="modal-wrapper">
      <div class="modal-container" @mousedown.stop>
        <div class="modal-header">
          <p class="title" v-if="correctSolution">Das ist richtig!</p>
          <p class="title" v-else>Das ist leider nicht richtig!</p>
          <button class="exit-button" @click="showSolution = false;
           $emit('close-verifier')">
           &times;
           </button>
        </div>
        <div class="flex-item flex-center flex-space-between flex-col">
          <div class="flex-item flex-center flex-space-between flex-row">
            <img v-if="correctSolution" :src="require('@/assets/beavers/correct.png')"
             style="animation: shake 1s" draggable="false"/>
            <img v-else :src="require('@/assets/beavers/wrong.png')"
             style="animation: shake 0.5s" draggable="false"/>
          </div>
          <hr>
          <div v-if="!correctSolution">{{ tip }}</div>
        </div>
       </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Verifier extends Vue {
  @Prop({ required: true })
  correctSolution!: boolean;

  @Prop({ required: true })
  showSolution!: boolean;

  @Prop({ required: true })
  tip!: string;
}
</script>

<style scoped>

hr {
  width: 50%;
}

img:hover {
  animation: shake 0.5s;
}

.description > p {
  margin: 1em;
  text-align: justify;
  font-size: 1.5em !important;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.tutorial-container {
  background-color: #fff;
}

.modal-container {
  position: relative;
  margin: 0px auto;
  width: 40%;
  min-width: 500px;;
  padding: 20px 30px 40px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  padding-bottom: 30px;
}

.modal-header h3 {
  font-size: 1.4em;
}

.modal-body {
  margin: 20px 0;
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
