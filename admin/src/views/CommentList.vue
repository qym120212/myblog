<template>
  <div class="about">
    <h1>列表页</h1>
      <el-table :data="((items.slice((currentPage-1)*pageSize,currentPage*pageSize)))">
        <el-table-column prop="name" label="游客姓名" width="220"></el-table-column>
        <el-table-column prop="body" label="评论内容"></el-table-column>
         <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="remove(scope.row)">删除</el-button>
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
      pageSize:10,
      currentPage:1
    }
  },
  methods: {
    async fetch(){
      const res =await this.$http.get('comments')
      this.items = res.data
    },
    async remove(row){
          this.$confirm(`此操作将永久删除${row.name}这条评论, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`comments/${row._id}`)
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