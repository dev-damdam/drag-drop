import DragComponent from './components/DragComponent.vue'
import DropComponent from './components/DropComponent.vue'
import DragDropTest from './components/test/DragDropTest.vue'

//drag&drop test
/*
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;
*/
const components = [
    DragComponent,
    DropComponent,
    DragDropTest
];

const install = function(Vue) {
    components.forEach(Component => {
        Vue.component(Component.name, Component);
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