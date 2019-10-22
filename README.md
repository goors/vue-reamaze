# Unofficial vue-reamaze plugin

## Get

``` 
npm install --save vue-reamaze
```
## Use

``` 
import VueReamaze from "vue-reamaze";
Vue.use(VueReamaze, {
  appId: "your account",
  img: "image",
  color: "color",
  size: size (this is number),
  position: "position"
});
```
## Use with nuxtjs

Edit nuxt config and add
```
plugins: [
    { src: '~/plugins/reamaze.js', ssr: false }
]
```
plugins/reamaze.js file
```
import Vue from "vue";
Vue.use(VueReamaze, {
  appId: "your account",
  img: "image",
  color: "color",
  size: size (this is number),
  position: "position"
});
```
Plugin is based on [vue-intercom](https://github.com/johnnynotsolucky/vue-intercom) plugin.
