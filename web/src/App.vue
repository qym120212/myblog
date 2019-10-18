<template>
  <div id="app">
    <div class="container">
      <div class="logo">
          <img src="./assets/dog.jpg" alt="">
          <span class="display">mingo's blog</span>
      </div>
      <div class="link">
        <a href="#">文章</a>
        <a href="#">随笔</a>
        <a href="#">收藏</a>
        <a href="#">留言</a>
      </div>
      <div class="otherlink">
        <img src="./assets/githublogo.jpg" alt="">
        <a href="#">GitHub</a>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
  html,body{
    margin: 0;
    padding: 0;
  }
  .container{
    background-color: #20232a;
    display: flex;
    height: 100px;
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
    padding: 20px;
    text-decoration: none;
    font-size: 20px
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
</style>
