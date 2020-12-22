<template >
  <div class="app">
    <div class="Index_app-box">
      <div class="Index_flex_box">
        <div class="flex-1">
          <div class="photo Index_flex_">
            <el-upload
              class="avatar-uploader iconPhoto"
              action=""
              :show-file-list="false"
              :http-request="upLoadicon"
              accept=".jpg,.jpeg,.JPG,.JPEG"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="form.pharmacist_icon"
                :src="form.pharmacist_icon"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span><i style="color: red">*</i>上传图片</span>
          </div>
          <div>
            <div class="Index_flex_">
              <span class="title"><i>*</i>姓名</span>
              <el-input
                v-model="form.pharmacist_nickname"
                placeholder="请输入内容"
              ></el-input>
            </div>

            <div class="Index_flex_">
              <span class="title"><i>*</i>手机号</span>
              <el-input
                v-model="form.user_account"
                type="number"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="Index_flex_">
              <span class="title"><i>*</i>药师类型</span>
              <el-select v-model="form.pharmacist_type" placeholder="请选择">
                <el-option
                  v-for="item in pharmacist_options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="Index_flex_">
              <span class="title"><i>*</i>性别</span>
              <el-select v-model="form.pharmacist_gender" placeholder="请选择">
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
              <el-select v-model="form.user_status" placeholder="请选择">
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
              <span class="title"><i style="color: red">*</i>密码</span>
              <el-input
                v-model.trim="form.user_pswd"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="Index_flex_">
              <span class="title"
                ><i style="color: red">*</i>药师线下现任职机构名称</span
              >
              <el-input
                v-model="form.pharmacist_hospital"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="Index_flex_">
              <span class="title"><i style="color: red">*</i>身份证号</span>
              <el-input
                v-model.trim="form.pharmacist_idcard"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="Index_flex_">
              <span class="title"><i>*</i>职称</span>
              <el-select v-model="form.pharmacist_title" placeholder="请选择">
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
                v-model.trim="form.cert_no"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="Index_flex_">
              <span class="title"><i>*</i> 药师资格证书取得时间</span>
              <el-date-picker
                type="date"
                v-model="form.cert_rec_date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="Index_flex_2" v-if="pharmacist_status == 3"> -->
      <div class="Index_flex_2" v-if="form.pharmacist_status == 3">
        <span class="title alitemSpan"
          ><h4><i style="color: red">*</i>驳回原因</h4></span
        >
        <el-input
          type="textarea"
          :rows="6"
          readonly
          placeholder="请输入内容"
          v-model="form.pharmacist_reason"
        >
        </el-input>
      </div>
      <div class="Index_flex_2">
        <span><i style="color: red">*</i>身份证(正反面[共2张])</span>
      </div>
      <div class="Index_flex_2">
        <el-upload
          class="upload-demo"
          action=""
          drag
          :limit="2"
          :auto-upload="true"
          :http-request="upLoadIdcard"
          :on-remove="handleRemoveIdcard"
          accept=".jpg,.jpeg,.JPG,.JPEG"
          :before-upload="beforeAvatarUpload"
          :file-list="fileListIdcard"
          list-type="picture"
        >
          <i class="el-icon-plus avatar-uploader-icon uploadI"></i>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg文件，且不超过200kb
          </div>
        </el-upload>
      </div>
      <div class="Index_flex_2">
        <span><i style="color: red">*</i>药师资格证书(最多[6张])</span>
      </div>
      <div class="Index_flex_2">
        <el-upload
          class="upload-demo"
          action=""
          drag
          :auto-upload="true"
          :http-request="upLoadDoctor"
          :limit="6"
          :on-remove="handleRemoveDoctor"
          accept=".jpg,.jpeg,.JPG,.JPEG"
          :before-upload="beforeAvatarUpload"
          :file-list="fileListDoctor"
          list-type="picture"
        >
          <i class="el-icon-plus avatar-uploader-icon uploadI"></i>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg文件，且不超过200kb
          </div>
          <!-- <el-button  type="primary" class="uploadImg"><i class="el-icon-plus avatar-uploader-icon uploadI" ></i></el-button> -->
        </el-upload>
      </div>
      <div class="Index_flex_2">
        <img src="" alt="" />
      </div>
      <div class="div_">
        <el-button
          type="primary"
          class="btn_save"
          v-loading.fullscreen.lock="loading"
          @click="submit"
          >{{ typeClick == "0" ? "保存" : "添加" }}</el-button
        >
        <el-button type="warning" class="btn_save" @click="huizhichange"
          >{{ typeClick == "0" ? "修改" : "" }}签名</el-button
        >
        <!-- <el-button class="btn_save" v-show="typeClick == 1" @click="reject">驳回</el-button> -->
      </div>
    </div>
    <AnimateFly
      class="showFly1 animate-bounce-up point"
      title="点击回退"
    ></AnimateFly>
    <el-dialog custom-class="addSign" :visible="dialogVisiblehuizhi" center>
      <qr-code @closeDialog="closeDialog1"></qr-code>
    </el-dialog>
    <!-- <el-dialog
        title="签字"
        :visible.sync="dialogVisiblehuizhi"
        width="100%"
        :before-close="handleClosehuizhi">
      <sign ref="sign"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblehuizhi = false">取 消</el-button>
        <el-button @click="canvasOverflow">重 绘</el-button>
        <el-button type="primary" @click="confim">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script type='text/ecmascript-6'>
import sign from "@/navigation/sign.vue";
import AnimateFly from "@/components/animate.vue";
import Qs from "qs";
import qrCode from "./qrcode";

export default {
  data() {
    return {
      loading: false,
      dialogVisiblehuizhi: false,
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
      pharmacist_options: [
        {
          value: "1",
          label: "审方药师",
        },
        {
          value: "2",
          label: "复核药师",
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
      optionsTitle: [],
      value: "",
      form: {
        pharmacist_title: "", //职称
        pharmacist_nickname: "", //姓名
        pharmacist_gender: "", //性别
        pharmacist_icon: "", //头像
        pharmacist_idcard: "", //身份证号
        pharmacist_hospital: "", //现任机构名称
        type: "", //提交权限
        // p_type: "", //药师类型
        pharmacist_type: "", //药师类型
        // pharmacist_status: "2", //是否可以正常使用
        user_status: "",
        user_account: "", //手机号
        pharmacist_idcard_url1: "", //身份证正面照片url
        pharmacist_idcard_url2: "", //身份证反面照片url
        pharmacist_qualification_url1: "", //药师资格证书照片url1
        pharmacist_qualification_url2: "", //药师资格证书照片url2
        pharmacist_qualification_url3: "", //药师资格证书照片url3
        pharmacist_qualification_url4: "", //药师资格证书照片url4
        pharmacist_qualification_url5: "", //药师资格证书照片url5
        pharmacist_qualification_url6: "", //药师资格证书照片url6
        user_pswd: "", //密码
      },
      out: 1,
      type: false,
      imglist2: [],
      typeClick: "",
      code: "",
      api: "pManageins",
      pharmacist_status: "",
      fileListIdcard: [],
      fileListDoctor: [],
    };
  },
  components: {
    AnimateFly,
    sign,
    qrCode,
  },
  created() {
    this.title();
    this.pharmacist_status = this.$store.state.json.pharmacist_status;
    if (this.$store.state.type == "0") {
      //药师修改
      this.axios();
      this.form.pharmacist_gender = String(this.form.pharmacist_gender);
      this.api = "pManageup";
    }
    this.typeClick = this.$store.state.type;
  },
  methods: {
    closeDialog1(msg) {
      if (!msg) {
        this.dialogVisiblehuizhi = false;
      }
    },
    // callBackUrl(res){
    //   this.dialogVisiblehuizhi = false;
    //   this.form.sxsealData =  res;
    // },
    handleClosehuizhi() {
      this.dialogVisiblehuizhi = false;
    },
    // confim(){
    //   this.$refs.sign.downloadResult();
    // },
    // canvasOverflow() {
    //   this.$refs.sign.overwrite();
    // },
    huizhichange() {
      this.dialogVisiblehuizhi = true;
      // this.$refs.sign.overwrite();
      // this.$router.push({ path: "/qrcode" });
    },
    imgFun(val) {
      //推入
      let fileListIdcard = this.fileListIdcard; //医师执业证书
      let fileListDoctor = this.fileListDoctor; //合同
      for (var i = 0; i < 2; i++) {
        //身份证
        if (
          fileListIdcard.length < 2 &&
          val["pharmacist_idcard_url" + (i + 1)] != null &&
          val["pharmacist_idcard_url" + (i + 1)] != "null" &&
          val["pharmacist_idcard_url" + (i + 1)] != ""
        ) {
          fileListIdcard.push({
            name: "******",
            url: val["pharmacist_idcard_url" + (i + 1)],
          });
        }
      }
      for (var i = 0; i < 6; i++) {
        //医师资格证书
        if (
          fileListDoctor.length < 6 &&
          val["pharmacist_qualification_url" + (i + 1)] != null &&
          val["pharmacist_qualification_url" + (i + 1)] != "" &&
          val["pharmacist_qualification_url" + (i + 1)] != "null"
        ) {
          fileListDoctor.push({
            name: "******",
            url: val["pharmacist_qualification_url" + (i + 1)],
          });
        }
      }
    },
    axios() {
      let that = this;
      let deanid = Base64.decode(sessionStorage.getItem(Base64.encode("go")));
      let data = {
        pid: this.$store.state.json.pharmacist_id,
        deanid: deanid,
      };
      //药师详情
      this.$api.pInfo(data).then((res) => {
        this.form = res.data;
        // this.form.p_type = res.data.pharmacist_type;
        this.imgFun(res.data);
      });
    },
    submit() {
      let data = this.form;
      data.pharmacist_status = 2;
      let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (
        data.user_account == "" ||
        data.user_account == undefined ||
        data.user_account == null
      ) {
        this.$message("手机号为空");
        return false;
      }
      if (!TEL_REGEXP.test(data.user_account)) {
        this.$message("手机号有误");
        return false;
      }
      // if (
      //   data.pharmacist_status == "" ||console.log(data)
      //   data.pharmacist_status == undefined ||
      //   data.pharmacist_status == null
      // ) {
      //   this.$message("账户状态为空,请选择");
      //   return false;
      // }
      let test = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/;
      if (!test.test(data.pharmacist_idcard)) {
        this.$message("身份证号有误");
        return false;
      }
      // if(!data.sxsealData){
      //   this.$message('签名不能为空');
      //   return false;
      // }
      let fileListIdcard = JSON.parse(JSON.stringify(this.fileListIdcard)); //医师执业证书
      let fileListDoctor = JSON.parse(JSON.stringify(this.fileListDoctor)); //合同

      if (fileListIdcard.length <= 0) {
        this.$message("身份证照片为空，请上传");
        return false;
      }
      if (fileListDoctor.length <= 0) {
        this.$message("药师资格证书为空，请上传");
        return false;
      }

      for (var i = 0; i < 2; i++) {
        //药师资格证书
        if (
          fileListIdcard[i] != undefined &&
          fileListIdcard[i] != null &&
          fileListIdcard[i] != "" &&
          fileListIdcard[i] != "null"
        ) {
          data["pharmacist_idcard_url" + (i + 1)] = fileListIdcard[i].url;
        } else {
          // data["pharmacist_idcard_url" + (i + 1)] = "null";
          data["pharmacist_idcard_url" + (i + 1)] = "";
        }
      }
      for (var i = 0; i < 6; i++) {
        if (
          fileListDoctor[i] != undefined &&
          fileListDoctor[i] != null &&
          fileListDoctor[i] != "" &&
          fileListIdcard[i] != "null"
        ) {
          data["pharmacist_qualification_url" + (i + 1)] =
            fileListDoctor[i].url;
        } else {
          // data["pharmacist_qualification_url" + (i + 1)] = "null";
          data["pharmacist_qualification_url" + (i + 1)] = "";
        }
      }
      if (this.$store.state.login.user_type == "4") {
        data.mid = this.$store.state.login.userid;
        data.type = "4";
      } else if (this.$store.state.login.user_type == "9") {
        data.type = "9";
      }
      this.loading = true;
      this.$api[this.api](data)

        // 添加  或者  修改
        .then((res) => {
          let ID = this.$store.state.ID;
          let data_ = {
            type: data.type,
            mobile: this.form.user_account,
          };
          if (data.type == 4) {
            data_.mid = ID.userid;
          }
          this.$api.pManage(data_).then((res) => {
            if (data.type == 9 && this.typeClick == 1) {
              this.addPersonalAcct(res.data[0]);
            } else if (
              (data.type == 9 && this.typeClick == 0) ||
              data.type == 4
            ) {
              this.loading = false;
              this.$message.success("药师添加成功");
              setTimeout(() => {
                this.$router.push("/pharmacist");
              }, 1000);
            }
          });
        })
        .catch((res) => {
          this.loading = false;
        });
    },
    addPersonalAcct(val) {
      // let deanid = Base64.decode(sessionStorage.getItem(Base64.encode('go')));
      let data = {
        userId: val.pharmacist_id,
        name: val.pharmacist_nickname,
        idcard: val.pharmacist_idcard,
        // deanid : deanid
      };
      this.$api
        .addPersonalAcct(data)
        .then(() => {
          this.loading = false;
          this.$message.success("药师添加成功");
          setTimeout(() => {
            this.$router.push("/pharmacist");
          }, 1000);
        })
        .catch((res) => {
          this.$message.error("身份证号码验证错误,请校验");
        });
    },
    reject() {
      let data = {
        pid: this.form.pharmacist_id,
        type: "3",
        pharmacist_reason: this.pharmacist_reason,
      };
      this.$api
        .pStatusManageup(data)
        // 添加  或者  修改
        .then((res) => {
          setTimeout(() => {
            this.$router.push("/pharmacist");
          }, 1000);
        });
    },
    getBase64(file) {
      //base64 格式装换
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    handleRemoveDoctor(file, fileList) {
      //资格证书删除
      this.fileListDoctor = fileList;
    },
    handleRemoveIdcard(file, fileList) {
      //身份证删除
      this.fileListIdcard = fileList;
    },
    upLoadicon(file) {
      // 头像
      this.getBase64(file.file).then((res) => {
        this.axiosUpload(res, "icon");
      });
    },
    upLoadIdcard(file) {
      // 身份证
      this.getBase64(file.file).then((res) => {
        let file_ = file.file;
        this.fileListIdcard.push({
          url: "",
          name: file_.name,
          uid: file_.uid,
          type: file_.type,
          size: file_.size,
        });
        this.axiosUpload(res, "idcard");
      });
    },
    axiosUpload(file, type) {
      // 图片上传
      let data = {
        filestr: file,
      };
      this.$api.upLoad(data).then((res) => {
        if (res.code == "200") {
          switch (type) {
            case "icon":
              this.form.pharmacist_icon = res.icon;
              break;
            case "idcard":
              this.fileListIdcard[this.fileListIdcard.length - 1].url =
                res.icon;
              break;
            case "doctor":
              this.fileListDoctor[this.fileListDoctor.length - 1].url =
                res.icon;
              break;
          }
        }
      });
    },
    upLoadDoctor(file) {
      // 药师师资格证书 编码
      this.getBase64(file.file).then((res) => {
        let file_ = file.file;
        this.fileListDoctor.push({
          url: "",
          name: file_.name,
          uid: file_.uid,
          type: file_.type,
          size: file_.size,
        });
        this.axiosUpload(res, "doctor");
      });
    },
    title() {
      //职称
      let type = this.$store.state.login.user_type;
      let titleInfo = this.$store.state.titleInfo;
      let data = {
        type: "3",
      };
      this.$api.titleInfo(data).then((res) => {
        this.optionsTitle = res.data;
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 0.2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 200kb!");
      }
      return isLt2M;
    },
  },
};
</script>

<style scoped type='text/css'>
div {
  box-sizing: border-box;
}
.title {
  width: 220px;
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
  margin-bottom: 5px;
}
.div_ {
  display: flex;
  padding: 20px;
  justify-content: flex-end;
}
/deep/.el-button {
  width: 200px !important;
}
.img_front {
  width: 50px; /*no*/
  border-radius: 5px;
}
/deep/ .uploadID .el-upload {
  position: relative !important;
}
/deep/.uploadID .avatar {
  position: absolute;
  z-index: 1;
}
.upld {
  position: relative;
}
/deep/ .upld .avatar-uploader {
  position: absolute;
  top: 0px; /*no*/
  left: 3px; /*no*/
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.alitemSpan {
  width: auto !important;
  text-align: left !important;
  padding-left: 5px;
}
/deep/ .iconPhoto {
  border: 1px dashed #cecece;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
}
/deep/ .addSign .el-dialog__header .el-dialog__headerbtn {
  /* color: red; */
  display: none;
  /* font-size: 0.4rem; */
}
</style>