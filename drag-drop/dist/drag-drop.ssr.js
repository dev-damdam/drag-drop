'use strict';Object.defineProperty(exports,'__esModule',{value:true});var vueEasyDnd=require('vue-easy-dnd'),vueAwesomeSwiper=require('vue-awesome-swiper');require('swiper/css/swiper.css');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
var script = {
  name: "DragComponent",
  components: {
    Drag: vueEasyDnd.Drag
  },
  props: {
    dragData: {}
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "drag-container"
  }, [_vm._ssrNode("<div class=\"drag-wrapper\" data-v-64d5974f>", "</div>", [_c('drag', {
    staticClass: "drag-image-wrap",
    attrs: {
      "data": this.dragData
    }
  }, [_c('img', {
    staticClass: "drag-image",
    attrs: {
      "src": this.dragData.image_url
    }
  })])], 1)]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-64d5974f_0", {
    source: ".drag-container[data-v-64d5974f]{width:100%}.drag-container .drag-wrapper[data-v-64d5974f]{width:100%;height:100%;max-width:1024px;display:flex;justify-content:center;align-items:center}.drag-container .drag-wrapper .drag-image-wrap[data-v-64d5974f]{height:100%}.drag-container .drag-wrapper .drag-image-wrap .drag-image[data-v-64d5974f]{height:100%}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-64d5974f";
/* module identifier */

var __vue_module_identifier__ = "data-v-64d5974f";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);//
var script$1 = {
  name: "DropComponent",
  components: {
    Drop: vueEasyDnd.Drop
  },
  props: {
    dropData: {}
  },
  methods: {
    droppedDatas: function droppedDatas(event) {
      this.$emit("drop-data-info", event);
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "drop-container"
  }, [_vm._ssrNode("<div class=\"drop-wrapper\" data-v-4eb8705a>", "</div>", [_c('drop', {
    staticClass: "drop-image-wrap",
    on: {
      "drop": _vm.droppedDatas
    }
  }, [this.dropData.image_url !== 'empty' ? _c('img', {
    staticClass: "drop-image",
    attrs: {
      "src": this.dropData.image_url
    }
  }) : _vm._e()])], 1)]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-4eb8705a_0", {
    source: ".drop-container[data-v-4eb8705a]{width:100%}.drop-container .drop-wrapper[data-v-4eb8705a]{width:100%;height:100%}.drop-container .drop-wrapper .drop-image-wrap[data-v-4eb8705a]{width:100%;height:100%;flex:0 0 auto;display:flex;justify-content:center;align-items:center}.drop-container .drop-wrapper .drop-image-wrap .drop-image[data-v-4eb8705a]{height:100%}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-4eb8705a";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-4eb8705a";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);//
var script$2 = {
  name: "Main",
  components: {
    DragComponent: __vue_component__,
    DropComponent: __vue_component__$1,
    Swiper: vueAwesomeSwiper.Swiper,
    SwiperSlide: vueAwesomeSwiper.SwiperSlide
  },
  created: function created() {
    this.initContentsList();
  },
  data: function data() {
    return {
      noSwiper: "",
      contentsList: [],
      educationContentPageList: [],
      bAddPage: false,
      dropSwiperOption: {
        effect: "cube",
        grabCursor: true,
        cubeEffect: {
          shadow: false,
          // 아래에 그림자 사용 안함
          slideShadows: false
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      dragSwiperOption: {
        slidesPerView: 4,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  computed: {
    CanvasSwiper: function CanvasSwiper() {
      return this.$refs.canvasSwiper.$swiper;
    }
  },
  methods: {
    initContentsList: function initContentsList() {
      for (var i = 0; i < 30; i++) {
        var imagePath = void 0;

        if (i % 2 == 0) {
          imagePath = "https://wallpaperaccess.com/full/1122733.jpg";
        } else {
          imagePath = "https://theunaustraliandotnet.files.wordpress.com/2020/03/puppy.jpg?w=640";
        }

        this.contentsList.push({
          id: i,
          name: "test" + i,
          major: "내분비계",
          image_url: imagePath
        });
      }

      this.educationContentPageList.push({});
    },
    evt_showPageList: function evt_showPageList() {
      //콘텐츠 리스트 컴포넌트가 active되면 education canvas 스크롤 막기
      if (this.bAddPage) {
        this.bAddPage = false;
        this.noSwiper = "";
      } else {
        this.bAddPage = true;
        this.noSwiper = "swiper-no-swiping";
      }
    },
    evt_addEducationPage: function evt_addEducationPage(page) {
      console.log(page.data["id"]);
      var bDuplicate = this.duplicatedCheck(page.data["id"]);

      if (bDuplicate) {
        alert("해당 컨텐츠는 이미 선택된 컨텐츠 입니다.");
      } else {
        this.educationContentPageList.push({
          id: page.data["id"],
          name: "test" + page.data["id"],
          major: "내분비계",
          image_url: page.data["image_url"]
        });
        console.log(this.educationContentPageList);
      }
    },
    duplicatedCheck: function duplicatedCheck(_id) {
      //컨텐츠 중복체크
      var bDuplicate = false;

      for (var i = 0; i < this.educationContentPageList.length; i++) {
        if (this.educationContentPageList[i]["id"] == _id) {
          bDuplicate = true;
        }
      }

      return bDuplicate;
    }
  }
};/* script */
var __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_vm._ssrNode("<div class=\"main-container\" data-v-fe251cd0>", "</div>", [_vm._ssrNode("<div class=\"education-canvas-wrapper\" data-v-fe251cd0>", "</div>", [_vm._ssrNode("<div class=\"education-canvas\" data-v-fe251cd0>", "</div>", [_vm._ssrNode("<div class=\"drop-content-list-wrapper\" data-v-fe251cd0>", "</div>", [_c('swiper', {
    ref: "canvasSwiper",
    staticClass: "drop-swiper-container swiper",
    attrs: {
      "options": _vm.dropSwiperOption
    }
  }, [_vm._l(_vm.educationContentPageList, function (educationContentPage) {
    return _c('swiper-slide', {
      key: educationContentPage.id,
      staticClass: "drop-list-group",
      class: _vm.noSwiper
    }, [_c('drop-component', {
      staticClass: "drop-list-group-item",
      attrs: {
        "dropData": educationContentPage
      },
      on: {
        "drop-data-info": _vm.evt_addEducationPage
      }
    })], 1);
  }), _vm._v(" "), _c('div', {
    staticClass: "swiper-button-prev",
    attrs: {
      "slot": "button-prev"
    },
    slot: "button-prev"
  }), _vm._v(" "), _c('div', {
    staticClass: "swiper-button-next",
    attrs: {
      "slot": "button-next"
    },
    slot: "button-next"
  })], 2)], 1), _vm._ssrNode(" "), _vm.bAddPage ? _vm._ssrNode("<div class=\"drag-content-list-wrapper\" data-v-fe251cd0>", "</div>", [_c('swiper', {
    staticClass: "drag-swiper-container swiper swiper-no-swiping",
    attrs: {
      "options": _vm.dragSwiperOption
    }
  }, [_vm._l(_vm.contentsList, function (content) {
    return _c('swiper-slide', {
      key: content.id,
      staticClass: "drag-list-group"
    }, [_c('drag-component', {
      staticClass: "drag-list-group-item",
      attrs: {
        "dragData": content
      }
    })], 1);
  }), _vm._v(" "), _c('div', {
    staticClass: "swiper-button-prev",
    attrs: {
      "slot": "button-prev"
    },
    slot: "button-prev"
  }), _vm._v(" "), _c('div', {
    staticClass: "swiper-button-next",
    attrs: {
      "slot": "button-next"
    },
    slot: "button-next"
  })], 2)], 1) : _vm._e()], 2)]), _vm._ssrNode(" <div class=\"main-footer-wrapper\" data-v-fe251cd0><div class=\"doctor-image\" data-v-fe251cd0></div> <div class=\"draw-tools-wrap\" data-v-fe251cd0><img src=\"https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-undo-512.png\" class=\"draw-tool\" data-v-fe251cd0> <img src=\"https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-redo-512.png\" class=\"draw-tool\" data-v-fe251cd0> <img src=\"https://images.vexels.com/media/users/3/140955/isolated/preview/8553633346f0a3e500426bb69f08fd69-pen-pencil-icon-by-vexels.png\" class=\"draw-tool\" data-v-fe251cd0> <img src=\"https://icon-library.com/images/highlight-icon/highlight-icon-8.jpg\" class=\"draw-tool\" data-v-fe251cd0> <img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Eraser_icon.svg/768px-Eraser_icon.svg.png\" class=\"draw-tool\" data-v-fe251cd0></div> <div class=\"add-page\" data-v-fe251cd0></div></div>")], 2)]);
};

var __vue_staticRenderFns__$2 = [];
/* style */

var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-fe251cd0_0", {
    source: ".swiper-container-3d[data-v-fe251cd0]{perspective:8000px}.main-container[data-v-fe251cd0]{width:100%;height:100vh;max-width:1024px;margin:0 auto}.main-container .education-canvas-wrapper[data-v-fe251cd0]{width:100%;height:90%}.main-container .education-canvas-wrapper .education-canvas[data-v-fe251cd0]{position:relative;width:100%;height:100%}.main-container .education-canvas-wrapper .education-canvas .drop-content-list-wrapper[data-v-fe251cd0]{width:100%;height:100%}.main-container .education-canvas-wrapper .education-canvas .drop-content-list-wrapper .drop-swiper-container[data-v-fe251cd0]{background-color:#fff;padding:10px;width:100%;height:100%;border:1px solid #98fb98;box-sizing:border-box}.main-container .education-canvas-wrapper .education-canvas .drop-content-list-wrapper .drop-swiper-container .drop-list-group[data-v-fe251cd0]{width:100%;height:100%;display:flex}.main-container .education-canvas-wrapper .education-canvas .drop-content-list-wrapper .drop-swiper-container .drop-list-group .drop-list-group-item[data-v-fe251cd0]{flex-shrink:0;width:100%;height:auto}.main-container .education-canvas-wrapper .drag-content-list-wrapper[data-v-fe251cd0]{width:100%;height:auto}.main-container .education-canvas-wrapper .drag-content-list-wrapper .drag-swiper-container[data-v-fe251cd0]{position:absolute;background-color:#fff;padding:10px;bottom:0;left:0;width:100%;height:200px;border:1px solid #00f;box-sizing:border-box}.main-container .education-canvas-wrapper .drag-content-list-wrapper .drag-swiper-container .drag-list-group[data-v-fe251cd0]{width:100%;height:100%;display:flex}.main-container .education-canvas-wrapper .drag-content-list-wrapper .drag-swiper-container .drag-list-group .drag-list-group-item[data-v-fe251cd0]{flex-shrink:0;width:100%;height:auto;border:1px solid #000;box-sizing:border-box}.main-container .main-footer-wrapper[data-v-fe251cd0]{width:100%;height:10%;min-height:80px;display:flex;justify-content:space-between}.main-container .main-footer-wrapper .doctor-image[data-v-fe251cd0]{width:80px;height:80px;background-image:url(https://images.vexels.com/media/users/3/151709/isolated/preview/098c4aad185294e67a3f695b3e64a2ec-doctor-avatar-icon-by-vexels.png);background-size:contain;margin-right:10px}.main-container .main-footer-wrapper .draw-tools-wrap[data-v-fe251cd0]{margin:0 10px;width:auto;height:80px;display:flex;border-radius:10px;border:1px solid pink;box-sizing:border-box;padding:0 40px;justify-content:center;align-items:center}.main-container .main-footer-wrapper .draw-tools-wrap .draw-tool[data-v-fe251cd0]{margin:0 10px;height:60px}.main-container .main-footer-wrapper .add-page[data-v-fe251cd0]{width:80px;height:80px;margin-left:10px;background-image:url(https://www.uwosh.edu/library/images/plus-icon.png/@@images/image.png);background-size:contain;background-repeat:no-repeat}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$2 = "data-v-fe251cd0";
/* module identifier */

var __vue_module_identifier__$2 = "data-v-fe251cd0";
/* functional template */

var __vue_is_functional_template__$2 = false;
/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, createInjectorSSR, undefined);var components=/*#__PURE__*/Object.freeze({__proto__:null,DragComponent: __vue_component__,DropComponent: __vue_component__$1,DragDropSample: __vue_component__$2});var install = function installDragDrop(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.DragComponent=__vue_component__;exports.DragDropSample=__vue_component__$2;exports.DropComponent=__vue_component__$1;exports.default=plugin;