import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
