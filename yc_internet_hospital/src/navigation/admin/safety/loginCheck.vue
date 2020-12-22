<template>
  <div class="login_check">
    <h2>基本配置</h2>
    <ul class="login_check_main">
      <li class="login_check_list">
        <ul>
          <li class="fontColor">*页面空闲超时时间(分钟)</li>
          <li>
            <el-input-number v-model="timeout" :min="5" :max="1440"></el-input-number>
          </li>
          <li>
            (注：最小超过时间为5分钟，最大超过时间为1440分钟。配置修
            改保存以后需要重新登录才能生效)
          </li>
        </ul>
      </li>
      <li class="login_check_list">
        <ul>
          <li>
            <el-checkbox v-model="checked" @change="enableVer">启用验证码</el-checkbox>
          </li>
          <li>
            <el-radio v-model="radio" label="0" :disabled="verification">密码连续错误三次启用</el-radio>
            <el-radio v-model="radio" label="1" :disabled="verification">一直启用</el-radio>
          </li>
        </ul>
      </li>
      <li class="login_check_list">
        <el-checkbox disabled v-model="checked1">同一时刻登录限制</el-checkbox>
      </li>
      <li class="login_check_list">登录锁定</li>
      <li class="login_check_list">
        <ul>
          <li>
            <el-checkbox  v-model="checked2" @change="unlock">启用</el-checkbox>
          </li>
          <li>在</li>
          <li>
            <el-input-number   :min="0" v-model="login_lock_time" :disabled="timeLimit"></el-input-number>
          </li>
          <li>分钟内连续</li>
          <li>
            <el-input-number  :min="0" v-model="login_lock_time_num" :disabled="timeLimit"></el-input-number>
          </li>
          <li>次登录失败则锁定账户</li>
          <li>
            <el-input-number  :min="0" v-model="login_unlock_time" :disabled="timeLimit"></el-input-number>
          </li>
          <li>分钟后解锁</li>
        </ul>
      </li>
      <li class="login_check_list2">
        <ul>
          <li>
            <el-button type="success" @click="sbmit">保存</el-button>
          </li>
          <li>
            <el-button type="danger">还原初始设置</el-button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      isClick: true,
      timeout:"1",
      checked: false,
      checked1: true,
      checked2: false,
      timeLimit: true,
      verification:true,
      login_lock_time:"",
      login_lock_time_num: "",
      login_unlock_time: "",
      ID_ : ""
    };
  },
  computed: {
    user() {
      return this.$store.state.login;
    }
  },
  mounted() {
    this.getCheckList();
  },
  methods: {
    sbmit() {
      let format = /^[1-9]\d*$/;
      let data = {
        id: this.ID_,
        account_id: this.user.userid,
        free_time: this.timeout,
        auth_code_status: (this.checked == true ? '1' : '0'),
        enable_auth_code: this.radio,
        login_lock: (this.checked2 == true ? '1' : '0'),
        login_lock_time: this.login_lock_time,
        login_lock_time_num: this.login_lock_time_num,
        login_unlock_time: this.login_unlock_time,
      }
      if (this.checked2 && (!this.login_lock_time || !this.login_lock_time_num || !this.login_unlock_time)) {
        return this.$message.error("请完善提交信息！！！")
      }  
      if (this.checked && !this.radio) {
        return this.$message.error("请完善提交信息！！！")
      } 
      if (!this.checked2){
        data.login_lock_time = 0;
        data.login_lock_time_num = 0;
        data.login_unlock_time = 0;
      }
      if(!this.checked) {
        data.enable_auth_code = ""
      }
      this.$api.saveVerifyInfo(data).then(res =>{
        this.$message.success(res.message);
        this.getCheckList()
      })
    },
    unlock() {
      if(this.checked2) {
        this.timeLimit = false
      } else {
        this.timeLimit = true
      }
    },
    enableVer() {
      if(this.checked) {
        this.verification = false
      } else {
        this.verification = true
      }
    },
    getCheckList() {
      let data = {
        account_id: this.user.userid,
      }
      this.$api.queryLoginVerifyInfo(data).then(res =>{
        this.ID_ = res.data.id;
        this.timeout = res.data.free_time;
        this.checked = (res.data.auth_code_status == "1" ? true : false);
        if(this.checked) {
          this.verification = false
        } else {
          this.verification = true
        }
        this.radio = res.data.enable_auth_code;
        this.checked2 = (res.data.login_lock == "1" ? true : false);
        if(this.checked2) {
          this.timeLimit = false
        } else {
          this.timeLimit = true
        }
        this.login_lock_time = res.data.login_lock_time;
        this.login_lock_time_num= res.data.login_lock_time_num;
        this.login_unlock_time= res.data.login_unlock_time;
      })
    }
  }
};
</script>

<style scoped lang="scss">
.login_check {
  width: 20rem;
  height: 8.5rem;
  padding: 1rem;
  li{
    color:#000;
    & >>> .el-checkbox__label{
      color:red;
    }
  }
  .fontColor{
    color:red
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .login_check_main {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    .login_check_list,
    .login_check_list2 {
      margin-bottom: 10px;
      width: 100%;
      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-input {
          width: 3rem;
        }
        & > li {
          // color:#000;
          white-space: wrap;
        }
      }
      @media screen and (max-width: 600px) {
        ul {
          justify-content: flex-start;
        }
      }
    }
    .login_check_list2{
      ul {
        justify-content: flex-end;
        .el-button{
          margin-left:0.5rem
        }
      }
    }
  }
}
</style>