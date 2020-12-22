<template>
  <div class="app flex">
    <div class="login_b flex">
      <div class="flex3 paddingR child">
        <p class="loginTitleH">
          <span class="loginTitle">登录/login</span>
        </p>
        <p>
          <input
            type="text"
            v-model="name"
            placeholder="用户名"
            class="login_input"
          />
          <i class="el-icon-circle-close login_icon" @click="clear"></i>
        </p>
        <p>
          <input
            :type="type"
            v-model="password"
            placeholder="密码"
            class="login_input"
          />
          <i class="el-icon-view login_icon" @click="look"></i>
        </p>
        <p>
          <input
            type="text"
            v-model="verificationCode"
            placeholder="验证码"
            class="login_input"
          />
        </p>
        <el-button
          type="success"
          :disabled="disabled_"
          class=""
          @click.native.prevent="submit"
          @keyup.enter.native="submit"
          ><i class="el-icon-loading" v-show="loading_"></i>登录</el-button
        >
      </div>
    </div>
    <div class="bottom">
      Copyright © 银川怡成互联网医院有限公司
      <a style="color: #fff" target="_blank" href="http://beian.miit.gov.cn"
        >宁ICP备20001199号</a
      >
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import formData from '../../static/js/formDate.js';
let formData_ = formData.formDate()
import md5 from 'js-md5';
let md5_ = md5(md5("yc1805_jz_gluce")+formData_)//加密规则
import { Notification } from 'element-ui';
import CBC from '@/api/CBC.js';
import Qs from 'qs';
  export default {
    data () {      
      return {
          name:'',
          password:'',
          verificationCode: "",
          type:'password',
          left:'true',
          TimeOut_:null,
          loading_:false,
          data:[],
          user_type:'',
          disabled_:false,    
          api:'/api',//本地
          // api:'https://api.ycyun120.com/',//线上
          // api:'http://192.168.2.22:8080/yc_internet_hospital_api',
      }
    },methods: {
        submit(){
            if(this.$route.path!='/login'){
                return false;
            }
            let api = this.api ;
            this.loading_ = true ;
            if(this.name==""){
                this.$message.error('请输入用户名');
                return false;
            }else if(this.password==""){
                this.$message.error('请输入密码');
                return false;
            }
            this.disabled_ = true;
            let data = {
                phone:this.name,
                pswd:this.password,
                type:'3',
            }
             this.$api.login(data)//登录
                .then(res => {
                    if(res.code=='0'){
                        this.$store.dispatch("login",res.data);
                        sessionStorage.setItem('user_type',res.pharmacist_type);
                        this.user_type = res.data.user_type;
                        this.$store.dispatch("ID_",{user_deanid:res.data.user_deanid,userid:res.data.userid});
                        sessionStorage.setItem(Base64.encode('go'),Base64.encode(res.data.user_deanid))
                        // this.$store.dispatch("updateCheck",res.data.user_deanid);
                        this.$store.dispatch("token",res.data.access_token);
                        sessionStorage.setItem("qrcodePhone",res.data.access_token)
                        this.others(res.data.access_token,res.data.user_deanid,res.data.user_type);
                        this.TimeOut();
                        if(res.data.userid=="3"){  //本地
                            this.checkIn(res.data.user_deanid,res.data.access_token);
                        }
                        // if(res.data.userid=="1"){  //线上
                        //     this.checkIn(res.data.user_deanid,res.data.access_token);
                        // }
                        console.log(this.$store)
                    }
                })
                .catch((response) => {
                    this.$toast(response);
                });
                setTimeout(()=>{
                    this.loading_ = false ;
                    this.disabled_ = false ;
                },1000)
        },
        clear(){
            this.name="";
        },
        look(){
            if(this.type!='text'){
                this.type="text";
            }else{
                this.type="password";
            }
        },
        TimeOut(){
            this.TimeOut_ = setTimeout(() => {
            switch (this.user_type){
                    case '9':
                        this.$router.push('/');//院长
                    break;
                    case '4':
                         this.$router.push('/pharmacist');//机构
                        // this.$router.push('/adminUser');
                    break;
                    case '3':
                         this.$router.push('/recipe');//药师
                    break;
                    case '2':
                         this.$router.push('/informatization');//医师
                    break;
                    case '10':
                         this.$router.push('/safeUser'); //安全管理员
                    break;
                    case '11':
                         this.$router.push('/audit'); //审计管理员
                    break;
                    case '1':
                         this.$toast("该账号不存在");
                    break;
                }
            }, 1000)
        },
        checkIn(val,token){
            let api = this.api;
            let data = {
                deanid:val,
                userId:val,
                ycgl_key:md5_,
                name:"怡成互联网医院",
                idcard:"110108197608275410",
            };
            this.$axios.defaults.headers.common['access-token'] = token ;
            this.$api.addPersonalAcct(data).then(res =>{
              console.log(res)
            })
        },
        others(token,deanid,type){
            console.log(token)
            let api = this.api;
            let type_ = type  ;
            //firstDepartment 一级科室
            var data = {
                deanid:deanid,
                yc_key:md5_,
            };
            let formData = Qs.stringify(data)
            this.$axios.defaults.headers.common['access-token'] = token ;
            this.$axios.post(api+"/YcManage/firstDepartment.do?",formData)
            .then((res)=>{
                if(res.data.code == '0'){
                    this.$store.dispatch("firstDepartment",res.data.data);
                } 
            })
            //clDocInfo 常用语设置
            this.$axios.post(api+"/YcManage/clDocInfo.do?",formData)
            .then((res)=>{
                if(res.data.code == '0'){
                    this.$store.dispatch("clDocInfo",res.data.data);
                }
            })
            //mInfoList 所属药店
            this.$axios.post(api+"/YcManage/mInfoList.do?",formData)
            .then((res)=>{
                if(res.data.code == '0'){
                    this.$store.dispatch("mInfoList",res.data.data);
                }
            })
            this.otherQuest(data,token)
        },
        otherQuest(data,token){
            let data_ = data;
            let api = this.api;
            data_.type = this.$store.state.login.user_type;
            if(data_.type=='9'){
                data_.type = '';
            }
            let formData = Qs.stringify(data)
            //titleInfo 医师职称
            this.$axios.post(api+"/YcManage/titleInfo.do?",formData)
            .then((res)=>{
                if(res.data.code == '0'){
                    this.$store.dispatch("titleInfo",res.data.data);
                }
            })
            
        }
    },mounted () {
           let that = this;
        //    console.log(this.$roy)
    },created(){
        let that = this;
         document.onkeydown = function(e){
           var keycode = document.all ? event.keyCode : e.which;
            if (keycode == 13) {
                that.submit();// 登录方法名
                return false;
            }
        }
    }
  }
</script>
<style scoped type='text/css'>
@import "../assets/css/login.css";
.paddingL {
  padding-right: 100px;
}
.paddingR {
  text-align: left;
  padding: 60px;
  width: 500px;
  border: 1px solid;
  border-color: rgba(238, 234, 234, 0.2);
  background: #fff;
  background: rgba(238, 234, 234, 0.1);
  border-radius: 25px;
}
.paddingR p {
  height: 100px;
}
.img {
  margin: 20px;
}
.margin {
  border-right: 1px solid #7872B2;
}
.app {
  width: 100%;
  height: 100%;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  background: url("../assets/img/login.png") center no-repeat;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex2 {
  flex-direction: column;
}
.login_b {
  padding: 20px;
  box-sizing: border-box;
  height: 500px;
}
.loginTitle {
  font-size: 36px;
}
.English {
  font-size: 21px;
}
.bottom {
  position: fixed;
  color: #fff;
  bottom: 20px;
  font-size: 18px;
  font-weight: 600;
}
/deep/ button {
  margin-top: 40px;
}
.child {
  height: 100%;
}
.login_input {
  border: none;
  border-bottom: 1px solid #6D67A4;
  background: rgba(0, 0, 0, 0);
  height: 100%;
  color: #fff;
  font-family: PingFangSC-Semibold, PingFang SC;
  outline: none;
}
.login_input:focus {
  border: none;
  border-bottom: 1px solid #6D67A4;
}
.login_input:active {
  border: none;
  border-bottom: 1px solid #6D67A4;
}
.login_input:visited {
  border: none;
  border-bottom: 1px solid #6D67A4;
}
.login_input::placeholder {
  font-size: 32px;
  font-weight: 600;
  color: #857DCC;
}
.paddingR .loginTitleH {
  padding-bottom: 0px;
  margin-bottom: -20px;
}
.login_icon {
  position: relative;
  right: 40px;
  color: #6D67A4;
  font-size: 26px;
  cursor: pointer;
}
</style>