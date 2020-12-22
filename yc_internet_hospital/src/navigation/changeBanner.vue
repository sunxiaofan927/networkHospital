<template>
    <div class="app">
        <div class="Index_app-box">
            <div class="photo Index_flex_">
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :http-request="upLoad"
                    :show-file-list="false"
                    accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="data.banner_picture" :src="data.banner_picture" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon icon_"></i>
                </el-upload>
                <span><i style="color:red">*</i>上传图片</span>
            </div>
            <div>
                <el-input placeholder="请输入内容" v-model="data.banner_bt" maxlength="20" show-word-limit>
                    <template slot="prepend"><i class="color">*</i>标题</template>
                </el-input>
            </div>
            <!-- <div class="pad_">
                <el-input placeholder="请输入内容" v-model="data.banner_name" >
                    <template slot="prepend"><i class="color">*</i>页面名字</template>
                </el-input>
            </div> -->
            <div class="flex_">
                <div class="flex pad_ ">
                    <span class="title"><i class="color">*</i>序号</span>
                    <el-select v-model="data.banner_id" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                    </el-option>
                    </el-select>
                </div>
                <div class="flex pad_">
                    <span class="title"><i class="color">*</i>app端</span>
                    <el-select v-model="data.banner_type" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <el-input placeholder="请输入内容" v-model="banner_url ">
                    <template slot="prepend">转向链接</template>
                </el-input>
            </div>
            <div class="pad_">
                <span class="title"><i class="color">*</i>是否展示图片</span>
                <template>
                    <el-radio v-model="data.banner_zs_status" label="1">是</el-radio>
                    <el-radio v-model="data.banner_zs_status" label="2">否</el-radio>
                </template>
            </div>
       
            <div class="flex_ overflow">
                <span class="title">内容</span>
                <quill-editor ref="myTextEditor"
                    v-model="data.banner_message" :options="quillOption">
                </quill-editor>
            </div>
            <div class="btnCon">
             <el-button class="editor-btn" type="primary" @click="submit">修改</el-button>
            </div>
        </div>
        <AnimateFly class="showFly1 animate-bounce-up point" title="点击回退"></AnimateFly>
    </div>
</template>

<script>
import quillConfig from '@/api/quill-config.js'
import { quillEditor } from 'vue-quill-editor'
import AnimateFly from '@/components/animate.vue';
export default {
    data(){
        return {
            input2:'',
            order:'',
            app:'',
            radio:'',
            options:[
               
                {
                    value:'2',
                    label:'患者',
                },
                {
                    value:'3',
                    label:'医生',
                }
            ],
            data:{
                banner_picture :'',
                banner_type:'',
                banner_zs_status:'',
                banner_url:'',
                banner_bt:'',
                banner_id:'',
                banner_message :'',
                banner_name:'',
            },
            banner_url:'',
            // editorOption:{},
            quillOption: quillConfig,
            disabled:true,
        }
    },components:{
      AnimateFly
    },
    watch:{
        banner_url(val){
            if(val!=""){
                this.data.banner_message = '';
            }
            this.data.banner_url = val;
        }
    },
//     components: {
//     quillEditor
//   },
    created(){
        this.axios();
        // this.data.banner_message = '热文';
        // this.banner_url = this.$store.state.json.banner_url;
    },methods:{
        axios(){
            let data ={
                id :this.$store.state.json.id
            }
            this.$api.selectBannerById(data).then((res) => {
                this.data = res.data;
            });
        },
        axiosUpload(res){//上传图片
            let data ={
                filestr:res,
            }
            this.$api.upLoad(data).then((res) => {
                if (res.code == '200') {
                    this.data.banner_picture= res.icon; // 请求成功之后赋给头像的URL
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
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 0.2;
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        upLoad(file) { //上传
            this.getBase64(file.file).then(res => {
                this.axiosUpload(res);
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
        },onEditorChange({ editor, html, text }) {
                this.data.banner_message = html;
                // console.log(editor, html, text)
        },  
        submit(){
            let data = this.data;
            data.banner_message =  data.banner_message.replace(/\"/g,"'");
            console.log(data.banner_message)
                this.$api.updateBanner(data)
                .then(res => {
                    this.tableData = res.data;
                    this.total=res.total;
                    this.$router.back(-1)
                })
                
        }
    }
}
</script>

<style scoped type='text/css'>
.app{
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
/* padding-bottom: 100px; */
}
.Index_app-box{
  background:rgba(255,255,255,1);
  box-shadow:0px 1px 10px 2px rgba(227,224,224,0.5);
  border-radius:8px;
  padding: 20px;
  box-sizing: border-box;
}
.pad_{
    padding: 10px 0px;
    margin-right: 20px;
    margin: 10px 0px;
}
.flex_{
    display: flex;
    align-items: center;
}
.icon_{
    padding: 60px;
    color: red;


    font-size: 20px;
}
.avatar{
    max-width: 600px;
    min-width: 100%;
}
.color{
    color: red;
}
.quill-editor {
    height: 100%;
    min-height: 400px;
    width: 100%;
    margin-bottom: 10px;
}
.title{
    padding:10px 20px ;
    display: inline-block;
}
.btnCon{
    width: 100%;
    margin: 40px 0px;
}
.photo{
    margin-bottom: 10px;
}
/deep/ .ql-editor{
    min-height: 300px;
}
/deep/ .ql-tooltip{
    left: 0px!important;
}
.overflow{
  align-items: initial;
}
</style>