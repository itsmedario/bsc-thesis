<template>
  <div id="tutorial-wrapper" v-if="showModal" class="modal-mask"
   @mousedown.stop="showModal = false; $emit('close-tutorial')">
    <div class="modal-wrapper">
      <div class="modal-container" @mousedown.stop >
        <div class="modal-header">
          <p class="title">{{ text.game.tutorial }}</p>
          <button class="exit-button" style="margin:0.5em;" @click="showModal = false;
           $emit('close-tutorial')">
           &times;
           </button>
        </div>
        <div slot="body" class="flex-item flex-center flex-space-between flex-col">
          <div class="flex-item flex-center flex-space-between flex-row">
            <div class="description equal-space">
              <slot name="description">Unintentionally empty!</slot>
            </div>
            <div class="responsive equal-space">
              <slot name="video">Unintentionally empty!</slot>
            </div>
          </div>
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
export default class Tutorial extends Vue {
  @Prop({ required: true })
  showModal!: boolean;

  @Prop({ required: true })
  language!: string;

  // eslint-disable-next-line global-require, import/no-dynamic-require
  text = require(`@/text_${this.language}.json`);
}
</script>

<style scoped>

.description > p {
  margin: 0.8em;
  text-align: justify;
  font-size: 1.3em !important;
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
  transition: opacity 0.5s ease;
}

.tutorial-container {
  background-color: #fff;
}

.modal-container {
  width: auto;
  max-width: 1000px;
  margin: 0px auto;
  position: relative;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
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
