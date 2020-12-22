<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="Index_flex_  display">
              <span class="title">药店名称</span>
               <el-select v-model="m_userid" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.m_name"
                    :label="item.m_name"
                    :value="item.m_name">
                    </el-option>
                </el-select>
          </div>
          <div class="marginLeft">
              <el-button type="primary" round @click="axios(0)">查询</el-button>
              <el-button type="success" round @click="deleteRow(0, 2)">新增</el-button>
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
                      <span v-if="col.prop==='m_icon'">
                          <img :src="scope.row[col.prop]" alt="" srcset="" class="img" title="图片"> 
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
                   {{scope.row["user_status"]=="1"?"正常":"封禁"}}
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
      <!-- 禁用 -->
      <el-dialog title="修改" :visible.sync="dialogFormVisible2">
        是否修改状态？
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
        lazy:true,
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'm_name', label: '药店名称'},
          {prop: 'user_account', label: '药店账号'},
          {prop: 'm_type', label: '药店类型'},
          {prop: 'm_address', label: '药店地址'},
          {prop: 'm_mobile', label: '药店电话'},
          {prop: 'm_icon', label: '药店图标'},
          {prop: 'm_introduction', label: '药店简介'},
        ],
        m_userid: '',
        tableData: [],
        dialogFormVisible2:false,
         options: [],
        total:0,
        page:1,
        dataID:'',
        json:{},
      }
    },
    created(){
      this.axios(0);
      this.mInfoList();
    },
    methods: {
      dele(){
          let data = {
            userid:this.json.m_userid
          };
          this.$api.prohibitUser(data)
                .then(res => {
                  this.axios(0);
                  this.dialogFormVisible2 = false ;
                }) 
      },
       axios(val){
         if(val=='0'){
           this.page= 1;
         }
          let data = {
            mname  :this.m_userid,
            page:this.page,
          };
          this.$api.mManage(data)
                .then(res => {
                  this.tableData = res.data;
                  this.total = res.total;
                }) 
       },
       mInfoList(){
          let options = this.$store.state.mInfoList;
          if(!options){
            let data = {};
            this.$api.mInfoList(data)
                  .then(res => {
                    this.options = res.data;
                  })
          }else{
            this.options = options;

          }
       },
       handleCurrentChange(val) {
         this.page = val;
         this.axios('1');
       },
       deleteRow(data,val){
         switch (val){
          case 1:
              this.$router.push("/ChangeDrugStore")
              bus.$emit("path","/drugstore")
              this.$store.dispatch("update",data)
              this.$store.dispatch("type",'0')
          break;
          case 2:
              this.$router.push("/ChangeDrugStore")
              bus.$emit("path","/drugstore")
              this.$store.dispatch("update",data)
              this.$store.dispatch("type",'1')
          break;
          case 0:
              this.dialogFormVisible2 = true ;
              this.json = data;
              console.log( this.json)
              // this.dataID = data;
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
  max-width:100%;
}
</style>