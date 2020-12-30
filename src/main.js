import DragComponent from './components/DragComponent.vue'
import DropComponent from './components/DropComponent.vue'

const components = [
    DragComponent,
    DropComponent
];

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    DragComponent,
    DropComponent
}