<template>
  <div class="maincontainer">
    <div class="header">
      <div class="logo">
        <img src="../assets/weblogo.jpg" alt />
      </div>
      <div class="link">
        <router-link to="/articles">文章</router-link>
        <router-link to="/talkothers">随笔</router-link>
        <router-link to="/collections">收藏</router-link>
        <router-link to="/messages">留言</router-link>
      </div>
    </div>
    <div class="container">
      <transition enter-active-class="animated fadeInUp">
        <router-view />
      </transition>
    </div>
    <div class="footer">
      <div class="webdetail">
        <div>ICP备案：待定</div>
      <div><img src="../assets/beian.png" alt="">
        公网安备 待定</div><a href=""></a>
      </div>
    </div>
  </div>
</template>
<script>
import "../css/Animate.css";
export default {};
</script>
<style>
.header {
  height: 5.625rem;
  width: 90%;
  margin: auto;
  border-bottom: 0.0313rem solid #e4e4e4;
  font-size: 1.125rem
}
.header .router-link-active{
  color: #000 !important;
}

.link {
  position: absolute;
  right: 0;
  width: 40%;
  display: flex;
  justify-content: space-around;
  padding-top: 1.25rem;
}
a {
  color: #999595;
  text-decoration: none;
}
a:hover {
  color: #f54d4d;
}
.logo{
  margin-top: 1.25rem;
  margin-left: 1.875rem;
}
.logo img {
  position: absolute;
  height: 3.75rem;
  border-radius: 50%;
}
.display {
  color: aqua;
  font-weight: bold;
}
.otherlink img {
  height: 1.5625rem;
  border-radius: 50%;
}
.router-link-active:nth-of-type(1) {
  border-bottom: solid rgb(255, 184, 126) 0.1875rem;
}
.router-link-active:nth-of-type(2) {
  border-bottom: solid rgb(17, 118, 235) 0.1875rem;
}
.router-link-active:nth-of-type(3) {
  border-bottom: solid rgb(255, 126, 159) 0.1875rem;
}
.router-link-active:nth-of-type(4) {
  border-bottom: solid rgb(184, 93, 212) 0.1875rem;
}
.container{
  min-height: 93.75rem;
}
.footer{
  height: 4.375rem;
  background-color: #ebebeb;
}
.webdetail{
  padding: 1.25rem 21.875rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
@media screen and (max-width: 500px){
  .header{
    height: 3.125rem;
    margin: 0 auto 0.9375rem;
  }
  .header .logo img{
    height: 2.5rem;
  }
  .link{
    width: 60% ;
    font-size: 0.875rem;
    padding: 0.625rem;
   }
   a{
     font-size: 1.125rem;
   }
   .footer{
     height: 2.5rem;
   }
   .webdetail{
     padding: 0;
     display: block;
   }
   .webdetail div{
     display: flex;
     justify-content: center;
   }

}
</style>