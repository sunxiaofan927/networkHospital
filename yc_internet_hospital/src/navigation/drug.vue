<template>
  <div class="app">
      <div class="Index_app-box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="药品管理" name="first">
              <div class="Index_flex flexWarp">
                <div class="Index_flex_  display">
                    <span class="title">药品名称</span>
                    <el-input v-model="drugs_name" placeholder="请输入内容"></el-input>
                </div>
                <div>
                    <el-button type="primary" round @click="search(activeName)">查询</el-button>
                    <el-button type="success" round @click="addClick('drugsManageins')">添加药品</el-button>
                </div>
              </div>
          </el-tab-pane>
          <el-tab-pane label="给药管理" name="second">
                <el-button type="success" round class="pad_right" @click="addClick('drugsModeManageins')">添加</el-button>
          </el-tab-pane>
        </el-tabs>

        <div class="tableB">
             <el-table :data="tableData" style="width: 100%" :lazy="lazy"  v-loading="loading">
                <!-- <el-table-column align="center" type="selection"/> -->
                <el-table-column align="center"
                tooltip-effect="dark"
                  v-for="(col,index) in cols" header-row-class-name="header"
                  :prop="col.prop" :label="col.label" :key="index" :width="col.width" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                  <!-- 偏差結果 -->
                      <span v-if="col.prop==='mode_channel'">
                          {{scope.row[col.prop]=='1'?'口服':scope.row[col.prop]=='2'?'含服':scope.row[col.prop]=='3'?'嚼服':scope.row[col.prop]=='4'?'外服':'其他'}}
                      </span>
                      <span v-else>{{scope.row[col.prop]}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button
                       v-if="type==0"
                      @click.native.prevent="dele(scope.row, tableData)"
                      type="text"
                      size="small">
                      移除
                    </el-button>
                    <el-button 
                      v-if="type==0"
                      @click.native.prevent="deleteRow(scope.row, 'drugsManageup')"
                      type="text"
                      size="small">
                      编辑
                    </el-button>
                    <el-button
                    v-if="type==1"
                      @click.native.prevent="deleteRow(scope.row, 'drugsModeManageup')"
                      type="text"
                      size="small">
                      编辑
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="height">
                <el-pagination
                :hide-on-single-page="true"
                  background
                   :current-page="page"
                  @current-change="handleCurrentChange"
                  layout="prev, pager, next"
                  :total="total">
                </el-pagination>
              </div>
          </div>
        </div>
        <!-- 添加药品信息 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
          <!-- 药品管理 -->
          <div v-if="type==0">
            <div class="Index_flex_  display">
              <span class="medi_"><i style="color:red">*</i> 药品名称</span>
              <el-input v-model="form2.drugs_name" placeholder="请输入内容" maxlength="80" show-word-limit></el-input>
            </div>
            <div class="Index_flex_  display">
              <span class="medi_"><i style="color:red">*</i> 生产厂家</span>
              <el-input v-model="form2.drugs_manufacturer" placeholder="请输入内容"></el-input>
            </div>
            <div class="Index_flex_  display">
              <span class="medi_"><i style="color:red">*</i> 价格</span>
              <el-input v-model="form2.drugs_price" placeholder="请输入内容" type="number"></el-input>
            </div>
            <div class="Index_flex_  display">
              <span class="medi_"><i style="color:red">*</i> 药品规格</span>
              <el-input v-model="form2.drugs_specifications" placeholder="10 毫克*10粒"></el-input>
            </div>
            <div class="Index_flex_  display">
              <span class="medi_"><i style="color:red">*</i> 药品包装单位</span>
              <el-input v-model="form2.drugs_p_unit" placeholder="请输入内容"></el-input>
            </div>
            <div class="Index_flex_  display">
              <span class="medi_"><i style="color:red">*</i> 限用量/单位</span>
              <el-input v-model="form2.drugs_lc_unit" placeholder="请输入内容"></el-input>
            </div>
            <div class="Index_flex_  display">
              <span class="medi_"><i style="color:red">*</i> 用量</span>
              <el-input v-model="form2.drugs_d_unit" placeholder="请输入内容"></el-input>
            </div>
            <div class="Index_flex_  display">
              <span class="medi_"><i style="color:red">*</i> 药品剂型</span>
              <el-input v-model="form2.drugs_jx" placeholder="请输入内容"></el-input>
            </div>
            <div class="Index_flex_  display">
              <span class="medi_"><i style="color:red">*</i> 药品三日编号</span>
              <el-input v-model="form2.drugs_smbh" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <!-- 给药管理 -->
          <div v-if="type==1">
            <div class="Index_flex_  display">
              <span class="medi_"><i style="color:red">*</i> 给药途径</span>
              <el-select v-model="form.mode_channel" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="Index_flex_  display">
              <span class="medi_"><i style="color:red">*</i> 用法用量</span>
              <el-input v-model="form.mode_consumption" placeholder="例：1日1次"></el-input>
            </div>
            <div class="Index_flex_  display">
              <span class="medi_"><i style="color:red">*</i> 给药频次</span>
              <el-input v-model="form.mode_frequency" placeholder="例：1次1片"></el-input>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="drugsModeManageins" v-if="type==0">确 定</el-button>
            <el-button type="primary" @click="drugsModeManageins" v-if="type==1">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 删除 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible2">
          是否删除？
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false" >取 消</el-button>
            <el-button type="primary" @click="dele_()">确 定</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data() {
      return {
        input: '',
        lazy:true,
        cols:[],
        cols2:[
          {prop: 'id', label: '序号'},
          {prop: 'mode_consumption', label: '用法用量'},
          {prop: 'mode_frequency', label: '给药频次'},
          {prop: 'mode_channel', label: '给药途径'},
        ],
        cols1:[
          {prop: 'id', label: '序号'},
          {prop: 'drugs_name', label: '药品名称'},
          {prop: 'drugs_smbh', label: '药品编号'},
          {prop: 'drugs_jx', label: '分类'},
          {prop: 'drugs_manufacturer', label: '生产厂家'},
          {prop: 'drugs_price', label: '价格'},
          {prop: 'drugs_specifications', label: '规格'},
          {prop: 'drugs_p_unit', label: '单位'},
          {prop: 'drugs_lc_unit', label: '限用量'},
        ],
        tableData: [],
        activeName: 'first',
        title:"添加",
        dialogFormVisible:false,
        dialogFormVisible2:false,
        loading: true,
        type:0,
        page:1,
        total:0,
        drugs_name:'',
        form:{
          mode_channel:'',//给药途径
          mode_consumption:"",//用法用量
          mode_frequency:'',//给药评率
          id:''
        },
        form2:{},
        options:[
          {
            value :'1',
            label :'口服',
          },{
            value :'2',
            label :'含服',
          },{
            value :'3',
            label :'嚼服',
          },{
            value :'4',
            label :'外服',
          },{
            value :'5',
            label :'其他',
          },
        ],
        typetitle:'',
        dataBase:'',
      }
    },watch:{
      typetitle(val){
        this.typetitle = val;
      }
    }
    ,created(){
      this.cols = this.cols1;
      this.setTime();
      this.drugsManage(0);
    },methods: {
      drugsModeManage(val){//给药管理
        if(val==0){
          this.page = 1;
        }
        let data = {
          page : this.page
        };
        this.$api.drugsModeManage(data)
              .then(res => {
                this.tableData = res.data;
                this.total=res.total;
              }) 
      },
      drugsManage(val){//药品管理
        if(val==0){
          this.page = 1;
        }
        let data = {
          drugs_name : this.drugs_name,
          page : this.page
        };
        this.$api.drugsManage(data)
              .then(res => {
                this.tableData = res.data;
                this.total=res.total;
              }) 
      },
      drugsModeManageins(){//添加给药
          let data ,api= this.typetitle,type = this.activeName;
          if(type =='first'){
              data = this.form2;
              data.dataid  = data.id;
          }else{
              data = {
                mode_channel : this.form.mode_channel,
                mode_consumption : this.form.mode_consumption,
                mode_frequency : this.form.mode_frequency,
                dataid: this.form.id,
              };
          }
          if(data.mode_channel == ''){
              this.$message('给药途径不能为空');
              return false;
          }
          if(data.mode_consumption == ''){
              this.$message('用法用量不能为空');
              return false;
          }
          if(data.mode_frequency == ''){
              this.$message('给药频次不能为空');
              return false;
          }
          this.$api[api](data)
            .then(res => {
              this.dialogFormVisible = false
              if(type=="first"){
                this.drugsManage(1);
              }else{
                this.drugsModeManage(1);
              }
            }) 
      },
      search(val){//搜索
        if(val=="first"){
          this.drugsManage(0);
        }else{
          this.drugsModeManage(0);
        }
      },
      handleCurrentChange(val){//分页
        this.page = val ;
        let index = this.activeName ;
        if(index=="first"){
          this.drugsManage(1);
        }else{
          this.drugsModeManage(1);
        }
      },
      handleClick(tab, event){//切换tab
        this.loading = true;
        this.page = 1;
        this.type = tab.index;
        if(tab.index=="0"){
          this.drugsManage(0);
          this.cols = this.cols1;
        }else{
          this.drugsModeManage();
          this.cols = this.cols2;
        }
        this.setTime();
      },
      addClick(api,type){//店家添加
          Object.assign(this.$data.form,this.$options.data().form)
          this.form2  ={};
          this.dialogFormVisible =  true;
          this.typetitle = api;
          this.title = "添加";
      },
      deleteRow(val , api){//编辑
        this.title = "修改";
        if(this.activeName=='first'){
         this.form2 = JSON.parse(JSON.stringify(val));
        }else{
          this.form = JSON.parse(JSON.stringify(val));
        }
        this.dialogFormVisible =  true;
        this.typetitle = api;
      },
      dele(val,item){//删除弹框
      this.title = "移除";
        this.dialogFormVisible2 =  true;
        this.dataBase = val;
      },
      dele_(){//删除给药管理
         let data = {
          dataid : this.dataBase.id,
          type:8
        };
        this.$api.evaluateup(data)
              .then(res => {
                this.dialogFormVisible2 =  false;
                    this.drugsManage(1);
              })
        },
        setTime(){
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      }
  }
</script>

<style scoped type='text/css'>
.medi_{
  display: inline-block;
  width: 200px;
}
/deep/ .pad_right{
  margin-left: 10px;
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
    padding: 10px;
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
/deep/ .el-tabs__header{
    padding: 20px!important;
    box-sizing: border-box;
}
</style>