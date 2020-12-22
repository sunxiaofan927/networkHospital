<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import {sun} from './router/index.js'

export default {
  data() {
    return {
      currentTime: new Date().getTime(),
    }
  },
  methods: {
    OperatingWebsite() {
      let currentTime = this.currentTime;
      let lastTime = new Date().getTime();
      let timeOut = 3000;
      if ((lastTime - currentTime) > timeOut) {
        this.currentTime = new Date().getTime();
        this.$router.push('/login')
        sessionStorage.clear();
      }
    }
  },
  mounted() {
    let a = document.getElementById('app');
    a.addEventListener('click', () =>{
      this.OperatingWebsite()
    })
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-bottom: 20px;
  margin: 0px;
  width: 100%;
  /* background: #01051B; */
  box-sizing: border-box;
  height: 100%;
  padding: 0;
}
body,
html {
  margin: 0px;
  width: 100%;
  height: 100%;
  /* padding-bottom: 200px; */
  /* box-sizing: border-box; */
}
span {
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
  