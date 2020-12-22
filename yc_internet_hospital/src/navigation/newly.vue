<template>
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
                :before-upload="beforeAvatarUpload">
                <img v-if="data.icon" :src="data.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span><i style="color:red">*</i>上传图片</span>
            </div>
            <div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>姓名</span>
                  <el-input v-model="data.nickname" placeholder="请输入姓名"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>手机号</span>
                  <el-input v-model="data.phone" type="number" placeholder="请输入手机号"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>密码</span>
                  <el-input v-model="data.pswd" placeholder="请输入密码" show-password></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>性别</span>
                  <el-select v-model="data.gender" placeholder="请选择">
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
                      v-model="data.user_bir"
                      type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>身高</span>
                  <el-input v-model="data.user_height" placeholder="cm"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>体重</span>
                  <el-input v-model="data.user_weight" placeholder="kg"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>身份证号</span>
                  <el-input v-model="data.idcard" placeholder="***"></el-input>
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
                  <el-input v-model="data.user_address" placeholder="请输入详细地址"></el-input>
                </div>
            </div>
          </div>
          <div class="Index_flex_2">
              <span class="title">病史</span>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="data.user_bs">
              </el-input>
            </div>
          </div>
          <p class="Index_flex_2"><span>病例单或问诊单</span></p>
          <div class="Index_flex_2 Index_flex_">
                <el-upload
              class="upload-demo"
              action=""
              drag
              :limit = 6
              :auto-upload="true"
              :http-request="upLoadContract"
              :on-remove="handleRemoveContract"
              accept=".jpg,.jpeg,.JPG,.JPEG"
              :before-upload="beforeAvatarUpload"
              :file-list="fileListIdcard"
              list-type="picture">
              <i class="el-icon-plus avatar-uploader-icon uploadI" ></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过200kb</div>
            </el-upload>
          </div>
          <div class="div_">
            <el-button type="primary" class="btn_save" @click="save">保存</el-button>
          </div>
      </div>
    </div>
</template>

<script type='text/ecmascript-6'>
import { Toast } from 'mint-ui';
import Qs from 'qs';
  export default {
    data () {
      return {
        name:'',
        options: [{
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }],
        options1:[],
        options2:[],
        list:[{
          code:'',
          diagnose:'',
          doctor:'',
        }],
        data:{
          nickname:'',
          phone:'',
          gender:'',
          user_bir:'',
          user_height:'',
          user_weight:'',
          idcard:'',
          user_province:'',
          user_city:'',
          user_address:'',
          user_bs:'',
          user_blwzd_url1:'',
          user_blwzd_url2:'',
          user_blwzd_url3:'',
          user_blwzd_url4:'',
          user_blwzd_url5:'',
          user_blwzd_url6:'',
          icon: '',
        },
        imglist:[],
        out:1,
        type:false,
        user_province:'',
        user_city:'',
        fileListIdcard:[],
      }
    },
    watch:{
        user_province(val){
          this.user_province= val;
          this.data.user_province=val;
          this.getaddress();
        },
        user_city(val){
          this.user_city= val;
          this.data.user_city=val;
        },
      imglist(val){
       this.imglist=val;
      },
       out(val){
        this.out = val;
      },
       type(val){
        this.out = val;
      }
    },created(){
      this.getaddress()
    }
    ,methods:{
      save(){
        let data = this.data;
        let fileListIdcard = this.fileListIdcard;
        for(var i = 0; i < fileListIdcard.length ;i++){//合同
          data["user_blwzd_url"+(i+1)] = fileListIdcard[i].url
        }
        let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        let test = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/ ;
        if(!TEL_REGEXP.test(data.phone)){
         this.$message('手机号有误');
          return false;
        }
        if(!test.test(data.idcard)){
          this.$message('身份证号有误');
          return false;
        }
        this.$api.userManageIns(data).then((res) => {
            if(res.code==0){
               this.$router.push("/client")
            }
        });
      },
      upLoadicon(file){// 头像
        this.getBase64(file.file).then(res => {
            this.axiosUpload(res,"icon");
        });
      },
      upLoadContract(file){// 头像
        let file_ = file.file;
        this.fileListIdcard.push({url:'',name:file_.name,uid:file_.uid,type:file_.type,size:file_.size });
        this.getBase64(file.file).then(res => {
            this.axiosUpload(res,"list");
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
      axiosUpload(file,type){//  身份证 上传
        let data ={
            filestr:file,
        }
         this.$api.upLoad(data).then((res) => {
          if (res.code == '200') {
            switch (type){
              case "icon":
                this.data.icon = res.icon;
              break;
              case "list":
                this.fileListIdcard[this.fileListIdcard.length-1].url = res.icon;
              break;
            }
          }
        });
      },
      handleRemoveContract(file,fileList){//合同删除
        this.fileListIdcard = fileList;
      },
      // upLoad(file) { //上传
      //   this.getBase64(file.file).then(res => {
      //       this.axiosUpload(res);
      //   });
      // },
      // change(index){
      //   this.out = index;
      // },
      // upLoad2(file){
      //   this.getBase64(file.file).then(res => {
      //       this.axiosUpload2(res);
      //   });
      // },
      // upLoad3(file){
      //   this.getBase64(file.file).then(res => {
      //       this.axiosUpload3(res);
      //   });
      // },
      // axiosUpload(res){//上传图片
      //   let data ={
      //       filestr:res,
      //   }
      //   this.$api.upLoad(data).then((res) => {
      //     if (res.code == '200'  ) {
      //       this.data.icon = res.icon; // 请求成功之后赋给头像的URL
      //     }
      //   });
      // },
      // axiosUpload2(res){//上传图片
      //   let data ={
      //       filestr:res,
      //   }
      //   this.$api.upLoad(data).then((res) => {
      //     if (res.code == '200'  ) {
      //         this.imglist.push(res.icon); // 请求成功之后赋给头像的URL
      //         this.data['user_blwzd_url'+this.imglist.length] = res.icon;
      //     }
      //   });
      // },
      // axiosUpload3(res){//上传图片
      //   let data ={
      //       filestr:res,
      //   }
      //   this.$api.upLoad(data).then((res) => {
      //     if (res.code == '200') {
      //         this.imglist[this.out]= res.icon; // 请求成功之后赋给头像的URL
      //         this.type = !this.type ;
      //     }
      //   });
        
      // },
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
      beforeAvatarUpload(file) {//限制文件大小
       const isLt2M = file.size / 1024 / 1024 < 0.2;
        if (!isLt2M) {  
          this.$message.error('上传头像图片大小不能超过 200KB!');
        }
        return isLt2M;
      },
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