<template>
  <div class="login">
    <div class="title">Login / 题库管理系统</div>
    <div class="input_box">
      <el-form ref="formData" :model="formData" label-width="40px">
        <el-form-item label="账号">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>

        <el-form-item class="button">
          <el-button type="primary" @click="onSubmit">立即登陆</el-button>
          <el-button @click="resetForm(formData)">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import router from '../router';
  export default {
    name: 'login',
    data () {
      return {
        formData: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        // let formData = new FormData()
        // formData.append("username", this.formData.username)
        // formData.append("password", this.formData.password)
        axios.post('/login', this.formData)
          .then((response) => {
            console.log(response.data)
            sessionStorage.removeItem('key')
            sessionStorage.setItem('username', response.data.userName)
            router.push('/home')
          })
          .catch((error) => {
            console.log(error);
          })
      },
      resetForm(formData) {
        this.formData.username = ''
        this.formData.password = ''
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
  .login {
    text-align: center;
    background-color: #2d3a4b;
    height: 100%;
    width: 100%;
    position: fixed;
    color: white;
    .title {
      margin-top: 8%;
      font-size: 50px;
    }
    .input_box {
      width: 450px;
      margin-top: 70px;
      .button {
        margin-top: 30px;
      }
    }
  }
</style>
