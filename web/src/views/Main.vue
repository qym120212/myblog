<template>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="../assets/dog.jpg" alt />
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
  </div>
</template>
<script>
import "../css/Animate.css";
export default {};
</script>
<style>
.header {
  background-color: white;
  display: flex;
  height: 90px;
  width: 90%;
  margin: auto;
  justify-content: space-around;
  align-items: center;
  border-bottom: .5px solid #e4e4e4;
  font-size: 18px;
  margin: 0 90px;
}
.header .router-link-active{
  color: #000 !important;
}
.link {
  margin-left: 60%;
}
a {
  color: #999595;
  padding: 15px;
  text-decoration: none;
  font-size: 20px;
  margin-right: 50px;
}
a:hover {
  color: #f54d4d;
}
.logo img {
  height: 50px;
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
  border-bottom: solid rgb(124, 228, 115) 3px;
}
.router-link-active:nth-of-type(4) {
  border-bottom: solid rgb(255, 126, 137) 3px;
}
.container{
  height: 1500px;
}
</style>