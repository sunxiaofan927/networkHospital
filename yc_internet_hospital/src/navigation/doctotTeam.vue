<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="Index_flex_  display">
              <span class="title">团队名称</span>
              <el-input v-model="team_name" placeholder="请输入内容"></el-input>
          </div>
          <div>
              <el-button type="primary" round @click="axios(0)">查询</el-button>
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
                      <span v-if="col.prop==='list'">
                        <a v-for="(item ,index) in scope.row['list']" :key="index" >
                          <span v-if="item.doctorName">
                            {{item.doctorName}},
                          </span>
                        </a>
                         
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
                    {{scope.row['team_status']=="1"?'正常':'禁用'}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="height">
              <el-pagination
              :hide-on-single-page="value"
                background
                @current-change="handleCurrentChange"
                  :current-page="page"
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
        </div>
      </div>
      <!-- 禁用 -->
      <el-dialog :title="title" :visible.sync="dialogFormVisible2">
        是否修改状态？
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
        title:'',
        team_name: '',//角色名称
        lazy:true,
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'team_name', label: '团队名称'},
          {prop: 'doctor_nickname', label: '创建人'},
          {prop: 'team_title_level', label: '职称'},
          {prop: 'team_context', label: '团队简介'},
          {prop: 'team_field', label: '擅长'},
          {prop: 'department1_name', label: '科室'},
          {prop: 'list', label: '成员'},
          {prop: 'team_time', label: '创建时间'},
        ],
        value: '',
        tableData: [],
        dialogFormVisible2:false,
        data: "",
        page:1,
        total:0,
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
         if(val== 0){
           this.page = 1 ;
         }
          let data = {
            page :this.page,
            teamname:this.team_name,
          } ;
          this.$api.teamManage(data)
                .then(res => {
                    this.tableData =  res.data;
                    this.total = res.total ;
                })
       },
       handleClose(done) {
         this.dialogVisible = false ;
       },
       dele(){
          let data = {
            teamid: this.dataBase.id,
          };
          this.$api.prohibitTeam(data)
                .then(res => {
                  this.dialogFormVisible2 =  false;
                  this.axios(1);
                })
       },
       deleteRow(data,val){
         switch (val){
          case 1:
              this.dialogVisible = true ;
              this.data = [this.data_[0]];
          break;
          case 2:
              this.dialogVisible = true ;
              this.data =  this.data_;
          break;
          case 0:
            this.title ="修改"
              this.dialogFormVisible2 = true ;
              this.dataBase = data;
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
.spanMun{
  padding: 5px 10px;
  box-sizing: border-box;
}
.span_{
      padding: 5px;
        background: rgb(224, 195, 65);
    color: #fff!important;
    box-sizing: border-box;
    display: block;
    width: auto;
    border-radius: 15px;
    margin: 5px;
}
</style>