<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="Index_flex_  display">
              <span class="title">版本名称</span>
              <el-input v-model="version_title" placeholder="请输入内容"></el-input>
          </div>
          <div>
              <el-button type="primary" round @click="axios(0)">查询</el-button>
              <el-button type="success" round @click="deleteRow(0,2,'新增')">新增</el-button>
          </div>
        </div>
        <div class="tableB">
          <el-table :data="tableData" style="width: 100%" :lazy="lazy">
                <el-table-column align="center"
                tooltip-effect="dark"
                  v-for="(col,index) in cols" header-row-class-name="header"
                  :prop="col.prop" :label="col.label" :key="index" :width="col.width" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                      <span v-if="col.prop==='version_app'">
                          {{scope.row[col.prop]=='1'?'用户端（Android）':scope.row[col.prop]=='2'?'医师端（Android）':scope.row[col.prop]=='3'?'用户端（iOS）':'医师'}}
                      </span>
                      <span v-else>{{scope.row[col.prop]}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <!-- <el-button
                      @click.native.prevent="deleteRow(scope.row, 0,'删除')"
                      type="text"
                      size="small">
                      删除
                    </el-button> -->
                    <el-button
                      @click.native.prevent="deleteRow(scope.row, 1,'修改')"
                      type="text"
                      size="small">
                      修改
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="height">
                <el-pagination
                :hide-on-single-page="true"
                  background
                  @current-change="handleCurrentChange"
                  :current-page="page"
                  layout="prev, pager, next"
                  :total="total">
                </el-pagination>
              </div>
          </div>
      </div>
      <!-- 弹出层 -->
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <!-- 菜单树 -->
        <div v-show="title=='删除'">
          是否删除？
        </div>
        <div v-show="title!='删除'">
          <div class="Index_flex_  display">
              <span class="title"><i class="i_">*</i>版本名称</span>
              <el-input v-model="form.version_title" placeholder="请输入内容"></el-input>
          </div>
          <div class="Index_flex_  display">
              <span class="title"><i class="i_">*</i>版本号</span>
              <el-input v-model="form.version_code" placeholder="请输入内容"></el-input>
          </div>
          <div class="Index_flex_  display">
              <span class="title"><i class="i_">*</i>app端</span>
              <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
              <el-select v-model="form.version_app" placeholder="请选择">
                <el-option
                  v-for="item in appTotal"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </div>
          <div class="Index_flex_  display" style="">
              <span class="title">版本内容</span>
              <el-input v-model="form.version_context" :autosize="{ minRows: 4, maxRows: 5}" type="textarea" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="change">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data() {
      return {
        title:"新增",
        lazy:true,
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'version_title', label: '版本名称'},
          {prop: 'version_code', label: '版本号'},
          {prop: 'version_context', label: '版本内容'},
          {prop: 'version_app', label: 'app端'},
        ],
        tableData: [],
        dialogVisible:false,
        form:{
          version_app:'',//app端
          version_context:'',//更新内容
          version_title:'',//版本名称
          version_code:'',//版本号
        },
        appTotal:[{
            value:'1',
            label:'用户端（Android）',
          },{
            value:'2',
            label:'医师端（Android）',
          },{
            value:'3',
            label:'用户端（iOS）',
          },{
            value:'4',
            label:'医师端（iOS）',
        }],
        total:0,
        page :1,
        version_title:'',
        api:'versionInfoins',
      }
    },
    created(){
      this.axios(0);
    },
    methods: {
       axios(val){
         if(val==0){
           this.page = 1;
         }
        let data = {
          version_title  : this.version_title,
          page : this.page
        };
        this.$api.versionInfo(data)
              .then(res => {
                this.tableData = res.data;
                this.total=res.total;
              }) 
       },
       handleClose(done) {
         this.dialogVisible = false ;
       },
       handleCurrentChange(val) {//分页
        this.page = val;
        this.axios(1);
      },
       change(){
        this.dialogVisible = false;
        let data = this.form;
        data.dataid = data.id;
        this.$api[this.api](data)
              .then(res => {
                this.axios(1)
              }) 
       },
       deleteRow(data,val,title){
         this.dialogVisible = true ;
         this.title = title;
         if(val==1){
           this.form = JSON.parse(JSON.stringify(data))
           this.api="versionInfoup";
         }else if(val==2){
           this.api="versionInfoins";
           Object.assign(this.$data.form,this.$options.data().form)
         }
       }
    }
  }
</script>

<style scoped type='text/css'>
.i_{
  color: red;
}
.app{
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  /* background: #fff; */
  margin-bottom: -100px;
}
.Index_flex{
  display: flex;
    padding: 40px;
  box-sizing: border-box;
}
.Index_flex_{
  margin-right: 40px;
  margin-bottom: 10px;
}
.Index_app-box{
  background:rgba(255,255,255,1);
  box-shadow:0px 1px 10px 2px rgba(227,224,224,0.5);
  border-radius:8px;
}
.bg{
  background: #D3D5FF;
}
  .el-table .success-row {
    background: #f0f9eb;
  }
  .height{
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-table thead{
      background: #D3D5FF!important;
  }
.display{
    display: flex;
    align-items: center;
}
 .tableB{
   width: 100%;
   flex: 1;
 }
.el-table /deep/{
  flex: 1;
  overflow: hidden;
  max-width: 100%;
}
.flexWarp{
  flex-wrap: wrap;
}
.title{
  width: 100px;
  display: inline-block;
  text-align: left;
}
.header{
  text-align: center;
}
.el-checkbox__inner{
    width: 20px!important;
    height: 20px!important;
}
/deep/ .el-input{
    width: auto;
}
/deep/ .el-input__inner{
    width: 250px;
    height: 50px;
}
/deep/ .el-dialog__body span{
  font-size: 20px!important;
}
.el-textarea{
  flex: 1;
}
</style>