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
        <span>ICP备案：苏ICP备19034670号-1</span>
      <span><img src="../assets/beian.png" alt="">
        苏公网安备 32058102001549号</span><a href=""></a>
      </div>
    </div>
  </div>
</template>
<script>
import "../css/Animate.css";
export default {};
</script>
<style>
@media screen and (max-width: 500px){
  .header{
    height: 60px !important;
    margin: 0 auto 15px !important
  }
  .header .logo img{
    margin-top: 10px;
    height: 40px !important;
  }
  .link{
    width: 70% !important;
    font-size: 14px;
    padding: 10px;
   }
}
.header {
  height: 90px;
  width: 90%;
  margin: auto;
  border-bottom: .5px solid #e4e4e4;
  font-size: 18px
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
  padding-top: 20px;
}
a {
  color: #999595;
  text-decoration: none;
}
a:hover {
  color: #f54d4d;
}
.logo{
  margin-top: 20px;
  margin-left: 30px;
}
.logo img {
  position: absolute;
  height: 60px;
  border-radius: 50%;
}
.display {
  color: aqua;
  font-weight: bold;
}
.otherlink img {
  height: 25px;
  border-radius: 50%;
}
.router-link-active:nth-of-type(1) {
  border-bottom: solid rgb(255, 184, 126) 3px;
}
.router-link-active:nth-of-type(2) {
  border-bottom: solid rgb(17, 118, 235) 3px;
}
.router-link-active:nth-of-type(3) {
  border-bottom: solid rgb(255, 126, 159) 3px;
}
.router-link-active:nth-of-type(4) {
  border-bottom: solid rgb(184, 93, 212) 3px;
}
.container{
  height: 1500px;
}
.footer{
  height: 70px;
  background-color: #ebebeb;
}
.webdetail{
  padding: 20px 350px;
    display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>