<template>
    <div>
        <ul>
            <li v-for="item in items" :key="item._id" @click="articledetail(item._id)"><span class="time">2019-10-18</span><div class="title">{{ item.title }}</div></li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items:[],
            model:{}
        }
    },
    methods: {
        async fetch(){
            const res =await this.$http.get('articles')
            this.items = res.data
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
ul{
    margin-top: 50px;
    margin-left:30px;
}
li{
    list-style: none;
    height: 150px;
    width: 70%;
    display: flex;
    align-items: center;
    border: 1px solid white;
    box-shadow: 5px 5px 20px #e4e3e3;
    margin-bottom: 20px;
    font-size: 19px;
    border-left: 12px solid #f0d9c6;
    transition: 0.3s
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
</style>