import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import HelloWorld from "@/components/HelloWorld.vue";

const routes = [
  {
    component: HelloWorld,
    name: "table",
    path: "/",
  },
];

export default new VueRouter({
  routes,
});
