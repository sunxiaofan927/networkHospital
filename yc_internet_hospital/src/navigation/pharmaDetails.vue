<template>
  <div
    class="app"
    v-loading="loading"
    element-loading-text="加载中~~~"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(225, 225, 225, 0.8)"
  >
    <div class="Index_app-box">
      <div class="Index_flex_box">
        <div class="flex-1">
          <div class="photo Index_flex_">
            <img
              v-if="form.pharmacist_icon"
              :src="form.pharmacist_icon"
              class="avatar"
            />
          </div>
          <div>
            <div class="Index_flex_">
              <span class="title"><i>*</i>姓名</span>
              <el-input
                v-model="form.pharmacist_nickname"
                readonly
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="Index_flex_">
              <span class="title"><i>*</i>手机号</span>
              <el-input
                v-model="form.pharmacist_mobile"
                type="number"
                readonly
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="Index_flex_">
              <span class="title"><i>*</i>性别</span>
              <el-select
                v-model="form.pharmacist_gender"
                placeholder="请选择"
                disabled
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="Index_flex_">
              <span class="title"><i>*</i>账户状态</span>
              <el-select
                v-model="form.user_status"
                disabled
                placeholder="请选择"
              >
                <el-option
                  v-for="item in optionsStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="Index_flex_">
              <span class="title"><i>*</i>密码</span>
              <el-input
                v-model="form.user_pswd"
                readonly
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="Index_flex_">
              <span class="title"><i>*</i>药师线下现任职机构名称</span>
              <el-input
                v-model="form.pharmacist_hospital"
                readonly
                placeholder="请输入内容"
              ></el-input>
            </div>
            <!-- <div class="Index_flex_">
                  <span class="title"><i>*</i>执业证书编号</span>
                  <el-input  placeholder="请输入内容" readonly></el-input>
                </div> -->
            <div class="Index_flex_">
              <span class="title"><i>*</i>身份证号</span>
              <el-input
                v-model="form.pharmacist_idcard"
                readonly
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="Index_flex_">
              <span class="title"><i>*</i>职称</span>
              <el-select
                v-model="form.pharmacist_title"
                disabled
                placeholder="请选择"
              >
                <el-option
                  v-for="item in optionsTitle"
                  :key="item.id"
                  :label="item.title_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="Index_flex_">
              <span class="title"><i>*</i>药师资格证书编号</span>
              <el-input
                v-model="form.cert_no"
                readonly
                placeholder="请输入内容"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="reason" v-if="form.pharmacist_reason"> -->
      <div class="reason" v-if="form.pharmacist_status == 3">
        <span class="reject_span"><i style="color: red">*</i>驳回原因</span>
        <el-input
          v-model="form.pharmacist_reason"
          rows="4"
          type="textarea"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="Index_flex_2">
        <span class="alitemSpan">
          <h4><i style="color: red">*</i>身份证</h4></span
        >
      </div>
      <div class="Index_flex_2 Index_flex_">
        <img
          v-if="form.pharmacist_idcard_url1"
          :src="form.pharmacist_idcard_url1"
          class="avatar"
          @click="imgL(form.pharmacist_idcard_url1)"
        />
        <img
          v-if="form.pharmacist_idcard_url2"
          :src="form.pharmacist_idcard_url2"
          class="avatar"
          @click="imgL(form.pharmacist_idcard_url2)"
        />
      </div>
      <div class="Index_flex_2">
        <h4>
          <span><i style="color: red">*</i>医师资格证书</span>
        </h4>
      </div>
      <div class="Index_flex_2 Index_flex_ img_flex">
        <img
          v-if="form.pharmacist_qualification_url1"
          :src="form.pharmacist_qualification_url1"
          class="avatar"
          @click="imgL(form.pharmacist_qualification_url1)"
        />
        <img
          v-if="form.pharmacist_qualification_url2"
          :src="form.pharmacist_qualification_url2"
          class="avatar"
          @click="imgL(form.pharmacist_qualification_url2)"
        />
        <img
          v-if="form.pharmacist_qualification_url3"
          :src="form.pharmacist_qualification_url3"
          class="avatar"
          @click="imgL(form.pharmacist_qualification_url3)"
        />
        <img
          v-if="form.pharmacist_qualification_url4"
          :src="form.pharmacist_qualification_url4"
          class="avatar"
          @click="imgL(form.pharmacist_qualification_url4)"
        />
        <img
          v-if="form.pharmacist_qualification_url5"
          :src="form.pharmacist_qualification_url5"
          class="avatar"
          @click="imgL(form.pharmacist_qualification_url5)"
        />
        <img
          v-if="form.pharmacist_qualification_url6"
          :src="form.pharmacist_qualification_url6"
          class="avatar"
          @click="imgL(form.pharmacist_qualification_url6)"
        />
      </div>
      <div class="div_" v-if="form.pharmacist_status == 2">
        <el-button type="primary" class="btn_save" @click="confirm"
          >审核通过</el-button
        >
        <el-button type="success" class="btn_save" @click="reject"
          >驳回</el-button
        >
      </div>
    </div>
    <!-- 驳回 -->
    <el-dialog title="驳回" :visible.sync="dialogFormVisible">
      <div class="reject">
        <span class="reject_span"><i style="color: red">*</i>驳回原因</span>
        <el-input
          v-model="form.pharmacist_reason"
          rows="4"
          type="textarea"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm2()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="dialogFormVisibleT">
      <img :src="imgValue" alt="" srcset="" class="MaxImg" />
    </el-dialog>
    <AnimateFly
      class="showFly1 animate-bounce-up point"
      title="点击回退"
    ></AnimateFly>
  </div>
</template>

<script type='text/ecmascript-6'>
import AnimateFly from "@/components/animate.vue";
export default {
  data() {
    return {
      loading:false,
      dialogFormVisibleT: false,
      dialogFormVisible: false,
      options: [
        {
          value: "0",
          label: "未知性别",
        },
        {
          value: "1",
          label: "男",
        },
        {
          value: "2",
          label: "女",
        },
        {
          value: "9",
          label: "未说明性别",
        },
      ],
      optionsStatus: [
        {
          value: "1",
          label: "正常",
        },
        {
          value: "2",
          label: "封禁",
        },
      ],
      form: {
        // m_name:'',//机构名称
        // pharmacist_es_url:'',//药师电子签章url
        // pharmacist_gender:'',//性别
        // pharmacist_hospital:'',//药师线下现任职机构名称
        // pharmacist_icon:'',//头像url地址
        // pharmacist_idcard:'',//身份证号
        // pharmacist_idcard_url1:'',//身份证正面照片url
        // pharmacist_idcard_url2:'',//身份证反面照片url
        // pharmacist_mid:'',//绑定的机构
        // pharmacist_mobile:"",// 手机号
        // pharmacist_nickname:"",//账户昵称
        // pharmacist_reason:'',//驳回原因
        // pharmacist_status:'',//审核状态
        // pharmacist_title:'',//职称
        // title_name:'',//职称
        // user_pswd:'',//密码
      },
      optionsTitle: [],
      imgValue: "",
    };
  },
  components: {
    AnimateFly,
  },
  created() {
    this.title();
    this.axios();
  },
  methods: {
    axios() {
      let deanid = Base64.decode(sessionStorage.getItem(Base64.encode("go")));
      let data = {
        pid: this.$store.state.json.pharmacist_id,
        deanid: deanid,
        // pid: 3,
      };
      this.$api.pInfo(data).then((res) => {
        this.form = res.data;
      });
    },
    imgL(val) {
      this.dialogFormVisibleT = true;
      this.imgValue = val;
    },
    confirm() {
      //提交审核
      this.loading = true;
      let pid = sessionStorage.getItem("pharmacistsID");
      let status = this.form.pharmacist_status;
      if (this.form.pharmacist_status == "3") {
        status = "2";
      }
      let data = {
        user_account: this.form.pharmacist_mobile,
        user_pswd: this.form.user_pswd,
        user_status: this.form.user_status,
        pharmacist_icon: this.form.pharmacist_icon,
        pharmacist_nickname: this.form.pharmacist_nickname,
        pharmacist_gender: this.form.pharmacist_gender,
        pharmacist_idcard: this.form.pharmacist_idcard,
        pharmacist_hospital: this.form.pharmacist_hospital,
        pharmacist_title: this.form.title_name,
        pharmacist_idcard_url1: this.form.pharmacist_qualification_url1,
        pharmacist_idcard_url2: this.form.pharmacist_qualification_url1,
        pharmacist_qualification_url1: this.form.pharmacist_qualification_url1,
        pharmacist_qualification_url2: this.form.pharmacist_qualification_url2,
        pharmacist_qualification_url3: this.form.pharmacist_qualification_url3,
        pharmacist_qualification_url4: this.form.pharmacist_qualification_url4,
        pharmacist_qualification_url5: this.form.pharmacist_qualification_url5,
        pharmacist_qualification_url6: this.form.pharmacist_qualification_url6,
        pharmacist_status: status,
        pid: pid,
        type: 1,
      };
      let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (!TEL_REGEXP.test(data.user_account)) {
        this.$message("手机号有误");
        return false;
      }
      this.$api.pStatusManageup(data).then(() => {
        this.addPersonalAcct(data);
      });
    },
    addPersonalAcct(val) {
      let pid = sessionStorage.getItem("pharmacistsID");
      let data = {
        userId: pid,
        name: val.pharmacist_nickname,
        idcard: val.pharmacist_idcard,
        sxsealData: val.sxsealData,
      };
      this.$api.addPersonalAcct(data).then((res) => {
        this.loading = false;
        this.$router.go(-1);
      });
    },
    confirm2() {
      let data = {
        pid: this.$store.state.json.pharmacist_id,
        type: "3",
        pharmacist_reason: this.form.pharmacist_reason,
      };
      this.$api.pStatusManageup(data).then((res) => {
        this.dialogFormVisible = false;
        this.$router.go(-1);
      });
    },
    title() {
      //标题
      let type = this.$store.state.login.user_type;
      let titleInfo = this.$store.state.titleInfo;
      let data = {
        type: "3",
      };
      this.$api.titleInfo(data).then((res) => {
        this.optionsTitle = res.data;
      });
    },
    reject() {
      this.dialogFormVisible = true;
    },
  },
};
</script>

<style scoped type='text/css'>
.MaxImg {
  max-width: 100%;
}
.img_flex {
  flex-wrap: wrap;
}
div {
  box-sizing: border-box;
}
.title {
  width: 240px;
  white-space: nowrap;
  padding: 0px 10px;
  display: inline-block;
  text-align: left;
}
.flexWarp {
  flex-wrap: wrap;
}
.height {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  /* padding-bottom: 100px; */
}
.Index_flex {
  display: flex;
  padding: 40px;
  box-sizing: border-box;
}
.Index_flex_box {
  padding-top: 40px;
}
.Index_app-box {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 2px rgba(227, 224, 224, 0.5);
  border-radius: 8px;
  margin-bottom: 20px;
}

/deep/ .el-input__inner {
  height: 50px;
}
.Index_flex_ .el-input {
  flex: 1;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border: 1px solid #999;
}
.flex-1 {
  display: flex;
  flex-wrap: wrap;
}
.Index_flex_ {
  display: flex;
  align-items: center;
  margin: 10px 20px;
  padding: 0px 10px;
}
.Index_flex_ i {
  padding: 0px 5px;
  color: red;
}
.Index_flex_ span {
  text-align: right;
}
.photo {
  text-align: center;
  flex-direction: column;
}
.Index_flex_2 {
  display: flex;
  padding: 10px;
}
.Index_flex_2 span {
  text-align: right;
  width: 60px;
}
.Index_flex_2 .avatar {
  max-width: 180px;
  margin: 0px 10px;
}
.div_ {
  display: flex;
  padding: 20px;
  justify-content: flex-end;
}
/deep/.el-button {
  width: 200px !important;
}
.alitem span {
  width: 200px !important;
  margin-right: 20px;
  text-align: left;
}
.alitem {
  display: flex;
  align-items: center;
}
.block {
  padding: 10px;
}
/deep/ .block .el-timeline-item__node {
  background: #45c245 !important;
}
.blockMargin {
  margin: 0px !important;
}
.blockMargin span {
  padding: 0px 10px;
}
.reject {
  display: flex;
}
.reject_span {
  padding: 0px 10px;
}
.img_flex img {
  margin-bottom: 5px !important;
}
.reason {
  padding: 10px;
  display: flex;
}
</style>