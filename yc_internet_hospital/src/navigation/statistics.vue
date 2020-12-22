<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="Index_flex_  display">
              <span class="title">角色名称</span>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div>
              <el-button type="primary" round @click="axios2(0)">查询</el-button>
              <!-- <el-button type="success" round @click="deleteRow(0, 2)">分配菜单</el-button> -->
          </div>
        </div>
        <div class="tableB">
            <el-table :data="tableData" style="width: 100%" :lazy="lazy">
              <!-- <el-table-column align="center" type="selection"/> -->
              <el-table-column align="center"
              tooltip-effect="dark"
                v-for="(col,index) in cols" header-row-class-name="header"
                :prop="col.prop" :label="col.label" :key="index" :width="col.width" :show-overflow-tooltip="true">
              
                          <template slot-scope="scope">
                          <!-- 偏差結果 -->
                              <span v-if="col.prop==='title_level'">
                                  {{scope.row[col.prop]=='2'?'医师':scope.row[col.prop]=='3'?'药师':scope.row[col.prop]=='4'?'机构':''}}
                              </span>
                              <span v-else-if="col.prop==='menu'">
                                  {{scope.row['title_menu1']=='1'?'菜单-首页':''}}
                                  {{scope.row['title_menu2']=='1'?'医生审核':''}}
                                  {{scope.row['title_menu3']=='1'?'药师审核':''}}
                                  {{scope.row['title_menu4']=='1'?'处方审核':''}}
                                  {{scope.row['title_menu5']=='1'?'药店管理':''}}
                                  {{scope.row['title_menu6']=='1'?'一级科室管理':''}}
                                  {{scope.row['title_menu7']=='1'?'医师团队管理':''}}
                                  {{scope.row['title_menu8']=='1'?'医师管理':''}}
                                  {{scope.row['title_menu9']=='1'?'处方管理':''}}
                                  {{scope.row['title_menu10']=='1'?'药品库管理':''}}
                                  {{scope.row['title_menu11']=='1'?'订单管理':''}}
                                  {{scope.row['title_menu12']=='1'?'协议管理':''}}
                                  {{scope.row['title_menu13']=='1'?'用户管理':''}}
                                  {{scope.row['title_menu14']=='1'?'信息发布管理':''}}
                                  {{scope.row['title_menu15']=='1'?'banner管理':''}}
                                  {{scope.row['title_menu16']=='1'?'版本更新管理':''}}
                                  {{scope.row['title_menu17']=='1'?'二级科室管理':''}}
                              </span>
                              <span v-else>{{scope.row[col.prop]}}</span>
                          </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <!-- <el-button
                    @click.native.prevent="deleteRow(scope.$index, 0)"
                    type="text"
                    size="small">
                    删除
                  </el-button> -->
                  <!-- <el-button
                    @click.native.prevent="deleteRow(scope.row, 1)"
                    type="text"
                    size="small">
                    修改
                  </el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <div class="height">
              <el-pagination
              :hide-on-single-page="true"
                background
                @current-change="handleCurrentChange2"
                  :current-page="page"
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
        </div>
      </div>
      <!-- 弹出层 -->
      <el-dialog
        title="分配菜单"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <!-- 菜单树 -->
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          ref="tree"
          current-change = "change"
          :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="change">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除 -->
      <el-dialog title="删除" :visible.sync="dialogFormVisible2">
        是否删除？
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="dele()">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data() {
      return {
        input: undefined,//角色名称
        lazy:true,
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'title_level', label: '角色名称'},
          {prop: 'menu', label: '分配菜单'},
        ],
        value: '',
        tableData: [],
        dialogVisible:false,
        dialogFormVisible2:false,
        data: "",
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        data_:"",
        page:1,
        total:0,
      }
    },
    created(){
      this.axios();
      this.axios2(0);
    },
    methods: {
      change(){
        let code = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        // var rad=''
        // var ridsa = this.$refs.tree.getCheckedKeys().join(',')// 获取当前的选中的数据[数组] -id, 把数组转换成字符串
        // var ridsb = this.$refs.tree.getCheckedNodes()// 获取当前的选中的数据{对象}
        // ridsb.forEach(ids=>{//获取选中的所有的父级id
        //   rad+=','+ids.pid
        // })
        // // rad=rad.substr(1) // 删除字符串前面的','
        // // var rids=rad+','+ridsa
        // // var arr=rids.split(',')//  把字符串转换成数组
        // // arr=[...new Set(arr)]; // 数组去重
        // // rids=arr.join(',')// 把数组转换成字符串
        // console.log(code)
      },
       axios(){
          this.$axios.get("../../static/data.json")
                .then(res => {
                    // this.data =  res.data.data;
                    // this.data_ =  res.data.data;
                })
       },
        handleCurrentChange2(val) {//分页
          this.page = val;
          this.axios2(1);
      },
       axios2(val){
         if(val==0){
          this.page = 1;
        }
         let data = {
            title_name : this.input,
            page:this.page
         };
          this.$api.titleManageInfo(data)
                .then(res => {
                  this.tableData= res.data;
                   this.total = res.total;
                })
       },
       handleClose(done) {
         this.dialogVisible = false ;
       },
       deleteRow(data,val){
         switch (val){
          case 1:
              this.dialogVisible = true ;
              switch(val){
                case data.title_level:
                break;
              }
              this.data = [this.data_[data.title_level]];
          break;
          case 2:
              this.dialogVisible = true ;
              this.data =  this.data_;
          break;
          case 0:
            this.title ="删除"
              this.dialogFormVisible2 = true ;
          break;
         }

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
</style>