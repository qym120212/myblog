<template>
    <div class="main">
        <div class="articlecontainer">
            <div class="articleheader">
                <div class="articletitle">{{ this.model.title }}</div>
                <div class="articleinfo">
                    <div class="date">
                    <i class="el-icon-date"></i>
                    <span>2019-10-19</span>
                    </div>
                    <div class="view">
                    <i class="el-icon-view"></i>
                    <span>66</span>
                    </div>
                     <div class="thumb">
                    <i class="el-icon-thumb"></i>
                     <span>10</span>
                     </div>
                     <div class="comment">
                    <i class="el-icon-chat-dot-square"></i>
                     <span>2</span>
                     </div>
                </div>
            </div>
            <div class="articledetail" v-html="this.model.body">
                {{ this.model.body }}
            </div>
    </div>
    <div class="articlecomment">
        <div>
            <ul>
                <li v-for="item in articlecomments" :key="item._id"></li>
            </ul>
        </div>
        <div>
            <el-form label-width="120px" @submit.native.prevent="touristsubmit()">
            <el-form-item label="您的昵称">
                <el-input v-model="tourist.name"></el-input>
            </el-form-item>
            <el-form-item label="请输入评论内容">
                <el-input  v-model="tourist.body"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">
                    提交
                </el-button>
            </el-form-item>
            </el-form>
        </div>
       
    </div>
    </div>
</template>
<script>
export default {
    props:{
    id:{} //这样可以更好的跟路由解耦，不需要再写this.router.params.id这种写法
    },
    data() {
        return {
            model:{},
            tourist:{},
            articlecomments:[]
        }
    },
    methods: {
        async fetch(){
            const res = await this.$http.get(`articles/${this.id}`)
            this.model = res.data
            console.log(this.model);
        },
        async touristsubmit(){
            const res = await this.$http.post(`articles/${this.id}`,this.tourist)
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
</style>