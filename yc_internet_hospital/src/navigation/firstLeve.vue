<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="Index_flex_  display">
              <span class="title">一级科室名称</span>
              <!-- <el-select v-model="firstDepartmentId" placeholder="请选择">
                    <el-option
                    v-for="item in firstDepartment_"
                    :key="item.id"
                    :label="item.department1_name"
                    :value="item.id">
                    </el-option>
                </el-select> -->
              <el-input v-model="firstDepartmentId" placeholder="请输入内容"></el-input>
          </div>
          <div>
              <el-button type="primary" round @click="search">查询</el-button>
              <!-- <el-button type="success" round @click="deleteRow(0, 2)">新增</el-button>  暂时隐藏 -->
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
                      <span v-if="col.prop==='department1_logo'">
                          <img :src="scope.row[col.prop]" alt="" srcset="" class="img" title="图片"> 
                          <!-- {{scope.row[col.prop]=='1'?'正常':'封禁'}} -->
                      </span>
                      <span v-else-if="col.prop==='hos'">
                          {{'北京怡成互联网医院'}}
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
                    {{scope.row['department1_status'] ==1?'正常':'封禁'}}
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
                layout="prev, pager, next"
                :current-page="page"
                :total="total">
              </el-pagination>
            </div>
        </div>
      </div>
      <!-- 添加 -->
      <el-dialog title="添加" :visible.sync="dialogFormVisible">
        <div>
            <div class="Index_flex_  display">
              <span class="title"><i style="color:red">*</i>科室名称</span>
              <el-input v-model="form.department1_name" placeholder="请输入内容"></el-input>
            </div>
            <div class="Index_flex_  display uploadImg">
                <span class="title"><i style="color:red">*</i>上传图片</span>
                <el-upload
                class="avatar-uploader"
                  action=""
                  :http-request="upLoad_"
                  :show-file-list="false"
                  accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.department1_logo" :src="form.department1_logo" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="Index_flex_  display">
                <span class="title"><i style="color:red">*</i> 描述</span>
                <el-input
                    type="textarea"
                    rows = 4
                    placeholder="请输入内容"
                    v-model="form.department1_remarks">
                 </el-input>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dele()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 禁用 -->
      <el-dialog title="更改状态" :visible.sync="dialogFormVisible2">
        是否更改？
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="confirm()">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import Qs from 'qs';
  export default {
    data() {
      return {
        lazy:true,
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'hos', label: '医院'},
          {prop: 'department1_logo', label: '图片'},
          {prop: 'department1_name', label: '科室'},
          {prop: 'department1_remarks', label: '描述'},
        ],
        textarea1:"",
        tableData: [],
        dialogFormVisible:false,
        dialogFormVisible2:false,
        total:0,
        page:1,
        firstDepartment_:[],
        firstDepartmentId:'',
        form:{
          department1_name:'',
          department1_logo:'',
          department1_remarks:'',
        },
        type:'1',
        dataBase:'',
      }
    },
    created(){
      this.axios(0);
    },
    methods: {
       handleCurrentChange(val) {//分页
        this.page = val;
        this.axios(1);
      },
      search(){
          this.page = 1;
          this.axios(0);
      },
      dele(){
        let data ,api;
        if(this.type=='2'){
              data = {
                department1_name:this.form.department1_name ,
                department1_remarks:this.form.department1_remarks ,
                department1_logo:this.form.department1_logo ,
              };
              
              api = 'fdManageins';
        }else{
            data = this.form;
            data.dataid = data.id;
            if(data.department1_name==null||data.department1_name==''){
              this.$message('科室名称不能为空');
              return false;
            }
            if(data.department1_logo == null||data.department1_logo==''){
              this.$message('科室logo不能为空');
              return false;
            }
            if(data.department1_remarks == null||data.department1_remarks==''){
              this.$message('科室描述不能为空');
              return false;
            }
            
            api = 'fdManageup';
        }
        this.$api[api](data)
            .then((res)=>{
              this.dialogFormVisible = false ;
              this.axios(1);
            })
      },
      upLoad_(file) { //上传
        this.getBase64(file.file).then(res => {
            this.axiosUpload_(res);
        });
      },
      confirm(){
        let data = {
          dataid : this.dataBase.id,
          type:'4'
        };
        this.$api.evaluateup(data)
              .then(res => {
                this.dialogFormVisible2 =  false;
                this.axios(1);
              })
      },
      getBase64(file) {//base64 格式装换
            return new Promise(function(resolve, reject) {
              let reader = new FileReader();
              let imgResult = "";
              reader.readAsDataURL(file);
              reader.onload = function() {
                imgResult = reader.result;
              };
              reader.onerror = function(error) {
                reject(error);
              };
              reader.onloadend = function() {
                resolve(imgResult);
              };
          });
      },
       beforeAvatarUpload(file) {
       const isLt2M = file.size / 1024 / 1024 < 0.2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      axiosUpload_(res){//上传图片
        let data ={
            filestr:res,
        }
        this.$api.upLoad(data).then((res) => {
          if (res.code == '200'  ) {
            this.form.department1_logo = res.icon; // 请求成功之后赋给头像的URL
          }
        });
       },
       axios(val){
         if(val == 0){
            this.page = 1;
         }
         let data = {
            fname: this.firstDepartmentId,
            page : this.page 
         };
         this.$api.fdManage(data)
              .then(res => {
                this.tableData = res.data;
                this.total = res.total;
              }); 
       },
       handleClose(done) {
         this.dialogVisible = false ;
       },
       deleteRow(data,val){
         switch (val){
          case 1:
            this.type ='1';
            this.form = JSON.parse(JSON.stringify(data));
            this.dialogFormVisible = true ;
          break;
          case 2:
            this.type = '2';
            this.dialogFormVisible = true ;
            Object.assign(this.$data.form, this.$options.data().form)
          break;
          case 0:
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
  display: inline-block;
  text-align: left;
  padding: 0px 10px;
  width: 120px;
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
.img{
  /* max-width: 100%; */
  width: 100px;
}
.avatar{
  width: 200px;
}
/deep/.display .el-input{
  flex: 1;
}
/deep/.display .el-input .el-input__inner{
  width: 100%!important;
}
.avatar-uploader-icon{
  font-size: 50px;/*no*/
}
</style>