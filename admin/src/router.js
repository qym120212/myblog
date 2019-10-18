import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'
import TalkOtherEdit from './views/TalkOtherEdit.vue'
import TalkOtherList from './views/TalkOtherList.vue'
import CollectionEdit from './views/CollectionEdit.vue'
import CollectionList from './views/CollectionList.vue'
import CommentList from './views/CommentList'
import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'
Vue.use(Router)

export default new Router({
  routes: [
    { path:'/login',name:'login',component:Login },
    {
      path: '/',
      name: 'mian',
      component: Main,
      children:[  
        { path:'/articles/create',component:ArticleEdit },
        { path:'/articles/edit/:id',component:ArticleEdit,props:true }, //将参数:id注入到CategoryEdit组件中
        { path:'/articles/list',component:ArticleList },
        
        { path:'/talkothers/create',component:TalkOtherEdit },
        { path:'/talkothers/edit/:id',component:TalkOtherEdit,props:true }, //将参数:id注入到CategoryEdit组件中
        { path:'/talkothers/list',component:TalkOtherList },

        { path:'/collections/create',component:CollectionEdit },
        { path:'/collections/edit/:id',component:CollectionEdit,props:true }, //将参数:id注入到CategoryEdit组件中
        { path:'/collections/list',component:CollectionList },

        { path:'/comments/list',component:CommentList },

        { path:'/admin_users/create',component:AdminUserEdit },
        { path:'/admin_users/edit/:id',component:AdminUserEdit,props:true }, //将参数:id注入到CategoryEdit组件中
        { path:'/admin_users/list',component:AdminUserList },
      ]
    },

  ]
})
