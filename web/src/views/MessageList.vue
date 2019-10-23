<template>
  <div class="articlecomment">
    <div class="commentlist">
      <div v-for="(item,index) in comments" :key="index" class="allinfo">
        <span>
          <img :src="require('../assets/'+item.headIndex+'.jpeg')" alt width="50px" />
        </span>
        <div class="everyone">
          <div class="everyonename">{{ item.name }} :</div>
          <div class="everyonebody">{{ item.body }}</div>
        </div>
      </div>
    </div>

    <div class="form">
      <el-form @submit.native.prevent="save()">
        <el-input placeholder="请输入您的昵称" class="elinput" v-model="model.name"></el-input>
        <el-input type="textarea" placeholder="请输入评论内容" v-model="model.body" class="eltextarea"></el-input>
        <el-button native-type="submit">提交</el-button>
      </el-form>
    </div>
    <!-- <div>
            <el-form label-width="120px" @submit.native.prevent="save()">
            <el-form-item label="您的昵称">
                <el-input v-model="model.name" ></el-input>
            </el-form-item>
            <el-form-item label="请输入评论内容">
                <el-input  v-model="model.body"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">
                    提交
                </el-button>
            </el-form-item>
            </el-form>
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        name: "",
        body: "",
        headIndex: "",
      },
      comments: "",
      headIndex: 1
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("comments");
      this.comments = res.data.reverse()
    },
    async save() {
      this.model.headIndex = Math.floor(Math.random() * 6);
      const res = await this.$http.post("comments", this.model);
      this.$message({
        type: "success",
        message: "发布成功"
      });
      setTimeout(() => {
        this.model = {};
      }, 0);
      this.fetch();
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
</style>