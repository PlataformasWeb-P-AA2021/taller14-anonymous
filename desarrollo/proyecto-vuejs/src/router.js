import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: '/index'
    },
    {
      path: "/create_departamento",
      name: "create_departamento",
      component: () => import("./components/CreateDepartamento.vue")
    },
    {
      path: "/index",
      name: "index",
      component: () => import("./components/Index.vue")
    },
    {
       path: "/edit_departamento/:id",
       name: "edit_departamento",
       component: () => import("./components/EditDepartamento.vue")
     },
  ]
});
