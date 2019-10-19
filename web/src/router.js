import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import ArticleList from './views/ArticleList.vue'
import TalkOtherList from './views/TalkOtherList.vue'
import CollectionList from './views/CollectionList.vue'
import MessageList from './views/MessageList.vue'
import ArticleDetail from './views/ArticleDetail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/articles' },
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        { path:'/articles',component:ArticleList },
        { path:'/articles/:id',component:ArticleDetail,props:true },//将参数id注入组件
        { path:'/talkothers',component:TalkOtherList },
        { path:'/collections',component:CollectionList },
        { path:'/messages',component:MessageList }
      ]
    },
  ]
})
