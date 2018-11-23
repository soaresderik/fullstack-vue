import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#81C784",
    secondary: "#66BB6A",
    accent: "#FF5252",
    error: "#E57373",
    warning: "#FFF176",
    info: "#2196f3",
    success: "#4caf50"
  }
});
