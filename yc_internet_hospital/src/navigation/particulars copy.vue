<template>
    <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex_box">
          <div class="flex-1">
            <div class="photo Index_flex_">
              <el-upload
                class="avatar-uploader"
                  action=""
                  :http-request="upLoad_"
                  :show-file-list="false"
                  accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.icon" :src="form.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span><i style="color:red">*</i>上传图片</span>
            </div>
            <div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>姓名</span>
                  <el-input v-model="form.nickname" placeholder="请输入内容"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>手机号</span>
                  <el-input v-model="form.phone" type="number" placeholder="请输入内容"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>性别</span>
                  <el-select v-model="form.gender" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>密码</span>
                  <el-input v-model="form.pswd" placeholder="请输入内容"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>医师状态</span>
                  <el-select v-model="form.status" placeholder="请选择">
                    <el-option
                      v-for="item in optionsStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>医师职称</span>
                  <el-select v-model="form.title" placeholder="请选择">
                    <el-option
                      v-for="item in optionsTitle"
                      :key="item.id"
                      :label="item.title_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
            </div>
            <div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>所属医院</span>
                  <el-input v-model="form.hospital" placeholder="请输入内容"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>执业证书编号</span>
                  <el-input v-model="form.certificate" placeholder="请输入内容"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>身份证号</span>
                  <el-input v-model="form.idcard" placeholder="请输入内容"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>所在科室</span>
                  <el-select v-model="department1" placeholder="请选择一级科室">
                    <el-option
                      v-for="item in firstDepartment"
                      :key="item.id"
                      :label="item.department1_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <el-select v-model="department2" placeholder="请选择二级科室">
                    <el-option
                      v-for="item in twoDepartment"
                      :key="item.id"
                      :label="item.department2_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
            </div>
          </div>
          <div class="Index_flex_2">
              <span class="title alitemSpan"><h4><i style="color:red">*</i>擅长</h4></span>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="form.field">
              </el-input>
          </div>
          <div class="Index_flex_2">
              <span class="title alitemSpan"><h4><i style="color:red">*</i>简介</h4></span>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="form.introduction">
              </el-input>
          </div>
          </div>

          <div class="Index_flex_2 alitem width">
                <span>
                      <h4>  视频开通 </h4>
                </span>
                <template>
                    <el-radio v-model="form.openvideo" label="1">开通</el-radio>
                    <el-radio v-model="form.openvideo" label="2">不开通</el-radio>
                </template>
          </div>
          <div class="Index_flex_2 alitem width">
                <span>
                      <h4>  图文问诊 </h4>
                </span>
                <template>
                    <el-radio v-model="form.opentw" label="1">开通</el-radio>
                    <el-radio v-model="form.opentw" label="2">不开通</el-radio>
                </template>
          </div>
          <div>
                <div class="Index_flex_">
                  <span class="title"> <h4> 图文问诊价格 </h4></span> 
                  <el-input v-model="form.twprice" type="number" placeholder="请输入内容"></el-input>
                </div>
                 <div class="Index_flex_">
                  <span class="title"> <h4> 视频问诊价格 </h4></span>
                  <el-input v-model="form.videoprice" type="number" placeholder="请输入内容"></el-input>
                </div>  
          </div>
          <div class="Index_flex_2">
                <div class="Index_flex_">
                  <span class="spanWidth"> <h4> 图文价格分配 医师占比 (%)</h4></span> 
                  <el-select v-model="form.proportion1" placeholder="请选择">
                    <el-option
                      v-for="item in optionsPirce"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                 <div class="Index_flex_">
                  <span class="spanWidth"> <h4> 视频价格分配 医师占比 (%)</h4></span>
                  <el-select v-model="form.proportion2" placeholder="请选择">
                    <el-option
                      v-for="item in optionsPirce"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>  
          </div>
          <div class="block">
            <el-timeline>
              <el-timeline-item :timestamp="item.timestamp" placement="top" v-for="(item,index) in timeline" :key="index">
                <el-card>
                  <div class="Index_flex_ blockMargin">
                    <div class="block Index_flex_ blockMargin">
                      <span class="demonstration"><h4>开始时间</h4></span>
                      <el-time-picker
                        v-model="item.value1"
                        format="HH:mm"
                        value-format="HH:mm"
                        placeholder="选择日期时间">
                      </el-time-picker>
                    </div>
                    <div class="block Index_flex_ blockMargin">
                      <span class="demonstration"><h4>结束时间</h4></span>
                      <el-time-picker
                        v-model="item.value2"
                        type="datetime"
                        format="HH:mm"
                        value-format="HH:mm"
                        placeholder="选择日期时间">
                      </el-time-picker>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>

            </el-timeline>
          </div>
          <div class="Index_flex_2"><span class="alitemSpan"> <h4> <i style="color:red">*</i>身份证 </h4></span></div>
          <div class="Index_flex_2 Index_flex_">
                <div class="photo Index_flex_">
                  <el-upload
                    class="avatar-uploader uploadID"
                      action=""
                      :http-request="upLoad"
                      title="身份证正面"
                      accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                      :show-file-list="false"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="form.idcard_url1" :src="form.idcard_url1" class="avatar">
                      <i  class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span><i style="color:red">*</i>上传图片<img src="@/assets/img/front.jpg" title="身份证正面" alt="身份证正面" srcset="" class="img_front"></span>
                </div>
                <div class="photo Index_flex_">
                  <el-upload
                   title="身份证反面"
                    class="avatar-uploader uploadID"
                      action=""
                      accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                      :http-request="upLoad1"
                      :show-file-list="false"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="form.idcard_url2" :src="form.idcard_url2" class="avatar">
                      <i  class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span><i style="color:red">*</i>上传图片<img src="@/assets/img/reverse.jpg" alt="身份证反面"  title="身份证反面" srcset="" class="img_front"></span>
                </div>
          </div>

          <div class="Index_flex_2"> <h4> <span><i style="color:red">*</i>医师资格证书</span> </h4></div>
          <div class="Index_flex_2 Index_flex_">
                <div class="photo Index_flex_">
                  <el-upload
                    class="avatar-uploader"
                      action=""
                      :http-request="upLoad4"
                      :limit = 6
                      accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                      :show-file-list="false"
                      >
                      <i  class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span><i style="color:red">*</i>上传图片（最多六张！）</span>
                </div>
                <div class="Index_flex_ flexWarp" >
                  <div v-for ='(item , index) in imglist2' :key="index" class="upld">
                    <img v-if="item" :src="item" class="avatar blockImg" @mouseenter="change2(index)" @mouseleave="change2(index)">
                     <el-upload
                       v-show="out2 == index"
                       class="avatar-uploader"
                      action=""
                      :http-request="upLoad5"
                      accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                      :show-file-list="false"
                      >
                      <i  class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  </div>
                </div>
          </div>
          <div class="Index_flex_2">  <h4>  <span><i style="color:red">*</i>医师职称证书</span> </h4></div>
          <div class="Index_flex_2 Index_flex_">
                <div class="photo Index_flex_">
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
                </div>
                <div class="Index_flex_ flexWarp" >
                  <div v-for ='(item , index) in imglist' :key="index" class="upld">
                    <img v-if="item" :src="item" class="avatar blockImg" @mouseenter="change(index)" @mouseleave="change(index)">
                     <el-upload
                       v-show="out == index"
                       class="avatar-uploader"
                      action=""
                      :http-request="upLoad3"
                      accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                      :show-file-list="false"
                      >
                      <i  class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  </div>
                </div>
          </div>
          <div class="div_">
            <el-button type="primary" class="btn_save" @click="submit">提交审核</el-button>
          </div>
      </div>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
        options: [{//性别
          value: '0',
          label: '未知性别'
        },{//性别
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }, {
          value: '9',
          label: '未说明性别'
        }],
        optionsStatus:[
          {value: '1',label: '正常'},
          {value: '2',label: '封禁'},
        ],
        optionsPirce:[
          {value: '0',label: '0'},
          {value: '10',label: '10'},
          {value: '20',label: '20'},
          {value: '30',label: '30'},
          {value: '40',label: '40'},
          {value: '50',label: '50'},
          {value: '60',label: '60'},
          {value: '70',label: '70'},
          {value: '80',label: '80'},
          {value: '90',label: '90'},
          {value: '100',label: '100'},
        ],
        optionsTitle:[],
        firstDepartment:[],
        twoDepartment:[],
        value: '',
        headUrl: '',
        timeline:[{
          timestamp:"星期一",
          value1:'',
          value2:'',
        },{
          timestamp:"星期二",
          value1:'',
          value2:'',
        },{
          timestamp:"星期三",
          value1:'',
          value2:'',
        },{
          timestamp:"星期四",
          value1:'',
          value2:'',
        },{
          timestamp:"星期五",
          value1:'',
          value2:'',
        },{
          timestamp:"星期六",
          item:'',
          value2:'',
        },{
          timestamp:"星期日",
          value1:'',
          value2:'',
        },],
        form:{
          pswd:'',//密码
          icon:"",//头像
          department1:'',//一级科室
          department2:'',//二级科室
          nickname:'',//姓名
          gender:'',//性别
          idcard:'',//身份证号
          hospital:'',//医生线下现任职机构名称
          status:'',//账户是否可以正常使用
          title:'',//职称唯一id
          phone:'',//手机号
          certificate:"",//医师执业证书编号
          introduction:'',//医师简介
          field:"",//医师擅长
          opentw:'',//图文开通在线
          twprice:"",//图文价格
          openvideo:'',// 视频开通在线 
          videoprice:"",//视频价格
          doctor_monday1:'',//星期一
          doctor_monday2:'',//
          doctor_tuesday1:'',//星期二
          doctor_tuesday2:"",//
          doctor_wednesday1:'',//星期三
          doctor_wednesday2:'',//
          doctor_thursdy1:'',//星期四
          doctor_thursdy2:"",//
          doctor_friday1:'',//星期五
          doctor_friday2:"",//
          doctor_saturday1:'',//星期六
          doctor_saturday2:'',//
          doctor_sunday1:'',//星期六 
          doctor_sunday2:'',//
          idcard_url1:"",//身份证正面照片url
          idcard_url2 :"",//身份证反面URL
          qualification_url1 :"",//教师资格证书
          qualification_url2 :"",//教师资格证书
          qualification_url3 :"",//教师资格证书
          qualification_url4 :"",//教师资格证书
          qualification_url5 :"",//教师资格证书
          qualification_url6 :"",//教师资格证书
          certificate_url1:'',//医师职称证书照片
          certificate_url2:'',  
          certificate_url3:'',  
          certificate_url4:'',  
          certificate_url5:'',  
          certificate_url6:'',  
          proportion1:'',//图文价格分配 医师占比%
          proportion2:'',//视频价格分配 医师占比% 
        },
        department1:'',
        department2:"",
        imglist:[],//医师资格证书集合
        out:1,
        type:false,
        imglist2:[],//教师资格证书
        out2:1,
        type2:false,
      }
    },created(){
      this.firstDepartmentFun();
      this.titleInfo();
    },
    watch:{
      department1(val){
        this.form.department1= val;
        this.twoDepartmentFun(val);
      },
      department2(val){
        this.form.department2= val;
      },
      imglist(val){
       this.imglist=val;
      },
       out(val){
        this.out = val;
      },
       type(val){
        this.out = val;
      },
       imglist2(val){
       this.imglist2=val;
      },
       out2(val){
        this.out2 = val;
      },
       type2(val){
        this.out2 = val;
      }
    },
    methods:{
      change(index){
        this.out = index;
      },
      change2(index){
        this.out2 = index;
      },
      submit(){
        let data = this.form;
        data.doctor_monday1 = this.timeline[0].value1;
        data.doctor_monday2 = this.timeline[1].value2;

        data.doctor_tuesday1 = this.timeline[0].value1;
        data.doctor_tuesday2 = this.timeline[1].value2;

        data.doctor_wednesday1 = this.timeline[0].value1;
        data.doctor_wednesday2 = this.timeline[1].value2;

        data.doctor_thursdy1 = this.timeline[0].value1;
        data.doctor_thursdy2 = this.timeline[1].value2;

        data.doctor_friday1 = this.timeline[0].value1;
        data.doctor_friday2 = this.timeline[1].value2;
        
        data.doctor_saturday1 = this.timeline[0].value1;
        data.doctor_saturday2 = this.timeline[1].value2;

        data.doctor_sunday1 = this.timeline[0].value1;
        data.doctor_sunday2 = this.timeline[1].value2;
        this.$api.doctorManageIns(data)
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
      
      upLoad(file) { //上传
        this.getBase64(file.file).then(res => {
            this.axiosUpload(res);
        });
      },
      upLoad_(file) { //上传
        this.getBase64(file.file).then(res => {
            this.axiosUpload_(res);
        });
      },
      upLoad1(file) { //上传
        this.getBase64(file.file).then(res => {
            this.axiosUpload1(res);
        });
      },
      upLoad2(file){
        this.getBase64(file.file).then(res => {
            this.axiosUpload2(res);
        });
      },
      upLoad3(file){
        this.getBase64(file.file).then(res => {
            this.axiosUpload3(res);
        });
      },
      upLoad4(file){
        this.getBase64(file.file).then(res => {
            this.axiosUpload4(res);
        });
      },
      upLoad5(file){
        this.getBase64(file.file).then(res => {
            this.axiosUpload5(res);
        });
      },
      axiosUpload_(res){//上传图片
        let data ={
            filestr:res,
        }
        this.$api.upLoad(data).then((res) => {
          if (res.code == '200'  ) {
            this.form.icon = res.icon; // 请求成功之后赋给头像的URL
          }
        });
      },
      axiosUpload(res){//上传图片
        let data ={
            filestr:res,
        }
        this.$api.upLoad(data).then((res) => {
          if (res.code == '200') {
            this.form.idcard_url1 = res.icon; // 请求成功之后赋给头像的URL
          }
        });
      },
      axiosUpload1(res){//上传图片
        let data ={
            filestr:res,
        }
        this.$api.upLoad(data).then((res) => {
          if (res.code == '200'  ) {
            this.form.idcard_url2 = res.icon; // 请求成功之后赋给头像的URL
          }
        });
      },
      axiosUpload2(res){//上传图片
        let data ={
            filestr:res,
        }
        this.$api.upLoad(data).then((res) => {
          if (res.code == '200'  ) {
              this.imglist.push(res.icon); // 请求成功之后赋给头像的URL
              this.form['certificate_url'+this.imglist.length] = res.icon;
          }
        });
      },
      axiosUpload3(res){//上传图片
        let data ={
            filestr:res,
        }
        this.$api.upLoad(data).then((res) => {
          if (res.code == '200') {
              this.imglist[this.out]= res.icon; // 请求成功之后赋给头像的URL
              this.type = !this.type ;
          }
        });
        
      },axiosUpload4(res){//上传图片
        let data ={
            filestr:res,
        }
        this.$api.upLoad(data).then((res) => {
          if (res.code == '200'  ) {
              this.imglist2.push(res.icon); // 请求成功之后赋给头像的URL
              this.form['qualification_url'+this.imglist2.length] = res.icon;
          }
        });
      },
      axiosUpload5(res){//上传图片
        let data ={
            filestr:res,
        }
        this.$api.upLoad(data).then((res) => {
          if (res.code == '200') {
              this.imglist2[this.out2]= res.icon; // 请求成功之后赋给头像的URL
              this.type2 = !this.type2 ;
          }
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
      // handleAvatarSuccess(res, file) {//上传成功
      //   this.imageUrl = URL.createObjectURL(file.raw);
      // },
      beforeAvatarUpload(file) {
       const isLt2M = file.size / 1024 / 1024 < 0.2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      firstDepartmentFun(){
        let firstDepartment = this.$store.state.firstDepartment ;
          if(!firstDepartment){
              let data = {};
              this.$api.firstDepartment(data)
                    .then(res => {
                      this.firstDepartment = res.data;
                    })
          }else{
            this.firstDepartment = firstDepartment;
          }
      },
      titleInfo(){
        let type = this.$store.state.login.user_type;
        if(type == '9'){
          type = '3'
        }
        let data = {
          type:type
        };
        this.$api.titleInfo(data)
          .then((res)=>{
              this.optionsTitle = res.data;
          })
      },
      twoDepartmentFun(val){
        let data = {
           departId:val
        };
        this.$api.twoDepartment(data)
          .then((res)=>{
              this.twoDepartment = res.data;
          })
      }
    }
  }
</script>

<style scoped type='text/css'>
div{
      box-sizing: border-box;
}
.title{
  width: 150px;
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
  margin: 0px 10px;
}
.div_{
  display: flex;
  padding: 20px;
  justify-content: flex-end;
}
/deep/.el-button{
  width: 200px!important;
}
.alitem span{
    width: 200px!important;
    margin-right: 20px;
    text-align: left;
}
.alitem{
    display: flex;
    align-items: center;
}
.block{
  padding: 10px;
}
/deep/ .block .el-timeline-item__node{
  background: #45c245!important;
}
.blockMargin{
  margin: 0px!important;
}
.blockMargin span{
  padding: 0px 10px;
}
.width{
  width: 80px;
}
.spanWidth{
  width: auto!important;
  padding: 0px 5px;
}
.upld{
  position: relative;
}
 /deep/ .upld .avatar-uploader{
  position: absolute;
    top: 0px;/*no*/
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
.img_front{
  width: 50px;/*no*/
  border-radius:5px;
}
/deep/ .uploadID .el-upload{
  position: relative!important;
}
/deep/.uploadID .avatar{
  position: absolute;
  z-index: 1;
}
</style>