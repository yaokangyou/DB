<template>
  <div class="type-container">
    <el-tag class="type-title">题目生成</el-tag>

    <div class="header-container">
      <el-card>
        <el-tag class="checktitle">选择题目类型</el-tag>
        <i class="el-icon-caret-right"></i><i class="el-icon-caret-right"></i>
        <el-select @change='handlePlaceFilter' v-model="nowselectPlace" placeholder="请选择题目类型">
          <el-option
            v-for="item in typeSelect"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>

        <div class="input-box">
          <el-tag class="checktitle">随机生成的数目</el-tag>
          <i class="el-icon-caret-right"></i><i class="el-icon-caret-right"></i>
          <el-input v-model="input" placeholder="请输入数目" class="input"></el-input>
        </div>


        <el-button  icon="el-icon-plus" type="primary" style="margin-right: 20px" @click="getTopic">随机生成题目</el-button>
        <el-button  icon="el-icon-download" :disabled="canAddTable" type="primary"  @click="exportExcel">导出题目</el-button>

      </el-card>
    </div>

    <div class="content-container">
      <el-card>
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          stripe
          :data="tableData"
          id="out-table"
          style="width: 100%">
          <el-table-column
            label="内容"
            width="680"
            prop="questionInfo">
          </el-table-column>
          <el-table-column
            label="选项A"
            width="150"
            prop="bizQueItem[0].label">
          </el-table-column>
          <el-table-column
            label="选项B"
            width="150"
            prop="bizQueItem[1].label">
          </el-table-column>
          <el-table-column
            label="选项C"
            width="150"
            prop="bizQueItem[2].label">
          </el-table-column>
          <el-table-column
            label="选项D"
            width="150"
            prop="bizQueItem[3].label">
          </el-table-column>
          <el-table-column
            label="正确选项"
            width="100"
            prop="answer">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import axios from 'axios'

  export default {
    name: 'topicGeneration',
    data() {
      return {
        loading: false,
        tableData: [],
        getListData: {
          page: 1,
          rows: 50,
          queryParam: {}
        },
        typeSelect: null,
        typeSelectId: '',
        nowselectPlace: null,
        canAddTable: true,
        input: ''
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
        console.log('拿到的id为: ' + id)
        this.typeSelectId = id
      },
      getTopic() {
        this.loading = true
        let data = {}
        data.id = this.typeSelectId
        data.num = this.input*1
        axios.post('/que/random', data)
          .then((response) => {
            console.log(response.data.data)
            let data = response.data.data
            for (let index in data) {
              for (let num in data[index].bizQueItem) {
                if (data[index].bizQueItem[num].isAnswer == '1') {
                  data[index].answer = data[index].bizQueItem[num].seq
                }
              }
            }
            console.log(data)
            this.tableData = data
            this.canAddTable = false
            this.loading = false
          })
          .catch((error) => {
            console.log(error);
          })
      },
      exportExcel() {
        let et = XLSX.utils.table_to_book(document.getElementById('out-table')); //此处传入table的DOM节点
        let etout = XLSX.write(et, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          FileSaver.saveAs(new Blob([etout], {
            type: 'application/octet-stream'
          }), 'trade-publish.xlsx')  //trade-publish.xlsx 为导出的文件名
        } catch (e) {
          console.log(e, etout)
        }
        return etout;
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
      .input-box{
        margin: 0 40px;
        display: inline-block;
        .input {
          width: 200px;
        }
      }
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
</style>


