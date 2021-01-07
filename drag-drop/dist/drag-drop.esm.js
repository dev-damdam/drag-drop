import { Drag, Drop } from 'vue-easy-dnd';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

//
var script = {
  name: "DragComponent",
  components: {
    Drag
  },
  props: {
    dragData: {}
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "drag-container"
  }, [_c('div', {
    staticClass: "drag-wrapper"
  }, [_c('drag', {
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

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-64d5974f_0", {
    source: ".drag-container[data-v-64d5974f]{width:100%}.drag-container .drag-wrapper[data-v-64d5974f]{width:100%;height:100%;max-width:1024px;display:flex;justify-content:center;align-items:center}.drag-container .drag-wrapper .drag-image-wrap[data-v-64d5974f]{height:100%}.drag-container .drag-wrapper .drag-image-wrap .drag-image[data-v-64d5974f]{height:100%}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-64d5974f";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

//
var script$1 = {
  name: "DropComponent",
  components: {
    Drop
  },
  props: {
    dropData: {}
  },
  methods: {
    droppedDatas(event) {
      this.$emit("drop-data-info", event);
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "drop-container"
  }, [_c('div', {
    staticClass: "drop-wrapper"
  }, [_c('drop', {
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

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-4eb8705a_0", {
    source: ".drop-container[data-v-4eb8705a]{width:100%}.drop-container .drop-wrapper[data-v-4eb8705a]{width:100%;height:100%}.drop-container .drop-wrapper .drop-image-wrap[data-v-4eb8705a]{width:100%;height:100%;flex:0 0 auto;display:flex;justify-content:center;align-items:center}.drop-container .drop-wrapper .drop-image-wrap .drop-image[data-v-4eb8705a]{height:100%}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = "data-v-4eb8705a";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

//
var script$2 = {
  name: "Main",
  components: {
    DragComponent: __vue_component__,
    DropComponent: __vue_component__$1,
    Swiper,
    SwiperSlide
  },

  created() {
    this.initContentsList();
  },

  data() {
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
    CanvasSwiper() {
      return this.$refs.canvasSwiper.$swiper;
    }

  },
  methods: {
    initContentsList: function () {
      for (let i = 0; i < 30; i++) {
        let imagePath;

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
    evt_showPageList: function () {
      //콘텐츠 리스트 컴포넌트가 active되면 education canvas 스크롤 막기
      if (this.bAddPage) {
        this.bAddPage = false;
        this.noSwiper = "";
      } else {
        this.bAddPage = true;
        this.noSwiper = "swiper-no-swiping";
      }
    },
    evt_addEducationPage: function (page) {
      console.log(page.data["id"]);
      let bDuplicate = this.duplicatedCheck(page.data["id"]);

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
    duplicatedCheck: function (_id) {
      //컨텐츠 중복체크
      let bDuplicate = false;

      for (let i = 0; i < this.educationContentPageList.length; i++) {
        if (this.educationContentPageList[i]["id"] == _id) {
          bDuplicate = true;
        }
      }

      return bDuplicate;
    }
  }
};

/* script */
const __vue_script__$2 = script$2;
/* template */

var __vue_render__$2 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('div', {
    staticClass: "main-container"
  }, [_c('div', {
    staticClass: "education-canvas-wrapper"
  }, [_c('div', {
    staticClass: "education-canvas"
  }, [_c('div', {
    staticClass: "drop-content-list-wrapper"
  }, [_c('swiper', {
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
  })], 2)], 1), _vm._v(" "), _vm.bAddPage ? _c('div', {
    staticClass: "drag-content-list-wrapper"
  }, [_c('swiper', {
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
  })], 2)], 1) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "main-footer-wrapper"
  }, [_c('div', {
    staticClass: "doctor-image"
  }), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "add-page",
    on: {
      "click": _vm.evt_showPageList
    }
  })])])]);
};

var __vue_staticRenderFns__$2 = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "draw-tools-wrap"
  }, [_c('img', {
    staticClass: "draw-tool",
    attrs: {
      "src": "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-undo-512.png"
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "draw-tool",
    attrs: {
      "src": "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-redo-512.png"
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "draw-tool",
    attrs: {
      "src": "https://images.vexels.com/media/users/3/140955/isolated/preview/8553633346f0a3e500426bb69f08fd69-pen-pencil-icon-by-vexels.png"
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "draw-tool",
    attrs: {
      "src": "https://icon-library.com/images/highlight-icon/highlight-icon-8.jpg"
    }
  }), _vm._v(" "), _c('img', {
    staticClass: "draw-tool",
    attrs: {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Eraser_icon.svg/768px-Eraser_icon.svg.png"
    }
  })]);
}];
/* style */

const __vue_inject_styles__$2 = function (inject) {
  if (!inject) return;
  inject("data-v-fe251cd0_0", {
    source: ".swiper-container-3d[data-v-fe251cd0]{perspective:8000px}.main-container[data-v-fe251cd0]{width:100%;height:100vh;max-width:1024px;margin:0 auto}.main-container .education-canvas-wrapper[data-v-fe251cd0]{width:100%;height:90%}.main-container .education-canvas-wrapper .education-canvas[data-v-fe251cd0]{position:relative;width:100%;height:100%}.main-container .education-canvas-wrapper .education-canvas .drop-content-list-wrapper[data-v-fe251cd0]{width:100%;height:100%}.main-container .education-canvas-wrapper .education-canvas .drop-content-list-wrapper .drop-swiper-container[data-v-fe251cd0]{background-color:#fff;padding:10px;width:100%;height:100%;border:1px solid #98fb98;box-sizing:border-box}.main-container .education-canvas-wrapper .education-canvas .drop-content-list-wrapper .drop-swiper-container .drop-list-group[data-v-fe251cd0]{width:100%;height:100%;display:flex}.main-container .education-canvas-wrapper .education-canvas .drop-content-list-wrapper .drop-swiper-container .drop-list-group .drop-list-group-item[data-v-fe251cd0]{flex-shrink:0;width:100%;height:auto}.main-container .education-canvas-wrapper .drag-content-list-wrapper[data-v-fe251cd0]{width:100%;height:auto}.main-container .education-canvas-wrapper .drag-content-list-wrapper .drag-swiper-container[data-v-fe251cd0]{position:absolute;background-color:#fff;padding:10px;bottom:0;left:0;width:100%;height:200px;border:1px solid #00f;box-sizing:border-box}.main-container .education-canvas-wrapper .drag-content-list-wrapper .drag-swiper-container .drag-list-group[data-v-fe251cd0]{width:100%;height:100%;display:flex}.main-container .education-canvas-wrapper .drag-content-list-wrapper .drag-swiper-container .drag-list-group .drag-list-group-item[data-v-fe251cd0]{flex-shrink:0;width:100%;height:auto;border:1px solid #000;box-sizing:border-box}.main-container .main-footer-wrapper[data-v-fe251cd0]{width:100%;height:10%;min-height:80px;display:flex;justify-content:space-between}.main-container .main-footer-wrapper .doctor-image[data-v-fe251cd0]{width:80px;height:80px;background-image:url(https://images.vexels.com/media/users/3/151709/isolated/preview/098c4aad185294e67a3f695b3e64a2ec-doctor-avatar-icon-by-vexels.png);background-size:contain;margin-right:10px}.main-container .main-footer-wrapper .draw-tools-wrap[data-v-fe251cd0]{margin:0 10px;width:auto;height:80px;display:flex;border-radius:10px;border:1px solid pink;box-sizing:border-box;padding:0 40px;justify-content:center;align-items:center}.main-container .main-footer-wrapper .draw-tools-wrap .draw-tool[data-v-fe251cd0]{margin:0 10px;height:60px}.main-container .main-footer-wrapper .add-page[data-v-fe251cd0]{width:80px;height:80px;margin-left:10px;background-image:url(https://www.uwosh.edu/library/images/plus-icon.png/@@images/image.png);background-size:contain;background-repeat:no-repeat}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$2 = "data-v-fe251cd0";
/* module identifier */

const __vue_module_identifier__$2 = undefined;
/* functional template */

const __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  DragComponent: __vue_component__,
  DropComponent: __vue_component__$1,
  DragDropSample: __vue_component__$2
});

// Import vue components

const install = function installDragDrop(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__ as DragComponent, __vue_component__$2 as DragDropSample, __vue_component__$1 as DropComponent };
