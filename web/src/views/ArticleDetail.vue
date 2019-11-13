<template>
  <div class="main">
    <div class="articlecontainer">
      <div class="articleheader">
        <div class="articletitle">{{ this.model.title }}</div>
        <div class="articleinfo">
          <div class="date">
            <i class="el-icon-date"></i>
            <span>{{ this.model.date }}</span>
          </div>
          <div class="view">
            <i class="el-icon-view"></i>
            <span>{{ this.model.pageviews }}</span>
          </div>
          <div class="thumb">
            <i class="el-icon-thumb"></i>
            <span>{{ this.model.likecount }}</span>
          </div>
          <div class="comment">
            <i class="el-icon-chat-dot-square"></i>
            <span>{{ this.commentsLength}}</span>
          </div>
        </div>
      </div>
      <div class="articledetail ql-editor" v-html="this.model.body">{{ this.model.body }}</div>
      <div>
        <div class="footer-icon" v-on:click="iLike()">
          <vue-clap-button :clicked="isClicked" @click="iLike" :colorNormal="likeColor" />
        </div>
        <div class="footer-detail">{{ this.model.likecount }}人觉得还不错</div>
      </div>
      <vue-editor class="editor"></vue-editor>
    </div>
    <div class="articlecomment">
      <div class="commentlist">
        <div v-for="(item,index) in model.comments" :key="index" class="allinfo">
          <span>
            <img :src="require('../assets/'+item.headIndex+'.jpeg')" alt width="50px" />
          </span>
          <div class="everyone">
            <div class="everyonename">{{ item.name }} :</div>
            <div class="everyonebody">{{ item.body }}</div>
          </div>
        </div>
      </div>
      <hr />
      <div class="inputarea">
        <el-form label-width="120px" @submit.native.prevent="touristsubmit()">
              <el-input v-model="tourist.name" placeholder="您的昵称" class="elinput"></el-input>
            <el-input v-model="tourist.body" placeholder="请输入评论内容" class="elinput1"></el-input>
            <el-button  native-type="submit" :loading="loading" class="elbtn">{{ this.btn }}</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import vueClapButton from "vue-clap-button";
import Vue from "vue";
import { VueEditor } from "vue2-editor";
Vue.use(vueClapButton);
export default {
  props: {
    id: {} //这样可以更好的跟路由解耦，不需要再写this.router.params.id这种写法
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      tourist: {},
      headIndex: "",
      commentsLength: 0,
      isClicked: false,
      likeColor: "#909399",
      loading: false,
      btn: "提交"
    };
  },
  methods: {
    async fetch() {
      this.limit();
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
      this.commentsLength = this.model.comments.length;
      var likeList = JSON.parse(localStorage.getItem("likeList"));
      if (!likeList) return;
      let flag = likeList.some(item => {
        return item == this.model._id;
      });
      if (flag) {
        this.isClicked = true;
        this.likeColor = "#F56C6C";
      }
    },
    limit(body) {
      let commentstorage;
      if (localStorage.getItem("key")) {
        commentstorage = JSON.parse(localStorage.getItem("key"));
      } else {
        commentstorage = [];
      }
      if (body) {
        commentstorage.push(body);
      }
      localStorage.setItem("key", JSON.stringify(commentstorage));
      if (commentstorage.length > 3) {
        this.loading = true;
        this.btn = "过会再评论吧~~";
        setTimeout(() => {
          localStorage.clear();
          this.loading = false;
        }, 30000);
      }
    },
    async touristsubmit() {
      // const res = await this.$http.post(`articles/${this.id}`,this.tourist)
      this.tourist.headIndex = Math.floor(Math.random() * 6);
      this.model.comments.push(this.tourist);
      const res = await this.$http.put(`articles/${this.id}`, this.model);
      // this.$router.push(`/articles/${this.id}`)
      setTimeout(() => {
        this.tourist = {};
      }, 0);
      this.$message({
        type: "success",
        message: "发表成功"
      });
      this.limit(this.tourist.body);
    },
    async iLike() {
      const articleId = this.model._id;
      this.likeColor = "#F56C6C";
      let flag = true;
      if (!localStorage.likeList) {
        const likeArticleList = [];
        likeArticleList.push(articleId);
        localStorage.setItem("likeList", JSON.stringify(likeArticleList));
        this.model.likecount += 1;
      } else {
        console.log("else");
        const likeArticleList = JSON.parse(localStorage.getItem("likeList"));
        likeArticleList.map(item => {
          if (item == articleId) {
            flag = false;
          }
        });
        if (flag) {
          this.model.likecount += 1;
          likeArticleList.push(articleId);
          localStorage.setItem("likeList", JSON.stringify(likeArticleList));
        }
      }
      const res = await this.$http.put(`articles/${this.id}`, this.model);
    }
  },
  created() {
    this.fetch();
  },
};
</script>
<style scoped>
.main {
  padding: 10px 70px 0;
}
.articlecontainer {
  width: 900px;
  margin: auto;
  padding: 30px 40px 35px;
  box-shadow: 5px 5px 20px #e4e3e3;
  margin-top: 50px;
  margin-bottom: 50px;
}
.articleheader {
  text-align: center;
  word-break: break-all;
}
.articletitle {
  margin-bottom: 10px;
  color: #282c34;
  font-size: 35px;
  font-weight: bold;
}
.articleinfo {
  width: 30%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  color: #a7a7a0;
}
.articlecomment {
  width: 900px;
  margin: auto;
  padding: 30px 40px 35px;
  box-shadow: 5px 5px 20px #e4e3e3;
  margin-top: 50px;
  margin-bottom: 50px;
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
}
.ilike {
  text-align: center;
}
.editor{
  display: none;
}
.ql-editor{
  max-width: 90%;
  margin: auto;
}
.ql-editor .ql-align-center{
  background-color: red;
}
.footer-icon {
  display: flex;
  justify-content: center;
}
.footer-detail {
  text-align: center;
}
@media screen and (max-width: 500px) {
  .main {
    width: 100%;
    padding: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .articlecontainer {
    width: 90%;
    padding: 0;
    margin-top: 0;
  }
  .articleheader .articletitle {
    margin-top: 0.625rem;
    font-size: 26px;
  }
  .articleheader .articleinfo {
    width: 50%;
  }
  .articledetail {
    padding: 10px;
  }
  .footer-detail {
    margin-bottom: 1.25rem;
  }
  .articlecomment {
    width: 90%;
    padding: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .allinfo {
    margin-bottom: 0;
  }
  .allinfo img {
    width: 40px;
    padding: 10px;
  }
  .everyone {
    margin-left: 20px;
  }
  .everyonebody {
    text-indent: 2em;
  }
  .inputarea{
    padding-left: 5px;
    margin-bottom: 10px;
  }
  .elinput >>> .el-input__inner{
     /* border-color: rgb(255, 184, 126); */
     width: 50%;
     margin-bottom: 5px;
  }
  .elinput1 >>> .el-input__inner{
     /* border-color: rgb(255, 184, 126); */
     width: 90%;
     margin-bottom: 0.625rem;
  }
}
</style>