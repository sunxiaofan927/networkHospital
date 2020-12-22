<template>
  <div class="pverification">
    <h2>用户密码策略</h2>
    <ul class="pverification_main">
      <li class="pverification_list1">
        <ul>
          <li>
            <span>最小密码长度(位数)</span>
            <el-input-number v-model="pwdMin" :min="1"></el-input-number>
          </li>
          <li>
            <span>最大密码长度(位数)</span>
            <el-input-number v-model="pwdMax" :min="1"></el-input-number>
          </li>
        </ul>
      </li>
      <li class="pverification_list">
        <el-checkbox v-model="contain_one_lower"
          >至少包含一个小写字母</el-checkbox
        >
        <el-checkbox v-model="contain_one_upper"
          >至少包含一个大写字母</el-checkbox
        >
      </li>
      <li class="pverification_list">
        <el-checkbox v-model="contain_one_number">至少包含一个数字</el-checkbox>
        <el-checkbox v-model="contain_one_special"
          >至少包含一个特殊字符</el-checkbox
        >
      </li>
      <li class="pverification_list">
        <el-checkbox v-model="not_pwd_eq_uname"
          >不允许密码与用户名一致</el-checkbox
        >
        <el-checkbox v-model="not_defypwd_eq_uname"
          >不允许密码与用户名逆序一致</el-checkbox
        >
      </li>
      <li class="pverification_list1">
        <ul>
          <li>
            <el-checkbox v-model="pwdOut" @change="isEnable"
              >启用密码周期</el-checkbox
            >
          </li>
          <li>
            <span>密码有效期为:</span>
            <el-input-number
              :disabled="isDisabled"
              v-model="validity"
              :min="0"
            ></el-input-number>
            <span>天,</span>
          </li>
          <li>
            <span>过期前:</span>
            <el-input-number
              :disabled="isDisabled"
              v-model="countdown"
              :min="0"
            ></el-input-number>
            <span>天提醒用户</span>
          </li>
        </ul>
      </li>
      <li class="pverification_list2">
        <ul>
          <li>
            <el-button type="success" @click="saveUp">保存</el-button>
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
      ID_: "",
      validity: "", //密码有效期
      countdown: "", //过期前提醒天数
      pwdMin: "",
      pwdMax: "",
      pwdOut: false,
      contain_one_number: "", // 至少包含一个数字
      contain_one_lower: "", //至少包含一个小写字母
      contain_one_special: "", //至少包含一个特殊字符
      contain_one_upper: "", //至少包含一个大写字母
      not_pwd_eq_uname: "", //不允许密码与用户名一致
      not_defypwd_eq_uname: "", //不允许密码与用户名逆序一致
      checked: [],
      isDisabled: true, //设置密码周期输入框启用权限
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    user() {
      return this.$store.state.login;
    },
  },
  methods: {
    isEnable() {
      this.pwdOut == true ? this.isDisabled = false : this.isDisabled = true;
    },
    saveUp() {
      let data = {
        id: this.ID_,
        pwd_period: this.pwdOut == true ? "1" : "0",
        pwd_valid_time: this.validity,
        account_id: this.user.userid,
        pwd_hint_time: this.countdown,
        min_pwd_length: this.pwdMin,
        max_pwd_length: this.pwdMax,
        contain_one_lower: this.contain_one_lower == true ? "1" : "0",
        contain_one_upper: this.contain_one_upper == true ? "1" : "0",
        contain_one_number: this.contain_one_number == true ? "1" : "0",
        contain_one_special: this.contain_one_special == true ? "1" : "0",
        not_pwd_eq_uname: this.not_pwd_eq_uname == true ? "1" : "0",
        not_defypwd_eq_uname: this.not_defypwd_eq_uname == true ? "1" : "0",
      };
      if(this.pwdOut && (!this.validity || !this.countdown)) {
        return this.$message.error("请完善密码周期参数再提交!!!")
      }
      if(!this.pwdOut) {
        data.pwd_valid_time = 0;
        data.pwd_hint_time = 0
      }
      this.$api.saveStrategyInfo(data).then((res) => {
        this.$message.success("操作成功");
        this.getList()
      });
    },
    getList() {
      let data = {
        account_id: this.user.userid,
      };
      this.$api.queryPwdSlgInfo(data).then((res) => {
        this.ID_ = res.data.id;
        this.validity = res.data.pwd_valid_time;
        this.countdown = res.data.pwd_hint_time;
        this.pwdMin = res.data.min_pwd_length;
        this.pwdMax = res.data.max_pwd_length;
        this.pwdOut = res.data.pwd_period == 1 ? true : false;
        if(this.pwdOut) {
          this.isDisabled = false
        } else {
          this.isDisabled = true
        }
        this.contain_one_lower = res.data.contain_one_lower == 1 ? true : false;
        this.contain_one_upper = res.data.contain_one_upper == 1 ? true : false;
        this.contain_one_number =
          res.data.contain_one_number == 1 ? true : false;
        this.contain_one_special =
          res.data.contain_one_special == 1 ? true : false;
        this.not_pwd_eq_uname = res.data.not_pwd_eq_uname == 1 ? true : false;
        this.not_defypwd_eq_uname =
          res.data.not_defypwd_eq_uname == 1 ? true : false;
      });
    },
    
  },
};
</script>

<style lang="scss" scoped>
.pverification {
  width: 19rem;
  height: 8.5rem;
  padding: 1rem;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .pverification_main {
    width: 100%;
    height: 8.5rem;
    // background: red;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    .pverification_list1 {
      ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        li {
          width: 30%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .el-input {
            width: 50%;
          }
        }
      }
    }
    .pverification_list {
      width: 8rem;
      .el-checkbox-group {
        display: flex;
        align-items: center;
        .el-checkbox {
          margin: 0;
          width: 50%;
        }
      }
    }
    .pverification_list2 {
      width: 100%;
      ul {
        display: flex;
        justify-content: flex-end;
        .el-button {
          margin-left: 0.6rem;
        }
      }
    }
  }
}
</style>