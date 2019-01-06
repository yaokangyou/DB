<template>
  <div class="type-container">
    <el-tag class="type-title">题目类型管理</el-tag>
    <div class="content-container">
      <el-card>
        <el-button icon="el-icon-plus" type="primary" style="margin-bottom: 20px" @click="handleAddTable">新增题目类型</el-button>
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          stripe
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="名字"
            prop="name">
          </el-table-column>
          <el-table-column
            label="创建日期"
            prop="createdTime">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createdTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="修改日期"
            prop="updateTime">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="small"
                icon="el-icon-delete"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'rectification',
    data() {
      return {
        addData: {
          name : ''
        },
        getListData: {
          page: 1,
          rows: 50,
          queryParam: {}
        },
        loading: false,
        tableData: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        axios.post('/que/table/list', this.getListData)
          .then((response) => {
            console.log(response.data)
            this.tableData = response.data.data.rows
            this.loading = false
          })
          .catch((error) => {
            console.log(error);
          })
      },
      handleAddTable() {
        this.$prompt('请输入类型名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          this.addData.name = value
          axios.post('/que/table/insert', this.addData)
            .then((response) => {
              console.log(response.data)
              this.$message({
                type: 'success',
                message: '新添成功'
              })
              this.getList()
            })
            .catch((error) => {
              console.log(error);
              this.$message({
                type: 'info',
                message: '添加失败'
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      handleEdit(row) {
        console.log(row)
        this.$prompt('请输入修改后的名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          row.name = value
          axios.post('/que/table/update', row)
            .then((response) => {
              console.log(response.data)
              this.getList()
            })
            .catch((error) => {
              console.log(error);
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/que/table/delete/'+ row.id,{})
            .then((response) => {
              console.log(response.data)
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 1000
              })
              this.getList()
            })
            .catch((error) => {
              this.$notify({
                title: '失败',
                message: '删除失败',
                type: 'fail',
                duration: 2000
              })
              console.log(error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .type-container {
    margin: 0 50px;
    .type-title {
      width: 180px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 18px;
      margin-bottom: 20px;
    }
  }
</style>
