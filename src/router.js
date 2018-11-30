import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home.vue";

Vue.use(Router);
let base = `${process.env.BASE_URL}`; // 获取二级目录
export default new Router({
    mode: "history", // 注意: 需要服务端配合
    base: base, // 设置base值
    routes: [{
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import( /* webpackChunkName: "about" */ "./views/about.vue")
        },
        {
            path: "/demo",
            name: "demo",
            component: () =>
                import( /* webpackChunkName: "demo"*/ "./views/demo.vue")
        }
    ]
});
