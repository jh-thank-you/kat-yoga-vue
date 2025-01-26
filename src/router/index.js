import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/about",
      name: "about",
      faviconhref: "/dev/katyoga/img/favicons/about/favicon.ico",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/About.vue"),
    },
    {
      path: "/instructor",
      name: "instructor",
      faviconhref: "/dev/katyoga/img/favicons/instructor/favicon.ico",
      component: () => import("../views/Instructor.vue"),
    },
    {
      path: "/classes",
      name: "classes",
      faviconhref: "/dev/katyoga/img/favicons/classes/favicon.ico",
      component: () => import("../views/Classes.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      faviconhref: "/dev/katyoga/img/favicons/contact/favicon.ico",
      component: () => import("../views/Contact.vue"),
    },
    {
      //use "/:pathMatch(.*)*" for dev mode and final production build
      path: "/:pathMatch(.*)*",
      // for files to be uploaded to my shared derver dev folder use base: "/dev/katyoga/"
      // path: "/dev/katyoga/:pathMatch(.*)*",
      name: "error",
      faviconhref: "/dev/katyoga/img/favicons/error/favicon.ico",
      component: () => import("../views/Error.vue"),
    },
  ],
});

export default router;
