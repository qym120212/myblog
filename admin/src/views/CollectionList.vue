<template>
  <div class="about">
    <h1>列表页</h1>
      <el-table :data="((items.filter(data=>!search||data.title.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)))">
        <el-table-column prop="date" label="创建时间" width="300"></el-table-column>
        <el-table-column prop="title" label="标题名称"></el-table-column>
         <el-table-column prop="link" label="链接"></el-table-column>
         <el-table-column fixed="right">
          <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="$router.push(`/collections/edit/${scope.row._id}`)">Edit</el-button>
        <el-button type="danger" size="mini" @click="remove(scope.row)">delete</el-button>
      </template>
    </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="this.items.length"
        layout="total, prev, pager, next"
      >
</el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items:[],
      search:"",
      pageSize:5,
      currentPage:1
    }
  },
  methods: {
    async fetch(){
      const res =await this.$http.get('collections')
      this.items = res.data
      this.items = this.items.sort(this.compare('date'))
      this.items.forEach((item)=>{
        let str = item.date
        str = str.slice(0,4) + '-' + str.slice(4,6) + '-' + str.slice(6)
        item.date = str
      })
    },
    compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
      }
    },
    async remove(row){
          this.$confirm(`此操作将永久删除分类${row.name}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`collections/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
            this.fetch()
        })

    },
    handleCurrentChange(currentPage){
        this.currentPage = currentPage
    }
  },
  created() {
    this.fetch()
  },
}
</script>