<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="Index_flex_  display">
              <span class="title">一级科室名称</span>
              <el-select v-model="firstDepartmentId" placeholder="请选择">
                    <el-option
                    v-for="item in firstDepartment_"
                    :key="item.id"
                    :label="item.department1_name"
                    :value="item.id">
                    </el-option>
                </el-select>
              <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
          </div>
          <div class="Index_flex_  display">
              <span class="title">二级科室名称</span>
              <el-input v-model="sname" placeholder="请输入内容"></el-input>
          </div>
          <div class="leftMargin">
              <el-button type="primary" round @click="axios2(0)">查询</el-button>
              <!-- <el-button type="success" round @click="deleteRow(0, 2)">新增</el-button> 暂时隐藏 -->
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
                      <span v-if="col.prop==='hos'">
                          {{'北京怡成互联网医院'}}
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
                      {{scope.row['department2_status']=='1'?'正常':'封禁'}}
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
                :current-page="page"
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
        </div>
      </div>
      <!-- 添加 -->
      <el-dialog title="添加" :visible.sync="dialogFormVisible">
        <div class="open">
            <div class="Index_flex_  display">
              <span class="title"><i style="color:red">*</i> 科室名称</span>
              <el-input v-model.trim ="form.department2_name" placeholder="请输入内容"></el-input>
            </div>
            <div class="Index_flex_  display">
              <span class="title"><i style="color:red">*</i> 一级科室名称</span>
              <el-select v-model="form.department2_d1id" placeholder="请选择">
                    <el-option
                    v-for="item in firstDepartment_"
                    :key="item.id"
                    :label="item.department1_name"
                    :value="item.id">
                    </el-option>
                </el-select>
              <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
          </div>
            <div class="Index_flex_  display">
                <span class="title"><i style="color:red">*</i> 描述</span>
                <el-input
                    type="textarea"
                    rows = 4
                    placeholder="请输入内容"
                    v-model.trim="form.department2_remarks">
                 </el-input>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confim()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 禁用 -->
      <el-dialog title="更改状态" :visible.sync="dialogFormVisible2">
        是否更改？
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
        lazy:true,
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'hos', label: '医院'},
          {prop: 'department1_name', label: '一级科室'},
          {prop: 'department2_name', label: '二级科室'},
          {prop: 'department2_time', label: '创建时间'},
          {prop: 'department2_remarks', label: '备注'},
        ],
        textarea1:"",
        tableData: [],
        dialogFormVisible:false,
        dialogFormVisible2:false,
        page:1,
        total:0,
        firstDepartment_:[],
        firstDepartmentId:'',
        form:{
          department2_name:'',
          department2_remarks:'',
          department2_d1id:'',
        },  
        sname:'',
        type:'1',
        dataBase:'',
      }
    },
    created(){
      this.axios2(0);
      this.firstDepartment();
    },
    methods: {
      
      confim(){
        let data,api;
        if(this.type=='2'){
              data = this.form;
              api = 'sdManageins';
        }else{
            data = this.form;
            data.dataid = data.id;
            if(data.department2_name==null||data.department2_name==''){
              this.$message('科室名称不能为空');
              return false;
            }
            if(data.department2_remarks == null||data.department2_remarks==''){
              this.$message('科室描述不能为空');
              return false;
            }
            api = 'sdManageup';
        }
        this.$api[api](data)
            .then((res)=>{
              this.dialogFormVisible = false ;
              this.axios2(1);
            })
      },
      dele(){
        let data = {
          dataid : this.dataBase.id,
          type:5
        };
        this.$api.evaluateup(data)
              .then(res => {
                this.dialogFormVisible2 =  false;
                this.axios2(1);
              })
      },
      firstDepartment(){
        let firstDepartment_ = this.$store.state.firstDepartment ;
        if(!firstDepartment_){
            let data = {};
            this.$api.firstDepartment(data)
                  .then(res => {
                    this.firstDepartment_ = res.data;
                  })
        }else{
          this.firstDepartment_ = firstDepartment_;
        }
       },
       axios2(val){
        if(val==0){
          this.page = 1;
        }
        let data = {
          fid:this.firstDepartmentId,
          sname:this.sname,
          page:this.page,
        };
        this.$api.sdManage(data)
              .then(res => {
                        this.tableData = res.data;
                        this.total = res.total;
                      }) 
       },
       handleCurrentChange(val) {//分页
        this.page = val;
        this.axios2(1);
      },
       deleteRow(data,val){
         switch (val){
          case 1:
            this.type = '1';
            this.form = JSON.parse(JSON.stringify(data));
            this.dialogFormVisible = true ;
          break;
          case 2:
            this.type = '2';
            Object.assign(this.$data.form,this.$options.data().form)
            this.dialogFormVisible = true ;
          break;
          case 0:
              this.dialogFormVisible2 = true ;
              this.dataBase = data ;
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
  padding: 0px 10px;
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
/deep/.display .el-input__inner{
    width: 100%;
}

/deep/.display .el-input{
    flex: 1;
}
/deep/.display .el-select{
    flex: 1;
}
/deep/ .el-dialog__body span{
  font-size: 20px!important;
}
.el-textarea{
    flex: 1;
}
.leftMargin{
    margin-left: 10px;
}
.open span{
    width: 120px;
}
.open .display{
    margin: 10px 0px;
}
</style>