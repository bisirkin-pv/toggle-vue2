import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { Datetime } from "vue-datetime";
import ApiPlugin from "./plugins/api";
import notifierPlugin from "./plugins/notifier";

import "vue-datetime/dist/vue-datetime.min.css";
import store from "./store";

Vue.use(ApiPlugin);
Vue.use(notifierPlugin, store);
Vue.component("vue-datetime", Datetime);
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
