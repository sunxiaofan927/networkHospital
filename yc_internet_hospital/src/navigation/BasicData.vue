<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp flexAdd">
          <h4>协议列表</h4>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="Basic" circle class="btnAdd" v-if="tableData.length<4"></el-button>
        </div>
        <div class="tableB">
          <el-table :data="tableData" style="width: 100%" :lazy="lazy">
                <!-- <el-table-column align="center" type="selection"/> -->
                <el-table-column align="center"
                  tooltip-effect="dark"
                  v-for="(col,index) in cols" header-row-class-name="header"
                  :prop="col.prop" :label="col.label" :key="index" :width="col.width" :show-overflow-tooltip="true">
                  <!-- <template slot-scope="scope">
                        <span v-if="col.prop==='a_name'">
                            {{basicData[scope.$index]}} 
                        </span>
                        <span v-else>{{scope.row[col.prop]}}</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.row,scope.$index)"
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
  </div>
</template>

<script type='text/ecmascript-6'>
import bus from '../components/bus';
  export default {
    data() {
      return {
        input: '',//版本名称
        lazy:true,
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'a_name', label: '协议名称'},
          {prop: 'a_instime', label: '协议添加时间'},
          {prop: 'a_context', label: '协议介绍'},
          {prop: 'a_uptime', label: '更改时间'},
        ],
        value: '',
        tableData: [],
        total:0,
        page:1,
      }
    },
    created(){
      this.axios();
    },
    methods: {
      handleCurrentChange(val){
        this.page = val;
        this.axios();
      },
       axios(){
        let data = {
          page:this.page,
        };
        this.$api.agreementInfo(data)
              .then(res => {
                this.tableData = res.data;
                this.total=res.total;
              }) 
       },
       Basic(){
          this.$router.push("/addBasicData")
          bus.$emit("path","/BasicData")
          this.$store.dispatch("cookie_",this.tableData.length+1)
       },
       deleteRow(data,index){
        data.custom_0 = data.a_name;
        this.$store.dispatch("update",data)
        this.$router.push("/changeBasicData")
        bus.$emit("path","/BasicData")
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
.flexAdd{
  align-items: center;
}
.btnAdd{
  margin-left: 10px;
}
</style>