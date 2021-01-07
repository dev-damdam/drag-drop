# drag-drop-component module

![node](https://img.shields.io/badge/node-14.15.0-%2300A9AF.svg) ![npm](https://img.shields.io/badge/npm-6.14.8-red.svg)![vue-cli](https://img.shields.io/badge/vue--cli-4.5.8-%23ff69b4.svg) 



이 저장소는 **drag & drop 컴포넌트 모듈** 소스코드를 관리하는 저장소입니다.



### 목차
1. [개발 환경](#개발환경)
2. [사용 방법](#사용방법)
3. [배포 방법](#배포방법)



### 개발환경
- 운영체제 : Windows 10 

- IDE : Visual Studio Code




### 사용방법

```
npm install git@bitbucket.org:springsoftwork/drag-drop.git 
```



컴포넌트 등록

```
//global registration
import { DropComponent, DragComponent } from "drag-drop-component";

Vue.component('drop-component', DropComponent);
Vue.component('drag-component', DragComponent);

```

컴포넌트 사용 방법

```
//template
<drop-component
    v-bind:dropData="" //type: json 
    @drop-data-info="" //get dropped data info function
/>

<drag-component
    v-bind:dragData="educationContent" //type: json 
/>
```



### 배포방법



터미널에 아래의 명령어 입력

```
npm run library:build
```


배포 진행 후 css 적용을 위해 dist 폴더 내에 **drag-drop-component.common.js** 다음과 같이 수정 

```
require('./drag-drop-component.css') //추가
module.exports =
    /******/
    (function(modules) { // webpackBootstrap
        /******/ // The module cache
        /******/
.......
```
