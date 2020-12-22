<template>
  <div class="app">
    <div class="Index_app-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-if="isInformation" label="个人信息" name="first">
          <div class="details_box">
            <div class="details_flex">
              <div class="details_title_">
                <span class="title">机构名称:</span>
                <el-input
                  placeholder="请输入内容"
                  v-model="data_.dean_name"
                  :readonly="reader"
                  clearable
                >
                </el-input>
              </div>
              <div class="details_title">
                <span class="title">所在地址:</span>
                <el-input
                  placeholder="请输入内容"
                  v-model="data_.dean_address"
                  :readonly="reader"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <div class="details_flex">
              <div class="details_title_">
                <span class="title">联系人:</span>
                <el-input
                  placeholder="请输入内容"
                  v-model="data_.dean_nickname"
                  :readonly="reader"
                  clearable
                >
                </el-input>
              </div>
              <div class="details_title">
                <span class="title">注册时间:</span>
                <el-date-picker
                  v-model="data_.dean_time"
                  type="datetime"
                  readonly
                  placeholder="选择日期时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  clearable
                >
                </el-date-picker>
              </div>
            </div>
            <div class="details_flex">
              <div class="details_title_">
                <span class="title">联系电话:</span>
                <el-input
                  placeholder="请输入内容"
                  type="number"
                  v-model="data_.dean_mobile"
                  :readonly="reader"
                  clearable
                >
                </el-input>
              </div>
              <div class="details_title">
                <span class="title">电子邮箱:</span>
                <el-input
                  placeholder="请输入内容"
                  v-model="data_.dean_email"
                  :readonly="reader"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <div class="details_flex">
              <div class="details_title_">
                <span class="title">账号:</span>
                <el-input placeholder="" readonly v-model="data_.user_account">
                </el-input>
              </div>
            </div>
            <div class="flex_Title">
              <span class="title">机构简介:</span>
              <el-input
                type="textarea"
                :rows="10"
                max-height="400px"
                placeholder="无内容"
                :readonly="reader"
                v-model="data_.org_comment"
              >
              </el-input>
            </div>
            <div class="flex_Title">
              <span class="title">科室简介:</span>
              <el-input
                type="textarea"
                :rows="10"
                max-height="400px"
                placeholder="无内容"
                :readonly="reader"
                v-model="data_.dept_comment"
              >
              </el-input>
            </div>
            <div>
              <el-popover placement="top" width="400" v-model="visible">
                <div id="form">
                  <div class="details_title">
                    <span class="title">机构名称:</span>
                    <el-input
                      placeholder="请输入内容"
                      v-model="dataChange.dean_name"
                      clearable
                    >
                    </el-input>
                  </div>
                  <div class="details_title">
                    <span class="title">所在地址:</span>
                    <el-input
                      placeholder="请输入内容"
                      v-model="dataChange.dean_address"
                      clearable
                    >
                    </el-input>
                  </div>
                  <div class="details_title">
                    <span class="title">联系人:</span>
                    <el-input
                      placeholder="请输入内容"
                      v-model="dataChange.dean_nickname"
                      clearable
                    >
                    </el-input>
                  </div>
                  <div class="details_title">
                    <span class="title">联系电话:</span>
                    <el-input
                      placeholder="请输入内容"
                      v-model="dataChange.dean_mobile"
                      clearable
                    >
                    </el-input>
                  </div>
                  <div class="details_title">
                    <span class="title">电子邮箱:</span>
                    <el-input
                      placeholder="请输入内容"
                      v-model="dataChange.dean_email"
                      clearable
                    >
                    </el-input>
                  </div>
                  <div class="details_title">
                    <span class="title">账号:</span>
                    <el-input
                      placeholder="请输入内容"
                      v-model="dataChange.user_account"
                      clearable
                    >
                    </el-input>
                  </div>
                  <div class="details_title">
                    <span class="title">机构简介:</span>
                    <el-input
                      placeholder="无内容"
                      v-model="dataChange.org_comment"
                      type="textarea"
                      :rows="4"
                      class="margin_"
                      clearable
                    >
                    </el-input>
                  </div>
                  <div class="details_title">
                    <span class="title">科室简介:</span>
                    <el-input
                      placeholder="无内容"
                      type="textarea"
                      :rows="4"
                      class="margin_"
                      v-model="dataChange.dept_comment"
                      clearable
                    >
                    </el-input>
                  </div>
                  <el-button
                    type="primary"
                    class="details_Btn margin_T"
                    @click="change"
                    >保存</el-button
                  >
                </div>
                <el-button
                  type="success"
                  class="details_Btn details_Btn_"
                  @click="dataChange_"
                  slot="reference"
                  >修改</el-button
                >
              </el-popover>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <div class="details_flex flex_1">
            <div class="details_title">原始密码:</div>
            <el-input
              show-password
              placeholder="请输入内容"
              v-model="password1"
              clearable
            >
            </el-input>
          </div>
          <div class="details_flex flex_1">
            <div class="details_title">新密码:</div>
            <el-input
              show-password
              placeholder="请输入内容"
              v-model="password2"
              clearable
            >
            </el-input>
          </div>
          <div class="details_flex flex_1">
            <div class="details_title">确认密码:</div>
            <el-input
              show-password
              placeholder="请输入内容"
              v-model="password3"
              clearable
            >
            </el-input>
          </div>
          <!-- <div class="flex_Title">
                    <span class="title">机构简介:</span>
                    <el-input
                      type="textarea"
                      :rows="10"
                      max-height="400px"
                      placeholder="无内容"
                      v-model="data_.org_comment">
                    </el-input>
                </div>
                <div class="flex_Title">
                    <span class="title">科室简介:</span>
                    <el-input
                      type="textarea"
                      :rows="10"
                      max-height="400px"
                      placeholder="无内容"
                      v-model="data_.dept_comment">
                    </el-input>
                </div> -->
          <div class="marT">
            <el-button type="primary" class="details_Btn" @click="clear"
              >重置</el-button
            >
            <el-button
              type="success"
              class="details_Btn details_Btn_"
              @click="save"
              >保存</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Bus from "../components/bus";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      activeName: "first",
      password1: "",
      password3: "",
      password2: "",
      dataChange: "",
      data_: {},
      reader: true,
      visible: false,
      isInformation: false,
    };
  },
  methods: {
    handleClick(tab, event) {},
    axios() {
      let data = {};
      this.$api.deanInfo(data).then((res) => {
        this.data_ = res.data;
        this.dataChange = JSON.parse(JSON.stringify(res.data));
      });
    },
    change() {
      let data = this.dataChange;
      this.$api.deanInfoup(data).then((res) => {
        this.visible = false;
        this.data_ = this.dataChange;
      });
    },
    deanInfoup() {
      this.reader = false;
      let data = this.data_;
      this.$api.deanInfo(data).then((res) => {});
    },
    dataChange_() {
      this.visible = false;
    },
    save() {
      if (this.password1 == this.password2) {
        Toast({
          message: "新密码和原始密码不能一致",
          position: "center",
        });
        return false;
      }
      if (this.password2 != this.password3) {
        Toast({
          message: "确认密码输入有误",
          position: "center",
        });
        return false;
      }
      let data = {
        phone: this.$store.state.login.admin_account,
        newpswd: this.password2,
        pswd: this.password1,
        userid: this.$store.state.login.userid,
      };
      this.$api.pswdup(data).then((res) => {
        this.$message.success("密码修改成功,请重新登陆")
        this.$router.push({ path: "/login" });
      });
    },
    clear() {
      this.password1 = "";
      this.password2 = "";
      this.password3 = "";
    },
  },
  mounted() {
    let type = this.$store.state.login.user_type;
    if (type == "3" || type == "4" || type == "9") {
      this.isInformation = true;
      this.axios();
    } else {
      this.isInformation = false;
    }
  },
};
</script>

<style scoped type='text/css'>
.app {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  /* background: #fff; */
  margin-bottom: -100px;
}
.details_flex {
  display: flex;
  white-space: nowrap;
  height: 100px;
  align-items: center;
}
.el-input {
  width: 300px;
}
.details_title {
  width: 100px;
  padding-right: 20px;
  text-align: right;
}
.Index_app-box {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 2px rgba(227, 224, 224, 0.5);
  border-radius: 8px;
}
.el-tabs {
  line-height: 100px;
  font-size: 20px;
  padding: 20px !important;
}
.details_box {
  text-align: left;
}
.is-top /deep/ {
  height: 100px !important;
  line-height: 100px;
  font-size: 30px;
}
.details_Btn {
  width: 200px;
  line-height: 20px;
  border-radius: 50px;
  float: right;
}
/deep/ .el-input {
  height: 50px;
  flex: 1;
}
.details_title_ {
  width: 500px;
}
.title {
  width: 80px; /*no*/
  display: inline-block;
}
.title {
  font-family: 800;
  padding-right: 10px;
}
.details_Btn_ {
  margin-right: 10px !important;
}
.flex_1 {
  align-items: initial;
}
.marT {
  margin-top: 20px;
}
.flex_Title {
  display: flex;
  margin: 20px 0px;
}
.flex_Title .el-textarea {
  flex: 1;
}
/deep/ .el-tabs__content {
  overflow: auto !important;
}
#form {
  padding: 20px;
}
#form .details_title .title {
  width: 100px;
}
#form .details_title {
  display: flex;
  width: 100%;
  justify-self: center;
  align-items: center;
}
/deep/ #form .details_title .el-input {
  flex: 1;
  height: 60px; /*60px*/
}
.el-textarea {
  flex: 1;
}
.margin_ {
  margin: 5px 0px;
}
.margin_T {
  margin: 40px 0px;
}
</style>