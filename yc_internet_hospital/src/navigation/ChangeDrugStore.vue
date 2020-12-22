<template>
  <div class="app">
        <el-form ref="form" :model="form" label-width="80px">
            <span class="danger"><i class="el-icon-s-opportunity"></i> 温馨提示：该店铺信息页面全部为必填项</span>
            <el-form-item label="名称">
                <el-input v-model="form.m_name" maxlength="80" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-input v-model="form.m_type"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.m_address" clearable></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.m_mobile" type="number"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="form.user_account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.user_pswd" show-password></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea" rows = '6' maxlength="200" show-word-limit v-model="form.m_introduction"></el-input>
            </el-form-item>
            <el-form-item label="logo">
                <div class="photo Index_flex_">
                    <el-upload
                        class="avatar-uploader"
                        action=""
                        :http-request="upLoad"
                        :show-file-list="false"
                        accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="form.m_icon" :src="form.m_icon" class="avatar_">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span><i style="color:red">*</i>上传图片</span>
                </div>            
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{type=='0'?'修改':'立即创建'}}</el-button>
            </el-form-item>
        </el-form>
                <AnimateFly class="showFly1 animate-bounce-up point" title="点击回退"></AnimateFly>
  </div>
</template>

<script>
import Qs from 'qs';
import AnimateFly from '@/components/animate.vue';
export default {
    data(){
        return {
            form: {
                m_icon:'',
            },
            type:'0',
        }
    },
    created(){
        let id = this.$store.state.json.m_userid ;
        this.type = this.$store.state.type ;
        if(this.type=='0'){
            this.axios(id);
        }
    },components:{
      AnimateFly
    },
    methods:{
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
        axios(id){
            let data = {
                m_userid:id  
            };
            this.$api.mInfo(data)
                    .then(res => {
                        this.form = res.data;
                    })
        },
        upLoad(file) { //上传
            this.getBase64(file.file).then(res => {
                this.axiosUpload(res);
            });
        },
        axiosUpload(res){//上传图片
            let data ={
                filestr:res,
            }
            this.$api.upLoad(data).then((res) => {
                if (res.code == '200'  ) {
                    this.form.m_icon = res.icon; // 请求成功之后赋给头像的URL
                }
            });
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 0.2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        onSubmit(){
            let api = 'mManageup'
            if(this.type=="1"){
                api = 'mManageins'
            }
            this.$api[api](this.form).then((res) => {
                if (res.code == '0') {
                    this.$router.push("/drugstore")
                }
            });
        }
    }
}
</script>

<style type="text" scoped>
 .app{
     margin: 40px;
     background:rgba(255,255,255,1);
    box-shadow:0px 1px 10px 2px rgba(227,224,224,0.5);
    border-radius:8px;
    padding: 20px 10px;
    box-sizing: border-box;
 }
 .danger{
     color: red;
     display:inline-block;
     padding: 10px 0px;
 }
 .avatar_{
     max-width: 200px;
 }
 /deep/ .avatar-uploader-icon{
     font-size: 40px;/*no*/
     color: #606266;
 }
</style>