<template>
  <div class="type-container">
    <el-tag class="type-title">题目管理</el-tag>

    <div class="header-container">
      <el-card>
        <el-tag class="checktitle">题目类型</el-tag>
        <i class="el-icon-caret-right"></i><i class="el-icon-caret-right"></i>
        <el-select @change='handlePlaceFilter' v-model="nowselectPlace" placeholder="请选择题目类型">
          <el-option
            v-for="item in typeSelect"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-card>
    </div>

    <div class="content-container">
      <el-card>
        <el-button :disabled="canAddTable" icon="el-icon-plus" type="primary" style="margin-bottom: 20px" @click="dialogFormVisible = true">新增题目类型</el-button>
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          stripe
          :data="tableData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item :label="item.seq" :class="props.row.bizQueItem[index].isAnswer == '1'?'red':''" v-for="(item,index) in props.row.bizQueItem" :key="index">
                  <span>{{ item.label }}</span>
                </el-form-item>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="题目ID"
            width="200"
            prop="id">
          </el-table-column>
          <el-table-column
            label="内容"
            prop="questionInfo">
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

    <el-dialog title="新增题目" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="题目内容" :label-width="formLabelWidth">
          <el-input v-model="form.questionInfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项A" :label-width="formLabelWidth">
          <el-input v-model="form.chooseItems[0]" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项B" :label-width="formLabelWidth">
          <el-input v-model="form.chooseItems[1]" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项C" :label-width="formLabelWidth">
          <el-input v-model="form.chooseItems[2]" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项D" :label-width="formLabelWidth">
          <el-input v-model="form.chooseItems[3]" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="正确答案" :label-width="formLabelWidth">
          <el-radio v-model="radio" label="A">选项A</el-radio>
          <el-radio v-model="radio" label="B">选项B</el-radio>
          <el-radio v-model="radio" label="C">选项C</el-radio>
          <el-radio v-model="radio" label="D">选项D</el-radio>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddTable(form)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑题目" :visible.sync="dialogFormVisibleTwo">
      <el-form :model="form2">
        <el-form-item label="题目内容" :label-width="formLabelWidth">
          <el-input v-model="form2.questionInfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项A" :label-width="formLabelWidth">
          <el-input v-model="form2.chooseItems[0]" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项B" :label-width="formLabelWidth">
          <el-input v-model="form2.chooseItems[1]" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项C" :label-width="formLabelWidth">
          <el-input v-model="form2.chooseItems[2]" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选项D" :label-width="formLabelWidth">
          <el-input v-model="form2.chooseItems[3]" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="正确答案" :label-width="formLabelWidth">
          <el-radio v-model="radio2" label="A">选项A</el-radio>
          <el-radio v-model="radio2" label="B">选项B</el-radio>
          <el-radio v-model="radio2" label="C">选项C</el-radio>
          <el-radio v-model="radio2" label="D">选项D</el-radio>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleTwo = false">取 消</el-button>
        <el-button type="primary" @click="updateTopic(form2)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'topicManage',
    data() {
      return {
        form: {
          questionInfo: '',
          queNId: '',
          chooseItems: [],
          chooseItemsId: []
        },
        form2: {
          questionInfo: '',
          id: '',
          queNId: '',
          chooseItems: [],
          chooseItemsId: []
        },
        loading: false,
        tableData: [],
        getListData: {
          page: 1,
          rows: 50,
          queryParam: {}
        },
        typeSelect: null,
        nowselectPlace: null,
        canAddTable: true,
        selectNid: '',
        formLabelWidth: '100px',
        dialogFormVisible: false,
        dialogFormVisibleTwo: false,
        radio: '',
        radio2: '',
      }
    },
    created() {
      this.getChoose()
    },
    methods: {
      getChoose() {
        axios.post('/que/table/list', this.getListData)
          .then((response) => {
            console.log(response.data.data.rows)
            this.typeSelect = response.data.data.rows
          })
          .catch((error) => {
            console.log(error);
          })
      },
      handlePlaceFilter(id) {
        this.loading = true
        this.canAddTable = false
        console.log('拿到的id为: ' + id)
        this.getListData.queryParam.queNId = id
        axios.post('/que/getQueAns', this.getListData)
          .then((response) => {
            console.log(response.data.data.rows)
            this.loading = false
            this.tableData = response.data.data.rows
            this.selectNid = id
          })
          .catch((error) => {
            console.log(error);
          })
      },
      handleAddTable(form) {
        form.queNId = this.selectNid
        console.log(form)
        axios.post('/que/insert', form)
          .then((response) => {
            console.log(response.data)
            let items = this.eachforData(form,response.data.data.id,this.radio)
            console.log(items)
            axios.post('/que/item/saveAns', items)
              .then((response) => {
                console.log(response.data)
                this.dialogFormVisible = false
                this.handlePlaceFilter(this.selectNid)
                this.form.questionInfo = ''
                this.form.queNId =  ''
                this.form.chooseItems = []
                this.radio = ''
               })
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((error) => {
            console.log(error)
          })
      },
      eachforData(form,id,radio) {
        let choose = ['A','B','C','D']
        let items = []
        for(let index in form.chooseItems) {
          let item = {}
          item.queId = id
          item.seq = choose[index]
          item.label = form.chooseItems[index]
          item.isAnswer = radio == choose[index] ? '1' : '0'
          if(form.chooseItemsId.length != 0) {
            item.id = form.chooseItemsId[index]
          }
          items.push(item)
        }
        return items
      },
      handleEdit(row) {
        this.dialogFormVisibleTwo = true
        console.log(row)
        this.form2.questionInfo = row.questionInfo
        this.form2.id = row.id
        for(let index in row.bizQueItem) {
          this.form2.chooseItems[index] = row.bizQueItem[index].label
          this.form2.chooseItemsId[index] = row.bizQueItem[index].id
          if (row.bizQueItem[index].isAnswer == '1') {
            this.radio2 = row.bizQueItem[index].seq
          }
        }
      },
      updateTopic(form2) {
        form2.queNId = this.selectNid
        console.log(form2)
        axios.post('/que/update', form2)
          .then((response) => {
            console.log(response.data)
            let items = this.eachforData(form2, response.data.data.id, this.radio2)
            console.log(items)
            axios.post('/que/item/updateAns', items)
              .then((response) => {
                console.log(response.data)
                this.dialogFormVisibleTwo = false
                this.handlePlaceFilter(this.selectNid)
              })
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((error) => {
            console.log(error)
          })
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/que/delete/'+ row.id,{})
            .then((response) => {
              console.log(response.data)
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 1000
              })
              this.handlePlaceFilter(this.selectNid)
            }).catch((error) => {
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
      }
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
    .header-container{
      margin-bottom: 20px;
    }
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .red {
    color: red;
  }
</style>

