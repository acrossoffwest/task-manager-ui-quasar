import Vue from "vue";
import colorSchemes from "../colors/schemes";

Vue.prototype.$color = function (colorKey) {
  console.log(this.$store.getters.colorScheme)
  return colorSchemes[this.$store.getters.colorScheme][colorKey];
};
