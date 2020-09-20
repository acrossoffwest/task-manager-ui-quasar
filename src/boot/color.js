import Vue from "vue";
import colorSchemes from "../colors/schemes";

Vue.prototype.$color = function (colorKey) {
  return colorSchemes[this.$store.getters.colorScheme][colorKey];
};
