import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI)
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
