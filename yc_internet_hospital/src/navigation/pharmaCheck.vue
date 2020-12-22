<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="Index_flex_  display">
              <span class="title">状态</span>
               <el-select v-model="status" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
          </div>
          <div class="Index_flex_  display">
              <span class="title">手机号</span>
               <el-input v-model="mobile" type="number" placeholder="请输入内容"></el-input>
          </div>
          <div class="marginLeft">
              <el-button type="primary" round @click="tmpmtManage(0)">查询</el-button>
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
                            <span v-if="col.prop==='pharmacist_icon'">
                                <img :src="scope.row[col.prop]" alt="" srcset="" class="img" title="图片"> 
                            </span>
                            <span v-else-if="col.prop==='pharmacist_gender'">
                              {{scope.row[col.prop]=="1"?'男':scope.row[col.prop]=="2"?'女':scope.row[col.prop]=="0"?'未知性别':'未说明性别'}}
                            </span>
                            <span v-else-if="col.prop==='pharmacist_status'" :class="scope.row[col.prop]==2?'redcolor_':scope.row[col.prop]==3?'blue':''">
                          {{scope.row[col.prop]=="1"?'已通过':scope.row[col.prop]=="2"?'未审核':'驳回'}}
                            </span>
                        <!-- 正常的其他列 -->
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
                    详情
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
  </div>
</template>

<script type='text/ecmascript-6'>
import bus from '../components/bus';
  export default {
    data() {
      return {
        lazy:true,
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'pharmacist_icon', label: '照片'},
          {prop: 'pharmacist_nickname', label: '姓名'},
          {prop: 'pharmacist_id', label: '医师编号'},
          {prop: 'pharmacist_gender', label: '性别'},
          {prop: 'pharmacist_hospital', label: '所属医院'},
          {prop: 'title_name', label: '职称'},
          {prop: 'pharmacist_mobile', label: '手机号'},
          {prop: 'pharmacist_mid', label: '绑定机构编号'},
          {prop: 'pharmacist_status', label: '状态'},
        ],
        tableData:[],
        dialogFormVisible2:false,
         options: [{
          value: '1',
          label: '已通过'
        },{
          value: '2',
          label: '未审核 '
        },{
          value: '3',
          label: '驳回 '
        }],
        total:0,
        page:1,
        mobile:'',
        status:''
      }
    },
    created(){
      this.tmpmtManage(0);
    },
    methods: {
       tmpmtManage(val){
        if(val==0){
          this.page = 1;
        }
        let data = {
          status:this.status,
          mobile:this.mobile,
          page:this.page
        };
        this.$api.tmpmtManage(data)
              .then(res => {
                        this.tableData = res.data;
                        this.total = res.total;
                      }) 
      },
      handleCurrentChange(val) {//分页
        this.page = val;
        // this.orderManage();   //分页修改一次
        this.tmpmtManage()
      },
       handleClose(done) {
         this.dialogVisible = false ;
       },
       deleteRow(data,val){
        //  console.log(data,val)
         console.log(data)
         switch (val){
          case 0:
               sessionStorage.setItem("pharmacistsID",data.pharmacist_id);
               this.$store.dispatch("update",data)
               this.$router.push("/pharmaDetails")
               bus.$emit("path","/pharmaCheck")
          break;
         }
       }
      //  pManageup  提交审核操作
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
  display: inline-block;
  text-align: left;
  padding: 0px 10px;
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
.open .display{
    margin: 10px 0px;
}
.marginLeft{
    margin-left: 10px;
}
.img{
    max-width: 100%;
}
.redcolor_{
  color: #e04f56;
}
.blue{
   color:#409EFF;
}
</style>