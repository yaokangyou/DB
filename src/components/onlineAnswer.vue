<template>
  <div class="type-container">
    <el-tag class="type-title">在线答题</el-tag>

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

      </el-card>
    </div>

    <div class="content-container">
      <el-card>
        <div class="text" v-if="tableData.length == 0">
          暂无数据
        </div>
        <div v-for="(item, index) in tableData" :key="index">
          <div class="questionInfo">
            第{{index+1}}题、{{item.questionInfo}}
          </div>
          <div class="questionAns">
            <el-radio-group v-model="item.answer">
              <el-radio label="A">选项A、{{item.bizQueItem[0].label}}</el-radio>
              <el-radio label="B">选项B、{{item.bizQueItem[1].label}}</el-radio>
              <el-radio label="C">选项C、{{item.bizQueItem[2].label}}</el-radio>
              <el-radio label="D">选项D、{{item.bizQueItem[3].label}}</el-radio>
            </el-radio-group>
          </div>
        </div>

        <el-button  v-if="tableData.length != 0" icon="el-icon-circle-check-outline" type="primary" style="margin-right: 20px" @click="checkAnswer">提交答案</el-button>
      </el-card>

      <el-card style="margin: 30px 0;">
        <div class="text" v-show="replyVisited">
          等待题目提交答案
        </div>

        <div class="box" v-show="!replyVisited">
          <div class="titel">答案校对</div>
          <span v-for="(item,index) in list" :key="index">
            <span class="rec-item" v-if="item.label == '0'">{{item.answer}}</span>
            <span class="rec-item red" v-else>{{item.answer}}</span>
          </span>

          <div class="titel">正确答案</div>
          <span v-for="(item,index) in answerList" :key="index">
            <span class="rec-item">{{item}}</span>
          </span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'onlineAnswer',
    data() {
      return {
        tableData: [],
        getListData: {
          page: 1,
          rows: 50,
          queryParam: {}
        },
        typeSelect: null,
        typeSelectId: '',
        nowselectPlace: null,
        input: '',
        replyAnswerList: [],
        answerList: [],
        list: [],
        replyVisited: true
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
        // this.loading = true
        // this.canAddTable = false
        console.log('拿到的id为: ' + id)
        this.typeSelectId = id
      },
      getTopic() {
        this.replyVisited = true
        this.list = []
        this.replyAnswerList = []
        let data = {}
        data.id = this.typeSelectId
        data.num = this.input*1
        axios.post('/que/random', data)
          .then((response) => {
            if (response.data.status == 1) {
              console.log(response.data.data)
              let data = response.data.data
              for (let index in data) {
                for (let num in data[index].bizQueItem) {
                  if (data[index].bizQueItem[num].isAnswer == '1') {
                    data[index].answer = ''
                    this.answerList[index] = data[index].bizQueItem[num].seq
                  }
                }
              }
              this.tableData = data
              console.log(this.answerList)
            } else {
              this.$notify({
                title: '失败',
                message: response.data.message,
                type: 'fail',
                duration: 2000
              })
            }
          })
          .catch((error) => {
            console.log(error)
          })
      },
      checkAnswer() {
        this.replyVisited = false
        for (let index in this.tableData) {
          this.replyAnswerList[index] = this.tableData[index].answer
          this.list[index] = {}
          this.list[index].answer = this.replyAnswerList[index]
          if (this.replyAnswerList[index] == this.answerList[index]) {
            this.list[index].label = '0'
          } else {
            this.list[index].label = '1'
          }
        }
        console.log(this.replyAnswerList)
        console.log(this.list)
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
  .text {
    color: #909399;
    text-align: center;
    font-size: 18px;
  }
  .questionInfo {
    font-size: 19px;
    margin-bottom: 15px;
  }
  .questionAns {
    margin-bottom: 18px;
    .el-radio {
      min-width: 200px;
    }
  }
  .box {
    max-width: 1000px;
    transition: background-color 1.5s ease;
    margin-top: 10px;
    margin: 0;
    .titel {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 18px;
    }
    .rec-item {
      font-size: 16px;
      display:inline-block;
      width: 30px;
      height: 30px;
      background: #4EEE94;
      text-align: center;
      line-height: 30px;
      border: 1px solid #555;
      transition: background-color 1.5s;
      margin-bottom: 15px;
    }
    .red {
      transition: background-color 1.5s ease;
      background-color: #FF4040;
    }
  }
</style>



