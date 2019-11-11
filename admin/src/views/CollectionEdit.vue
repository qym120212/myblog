<template>
  <div class="about">
    <h1>{{id ? "编辑" : "新建"}}收藏</h1>
    <el-form label-width="120px" @submit.native.prevent="save()">
        <el-form-item label="名称">
            <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="时间">
        <el-input v-model="model.thetime"></el-input>
      </el-form-item>
        <el-form-item label="外链">
            <el-input v-model="model.link"></el-input>
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
export default {
    props:{
        id:{} //这样可以更好的跟路由解耦，不需要再写this.router.params.id这种写法
    },
    data(){
        return{
            model:{}
        }
    },
    methods:{
        async save(){
            let res;
            if(this.id){
                 res = await this.$http.put(`collections/${this.id}`,this.model) 
            }else{
                 res = await this.$http.post('collections',this.model)
            }    
            this.$router.push('/collections/list')
             this.$message({
               type:'success',
               message:'保存成功'
           })
        },
        async fetch(){
            const res = await this.$http.get(`collections/${this.id}`)
            this.model = res.data
        }
    },
    created() {
        this.id && this.fetch()
    },
}
</script>