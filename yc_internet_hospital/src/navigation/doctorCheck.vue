<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="Index_flex_  display">
              <span class="title">状态</span>
               <el-select v-model="value" placeholder="请选择">
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
               <el-input v-model="number" type="number" placeholder="请输入内容"></el-input>
          </div>
          <div class="marginLeft">
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
                            <span v-if="col.prop==='doctor_icon'">
                                <img :src="scope.row[col.prop]" alt="" srcset="" class="img" title="图片"> 
                            </span>
                            <span v-else-if="col.prop==='doctor_gender'">
                              {{scope.row[col.prop]=='1'?'男':scope.row[col.prop]=='0'?"未知性别":scope.row[col.prop]=='2'?'女':'未说明性别'}}
                            </span>
                            <span v-else-if="col.prop==='doctor_status'" :class="scope.row[col.prop]==2?'redcolor_':scope.row[col.prop]==3?'blue':''">
                              {{scope.row[col.prop]=='0'?'未认证':scope.row[col.prop]=='1'?'已通过':scope.row[col.prop]=='2'?'未审核':'驳回'}}
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
          {prop: 'doctor_icon', label: '照片'},
          {prop: 'doctor_nickname', label: '医生'},
          {prop: 'doctor_id', label: '医师编号'},
          {prop: 'doctor_gender', label: '性别'},
          {prop: 'doctor_hospital', label: '所属医院'},
          {prop: 'department1name', label: '一级科室'},
          {prop: 'department2name', label: '二级科室'},
          {prop: 'title_name', label: '职称'},
          {prop: 'doctor_mobile', label: '手机号'},
          {prop: 'doctor_status', label: '状态'},
          {prop: 'doctor_stime', label: '提交时间'},
        ],
        value: '',//状态
        number: '',//number手机号
        total:0,
        page:1,
        currentPage:1,
        tableData: [],
         options: [{
          value: '0',
          label: '未认证'
        },{
          value: '1',
          label: '已通过'
        },{
          value: '2',
          label: '未审核'
        },{
          value: '3',
          label: '驳回'
        }],
      }
    },
    created(){
      this.axios(0);
    },

    methods: {
       axios(val){
        if(val==0){
          this.currentPage = 1;
        }
        let data = {
          mobile:this.number ,
          status :this.value ,//医院名称
          page:this.currentPage,  
        };
        this.$api.doctorManage(data)
          .then(res =>{
            this.tableData = res.data;
            this.total = res.total;
            })
       },
       handleCurrentChange(val){
         this.currentPage = val;
         this.axios(1);
       },
       deleteRow(data,val){
         switch (val){
          case 0:
               this.$store.dispatch("update",data)
               this.$router.push("/doctorDetails")
               bus.$emit("path","/doctorCheck")
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
/* .opacity{
  position: absolute;
  z-index: -2;
  top: -1000px;
} */
.redcolor_{
  color: #e04f56;
}
.blue{
   color:#409EFF;
}
</style>