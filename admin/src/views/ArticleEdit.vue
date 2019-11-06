<template>
  <div class="about">
    <h1>{{id ? "编辑" : "新建"}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save()">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
       <!-- <el-form-item label="时间">
        <el-input v-model="model.date"></el-input>
      </el-form-item> -->
      <el-form-item label="内容">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item label="文章评论列表">
        <el-table :data="this.model.comments">
          <el-table-column prop="name" label="名称" width="220"></el-table-column>
          <el-table-column prop="body" label="评论内容"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">

              <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"; //引入富文本编辑器vue2-editor
export default {
  components: {
    VueEditor
  },
  props: {
    id: {} //这样可以更好的跟路由解耦，不需要再写this.router.params.id这种写法
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async saveComments(){
      let res;
      if (this.id) {
        res = await this.$http.put(`articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("articles", this.model);
      }
      this.$message({
        type: "success",
        message: "保存评论成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    remove(row){
        this.model.comments.filter( (item,index)=>{
          if(item.name == row.name){
            this.model.comments.splice(index,1)
            this.saveComments()
          }
      } )
    
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>