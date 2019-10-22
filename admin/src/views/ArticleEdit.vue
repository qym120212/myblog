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
        <el-table :data="commentList">
          <el-table-column prop="_id" label="ID" width="220"></el-table-column>
          <el-table-column prop="title" label="标题名称"></el-table-column>
          <el-table-column prop="link" label="链接"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="$router.push(`/collections/edit/${scope.row._id}`)"
              >编辑</el-button>
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
      commentList:[]
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
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>