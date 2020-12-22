<template>
    <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <div class="Index_flex_  display">
              <span class="title">医院名称</span>
              <el-input v-model="hospitalname" placeholder="请输入内容"></el-input>
          </div>
          <div class="Index_flex_">
            <span class="title">一级科室</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.department1_name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="Index_flex_">
            <span class="title">二级科室</span>
            <el-select v-model="value2" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.department2_name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="Index_flex_">
            <span class="title">医师状态</span>
            <el-select v-model="status" placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="Index_flex_  display">
              <span class="title">医师姓名</span>
              <el-input v-model="username" placeholder="请输入内容"></el-input>
          </div>
          <div class="Index_flex_  display">
              <span class="title">手机号</span>
              <el-input v-model="mobile" placeholder="请输入内容"></el-input>
          </div>   
          <div class="Index_flex_  display">
              <span class="title">医师编号</span>
              <el-input v-model="doctorid" placeholder="请输入内容"></el-input>
          </div>       
          <div>
              <el-button type="primary" round @click="axios3(0)">查询</el-button>
              <el-button type="success" round @click="deleteRow(0, 5)">常用语设置</el-button>
              <el-button type="success" round @click="deleteRow(0, 6)">添加医师</el-button>
              <!-- <el-button type="success" round @click="href">评级管理</el-button> -->
          </div>
        </div>
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
                          {{scope.row[col.prop]=="1"?'男':"女"}}
                      </span>
                      <span v-else-if="col.prop==='doctor_status'">
                          {{scope.row[col.prop]=="0"?'未认证':scope.row[col.prop]=="1"?'已通过':scope.row[col.prop]=="2"?'未审核':"驳回"}}
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
                      @click.native.prevent="deleteRow(scope.row, 1)"
                      type="text"
                      size="small">
                      详情
                    </el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.row, 2)"
                      type="text"
                      size="small">
                        {{scope.row['user_status']=='1'?'正常':'禁用'}}
                    </el-button>
                    <el-button  size="small" type="text" @click.native.prevent="href(scope.row)">评级管理</el-button>
                    <el-button
                      @click.native.prevent="deleteRow(scope.row, 3)"
                      type="text"
                      size="small">
                      查看评价
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
         <div class="height">
            <el-pagination
              :hide-on-single-page="true"
              background
              :current-page="currentPage"
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
      </div>
      <!-- 常用语设置 -->
      <el-dialog title="常用语设置" :visible.sync="dialogTableVisible">
        <div class="app_view">
          <div class="Index_flex_  display ">
              <span class="title">常用语1：</span>
              <el-input v-model="clDocInfo_.cl_1" placeholder="请输入内容"></el-input>
          </div>
          <div class="Index_flex_  display ">
              <span class="title">常用语2：</span>
              <el-input v-model="clDocInfo_.cl_2" placeholder="请输入内容"></el-input>
          </div>
          <div class="Index_flex_  display ">
              <span class="title">常用语3：</span>
              <el-input v-model="clDocInfo_.cl_3" placeholder="请输入内容"></el-input>
          </div>
          <div class="Index_flex_  display ">
              <span class="title">常用语4：</span>
              <el-input v-model="clDocInfo_.cl_4" placeholder="请输入内容"></el-input>
          </div>
          <div class="Index_flex_  display ">
              <span class="title">常用语5：</span>
              <el-input v-model="clDocInfo_.cl_5" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="clDocup()">修 改</el-button>
        </div>
      </el-dialog>
      <!-- 禁用 -->
      <el-dialog title="更改" :visible.sync="dialogTableVisible2">
        是否更改状态?
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="changeStatus">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type='text/ecmascript-6'>
  import bus from '../components/bus';

  export default {
    data () {
      return {
        options: [],//一级科室管理
        options2: [],//二级科室管理
        options3: [{  
          value:'0',
          label:'未认证'
        },{
          value:'1',
          label:'已通过'
        },{
          value:'2',
          label:'未审核'
        },{
          value:'3',
          label:'驳回'
        }],//二级科室管理
        currentPage:1,
        total:0,
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'doctor_icon', label: '照片'},
          {prop: 'doctor_nickname', label: '姓名'},
          {prop: 'doctor_id', label: '医师编号'},
          {prop: 'doctor_gender', label: '性别'},
          {prop: 'doctor_hospital', label: '所属医院'},
          {prop: 'department1name', label: '一级科室'},
          {prop: 'department2name', label: '二级科室'},
          {prop: 'title_name', label: '职称'},
          {prop: 'doctor_mobile', label: '手机号'},
          {prop: 'evaluate_time', label: '最新评价时间'},
          {prop: 'doctor_status', label: '状态'},
        ],
        hospitalname: '',//医院名称
        doctorid:'',//医师编号
        value: '',//一级科室
        value2:'',//二级科室
        doctorid:'',//医师编号
        mobile:'',//手机号
        username:'',//医师名字
        status:'',//医师状态
        tableData: [],
        lazy:true,
        dialogTableVisible:false,
        dialogTableVisible2:false,
        gridData:'',
        input:"",
        clDocInfo_:{
          cl_1:'',
          cl_2:'',
          cl_3:'',
          cl_4:'',
          cl_5:'',
        },
        json:'',
      }
    },watch:{
      value(val){
        this.axios2(val);
      }
    },created(){
        this.axios();
        this.axios3(0);
        this.clDocInfo();
    },methods:{
      changeStatus(){
        let data = {
          userid : this.json.doctor_id
        };
         this.$api.prohibitUser(data)
                  .then(res => {
                    this.dialogTableVisible2 = false;
                    this.axios3(1);
                  })
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.axios3(1);
      },
      axios(){//一级科室
        let firstDepartment = this.$store.state.firstDepartment ;
        if(!firstDepartment){
            let data = {};
            this.$api.firstDepartment(data)
                  .then(res => {
                    this.options = res.data;
                  })
        }else{
          this.options = firstDepartment;
        }
      },
      axios2(val){//二级科室
        let data_ = {
          departId:val,
        };
        this.$api.twoDepartment(data_)
                .then(res => {
                  this.value2 = "";
                  this.options2 = res.data;
                })
      },
      axios3(val){//订单表格
      if(val==0){
          this.currentPage = 1;
        }
        // console.log(this.mobile)
        let data_ = {
          hospitalname:this.hospitalname,
          department1:this.value,
          department2:this.value2,
          username:this.username,
          mobile:this.mobile,
          doctorid:this.doctorid,
          status:this.status,
          page:this.currentPage
        };
        this.$api.doctorManage(data_)
                .then(res => {
                  this.tableData = res.data;
                  this.total = res.total;
                })
      },
      clDocInfo(){//常用语设置
        let clDocInfo = this.$store.state.clDocInfo;
        if(!clDocInfo){
          let data = {};
          this.$api.clDocInfo(data)
                  .then(res => {
                    this.clDocInfo_= res.data;
                })
        }else{
            this.clDocInfo_ = clDocInfo;
        }
      },
       clDocup(){//常用语设置
       let data =this.clDocInfo_ ;
        this.$api.clDocup(data)
                .then(res => {
                  this.dialogTableVisible = false;
              })
      },
      href(val){
        this.$store.dispatch("update",val)
        this.$router.push("/rate");
        bus.$emit("path","/informatization")
      },
      deleteRow(val,type){
        switch (type){
          case 1:
            this.$store.commit("type","0");
            this.$store.dispatch("update",val)
            this.$router.push("/particularsDetails");
            bus.$emit("path","/informatization")
            break;
          case 2:
            this.dialogTableVisible2 = true;
            this.json = val;
            break;
          case 3:
            this.$store.dispatch("update",val)
            this.$router.push("/evaluate");
            bus.$emit("path","/informatization")
            break;
          case 4:
            break;
          case 5:
            this.dialogTableVisible = true;
            break;
          case 6:
            this.$store.commit("type","1");
            this.$router.push("/particulars");
            bus.$emit("path","/informatization")
            break;
        }
      }
    }
  }
</script>

<style scoped type='text/css'>
.display{
  display: flex;
  align-items: center;
}

.title{
  display: inline-block;
  text-align: left;
  width: 80px;
  /* padding: 0px 10px; */
}
.flexWarp{
  flex-wrap: wrap;
}
  .height{
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

.app{
   width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  padding-bottom: 100px;
}
.Index_flex{
  display: flex;
    padding: 40px;
  box-sizing: border-box;
}
.Index_flex_{
  /* margin-right: 40px; */
  margin-bottom: 10px;
  padding: 0px 10px;
}
.Index_app-box{
  background:rgba(255,255,255,1);
  box-shadow:0px 1px 10px 2px rgba(227,224,224,0.5);
  border-radius:8px;
}
/deep/ .el-input__inner{
    height: 50px;
    width: 200px;
}
/deep/ .el-input{
  flex: 1;
}
.img{
  max-width:100%;
}
.app_view /deep/ .el-input__inner,.el-input{
  width: 100%;
}
.display title{
  padding: 0px 10px;
}
</style>