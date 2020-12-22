<template>
    <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex_box">

          <div class="flex-1">
            <div class="photo Index_flex_">
              <!-- <el-upload
                class="avatar-uploader"
                  action=""
                  :http-request="upLoad"
                  :show-file-list="false"
                  accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="data_.user_icon" :src="data_.user_icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload> -->
              <el-upload
                class="avatar-uploader iconPhoto"
                action=""
                :show-file-list="false"
                accept=".jpg,.jpeg,.JPG,.JPEG"
                :http-request="upLoadicon"
                :before-upload="beforeAvatarUpload">
                <img v-if="data_.user_icon" :src="data_.user_icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span><i style="color:red">*</i>上传图片</span>
            </div>
            <div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>姓名</span>
                  <el-input v-model="data_.user_nickname" placeholder="请输入姓名"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>手机号</span>
                  <el-input v-model="data_.user_mobile" type="number" placeholder="请输入手机号"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>密码</span>
                  <el-input v-model="data_.user_pswd" placeholder="请输入密码" show-password></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>性别</span>
                  <el-select v-model="data_.user_gender" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>出生日期</span>
                   <el-date-picker
                      v-model="data_.user_bir"
                      type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <div class="Index_flex_">
                  <span class="title">身高</span>
                  <el-input v-model="data_.user_height" placeholder="cm"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title">体重</span>
                  <el-input v-model="data_.user_weight" placeholder="kg"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>身份证号</span>
                  <el-input v-model="data_.user_idcard" placeholder="***"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>地址</span>
                  <el-select v-model="user_province" placeholder="请选择省">
                    <el-option
                      v-for="item in options1"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <el-select v-model="user_city" placeholder="请选择市">
                    <el-option
                      v-for="item in options2"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <el-input v-model="data_.user_address" placeholder="请输入详细地址"></el-input>
                </div>
            </div>
          </div>
          <div class="Index_flex_2">
              <span class="title">病史</span>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="data_.user_bs">
              </el-input>
            </div>
          </div>
          <p class="Index_flex_2"><span>病例单或问诊单</span></p>
          <div class="Index_flex_2 Index_flex_">
                <!-- <div class="photo Index_flex_">
                  <el-upload
                    class="avatar-uploader"
                      action=""
                      :http-request="upLoad2"
                      :limit = 6
                      accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                      :show-file-list="false"
                      >
                      <i  class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span><i style="color:red">*</i>上传图片（最多六张！）</span>
                </div> -->
                <!-- <div class="Index_flex_ flexWarp" >
                  <div v-for ='(item , index) in imglist' :key="index" class="upld">
                    <img v-if="item" :src="item" class="avatar blockImg" @mouseenter="change(index)" @mouseleave="change(index)">
                     <el-upload
                       v-show="out == index"
                       class="avatar-uploader focus"
                      action=""
                      :http-request="upLoad3"
                      accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                      :show-file-list="false"
                      >
                      <i  class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                  </div>
                </div> -->
                  <el-upload
                    class="upload-demo"
                    action=""
                    drag
                    :auto-upload="true"
                    :http-request="upLoadDoctor"
                    :limit = 6
                    :on-remove="handleRemoveDoctor"
                    accept=".jpg,.jpeg,.JPG,.JPEG"
                    :before-upload="beforeAvatarUpload"
                    :file-list="data_1"
                    list-type="picture">
                    <i class="el-icon-plus avatar-uploader-icon uploadI" ></i>
                    <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过200kb</div>
                  </el-upload>
          </div>
          <div class="div_">
            <el-button type="primary" class="btn_save" @click="save">保存</el-button>
          </div>
      </div>
      <AnimateFly class="showFly1 animate-bounce-up point" title="点击回退"></AnimateFly>
    </div>
</template>

<script type='text/ecmascript-6'>
import AnimateFly from '@/components/animate.vue';

import { Toast } from 'mint-ui';
  export default {
    data () {
      return {
        name:'',
        options: [{
          value: '0',
          label: '未知性别'
        },{
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }, {
          value: '9',
          label: '未说明性别'
        }],
        options1:[],
        options2:[],
        data_:{
            user_icon:'',//头像
        },
        data_1:[],
        imglist:[],
        user_province:'',
        user_city:'',
      }
    },components:{
      AnimateFly
    },
    watch:{
      user_province(val){
          this.user_province= val;
          this.data_.user_province=val;
          this.getaddress();
      },
      user_city(val){
        this.user_city= val;
        this.data_.user_city=val;
      },
    },created(){
        this.axios_();
        this.getaddress1();
    }
    ,methods:{
      upLoadicon(file){// 头像
        this.getBase64(file.file).then(res => {
            this.axiosUpload(res,"icon");
        });
      },
      axiosUpload(file,type){//  多图片上传 上传
        let data ={
            filestr:file,
        }
         this.$api.upLoad(data).then((res) => {
          if (res.code == '200') {
            switch (type){
              case "icon":
                this.data_.icon = res.icon;
              break;
              case "doctor":
                this.data_1[this.data_1.length-1].url = res.icon;
                // console.log(this.data_1)
              break;
            }
          }
        });
      },
      upLoadDoctor(file){//多照片
        this.getBase64(file.file).then(res => {
            let file_ = file.file;
            this.data_1.push({url:'',name:file_.name,uid:file_.uid,type:file_.type,size:file_.size });
            this.axiosUpload(res,"doctor");
        });
      },
      handleRemoveDoctor(file,fileList){//多照片删除
        this.data_1 = fileList;
      },
      axios_(){
        let data = {
          userid :this.$store.state.json.user_id
        };
        this.$api.userInfo(data)
        .then((res) => {
          this.data_ = res.data;
          this.updata_(res.data);
        });
      },
      updata_(data){
        let that = this;
        for(var i =0 ; i<6;i++){
            if(data["user_blwzd_url"+(i+1)]!='null' && data["user_blwzd_url"+(i+1)]!='' && data["user_blwzd_url"+(i+1)]!= null){
              that.data_1.push({url:data["user_blwzd_url"+(i+1)],name:'******'})
            }
        }
        this.user_province = this.$store.state.json.user_province;
        this.user_city = this.$store.state.json.user_city;
        if(typeof(this.user_province)=='string'){
            this.user_province = Number(this.user_province);
        }
        if(typeof(this.user_city)=='string'){
            this.user_city = Number(this.user_city);
        }
      },
      changeKey(data){//数据转换
      // console.log(data)
        this.data_.icon =  data.user_icon;
        this.data_.nickname = data.user_nickname;
        this.data_.gender = data.user_gender;
        this.data_.idcard = data.user_idcard;
        this.data_.phone = data.user_mobile;
        this.data_.user_city = this.user_city ;
        this.data_.pswd =  data.user_pswd;
        this.data_.userid =data.user_id;
      },
      save(){
        let data = this.data_;
        this.changeKey(data);
        // console.log(data,"213123",data.user_mobile)
        let data_1 = this.data_1;
        for(var i = 0 ; i < 6 ;i++){
          if(data_1[i]!=null){
            data["user_blwzd_url"+(i+1)] = data_1[i].url;
          }else{
            data["user_blwzd_url"+(i+1)] = 'null';
          }
        }
        let test = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/ ;
        let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(!TEL_REGEXP.test(data.user_mobile)){
          this.$message('手机号有误');
          return false;
        }
        if(!test.test(data.idcard)){
          this.$message('身份证号有误');
          return false;
        }
        this.$api.userManageup(data).then((res) => {
            if(res.code==0){
               this.$router.push("/client")
            }
        });
      },
    getBase64(file) {//base64 格式装换
            return new Promise(function(resolve, reject) {
              let reader = new FileReader();
              let imgResult = "";
              reader.readAsDataURL(file);
              reader.onload = function() {
                imgResult = reader.result;
              };
              reader.onerror = function(error) {
                reject(error);
              };
              reader.onloadend = function() {
                resolve(imgResult);
              };
          });
      },
      getaddress1(){
        let data ={}
        this.$api.getaddress(data).then((res) => {
          this.options1= res.data;
        });
      },
      getaddress(){
        let data ={
            province :this.user_province
        }
        this.$api.getaddress(data).then((res) => {
          if(this.user_province!=''){
            this.options2= res.data;
          }else{
          this.options1= res.data;
          }
        });
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 0.2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      }
    }
  }
</script>

<style scoped type='text/css'>
div{
      box-sizing: border-box;
}
.title{
  width: 100px;
  white-space: nowrap;
  padding: 0px 10px;
  display: inline-block;
  text-align: left;
}
.flexWarp{
  flex-wrap: wrap;
}
  .height{
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

.app{
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
/* padding-bottom: 100px; */
}
.Index_flex{
  display: flex;
    padding: 40px;
  box-sizing: border-box;
}
.Index_flex_box{
  padding-top: 40px;
}
.Index_app-box{
  background:rgba(255,255,255,1);
  box-shadow:0px 1px 10px 2px rgba(227,224,224,0.5);
  border-radius:8px;
    margin-bottom: 20px;
}

/deep/ .el-input__inner{
    height: 50px;
}
.Index_flex_ .el-input{
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
    border-color: #409EFF;
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
  .flex-1{
    display: flex;
    flex-wrap: wrap;
  }
  .Index_flex_{
      display: flex;
      align-items: center;
      margin: 10px 20px;
      padding: 0px 10px;
  }
  .Index_flex_ i{
    padding: 0px 5px;
    color: red;
  }
  .Index_flex_ span{
    text-align: right;
  }
  .photo{
    text-align: center;
    flex-direction: column;
  }
  .Index_flex_2{
    display: flex;
    padding: 10px;
  }
  .Index_flex_2 span{
    text-align: right;
    width: 60px;
  }    
.Index_flex_2 .avatar{
  max-width: 180px;
  margin: 4px 10px;
}
.div_{
  display: flex;
  padding: 20px;
  justify-content: flex-end;
}
/deep/.el-button{
  width: 200px!important;

}
.upld{
  position: relative;
}
 /deep/ .upld .avatar-uploader{
  position: absolute;
    top: 3px;/*no*/
    left: 3px;/*no*/
    background: rgba(0,0,0,.2);
    z-index: 1;
}
/deep/ .upld i{
  color: #000;
}
.blockImg{
  display: inline;
}
/deep/ .iconPhoto{
  border: 1px dashed #cecece;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
}
</style>