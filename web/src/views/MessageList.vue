<template>
  <div class="articlecomment">
    <div class="commentlist">
      <div v-for="(item,index) in arr" :key="index" class="allinfo">
        <span>
          <img :src="require('../assets/'+item.headIndex+'.jpeg')" alt width="50px" />
        </span>
        <div class="everyone">
          <div class="everyonename">{{ item.name }} :</div>
          <div class="everyonebody">{{ item.body }}</div>
        </div>
      </div>
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page="currentPage"
          :total="this.comments.length"
          layout="total, prev, pager, next"
        ></el-pagination>
      </div>
    </div>

    <div class="form">
      <el-form @submit.native.prevent="save()">
        <el-input placeholder="请输入您的昵称" class="elinput" v-model="model.name"></el-input>
        <el-input type="textarea" placeholder="请输入评论内容" v-model="model.body" class="eltextarea"></el-input>
        <el-button id="elbtn" native-type="submit" :loading="loading">{{ this.btn }}</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        name: "",
        body: "",
        headIndex: ""
      },
      comments: "",
      headIndex: 1,
      arr: [],
      pageSize: 9,
      currentPage: 1,
      loading: false,
      btn:'提交评论'
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("comments");
      this.comments = res.data.reverse();
      this.arr = this.comments.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      this.limit()
    },
    limit(body) {
      let commentstorage;
      if (localStorage.getItem("key")) {
        commentstorage = JSON.parse(localStorage.getItem("key"));
      } else {
        commentstorage = [];
      }
      if(body){
        commentstorage.push(body);
      }
      localStorage.setItem("key", JSON.stringify(commentstorage));
      if (commentstorage.length > 3) {
        this.loading = true;
        this.btn = '过会再评论吧~~'
        setTimeout(()=>{
            localStorage.clear()
            this.loading = false
        },30000)
      }
    },
    async save() {
      if (this.model.name) {
        if (this.model.body) {
          this.model.headIndex = Math.floor(Math.random() * 6);
          const res = await this.$http.post("comments", this.model);
          this.$message({
            type: "success",
            message: "发布成功"
          });
          this.limit(this.model.body)
          setTimeout(() => {
            this.model = {};
          }, 0);
          this.fetch();
        } else {
          this.$message({
            type: "error",
            message: "写点东西吧"
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "请输入尊姓大名"
        });
      }
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.arr = this.comments.slice(
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
.articlecomment {
  width: 90%;
  margin: auto;
  padding: 30px 40px 35px;
  margin-bottom: 50px;
}
.commentlist {
  display: inline-block;
  width: 40%;
  float: left;
}
.form {
  display: inline-block;
  width: 10%;
}
.allinfo {
  display: flex;
  margin-bottom: 20px;
  width: 70%;
  align-items: center;
  border-bottom: 1px solid #e4e3e3;
}
.allinfo img {
  border-radius: 50%;
}
.everyone {
  display: inline-block;
  margin-left: 30px;
  line-height: 32px;
}
.everyonename {
  font-size: 13px;
  font-weight: bold;
}
.everyonebody {
  font-size: 18px;
  text-indent: 1em;
}
.ilike {
  text-align: center;
}
.footer-icon {
  display: flex;
  justify-content: center;
}
.footer-detail {
  text-align: center;
}

.elinput >>> .el-input__inner {
  margin-bottom: 10px;
  height: 30px;
  width: 150px;
  /* border-color: blueviolet */
}
.elinput >>> .el-input__inner:hover {
  border-color: blueviolet;
}
.eltextarea >>> .el-textarea__inner {
  height: 60px;
  width: 220px;
  margin-bottom: 10px;
}
.eltextarea >>> .el-textarea__inner:hover {
  border-color: blueviolet;
}
.el-button {
  height: 40px;
}
.el-button:hover {
  color: blueviolet;
  border-color: blueviolet;
}
.page >>> .el-pager li.active {
  color: rgb(184, 93, 212);
}
.page >>> .el-pager li:hover {
  color: rgb(184, 93, 212);
}
.page >>> .el-pagination .btn-next:hover {
  color: rgb(184, 93, 212);
}
.page >>> .el-pagination .btn-prev:hover {
  color: rgb(184, 93, 212);
}
@media screen and (max-width:500px){
  .articlecomment{
    display: flex;
    flex-direction: column;
   padding:0.625rem
  }
  .commentlist{
    width: 90%;
    float: none;
  }
  .form{
    order: -1;
    margin-bottom: 1.25rem;
  }
  .page{
    display: flex;
    justify-content: center;
    margin-left: 0;
  }

}
</style>