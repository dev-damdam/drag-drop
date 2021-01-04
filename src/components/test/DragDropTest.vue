<template>
<div id="app">
  <div class="main-container">
    <div class="education-canvas-wrapper">
      <div class="education-canvas">
        <!--drop-->
        <div class="drop-content-list-wrapper">
          <swiper
            class="drop-swiper-container swiper"
            :options="dropSwiperOption"
            ref="canvasSwiper"
          >
            <swiper-slide
              :class="noSwiper"
              class="drop-list-group"
              v-for="educationContentPage in educationContentPageList"
              :key="educationContentPage.id"
            >
              <DropComponent
                class="drop-list-group-item"
                v-bind:dropData="educationContentPage"
                @drop-data-info="evt_addEducationPage"
              />
            </swiper-slide>

            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>

        <!--drag-->
        <div class="drag-content-list-wrapper" v-if="bAddPage">
          <swiper
            class="drag-swiper-container swiper swiper-no-swiping"
            :options="dragSwiperOption"
          >
            <swiper-slide
              class="drag-list-group"
              v-for="content in contentsList"
              :key="content.id"
            >
              <DragComponent
                class="drag-list-group-item"
                v-bind:dragData="content"
              />
            </swiper-slide>

            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
      </div>
    </div>

    <div class="main-footer-wrapper">
      <div class="doctor-image"></div>
      <div class="draw-tools-wrap">
        <img
          class="draw-tool"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-undo-512.png"
        />
        <img
          class="draw-tool"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-redo-512.png"
        />
        <img
          class="draw-tool"
          src="https://images.vexels.com/media/users/3/140955/isolated/preview/8553633346f0a3e500426bb69f08fd69-pen-pencil-icon-by-vexels.png"
        />
        <img
          class="draw-tool"
          src="https://icon-library.com/images/highlight-icon/highlight-icon-8.jpg"
        />
        <img
          class="draw-tool"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Eraser_icon.svg/768px-Eraser_icon.svg.png"
        />
      </div>
      <div class="add-page" v-on:click="evt_showPageList"></div>
    </div>
  </div>
</div>
</template>

<script>
import DragComponent from "../DragComponent.vue";
import DropComponent from "../DropComponent.vue";
import "swiper/css/swiper.css";
export default {
  name: "Main",
  components: {
    DragComponent,
    DropComponent,
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
          shadow: false, // 아래에 그림자 사용 안함
          slideShadows: false,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      dragSwiperOption: {
        slidesPerView: 4,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  computed: {
    CanvasSwiper() {
      return this.$refs.canvasSwiper.$swiper;
    },
  },
  methods: {
    initContentsList: function() {
      for (let i = 0; i < 30; i++) {
        let imagePath;
        if (i % 2 == 0) {
          imagePath = require("../../assets/test/imgs/education_contents_1.png");
        } else {
          imagePath = require("../../assets/test/imgs/education_contents_2.png");
        }

        this.contentsList.push({
          id: i,
          name: "test" + i,
          major: "내분비계",
          image_url: imagePath,
        });
      }

      this.educationContentPageList.push({
        id: 0,
        name: "test" + 0,
        major: "내분비계",
        image_url: "empty",
      });
    },

    evt_showPageList: function() {
      //콘텐츠 리스트 컴포넌트가 active되면 education canvas 스크롤 막기
      if (this.bAddPage) {
        this.bAddPage = false;
        this.noSwiper = "";
      } else {
        this.bAddPage = true;
        this.noSwiper = "swiper-no-swiping";
      }
    },

    evt_addEducationPage: function(page) {
      console.log(page.data["id"]);
      let bDuplicate = this.duplicatedCheck(page.data["id"]);
      if (bDuplicate) {
        alert("해당 컨텐츠는 이미 선택된 컨텐츠 입니다.");
      } else {
        this.educationContentPageList.push({
          id: page.data["id"],
          name: "test" + page.data["id"],
          major: "내분비계",
          image_url: page.data["image_url"],
        });

        console.log(this.educationContentPageList);
      }
    },

    duplicatedCheck: function(_id) {
      //컨텐츠 중복체크
      let bDuplicate = false;
      for (let i = 0; i < this.educationContentPageList.length; i++) {
        if (this.educationContentPageList[i]["id"] == _id) {
          bDuplicate = true;
        }
      }
      return bDuplicate;
    },
  },
};
</script>
<style lang="scss" scoped>
.swiper-container-3d {
  perspective: 8000px;
}
.main-container {
  width: 100%;
  height: 100vh;
  max-width: 1024px;
  margin: 0 auto;
  .education-canvas-wrapper {
    width: 100%;
    height: 90%;

    .education-canvas {
      position: relative;
      width: 100%;
      height: 100%;

      .drop-content-list-wrapper {
        width: 100%;
        height: 100%;

        .drop-swiper-container {
          background-color: white;
          padding: 10px;
          width: 100%;
          height: 100%;
          border: 1px solid palegreen;
          box-sizing: border-box;

          .drop-list-group {
            width: 100%;
            height: 100%;
            display: flex;

            .drop-list-group-item {
              flex-shrink: 0;
              width: 100%;
              height: auto;
            }
          }
        }
      }
    }

    .drag-content-list-wrapper {
      width: 100%;
      height: auto;

      .drag-swiper-container {
        position: absolute;
        background-color: white;
        padding: 10px;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 200px;
        border: 1px solid blue;
        box-sizing: border-box;

        .drag-list-group {
          width: 100%;
          height: 100%;
          display: flex;

          .drag-list-group-item {
            flex-shrink: 0;
            width: 100%;
            height: auto;
            border: 1px solid black;
            box-sizing: border-box;
          }
        }
      }
    }
  }

  .main-footer-wrapper {
    width: 100%;
    height: 10%;
    min-height: 80px;
    display: flex;
    justify-content: space-between;

    .doctor-image {
      width: 80px;
      height: 80px;
      background-image: url("https://images.vexels.com/media/users/3/151709/isolated/preview/098c4aad185294e67a3f695b3e64a2ec-doctor-avatar-icon-by-vexels.png");
      background-size: contain;
      margin-right: 10px;
    }

    .draw-tools-wrap {
      margin: 0px 10px;
      width: auto;
      height: 80px;
      display: flex;

      border-radius: 10px;
      border: 1px solid pink;
      box-sizing: border-box;

      padding: 0px 40px;

      justify-content: center;
      align-items: center;

      .draw-tool {
        margin: 0px 10px;
        height: 60px;
      }
    }

    .add-page {
      width: 80px;
      height: 80px;

      margin-left: 10px;

      background-image: url("https://www.uwosh.edu/library/images/plus-icon.png/@@images/image.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}
</style>
