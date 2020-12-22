<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="display Index_flex_">
                <span class="title">日期</span>
                <el-date-picker
                v-model="data"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
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
                      <span v-if="col.prop==='evaluate_status'">
                        {{scope.row[col.prop]=="1"?'未屏蔽':"已屏蔽"}}
                      </span>
                      <span v-else-if="col.prop==='tag'">
                          <div class="divBox">
                              <div class="divC_" :class="{color:scope.row['evaluate_label1']=='1'}">医师专业</div>
                              <div class="divC_" :class="{color:scope.row['evaluate_label2']=='1'}">接诊神速</div>
                              <div class="divC_" :class="{color:scope.row['evaluate_label3']=='1'}">热情亲切</div>
                              <div class="divC_" :class="{color:scope.row['evaluate_label4']=='1'}">经验丰富</div>
                              <div class="divC_" :class="{color:scope.row['evaluate_label5']=='1'}">认真负责</div>
                              <div class="divC_" :class="{color:scope.row['evaluate_label6']=='1'}">医疗建议</div>
                          </div>
                      </span>
                      <span v-else>{{scope.row[col.prop]}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.row,1)"
                      type="text"
                      size="small">
                      {{scope.row["evaluate_status"]=="1"?'未屏蔽':"屏蔽"}}
                    </el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.row,2)"
                      type="text"
                      size="small">
                      删除
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
      <el-dialog :title="title" :visible.sync="dialogVisible">
        是否{{title}}？
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dele">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data() {
      return {
        input: '',//版本名称
        lazy:true,
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'user_nickname', label: '评价人'},
          {prop: 'evaluate_level', label: '级别'},
          {prop: 'evaluate_time', label: '评价时间'},
          {prop: 'tag', label: '评价标签'},
          {prop: 'evaluate_context', label: '评价内容'},
          {prop: 'evaluate_status', label: '评论状态'},
        ],
        tableData: [],
        dialogVisible:false,
        data: [],
        title:'删除',
        total:0,
        page:1,
        json:'',
        dataID:'',
      }
    },
    created(){
      this.axios(1);
    },
    methods: {
      dele(){
         let data_ = {
            type:this.json,
             dataid:this.dataid.id
        };
        this.$api.evaluateup(data_)
                .then(res => {
                 this.axios(1);
                          this.dialogVisible = false ;

                })
      },
       axios(val){
         if(val==0){
           this.page = 1;
         }
        let data_ = {
          docid:this.$store.state.json.doctor_id,
          startime:this.data[0],
          stoptime:this.data[1],
          page:this.page
        };
        this.$api.docEvaluate(data_)
                .then(res => {
                  this.tableData = res.data;
                  this.total = res.total;
                })
       },
       handleCurrentChange(val){
         this.page = val;
         this.axios(1);
       },
       deleteRow(data,val){
         this.json = val;
         this.dataid= data;
         this.dialogVisible = true ;
         if(val == "1"){
            this.title = "屏蔽";
         }else if(val=="2"){
            this.title = "删除";
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
/deep/ .el-dialog__body span{
  font-size: 20px!important;
}
.divBox{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.divC_{
 
  padding: 5px 10px;
  border-radius: 5px;
  margin: 2px;
  border: 1px solid rgb(224, 195, 65);
}
.color{
  border: 1px solid rgb(224, 195, 65);
  background: rgb(224, 195, 65);
  color: #fff!important;
}
</style>