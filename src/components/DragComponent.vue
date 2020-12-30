<template>
  <div class="drag-container">
    <div class="drag-wrapper">
      <drag class="drag-image-wrap" :data="this.dragData">
        <img class="drag-image" :src="this.dragData.image_url" />
      </drag>
    </div>
  </div>
</template>
<script>
import {Drag} from "vue-easy-dnd";
export default {
  name: "drag-component",
  components: {
    Drag,
  },
  props: {
    dragData: {},
  },
};
</script>

<style lang="scss" scoped>
.drag-container {
  width: 100%;

  .drag-wrapper {
    width: 100%;
    height: 100%;
    max-width: 1024px;

    display: flex;
    justify-content: center;
    align-items: center;
    .drag-image-wrap {
      height: 100%;
      .drag-image {
        height: 100%;
      }
    }
  }
}
</style>
