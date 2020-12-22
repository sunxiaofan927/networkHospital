<template>
  <div class="login">
    <div class="login_top">
      <ul class="login_main">
        <li class="login_main_list">登录/login</li>
        <li class="login_main_list">
          <input
            type="text"
            v-model="name"
            placeholder="用户名"
            class="login_input"
          />
          <i class="el-icon-circle-close login_icon" @click="clear"></i>
        </li>
        <li class="login_main_list">
          <input
            :type="type"
            v-model="password"
            placeholder="密码"
            class="login_input"
          />
          <i class="el-icon-view login_icon" @click="look"></i>
        </li>
        <li class="login_main_list verification" v-if="isVerification == 1">
          <input
            type="text"
            v-model="verificationCode"
            placeholder="验证码"
            class="login_input"
          />
          <img @click="ModifyCode" :src="'data:image/png;base64,' + codeImg" />
        </li>
        <el-button
          type="success"
          :disabled="disabled_"
          @click.native.prevent="submit"
          @keyup.enter.native="submit"
          ><i class="el-icon-loading" v-show="loading_"></i>登录</el-button
        >
      </ul>
    </div>
    <div class="login_bottom">
      Copyright © 银川怡成互联网医院有限公司
      <a style="color: #fff" target="_blank" href="http://beian.miit.gov.cn"
        >宁ICP备20001199号</a
      >
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import formData from "../../static/js/formDate.js";
let formData_ = formData.formDate();
import md5 from "js-md5";
let md5_ = md5(md5("yc1805_jz_gluce") + formData_); //加密规则
import { Notification } from "element-ui";
import CBC from "@/api/CBC.js";
import Qs from "qs";
export default {
  data() {
    return {
      codeImg: "", //验证码
      isVerification: 0,
      name: "",
      password: "",
      verificationCode: "",
      type: "password",
      left: "true",
      TimeOut_: null,
      loading_: false,
      data: [],
      user_type: "",
      disabled_: false,
      // api: "/api", //本地
      api:'https://api.ycyun120.com/',//线上
      // api:'http://192.168.2.22:8080/yc_internet_hospital_api',
    };
  },
  methods: {
    submit() {
      if (this.$route.path != "/login") {
        return false;
      }
      let api = this.api;
      this.loading_ = true;
      if (this.name == "") {
        this.$message.error("请输入用户名");
        return false;
      } else if (this.password == "") {
        this.$message.error("请输入密码");
        return false;
      }
      this.disabled_ = true;
      let data = {
        phone: this.name,
        pswd: this.password,
        code: this.verificationCode,
        type: "3",
      };
      this.$api
        .login(data) //登录
        .then((res) => {
          if (res.code == "0") {
            this.$store.dispatch("login", res.data);
            sessionStorage.setItem("user_type", res.pharmacist_type);
            this.user_type = res.data.user_type;
            this.$store.dispatch("ID_", {
              user_deanid: res.data.user_deanid,
              userid: res.data.userid,
            });
            sessionStorage.setItem(
              Base64.encode("go"),
              Base64.encode(res.data.user_deanid)
            );
            // this.$store.dispatch("updateCheck",res.data.user_deanid);
            this.$store.dispatch("token", res.data.access_token);
            sessionStorage.setItem("qrcodePhone", res.data.access_token);
            this.others(
              res.data.access_token,
              res.data.user_deanid,
              res.data.user_type
            );
            this.TimeOut();
            // if (res.data.userid == "3") {
            //   //本地
            //   this.checkIn(res.data.user_deanid, res.data.access_token);
            // }
            if(res.data.userid=="1"){  //线上
                this.checkIn(res.data.user_deanid,res.data.access_token);
            }
          }
        })
        .catch((response) => {
          this.$toast(response);
          if (response.data.code == "1002") {
            this.isVerification = 1;
            this.ModifyCode()
          }
        });
      setTimeout(() => {
        this.loading_ = false;
        this.disabled_ = false;
      }, 1000);
    },
    clear() {
      this.name = "";
    },
    look() {
      if (this.type != "text") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    TimeOut() {
      this.TimeOut_ = setTimeout(() => {
        switch (this.user_type) {
          case "9":
            this.$router.push("/"); //院长
            break;
          case "4":
            this.$router.push("/pharmacist"); //机构
            // this.$router.push('/adminUser');
            break;
          case "3":
            this.$router.push("/recipe"); //药师
            break;
          case "2":
            this.$router.push("/informatization"); //医师
            break;
          case "10":
            this.$router.push("/safeUser"); //安全管理员
            break;
          case "11":
            this.$router.push("/audit"); //审计管理员
            break;
          case "1":
            this.$toast("该账号不存在");
            break;
        }
      }, 1000);
    },
    checkIn(val, token) {
      let api = this.api;
      let data = {
        deanid: val,
        userId: val,
        ycgl_key: md5_,
        name: "怡成互联网医院",
        idcard: "110108197608275410",
      };
      this.$axios.defaults.headers.common["access-token"] = token;
      this.$api.addPersonalAcct(data).then((res) => {
        console.log(res);
      });
    },
    others(token, deanid, type) {
      console.log(token);
      let api = this.api;
      let type_ = type;
      //firstDepartment 一级科室
      var data = {
        deanid: deanid,
        yc_key: md5_,
      };
      let formData = Qs.stringify(data);
      this.$axios.defaults.headers.common["access-token"] = token;
      this.$axios
        .post(api + "/YcManage/firstDepartment.do?", formData)
        .then((res) => {
          if (res.data.code == "0") {
            this.$store.dispatch("firstDepartment", res.data.data);
          }
        });
      //clDocInfo 常用语设置
      this.$axios
        .post(api + "/YcManage/clDocInfo.do?", formData)
        .then((res) => {
          if (res.data.code == "0") {
            this.$store.dispatch("clDocInfo", res.data.data);
          }
        });
      //mInfoList 所属药店
      this.$axios
        .post(api + "/YcManage/mInfoList.do?", formData)
        .then((res) => {
          if (res.data.code == "0") {
            this.$store.dispatch("mInfoList", res.data.data);
          }
        });
      this.otherQuest(data, token);
    },
    otherQuest(data, token) {
      let data_ = data;
      let api = this.api;
      data_.type = this.$store.state.login.user_type;
      if (data_.type == "9") {
        data_.type = "";
      }
      let formData = Qs.stringify(data);
      //titleInfo 医师职称
      this.$axios
        .post(api + "/YcManage/titleInfo.do?", formData)
        .then((res) => {
          if (res.data.code == "0") {
            this.$store.dispatch("titleInfo", res.data.data);
          }
        });
    },
    getCode() {
      let data = {};
      this.$api.queryLoginVerifyInfo(data).then((res) => {
        if (res.data.enable_auth_code == 1) {
          this.ModifyCode();
          this.isVerification = 1;
        } else {
          this.isVerification = 0;
        }
      });
    },
    ModifyCode() {
      let data = {};
      this.$api.sendCode(data).then((res) => {
        this.codeImg = res.data;
      });
    },
  },
  mounted() {
    let that = this;
    //    console.log(this.$roy)
  },
  created() {
    this.getCode();
    let that = this;
    document.onkeydown = function (e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.submit(); // 登录方法名
        return false;
      }
    };
  },
};
</script>



<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  background: url(../assets/img/login.png) center no-repeat;
  position: relative;
  .login_top {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8rem;
    height: 8rem;
    border-radius: 10%;
    background: rgba(238, 234, 234, 0.1);
    ul {
      padding: 0;
      margin: 0;
      list-style-type: none;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      height: 90%;
      justify-content: space-around;
      .login_main_list {
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 36px;
        position: relative;
        .login_icon {
          position: absolute;
          right: 0.7rem;
          top: 0.2rem;
        }
        .login_input {
          width: 80%;
          padding: 0.2rem;
          border: 0;
          outline: none;
          background: rgba(0, 0, 0, 0);
          border-bottom: 1px solid #6d67a4;
          color: #fff;
          // & > :focus {
          //   border: none;
          //   border-bottom: 1px solid #6d67a4;
          // }
          // & > :active {
          //   border: none;
          //   border-bottom: 1px solid #6d67a4;
          // }
          // & > :visited {
          //   border: none;
          //   border-bottom: 1px solid #6d67a4;
          // }
        }
        .login_input::placeholder {
          font-size: 0.35rem;
          font-weight: 600;
          color: #857dcc;
        }
        input:-webkit-autofill {
          -webkit-animation: autofill-fix 1s infinite !important;
          /* 选择历史记录的文字颜色*/
          -webkit-text-fill-color: #ffffff;
          -webkit-transition: background-color 50000s ease-in-out 0s !important;
          transition: background-color 50000s ease-in-out 0s !important;
          background-color: transparent !important;
          background-image: none !important;
          /* 选择历史记录的背景颜色 */
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
        }
      }
      .verification {
        position: relative;
        img {
          width: 3rem;
          height: 0.8rem;
          position: absolute;
          right: 0.6rem;
          bottom: 0.02rem;
        }
      }
      .el-button {
        background: #54cfdb;
        width: 85%;
        height: 0.7rem;
        border: none;
        border-radius: 0.3rem;
      }
    }
  }
  .login_bottom {
    position: fixed;
    color: #fff;
    bottom: 20px;
    font-size: 18px;
    font-weight: 600;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>



