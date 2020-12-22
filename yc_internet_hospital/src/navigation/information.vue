<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="Index_flex_  display">
              <span class="title">公告标题</span>
              <el-input v-model="msg_message" placeholder="请输入内容"></el-input>
          </div>
          <div>
              <el-button type="primary" round @click="axios(0)">查询</el-button>
              <el-button type="success" round @click="deleteRow(0, 2)">发布公告</el-button>
          </div>
        </div>
        <div class="tableB">
          <el-table :data="tableData" style="width: 100%" :lazy="lazy">
                <!-- <el-table-column align="center" type="selection"/> -->
                <el-table-column align="center"
                tooltip-effect="dark"
                  v-for="(col,index) in cols" header-row-class-name="header"
                  :prop="col.prop" :label="col.label" :key="index" :width="col.width" :show-overflow-tooltip="true">
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
                :hide-on-single-page="value"
                  background
                      :current-page="page"
                  @current-change="handleCurrentChange"
                  layout="prev, pager, next"
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
        input: '',//角色名称
        lazy:true,
        cols:[
          {prop: 'msg_message', label: '公告标题'},
          {prop: 'msg_createtime', label: '创建时间'},
          {prop: 'msg_uptime', label: '更新时间'},
        ],
        value: '',
        tableData: [],
        dialogFormVisible2:false,
        data: "",
        total:0,
        page:1,
        msg_message:'',
        json:{},
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
       axios(val){  
         if(val==0){
           this.page = 1;
         }
        let data = {
          msg_message: this.msg_message  ,
          page : this.page
        };
        this.$api.msgInfo(data)
              .then(res => {
                this.tableData = res.data;
                this.total=res.total;
              }) 
       },
      
       deleteRow(data,val){
         switch (val){
          case 1:
              this.$store.dispatch("update",data)
              this.$router.push({
                path: 'changePublish',
              })
              bus.$emit("path","/information")
          break;
          case 2:
            this.$router.push({
              path: 'publish',
            })
            bus.$emit("path","/information")
          break;
          case 0:
            this.title ="删除"
            this.dialogFormVisible2 = true ;
            this.json = data;
          break;
         }
       },dele(){
          let data = {
            dataid: this.json.id,
            type : '6'
          };
          this.$api.evaluateup(data)
                .then(res => {
                  this.dialogFormVisible2 = false ;
                  this.axios(1);
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