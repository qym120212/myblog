import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mian',
      component: Main,
      children:[
        { path:'/categories/create',component:CategoryEdit },
        { path:'/categories/edit/:id',component:CategoryEdit,props:true }, //将参数:id注入到CategoryEdit组件中
        { path:'/categories/list',component:CategoryList },
        
        { path:'/articles/create',component:ArticleEdit },
        { path:'/articles/edit/:id',component:ArticleEdit,props:true }, //将参数:id注入到CategoryEdit组件中
        { path:'/articles/list',component:ArticleList },
      ]
    },

  ]
})
