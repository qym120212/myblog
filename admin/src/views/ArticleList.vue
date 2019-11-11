<template>
  <div class="about">
    <h1>列表页</h1>
      <el-table :data="((items.filter(data=>!search||data.title.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)))">
        <el-table-column prop="thetime" label="创建的时间" width="240"></el-table-column>
        <el-table-column prop="title" label="文章标题"></el-table-column>
            <el-table-column
      align="right">
      <template slot="header">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="$router.push(`/articles/edit/${scope.row._id}`)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="remove(scope.row)">Delete</el-button>
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
      const res =await this.$http.get('articles')
      this.items = res.data
    },
    async remove(row){
          this.$confirm(`此操作将永久删除文章《${row.title}》, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`articles/${row._id}`)
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