<template>
    <div style="min-height: 100vh;">
        <div class="bloglist">
            <ul class="list">
                <li v-for="item in items" :key="item._id" @click="articledetail(item._id)"><span class="time">{{ item.date }}</span><div class="title">{{ item.title }}</div></li>
            </ul>
            <div class="slider">
                <div class="search">
                    <el-input v-model="input" placeholder="请输入关键词搜索" class="input"></el-input>
                </div>
                <div class="notice">
                    <h3>公告</h3>
                    balabalabal
                </div>
            </div>
         </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items:[],
        }
    },
    methods: {
        async fetch(){
            const res =await this.$http.get('articles')
            this.items = res.data
            this.items.map( (item)=>{
                let d = new Date(item.date);  
                item.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            } )
    },
    articledetail(id){
            this.$router.push(`/articles/${id}`)
    }
    },
    created() {
        this.fetch()
    },
}
</script>
<style scoped>
.bloglist{
    display: flex;
    flex-wrap: wrap;
    padding:0px 40px 0;
}
ul{
    margin-top: 50px;
    margin-left:30px;
    width: 56%;
    display: inline-block
}
li{
    list-style: none;
    height: 95px;
    display: flex;
    align-items: center;
    border: 1px solid white;
    box-shadow: 5px 5px 20px #e4e3e3;
    margin-bottom: 20px;
    font-size: 19px;
    border-left: 12px solid #ffe0c7;
    transition: 0.4s;
    line-height: 1.5em;
}
li .title{
    margin-left: 50px;
}
li .time{
    margin-left: 20px;
    color: #575757
}
li:hover{
    cursor: pointer;
    border-left: 12px solid #fdb274;
    transform: scale(1.03);
}
.infome{
    display: inline-block
}
.slider{
    width: 36%;
}
.search{
    margin: 50px;
    width: 30%;
}
.el-input__inner{
    height: 100px;
}
.notice{
    width: 90%;
    height: 30%;
    margin: 30px auto;
    margin-left: 50px;
    box-shadow: 5px 5px 20px #e4e3e3;
}
</style>