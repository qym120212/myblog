<template>
  <div style="min-height: 100vh;">
    <div class="bloglist">
      <ul class="list">
        <li v-for="item in items" :key="item._id" @click="articledetail(item._id)">
          <span class="time">{{ item.date }}</span>
          <div class="title">{{ item.title }}</div>
        </li>
      </ul>
      <div class="slider">
        <div class="search">
          <el-input placeholder="请输入关键词搜索" class="einput"></el-input>
          <button class="btn">
            <img src="../assets/search.png" alt height="25px" class="btn" />
          </button>
        </div>
        <div class="notice">
          <div class="noticeheader">
            <h3 class="noticetitle">公告</h3>
            <p class="noticeinfo">
              这里是曲源明的个人博客，总结自己在前端领域的所学
              <br />分为原创文章板块，随笔板块，收藏板块和留言板
              <br />如果内容对您有所帮助，欢迎点赞评论
            </p>
          </div>
          <div class="noticeaddress">
              <p>联系我:qym3009@foxmail.com</p>
              <div>
                  <a href="https://github.com/qym120212">
                       <img src="../assets/githublogo.jpg" alt="">
                  </a>
                 
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("talkothers");
      this.items = res.data.reverse()
      this.items.map(item => {
        let d = new Date(item.date);
        item.date =
          d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      });
    },
    articledetail(id) {
      this.$router.push(`/talkothers/${id}`);
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style scoped>
.bloglist {
  display: flex;
  flex-wrap: wrap;
  padding: 0px 40px 0;
}
ul {
  margin-top: 50px;
  margin-left: 30px;
  width: 56%;
  display: inline-block;
}
li {
  list-style: none;
  height: 95px;
  display: flex;
  align-items: center;
  border: 1px solid white;
  box-shadow: 5px 5px 20px #e4e3e3;
  margin-bottom: 20px;
  font-size: 19px;
  border-left: 12px solid rgb(113, 174, 248);
  transition: 0.4s;
  line-height: 1.5em;
}
li .title {
  margin-left: 50px;
}
li .time {
  margin-left: 20px;
  color: #575757;
}
li:hover {
  cursor: pointer;
  border-left: 12px solid rgb(17, 118, 235);
  transform: scale(1.03);
}
.infome {
  display: inline-block;
}
.slider {
  width: 36%;
}
.einput >>> .el-input__inner {
  border-color: rgb(17, 118, 235);
  border-radius: 10px 0px 0px 10px;
}
.btn {
  background-color: rgb(17, 118, 235);
  border: none;
  border-radius: 0px 10px 10px 0px;
}
.search {
  margin: 50px;
  width: 30%;
  display: flex;
}
.notice{
width: 80%;
height: 50%;
margin: 30px auto;
margin-left: 50px;
box-shadow: 5px 5px 20px #e4e3e3;    
}
.noticeheader {
  padding: 10px 30px;
}
.noticetitle {
  border-bottom: 0.5px solid #e4e4e4;
  padding-bottom: 10px;
}
.noticeinfo {
  line-height: 1.8em;
  font-size: 14px;
}
.noticeaddress {
  background-color:rgb(246, 246, 246);
  height: 92px;
  padding: 2px 20px
}
.noticeaddress p{
    font-size: 13px;
}
.noticeaddress img{
    height:20px;
    border-radius: 50%
}
</style>