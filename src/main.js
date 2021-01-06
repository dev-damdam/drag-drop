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

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default components;

//drag&drop test
/*
new Vue({
    render: (h) => h(DragDropTest),
}).$mount("#app");
*/