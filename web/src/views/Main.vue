<template>
  <div class="container">
    <div class="header">
        <div class="logo">
            <img src="../assets/dog.jpg" alt="">
            <span class="display">mingo's blog</span>
        </div>
        <div class="link">
          <router-link to="/articles">文章</router-link>
          <router-link to="/talkothers">随笔</router-link>
          <router-link to="/collections">收藏</router-link>
          <router-link to="/messages">留言</router-link>
        </div>
        <div class="otherlink">
          <a href="#"><img src="../assets/githublogo.jpg" alt="">GitHub</a>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<style>
.header{
    background-color: #20232a;
    display: flex;
    height: 80px;
    width: 100%;
    margin: auto;
    justify-content:space-around;
    align-items: center;
  }
  .link{
    margin-right: 25%;
  }
  a{
    color: aliceblue;
    padding: 15px;
    text-decoration: none;
    font-size: 20px;
    margin-right: 10px;
  }
  a:hover{
    color: #61dafb;
  }
  .logo img{
    height: 50px;
    border-radius: 50%
  }
  .display{
    color: aqua;
    font-weight: bold
  }
  .otherlink img{
    height: 25px;
    border-radius: 50%
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
</style>