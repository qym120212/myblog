<template>
  <div style="min-height: 100vh;">
    <div class="bloglist">
      <ul class="list">
        <li v-for="item in arr" :key="item._id" @click="collectionlink(item.link)">
          <span class="time">{{ item.date }}</span>
          <div class="title">{{ item.title }}</div>
        </li>
      </ul>
      <div class="slider">
         <div class="search">
           <input type="text" placeholder="请输入关键词搜索" class="elinput" v-model="keywords" />
          <button class="btn" @click="search(keywords)"> 
            <img src="../assets/search.png" />
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
                <img src="../assets/githublogo.jpg" alt />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="this.items.length"
        layout="total, prev, pager, next"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      arr: [],
      pageSize: 6,
      currentPage: 1,
      keywords: ""
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("collections");
      this.items = res.data.reverse();
      this.arr = this.items.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    collectionlink(link) {
      window.open(link);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.arr = this.items.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    search(key) {
      if (!key) {
        this.fetch();
      }
      let arr1 = [];
      this.items.map(item => {
        if (item.title.includes(key)) {
          arr1.push(item);
        }
      });
      this.items = arr1;
      this.arr = this.items.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
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
  padding: 2.4375rem 2.5rem 0;
}
*{
  margin: 0;
  padding: 0;
}
ul {
  margin-left: 1.875rem;
  width: 56%;
  display: inline-block;
  padding: 0;
}
li {
  list-style: none;
  height: 6.25rem;
  display: flex;
  align-items: center;
  border: 0.0625rem solid white;
  box-shadow: 0.3125rem 0.3125rem 1.25rem #e4e3e3;
  margin-bottom: 1.25rem;
  font-size: 1.1875rem;
  border-left: 0.75rem solid rgb(248,162,183);
  transition: 0.4s;
  line-height: 1.5em;
}
li .title {
  margin-left: 3.125rem;
}
li .time {
  margin-left: 1.25rem;
  color: #575757;
}
li:hover {
  cursor: pointer;
  border-left: 0.75rem solid rgb(255,126,159);
  transform: scale(1.03);
}
.infome {
  display: inline-block;
}
.slider {
  width: 36%;
  padding-left: 5rem;
}
.elinput:focus{
    border-color: rgb(255,126,159);
}
.elinput{
  box-sizing: border-box;
    border: 2px solid rgb(248,162,183);
    border-right: transparent;
    border-radius: 0.625rem 0rem 0rem 0.625rem;
    outline: none;
    text-indent: 1em;
    height: 100%;
    width: 50%;
}
.btn {
    box-sizing: border-box;
  background-color: rgb(255,126,159);
  vertical-align: top;
    margin-left: -6px;
    height: 100%;
    width: 40px;
    border-radius: 0 5px 5px 0;
    border: none;
    cursor: pointer;
    margin-top: 4px;
}
.btn img{
  width: 60%;
}
.search {
  height: 40px;
}
.notice {
  width: 80%;
  height: 12.5rem;
  margin-top: 1.875rem;
  box-shadow: 0.3125rem 0.3125rem 1.25rem #e4e3e3;
}
.noticeheader {
  padding: 0.625rem 1.875rem;
}
.noticetitle {
  border-bottom: 0.0313rem solid #e4e4e4;
  padding-bottom: 0.625rem;
}
.noticeinfo {
  line-height: 1.8em;
  font-size: 0.875rem;
}
.noticeaddress {
  background-color: rgb(246, 246, 246);
  height: 5.75rem;
  padding: 2px 1.9375rem;
}
.noticeaddress p {
  font-size: 0.8125rem;
    margin: 0.75rem 0 1.25rem 0;
}
.noticeaddress img {
  height: 1.25rem;
  border-radius: 50%;
}
.page{
  margin-left: 7.5rem;
}
.page >>> .el-pager li.active{
    color: rgb(248,162,183); 
}
.page >>> .el-pager li:hover{
    color: rgb(248,162,183);
}
.page >>> .el-pagination .btn-next:hover{
    color: rgb(248,162,183);
}
.page >>> .el-pagination .btn-prev:hover{
    color: rgb(248,162,183);
}
@media screen and (max-width: 500px){
  .btn{
    margin-top: 0;
  }
  .list{
    margin-top: 255px
  }
  ul{
    margin-left: 10px;
    width: 95%;
    margin-top: 0rem;
  }
  .bloglist{
    padding: 10px 20px 0;
  }
  li{
    height: 4.25rem;
    word-break: break-all;
  }
  .slider{
    width: 100%;
    order: -1;
    padding: 0; 
  }
  .search{
    width: 100%;
    text-align: center;
  }
  .elinput {
  border-color: rgb(248,162,183);
  border-radius: 0.625rem 0rem 0rem 0.625rem;
  width: 70%;
}

  .notice{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    margin-top: 1.25rem;
    width: 90%;
    margin-left: 0;
    left: 50%;
    transform: translate(-50%,0);
  }
  .noticetitle{
    text-align: center;
  }
  .noticeinfo{
    text-align: center;
    font-size: 13px;
    margin-top: 0.9375rem;
  }
  .noticeheader{
    padding: 0 0.625rem;
  }
  .noticeaddress{
    height: 36px;
    display: flex;
    padding: 0.5625rem 0.9375rem 0px 0.75rem;
    align-items: center;
  }
  li .time{
    min-width: 20%;
    font-size: 0.75rem;
  }
  li .title{
      width: 60%;
      font-size: 18px;
      margin-left: 25px;
      font-weight: bolder;
  }
  .noticeaddress p{
    flex: 1
  }
  .page{
    display: flex;
    justify-content: center;
    margin-left: 0;
  }
}
</style>