<template>
  <div class="nav">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item :index="index.toString()"  v-for="(item,index) in navItems" :key="index">{{item.text}}</el-menu-item>
    </el-menu>
    <div class="right" @click="dropOut">退出</div>
  </div>
</template>

<script>
  const navItems = [{
    text: '首页',
    link: '/home'
  },{
    text: '题目类型管理',
    link: '/typeManage'
  },{
    text: '题目管理',
    link: '/topicManage'
  },{
    text: '题目生成',
    link: '/topicGeneration'
  }];
  const navItems2 = [{
    text: '首页',
    link: '/home'
  },{
    text: '在线答题',
    link: '/onlineAnswer'
  }];

  import router from '../router';
  export default {
    name: "navigation",
    data () {
      return {
        navItems: [],
        activeIndex: '0',
        username: ''
      }
    },
    created() {
      this.save()
    },
    methods: {
      save() {
        this.username = sessionStorage.getItem('username')
        if (sessionStorage.getItem('key')) {
          this.activeIndex = sessionStorage.getItem('key')
        }
        console.log(this.username)
        if(this.username == 'admin') {
          this.navItems = navItems
        } else if (this.username == 'student'){
          this.navItems = navItems2
        }
      },
      dropOut() {
        sessionStorage.removeItem('key')
        sessionStorage.removeItem('username')
        router.push('/')
      },
      handleSelect(key, keyPath) {
        sessionStorage.setItem('key', key)
        this.activeIndex = key
        console.log(key)
        router.push(this.navItems[key].link);
      }
    }
  }
</script>

<style lang='scss' scoped>
  .nav {
    margin: 0 0 30px 50px;
    .right {
      position: absolute;
      top: 18px;
      right: 25px;
      cursor: pointer;
    }
    .right:hover {
      color: red;
    }
  }
</style>
