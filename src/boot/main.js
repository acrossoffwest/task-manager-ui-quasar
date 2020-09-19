import Vue from "vue";
import VueTheMask from "vue-the-mask";
import Tooltip from "vue-directive-tooltip";

Vue.use(VueTheMask);
Vue.use(Tooltip, {
  delay: 50,
  placement: "top",
  class: "custom-tooltip",
  triggers: ["hover"],
  offset: 5,
});

import components from "./loadComponents";

components.map((component) => {
  return Vue.component(component.name, component)
})
