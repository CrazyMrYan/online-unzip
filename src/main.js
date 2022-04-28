import Vue from "vue";
import App from "./App.vue";
import Highlight from "./directive"; // 这里是你项目highlight.js所在路径
Vue.use(Highlight);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
