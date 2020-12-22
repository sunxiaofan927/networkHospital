<template>
  <div class="signLogin" id="aa" @touchmove.prevent>
    <el-form class="signLoginBg" v-show="this.jumpType === 1">
      <el-form-item>签章登录/login</el-form-item>
      <el-form-item>
        <el-input placeholder="请输入手机号" v-model="userName">
          <i
            slot="suffix"
            class="el-input__icon el-icon-circle-close"
            @click="clear"
          ></i>
        </el-input>
      </el-form-item>
      <!-- <el-form-item>
        <el-input placeholder="密码" v-model="verification" :type="type">
          <i
            slot="suffix"
            class="el-input__icon el-icon-view"
            @click="look"
          ></i>
        </el-input>
      </el-form-item> -->
      <el-form-item class="verification">
        <el-input placeholder="验证码" v-model="verification">
        </el-input>
        <el-button v-show="show" @click="getCode">获取验证码</el-button>
        <el-button v-show="!show" class="count">{{ count }}(s)</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="Submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import formData from "../../static/js/formDate.js";
let formData_ = formData.formDate();
import md5 from "js-md5";
let md5_ = md5(formData_ + md5("Yc_eM_ykY")); //加密规则

export default {
  data() {
    return {
      jumpType: 2,
      userName: "",
      verification: "",
      show: true,
      count: "",
      timer: null,
    };
  },
  created() {
    this.$nextTick(() => {
      this.isWeixinBrowser();
    });
  },
  methods: {
    getCode() {
      let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (!TEL_REGEXP.test(this.userName)) {
        this.$message("请输入正确手机号格式");
        return;
      }
      let data = {
        yc_key:md5_,
        phone: this.userName,
      };
      this.$api.MobileSend(data).then((res) => {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      });
    },
    isWeixinBrowser() {
      let ua = navigator.userAgent.toLowerCase();
      let signLogin = document.getElementById("aa");
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        signLogin.style.display = "none";
        this.$alert("请点击右上角选择手机自带浏览器打开进行签章", {
          confirmButtonText: "确定",
        });
        return false;
      } else if (typeof WeixinJSBridge !== "undefined") {
        signLogin.style.display = "none";
        this.$alert("请点击右上角选择手机自带浏览器打开进行签章", {
          confirmButtonText: "确定",
        });
        return false;
      } else {
        this.jumpType = 1;
      }
    },
    clear() {
      this.userName = "";
    },
    look() {
      if (this.type != "text") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    Submit() {
      if (!this.userName) {
        this.$message.error("手机号不能为空");
        return;
      }
      if (!this.verification) {
        this.$message.error("请输入验证码");
        return;
      }
      let data = {
        verification: this.verification,
        account: this.userName,
      }
      this.$api.signLoginH5(data).then((res) =>{
            // this.$store.dispatch("signToken",res.access_token);
            // let signToken = this.$store.state.signToken;
            // this.$axios.defaults.headers.common["access-token"] = signToken;
            //   console.log(signToken)
              this.$store.dispatch("token",res.access_token);
              // let token = this.$store.state.token;
              // this.$axios.defaults.headers.common["access-token"] = token;
              console.log(this.$axios.defaults.headers)
            sessionStorage.setItem("signId", JSON.stringify(res));
            this.$router.push({ path: "/signPhone" });
      }).catch(res =>{
        this.$message.error(res.msg)
      })
    },
  },
};
</script>

<style scoped lang="scss">
.signLogin {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: url("../assets/img/login.png") center no-repeat;
  .signLoginBg {
    // background: rgba(0, 0, 0, 0.5);
    background: rgba(0, 0, 60, 0.2);
    border-radius: 30px;
    width: 50%;
    height: 30%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;
    .el-form-item {
      width: 90%;
      color: #fff;
      font-size: 0.5rem;
      text-align: center;
      .el-button {
        height: 60%;
        border: 0;
        color: #ffffff;
        width: 80%;
        background: rgba(0, 0, 60, 0.3);
      }
      & >>> .el-input {
        .el-input__inner {
          color: #ffffff;
          border: 0;
          background: rgba(0, 0, 60, 0.3);
        }
      }
    }
    .verification {
      & >>> .el-form-item__content {
        // background: red;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-input {
          text-align: left;
          .el-input__inner {
            width: 75%;
            color: #ffffff;
            border: 0;
            background: rgba(0, 0, 60, 0.2);
          }
        }
      }
    }
  }
}
</style>