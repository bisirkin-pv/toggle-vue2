import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { Datetime } from "vue-datetime";
import ApiPlugin from './plugins/api'

import "vue-datetime/dist/vue-datetime.min.css";

Vue.use(ApiPlugin)
Vue.component("vue-datetime", Datetime);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
