<template>
  <div class="app">
      <div class="Index_app-box">
        
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="订单列表" name="first" v-loading="loading">
              <div class="Index_flex flexWarp">
                <div class="Index_flex_ flex wrap">
                    <div class="flex pad_">
                      <span class="title">药品订单号</span>
                      <el-input v-model="ordernumber" placeholder="订单号"></el-input>
                    </div>
                    <div class="flex pad_">
                      <span class="title">支付手机号</span>
                      <el-input v-model="username" type="number" placeholder="请填写手机号"></el-input>
                    </div>
                    <div class="flex pad_">
                      <span class="title">订单状态</span>
                      <el-select v-model="orderstatus" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="flex pad_">
                      <span class="title">订单类别</span>
                      <el-select v-model="ordertype" placeholder="请选择">
                        <el-option
                          v-for="item in options3"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="flex pad_ pad_r">
                      <span class="title">下单时间</span>
                      <el-date-picker
                        v-model="dataTime"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                    <div class="flex pad_">
                      <el-button type="primary" round @click="search">查询</el-button>
                    </div>
                  </div>
                  
                </div>
                <!-- 表格 -->
                <div class="tableB">
                  <el-table :data="tableData" style="width: 100%" :lazy="lazy">
                        <el-table-column align="center"
                          v-for="(col,index) in cols" header-row-class-name="header"
                          :prop="col.prop" :label="col.label" :key="index" :width="col.width" :show-overflow-tooltip="true">
                          <template slot-scope="scope">
                          <!-- 偏差結果 -->
                              <span v-if="col.prop==='order_type'">
                                  {{scope.row[col.prop]=='1'?'图文':scope.row[col.prop]=='2'?'视频':scope.row[col.prop]=='3'?'图文会诊':'视频问诊'}}
                              </span>
                              <span v-else-if="col.prop==='order_status'">
                                  {{scope.row[col.prop]=='1'?'未支付':scope.row[col.prop]=='2'?'待接诊':scope.row[col.prop]=='3'?'问诊中':scope.row[col.prop]=='4'?'已完成':'已取消'}}
                              </span>
                              <!-- 
                              <span v-else-if="col.prop==='doctor_status'">
                                  {{scope.row[col.prop]=="0"?'未认证':scope.row[col.prop]=="1"?'已通过':scope.row[col.prop]=="2"?'未审核':"驳回"}}
                              </span> -->
                          <!-- 正常的其他列 -->
                              <span v-else>{{scope.row[col.prop]}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          fixed="right"
                          align="center"
                          label="操作">
                          <template slot-scope="scope">
                            <el-button
                              @click.native.prevent="deleteRow(1,scope.row)"
                              type="text"
                              size="small">
                              查看
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="height">
                        <el-pagination
                          :hide-on-single-page="true"
                          @current-change="handleCurrentChange"
                          background
                          :current-page="page"
                          layout="prev, pager, next"
                          :total="total">
                        </el-pagination>
                      </div>
                </div>
          </el-tab-pane>
          <el-tab-pane label="结算列表" name="second" v-loading="loading">
              <div class="Index_flex_ flex wrap">
                    <div class="flex pad_">
                      <span class="title">订单号</span>
                      <el-input v-model="ordernumber_" placeholder="订单号"></el-input>
                    </div>
                    <div class="flex pad_">
                      <span class="title">医师手机号</span>
                      <el-input v-model="username_" type="number" placeholder="请填写手机号"></el-input>
                    </div>
                    <div class="flex pad_">
                      <span class="title">订单状态</span>
                      <el-select v-model="orderstatus_" placeholder="请选择">
                        <el-option
                          v-for="item in options_"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="flex pad_ pad_r">
                      <span class="title">下单时间</span>
                      <el-date-picker
                        v-model="dataTime_"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                    <div class="flex pad_">
                      <el-button type="primary" round @click="search_">查询</el-button>
                    </div>
                </div>
              <!-- 表格 -->
                <div class="tableB" type="selection" size='medium' width="40">
                  <el-table :data="tableData2" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" style="width: 100%" :lazy="lazy">
                         <el-table-column
                            fixed="left"
                            type="selection"
                            size='medium'
                            width="60"
                            style="text-align: center;"
                            >
                          </el-table-column>
                        <el-table-column align="center"
                          v-for="(col,index) in cols2" header-row-class-name="header"
                          :prop="col.prop" :label="col.label" :key="index" :width="col.width" :show-overflow-tooltip="true">
                          <template slot-scope="scope">
                          <!-- 偏差結果 -->
                              <span v-if="col.prop==='order_type'">
                                  {{scope.row[col.prop]=='1'?'图文':scope.row[col.prop]=='2'?'视频':scope.row[col.prop]=='3'?'图文会诊':'视频问诊'}}
                              </span>
                              <span v-else-if="col.prop==='order_payment'">
                                {{scope.row[col.prop]==1?'已结算':'未结算'}}
                                  <!-- {{scope.row[col.prop]=='1'?'未支付':scope.row[col.prop]=='2'?'待接诊':scope.row[col.prop]=='3'?'问诊中':scope.row[col.prop]=='4'?'已完成':'已取消'}} -->
                              </span>
                            
                              <span v-else>{{scope.row[col.prop]}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          fixed="right"
                          align="center"
                          label="操作">
                          <template slot-scope="scope">
                            <el-button
                              @click.native.prevent="deleteRow(1,scope.row)"
                              type="text"
                              size="small">
                              查看
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="height">
                        <el-pagination
                          :hide-on-single-page="true"
                          @current-change="handleCurrentChange2"
                          :current-page="page2"
                          background
                          layout="prev, pager, next"
                          :total="total2">
                        </el-pagination>
                      </div>
                </div>
                <div class="bill">
                  <!-- <div class="billDiv">
                    <el-button>结算个数</el-button> {{num}}
                  </div> -->
                  <div>
                    <el-button @click="toggleSelection([tableData2])">结算当页</el-button> {{money}}
                  </div>
                  <div class="billDiv">
                    <el-button @click="computer_">结算全部</el-button> 
                  </div>
                </div>
          </el-tab-pane>
        </el-tabs>
        
      </div>
  </div>
  
</template>

<script type='text/ecmascript-6'>
  import bus from '../components/bus';
  export default {
    data() {
      return {
        dialogTableVisible: false,
        valuePage: false,
        lazy:true,
        cols:[
          {prop: 'order_number', label: '药品订单号',width:'300'},
          {prop: 'order_pay_number', label: '支付订单号',width:'300'},
          {prop: 'order_username', label: '患者姓名',width:''},
          {prop: 'order_mobile', label: '支付手机号',width:''},
          {prop: 'order_time', label: '下单时间',width:''},
          {prop: 'order_price', label: '金额',width:''},
          {prop: 'order_type', label: '订单类别',width:''},
          {prop: 'order_status', label: '订单状态',width:''},
        ],
         cols2:[
          {prop: 'order_number', label: '药品订单号',width:'300'},
          {prop: 'order_pay_number', label: '支付订单号',width:'300'},
          {prop: 'order_username', label: '患者姓名',width:''},
          {prop: 'order_time', label: '下单时间',width:''},
          {prop: 'doctor_nickname', label: '问诊医师',width:''},
          {prop: 'doctor_mobile', label: '医师手机号',width:''},
          {prop: 'order_price', label: '金额',width:''},
          {prop: 'order_proportion', label: '分成比例',width:''},
          {prop: 'order_income', label: '税前收入(￥)',width:''},
          {prop: 'order_type', label: '订单类型',width:''},
          {prop: 'order_payment', label: '结算状态',width:''},
        ],
        loading: true,//加载
        options: [{
          value: 1,
          label: '未支付'
        }, {
          value: 2,
          label: '待接诊'
        }, {
          value: 3,
          label: '问诊中'
        }, {
          value: 4,
          label: '已完成'
        }, {
          value: 5,
          label: '已取消'
        }],
        options3: [{
          value: 1,
          label: '图文问诊'
        }, {
          value: 2,
          label: '视频问诊'
        }, {
          value: 3,
          label: '专家会诊'
        }, {
          value: 5,
          label: '今日问诊'
        }, {
          value: 9,
          label: '全部'
        }],
        options_: [{
          value: 1,
          label: '已结算'
        }, {
          value: 2,
          label: '未结算'
        }],
        tableData: [],
        tableData2: [],
        ordernumber:'',//订单号
        username:null,//手机号
        orderstatus:'',//订单状态
        ordertype:'',//订单类型
        dataTime:'',//下单时间

        ordernumber_:'',//订单号
        username_:'',//医师手机号
        orderstatus_:'',//订单状态
        ordertype_:'',//订单类型
        dataTime_:'',
        page:1,
        total:0,
        page2:1,
        total2:0,
        multipleSelection:'',//勾选项
        activeName: 'first',
        money:'',
        num:'',
        moneyList:[],
        allList:[],
        allBill:'',
        close:'',
        allCNY:0,
        noPath:false,
      }
    },created () {
      this.setTime();
      this.orderManage(1);
    },watch:{
      money(val){
        this.money = val;
      },
      username(val){
        this.username = val;
        // console.log(123)
      }
    },computed: {
      
    },methods: {
      computer_(){
        this.allBill = 0;
        let total = this.total2;
        if(typeof(total)=='string'){
          total= Number(total)
        }
        let number = Math.ceil(total/10);
        let that = this;
        this.num = total ;
        that.addorder();
      },
      addorder(){
        if(this.username =='' && this.allCNY == 0 ||this.username ==undefined && this.allCNY == 0 ||this.username == null && this.allCNY == 0 ){
          this.$notify.info({
            title: '提示',
            message: '请先查询医生',
          });
          return false;
        }
        if(this.username!=''&&this.tableData2.length!=0){
          let data = {
            docid:this.tableData2[0].order_docid,
            type:'68',
          };
          this.$api.orderPaymentup(data)
              .then(res => {
                        this.orderPaymentManage(1)
                        this.setTime();
                      }) 
        }else{
          this.$notify.info({
            title: '提示',
            message: '结算失败！请重试',
          });
        }
      },
      handleSelectionChange(val) {
         this.multipleSelection = val;
         this.num = val.length;
         if(val.length!=0){
              let money = 0,that = this,arrlist = [];
              for(var i = 0 ; i< val.length; i++){
                money += Number(val[i].order_income)
                that.money=money;
                arrlist.push(val[i].id);
                that.close = (i+1);
              }
              that.moneyList= arrlist ;
              this.noPath = true;
         }else{
           this.money = 0;
           this.noPath = false;
         }
      },
      toggleSelection(rows) {
        if(this.username =='' && this.allCNY == 0 ||this.username ==undefined && this.allCNY == 0 ||this.username == null && this.allCNY == 0 ){
          this.$notify.info({
            title: '提示',
            message: '请先查询医生',
          });
          return false;
        }
        if (rows) {
          rows.forEach((row) => {
            let money = 0,that = this;
            for(var i = 0 ; i< row.length; i++){
              this.$refs.multipleTable.toggleRowSelection(row[i]);
            }
          });
          this.orderClose();
        }
      },
      orderClose(){
        let data_ = '';
        if(this.noPath){
            for(var i = 0 ; i<this.moneyList.length;i++){
              if(i == 0){
                data_ = this.moneyList[0] 
              }else{
                data_ = data_ +','+ this.moneyList[i] 
              }
            }
            let data = {
              idlist:data_,
              type:'67',
            };
            this.$api.orderPaymentup(data)
                  .then(res => {
                    this.orderPaymentManage(1);
                          }) 
        }
        
      },
      handleClick(tab, event) {
        this.loading = true;
        if(tab.index==0){
          this.orderManage(1)
        }else{
          this.orderPaymentManage(1)
        }
        this.setTime();
      },
      orderManage(val){//订单管理
        if(val==0){
          this.page = 1;
        }
        let data = {
          ordernumber:this.ordernumber,
          username:this.username,
          orderstatus:this.orderstatus,
          ordertype:this.ordertype,
          startime:this.dataTime[0],
          stoptime:this.dataTime[1],
          page:this.page,
        };
        this.$api.orderManage(data)
              .then(res => {
                        this.tableData = res.data;
                        this.total = res.total;
                      }) 
      },
       orderPaymentManage(val){//订单结算
        if(val==0){
          this.page2 = 1;
        }
        let data = {
          ordernumber:this.ordernumber_,
          phone:this.username_,
          paystatus:this.orderstatus_,
          startime:this.dataTime_[0],
          stoptime:this.dataTime_[1],
          page:this.page2,
        };
        this.$api.orderPaymentManage(data)
              .then(res => {
                        this.tableData2 = res.data;
                        this.total2 = res.total;
                      }) 
      },

      handleCurrentChange(val) {//分页
        this.page = val;
        this.orderManage(1);
      },
      handleCurrentChange2(val) {//分页
        this.page2 = val;
        this.orderPaymentManage(1);
      },
      search(){//查询
        this.orderManage(0);
      },
      search_(){
        this.allCNY = this.allCNY+1;
        this.orderPaymentManage(0);
      },
      request(datac){//获取患者列表
        this.$api.information(datac)
                .then(res => {
                  //  this.tableData = res.data;
                })
      },
      deleteRow(type,val){//跳转详情
        let path = "";
        switch (val.order_type){
          case '1':
            path = "/clicenDetails" //图文订单
            break;
          case '2':
            path = "/video"  //视频订单
            break;
          case '3':
            path = "/office" //专家会诊
            break;
          case '4':
            path = "/office" //专家会诊
            break;
        }
        this.$store.dispatch("update",val)
        // console.log(val)
        this.$router.push({
          path: path,
        })
        bus.$emit("path","/administrative")
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
.pad_{
  padding-top: 10px;
}
.wrap{
 flex-wrap: wrap;
}
.app{
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  padding-bottom: 100px;
  /* background: #fff; */
}
.Index_flex{
  display: flex;
    padding:10px 40px;
  box-sizing: border-box;
}
.flex{
  display: flex;
  align-items: center;
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
.flexWarp{
  flex-wrap: wrap;
}
.title{
  display: inline-block;
  text-align: left;
  padding: 0px 10px ;
}
.header{
  text-align: center;
}
/deep/ .el-input__inner{
    height: 50px;
}

.el-select,.el-input{
  width: 100%;
}
.pad_r{
  margin-right: 10px;
}
/deep/ .el-tabs__header{
    padding: 20px!important;
    box-sizing: border-box;
}
.bill{
  padding: 10px;
}
.billDiv{
  margin: 10px 0px;
}
</style>