<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="Index_flex_">
            <span class="title">患者</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="Index_flex_">
             <span class="title">在院状态</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
              <el-button type="primary" round>查询</el-button>
              <el-button type="success" round>新增患者</el-button>
          </div>
        </div>
        <div class="tableB">
          <el-table :data="tableData" style="width: 100%" :lazy="lazy">
                <el-table-column align="center"
                  v-for="(col,index) in cols" header-row-class-name="header"
                  :prop="col.prop" :label="col.label" :key="index" :width="col.width" :show-overflow-tooltip="true">
                  <!-- <template slot-scope="scope">
                    <span v-if="col.prop==='bd_work_status'" @click="changeCheakIn(scope.$index,scope.row,tableData)" title="点击修改" class="changeCheakIn">
                      {{scope.row.bd_work_status === "1" ? '在职' :'离职'}}
                    </span>
                    <span v-else>{{scope.row[col.prop]}}</span>
                  </template> -->
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, tableData)"
                      type="text"
                      size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="height">
                <el-pagination
                :hide-on-single-page="value"
                  background
                  layout="prev, pager, next"
                  :total="total">
                </el-pagination>
              </div>
              
          </div>
      </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data() {
      return {
        value: false,
        lazy:true,
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'username', label: '姓名'},
          {prop: 'code_code', label: '住院号'},
          {prop: 'code_addtime', label: '床号'},
          {prop: 'code_outtime', label: '性别'},
          {prop: 'code_status', label: '身高'},
          {prop: 'id', label: '体重'},
          {prop: 'username', label: '诊断'},
          {prop: 'code_code', label: '入院日期'},
        ],
        value: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }],
        total:0,
      }
    },methods: {
      
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
</style>