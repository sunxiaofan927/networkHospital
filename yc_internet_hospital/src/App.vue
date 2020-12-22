<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
let timmer = null; //超时退出 定时器 必须放到全局，解决vue数据同步导致无法清除定时器
export default {
  name: "app",
//   data() {
//     return {
//       lastTime: null, //超时退出 最后时间
//     };
//   },
//   methods: {
//     currentTime() {
//       // 超时退出
//       let data = {};
//       let intervalTime = 10000;
//       this.$api.queryLoginVerifyInfo(data).then((res) => {
//         intervalTime = res.data.free_time
//       });
//       const currentTime = new Date();
//       if (currentTime - this.lastTime > (1 * 60 * 1000)) {
//         this.lastTime = currentTime;
//         if (this.$route.path != "/login") {
//           this.$message({
//             message: "登录超时，将返回登录页",
//             type: "error",
//             duration: 1500,
//           });
//           setTimeout(() => {
//             //  this.loginOut()
//             this.$router.push("/login");
//           }, 2000);
//         }
//       } else {
//         this.lastTime = currentTime;
//       }
//     },
//   },
//   created() {
//     //超时退出 start
//     this.lastTime = new Date();

//     window.addEventListener("resize", () => {
//       if (timmer) {
//         clearTimeout(timmer);
//       }
//       timmer = setTimeout(() => {
//         if (this.$route.path != "/login") {
//           this.currentTime();
//         }
//       }, 3000);
//     });

//     window.addEventListener("click", () => {
//       if (timmer) {
//         clearTimeout(timmer);
//       }
//       timmer = setTimeout(() => {
//         if (this.$route.path != "/login") {
//           this.currentTime();
//         }
//       }, 3000);
//     });

//     window.addEventListener(
//       "scroll",
//       () => {
//         if (timmer) {
//           clearTimeout(timmer);
//         }
//         timmer = setTimeout(() => {
//           if (this.$route.path != "/") {
//             this.currentTime();
//           }
//         }, 3000);
//       },
//       true
//     );

//     window.addEventListener(
//       "mousemove",
//       () => {
//         if (timmer) {
//           clearTimeout(timmer);
//         }
//         timmer = setTimeout(() => {
//           if (this.$route.path != "/login") {
//             this.currentTime();
//           }
//         }, 3000);
//       },
//       true
//     );
//     //超时退出 end
//   },
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