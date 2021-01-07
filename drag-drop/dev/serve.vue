<script>
import Vue from 'vue';
import { DragDropSample } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    DragDropSample
  }
});
</script>

<template>
  <div id="app">
    <drag-drop-sample />
  </div>
</template>
