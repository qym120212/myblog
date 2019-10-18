<template>
  <div class="about">
    <h1>{{id ? "编辑" : "新建"}}随笔</h1>
    <el-form label-width="120px" @submit.native.prevent="save()">
        <el-form-item label="标题">
            <el-input v-model="model.title"></el-input>
        </el-form-item>
              <el-form-item label="内容">
            <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor> 
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">
                保存
            </el-button>
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
    props:{
        id:{} //这样可以更好的跟路由解耦，不需要再写this.router.params.id这种写法
    },
    data(){
        return{
            model:{},
            categories:[]
        }
    },
    methods:{
        async save(){
            let res;
            if(this.id){
                 res = await this.$http.put(`talkothers/${this.id}`,this.model) 
            }else{
                 res = await this.$http.post('talkothers',this.model)
            }    
            this.$router.push('/talkothers/list')
             this.$message({
               type:'success',
               message:'保存成功'
           })
        },
        async fetch(){
            const res = await this.$http.get(`talkothers/${this.id}`)
            this.model = res.data
        },
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            const formData = new FormData();
            formData.append("file", file);

        const res = await this.$http.post("upload",formData)
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        resetUploader();
        }
    },
    created() {
        this.id && this.fetch()
    },
}
</script>