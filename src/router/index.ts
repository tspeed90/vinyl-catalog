import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/album-details/:id",
    name: "Album Details",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "albumDetails" */ "../views/AlbumDetails.vue")
  },
  {
    path: "/collections",
    name: "Collections",
    component: () => import(/* webpackChunkName: "collections" */ "../views/Collections.vue") 
  },
  {
    path: "/collections/:collection",
    name: "Collections List",
    component: () => import(/* webpackChunkName: "collectionsList" */ "../views/Collections.vue") 
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
