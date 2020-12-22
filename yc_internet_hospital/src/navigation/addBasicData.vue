<template>
    <div class="app" v-loading="loading">
        <div class="Index_app-box">
            <div>
                <el-input placeholder="请输入内容" readonly v-model="data_.a_name" maxlength="30" show-word-limit>
                    <template slot="prepend"><i class="color">*</i> 协议名称</template>
                </el-input>
            </div>
            <div class="pad_">
                <el-input placeholder="请输入内容" v-model="data_.a_context">
                    <template slot="prepend"><i class="color">*</i> 协议介绍</template>
                </el-input>
            </div>
            <div class="flex_ overflow" >
                <span class="title"><i class="color">*</i> 内容</span>
                <quill-editor ref="myTextEditor"
                        v-model="data_.a_content" :options="quillOption">
                </quill-editor>
            </div>
            <div class="btnCon">
             <el-button class="editor-btn" type="primary" @click="submit">添加</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import quillConfig from '@/api/quill-config.js'
import { quillEditor } from 'vue-quill-editor'
export default {
    data(){
        return {
            input2:'',
            data_:{
                type :'',
                a_name:'',
                a_context:'',
                a_context:'',
            },
            basicData:[
                '用户协议', 
                '隐私协议', 
                '付款协议', 
                '合同协议', 
            ],
            loading:false,
            quillOption: quillConfig,
        }
    },
    created(){
        let index = this.$store.state.cookie_ - 1;
        this.data_.a_name = this.basicData[index];
    },methods:{
        submit(){
            this.loading = true;
            let data = this.data_,that = this;
            this.clear();
            data.dataid = data.id;
            this.$api.agreementup(data)
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