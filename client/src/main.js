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
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    if (!localStorage.token) localStorage.setItem("token", "");

    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) console.log("[networkError]", networkError);

    if (graphQLErrors) {
      for (let err in graphQLErrors) console.dir(err);
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch("getCurrentUser");
  }
}).$mount("#app");
