import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { Datetime } from "vue-datetime";

import "vue-datetime/dist/vue-datetime.min.css";

Vue.component("vue-datetime", Datetime);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
