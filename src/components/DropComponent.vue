<template>
  <div class="drop-container">
    <div class="drop-wrapper">
      <drop class="drop-image-wrap" @drop="droppedDatas">
        <img
          class="drop-image"
          v-if="this.dropData.image_url !== 'empty'"
          :src="this.dropData.image_url"
        />
      </drop>
    </div>
  </div>
</template>
<script>
import { Drop } from "vue-easy-dnd";
export default {
  name: "drop-component",
  components: {
    Drop,
  },
  props: {
    dropData: {},
  },
  methods: {
    droppedDatas(event) { 
      this.$emit("drop-data-info", event);
    },
  },
};
</script>

<style lang="scss" scoped>
.drop-container {
  width: 100%;

  .drop-wrapper {
    width: 100%;
    height: 100%;
    .drop-image-wrap {
      width: 100%;
      height: 100%;
      flex: 0 0 auto;

      display: flex;
      justify-content: center;
      align-items: center;

      .drop-image {
        height: 100%;
      }
    }
  }
}
</style>
