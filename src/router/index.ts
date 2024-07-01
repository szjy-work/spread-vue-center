import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home/index.vue";
// 项目其他页面路由（推荐使用）
import SpreadFormRouter from "./modules/spread-form";
import { BASE_URL } from "@/utils/constants";

// vue项目自带路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home/about.vue")
  }
];

const routers = [...routes, ...SpreadFormRouter];


const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes: routers,
});

export default router;

