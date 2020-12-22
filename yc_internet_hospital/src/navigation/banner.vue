<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div>
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
                      <span v-if="col.prop==='banner_picture'">
                          <img :src="scope.row[col.prop]" alt="" srcset="" class="img" title="图片"> 
                      </span>
                      <span v-else-if="col.prop==='banner_zs_status'">
                          {{scope.row['banner_type']=='1'?'展示':'未展示'}}
                      </span>
                      <span v-else-if="col.prop==='banner_type'">
                          {{scope.row['banner_type']=='1'?'全部':scope.row['banner_type']=='2'?'患者':'医生'}}
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
          {prop: 'id', label: '序号'},
          {prop: 'banner_type', label: '显示端'},
          {prop: 'banner_picture', label: 'banner图片'},
          {prop: 'banner_url', label: '跳转链接'},
          {prop: 'banner_zs_status', label: '展示状态'},
          {prop: 'banner_uptime', label: '更新日期'},
        ],
        value: '',
        tableData: [],
        dialogFormVisible2:false,
        data: "",
        total:0,
        page:1,
        json:'',
      }
    },
    created(){
      this.axios(0);
    },
    methods: {
        axios(val){
         if(val==0){
           this.page = 1;
         }
        let data = {
          version_title  : this.version_title,
          page : this.page
        };
        this.$api.selectAllBanner(data)
              .then(res => {
                this.tableData = res.data;
                this.total=res.total;
              })
       },
       dele(){
         let data = {
          id : this.json.id,
        };
        this.$api.deleteBanner(data)
              .then(res => {
                this.axios(0);
                this.dialogFormVisible2 = false;
              })
       },
       deleteRow(data,val){
         if(val==0){
           this.dialogFormVisible2 = true;
           this.json = data; 
         }else if(val==2){
            this.$store.dispatch("update",data)
            this.$router.push({
              path: 'addBanner',
            })
            bus.$emit("path","/banner")
         }else if(val == 1){
            this.$store.dispatch("update",data)
            this.$router.push({
              path: 'changeBanner',
            })
            bus.$emit("path","/banner")
         }

       }
    }
  }
</script>

<style scoped type='text/css'>
.img{
  width: 100%;
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