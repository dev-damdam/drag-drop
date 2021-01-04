import Vue from "vue";
import DragComponent from './components/DragComponent.vue'
import DropComponent from './components/DropComponent.vue'
import VueAwesomeSwiper from "vue-awesome-swiper";
import DragDropTest from './components/test/DragDropTest.vue'

//drag&drop test
/*
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;
*/
const components = [
    DragComponent,
    DropComponent,
    VueAwesomeSwiper,
    DragDropTest
];

Object.keys(components).forEach(name => {
    Vue.component(components[name].name, components[name]);
});

export default components;

//drag&drop test
/*
new Vue({
    render: (h) => h(DragDropTest),
}).$mount("#app");
*/