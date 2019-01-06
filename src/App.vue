<template>
  <div id="app">
    <router-view/>
    <router-view name="navigation"></router-view>
    <router-view name="home"></router-view>
    <router-view name="topicGeneration"></router-view>
    <router-view name="topicManage"></router-view>
    <router-view name="typeManage"></router-view>
    <router-view name="onlineAnswer"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  * {
    margin: 0 auto;
  }
</style>
