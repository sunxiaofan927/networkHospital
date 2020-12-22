<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="Index_flex_  display">
              <span class="title">用户姓名</span>
              <el-input v-model="username" placeholder="请输入内容"></el-input>
          </div>
          <div>
              <el-button type="primary" round @click="search">查询</el-button>
              <el-button type="success" round @click="deleteRow(0, 2)">添加</el-button>
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
                      <span v-if="col.prop==='user_gender'">
                         {{scope.row[col.prop]=='0'?'未知性别':scope.row[col.prop]=='1'?'男':scope.row[col.prop]=='2'?"女":'未说明性别'}}
                      </span>
                      <span v-else>{{scope.row[col.prop]}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.row, 0)"
                      type="text"
                      size="small">
                      删除
                    </el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.row, 1)"
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
                layout="prev, pager, next"
                :current-page="page"
                :total="total">
              </el-pagination>
            </div>
          </div>
      </div>
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
  import bus from '../components/bus';

  export default {
    data() {
      return {
        username: '',//角色名称
        lazy:true,
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'desensitize_user_nickname', label: '姓名'},
          {prop: 'desensitize_user_mobile', label: '手机号'},
          {prop: 'age', label: '年龄'},
          {prop: 'user_gender', label: '性别'},
          {prop: 'user_height', label: '身高'},
          {prop: 'user_weight', label: '体重'},
          {prop: 'user_bs', label: '病史'},
          {prop: 'desensitize_user_idcard', label: '身份证号'},
          {prop: 'province', label: '地区'},
          {prop: 'user_creattime', label: '注册时间'},
        ],
        value: '',
        tableData: [],
        dialogFormVisible2:false,
        data: "",
        total:0,
        currentPage:1,
        page:1,
      }
    },
    created(){
      this.axios(0);
    },
    methods: {
      handleCurrentChange(val){
        this.page = val;
        this.axios(1);
      },
      search(){
        this.axios(0);
      },
       axios(val){
         if(val==0){
           this.page = 1 ;
         }
         let data = {
           page:this.page,
           username:this.username
         };
         this.$api.userManage(data)
                .then(res => {
                  this.tableData = res.data;
                  this.total = res.total ;
                })
       },
       deleteRow(data,val){
         switch (val){
          case 1:
              this.$store.dispatch("update",data)
              this.dialogVisible = true ;
              this.$router.push("/changeNewly")
              bus.$emit("path","/client")
          break;
          case 2:
              this.$store.dispatch("update",data)
              this.dialogVisible = true ;
              this.$router.push("/newly")
              bus.$emit("path","/client")
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