<template>
       <div class="articlecomment">
        <div class="commentlist">    
                <div v-for="(item,index) in comments" :key="index" class="allinfo"> 
                    <span><img :src="require('../assets/'+item.headIndex+'.jpeg')" alt="" width="50px"></span>
                    <div class="everyone">
                        <div class="everyonename">{{ item.name }} :</div>
                        <div class="everyonebody">{{ item.body }}</div>
                    </div>

                </div>
        </div>
        <hr>
        <div>
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
        </div>
       
    </div>
</template>
<script>
export default {
    data(){
        return{
            model:{
                name:'',
                body:'',
                headIndex:''
            },
            comments:'',
            headIndex:1
        }
    },
    methods: {
    async fetch(){
        const res =await this.$http.get('comments')
        this.comments = res.data

    },
    async save(){
        this.model.headIndex = Math.floor(Math.random() * 6)
        const res = await this.$http.post('comments',this.model)
        this.$message({
               type:'success',
               message:'发布成功'
           })
         setTimeout( ()=>{
                this.model={}
                
            },0 )
        this.fetch()
    }

    },
    created() {
        this.fetch()
    },
}
</script>
<style scoped>
.main{
    padding: 10px 70px 0;
}
.articlecontainer{
    width: 900px;
    margin: auto;
    padding: 30px 40px 35px;
    box-shadow: 5px 5px 20px #e4e3e3;
    margin-top: 50px;
    margin-bottom: 50px;
}
.articleheader{
    text-align: center;
}
.articletitle{
    margin-bottom: 10px;
    color: #282c34;
    font-size: 35px;
    font-weight: bold;
}
.articleinfo{
    width: 30%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    color: #A7A7A0
}
.articlecomment{
    width: 900px;
    margin: auto;
    padding: 30px 40px 35px;
    box-shadow: 5px 5px 20px #e4e3e3;
    margin-top: 50px;
    margin-bottom: 50px;
}
.allinfo{
    display: flex;
    margin-bottom: 20px;
    width: 70%;
    align-items: center;
    border-bottom: 1px solid #e4e3e3
}
.allinfo img{
    border-radius: 50%
}
.everyone{
    display: inline-block;
    margin-left: 30px;
    line-height: 32px;
}
.everyonename{
    font-size: 13px;
    font-weight: bold
}
.everyonebody {
    font-size: 18px;
}
.ilike{
    text-align: center
}
.footer-icon{
    display: flex;
    justify-content: center
}
.footer-detail{
    text-align: center
}
</style>