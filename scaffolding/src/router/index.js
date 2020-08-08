import Vue from 'vue'
import VueRouter from 'vue-router'

//导入组件文件
import Header from '../components/demo/Header.vue';
import Field from '../components/demo/Field.vue';
import Navbar from '../components/demo/Navbar.vue';
import Tabcontainer from '../components/demo/Tabcontainer.vue';
import List from '../components/demo/List.vue';
import Tabbar from '../components/demo/Tabbar.vue';
import Tabbar2 from '../components/demo/Tabbar2.vue';
import Indinite from '../components/demo/Indinite.vue';
import Indicstor from '../components/demo/Indicstor.vue';

//项目组件文件
import Home from '../views/Home.vue'
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Article from '../views/Article.vue';

Vue.use(VueRouter)

const routes = [
  {
    path:'/indicstor',
    component:Indicstor
  },
  {
    path:'/indinite',
    component:Indinite
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/tabbar2',
    component:Tabbar2
  },
  {
    path:'/tabbar',
    component:Tabbar
  },
  {
    path:'/list',
    component:List
  },
  {
    path:'/tabcontainer',
    component:Tabcontainer
  },
  {
    path:'/navbar',
    component:Navbar
  },
  {
    path:'/field',
    component:Field
  },
  {
    path:'/header',
    component:Header
  },
  {
    path:'/register',
    component:Register
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/article/:id',
    component: Article
  },
  {
    path: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
