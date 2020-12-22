<template>
    <div class="app" v-loading="loading">
        <div class="Index_app-box">
            <div>
                <el-input placeholder="请输入内容" v-model="data_.msg_message" maxlength="30" show-word-limit>
                    <template slot="prepend"><i class="color">*</i>公告标题</template>
                </el-input>
            </div>
            <div class="flex_">
                <div class="flex pad_ ">
                    <span class="title"><i class="color">*</i>公告人群</span>
                    <el-select v-model="data_.type" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-select>
                </div>
            </div>
            <div class="flex_ overflow" >
                <span class="title">内容</span>
                <quill-editor ref="myTextEditor"
                        v-model="data_.msg_context" :options="quillOption">
                </quill-editor>
            </div>
            <div class="btnCon">
             <el-button class="editor-btn" type="primary" @click="submit">立即添加</el-button>
             <el-button class="editor-btn" type="primary" @click="submit2">重置</el-button>
            </div>
        </div>
        <AnimateFly class="showFly1 animate-bounce-up point" title="点击回退"></AnimateFly>
    </div>
</template>

<script>
import quillConfig from '@/api/quill-config.js'
import { quillEditor } from 'vue-quill-editor'
export default {
    data(){
        return {
            input2:'',
            order:'',
            app:'',
            radio:'',
            options:[
                {
                    value:'1',
                    label:'全部',
                },
                {
                    value:'2',
                    label:'患者',
                },
                {
                    value:'3',
                    label:'医生',
                }
            ],
            data_:{
                type :'',
                msg_message:'',
                msg_context:'',
            },
            loading:false,
            // editorOption:{},
            quillOption: quillConfig,
        }
    },
    created(){
        
    },methods:{
        submit2(){
            Object.assign(this.$data, this.$options.data())
        },
        submit(){
            this.loading = true;
            let data = this.data_,that = this;
            this.clear();
            this.$api.msgInfoins(data)
        },clear(){
            setTimeout(()=>{
                   this.loading = false;
            },500)
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