<template>
    <div class="app app2">
        <div class="clicenDetails app2">
          <div class="clic_header clic_Box">
            
            <div class="clic_Con">
              <div>
                <h5 class="clic_center">基本信息</h5>
              </div>
              <div class="flex_">
                  <div class="Index_flex_">
                    <span class="title">患者</span>
                    <el-input
                    placeholder="请输入内容"
                    v-model="json.order_username"
                    disabled
                    >
                    </el-input>
                  </div>
                  <div class="Index_flex_">
                    <span class="title">订单号</span>
                    <el-input
                    disabled
                    placeholder="请输入内容"
                    v-model="json.order_number"
                    >
                    </el-input>
                  </div>
                  <div class="Index_flex_">
                    <span class="title">订单状态</span>
                    <el-input
                    disabled
                    :placeholder="json.order_status=='1'?'未支付':json.order_status=='1'?'待接诊':json.order_status=='3'?'问诊中':json.order_status=='4'?'已完成':'已取消'"
                    v-model="input"
                    clearable>
                    </el-input>
                  </div>
              </div>
            </div>
            </div>
            <div class="tabar">
              <img src="@/assets/img/details.png" alt="" srcset="" class="img" title="患者详情" @click="changeCheakIn(1)"> 
              <!-- <img src="@/assets/img/voice.png" alt="" srcset="" class="img" title="语音详情" @click="changeCheakIn(2)"> -->
              <img src="@/assets/img/evaluate.png" alt="" srcset="" class="img" title="问诊详情" @click="changeCheakIn(3)">
              <img src="@/assets/img/pj.png" alt="" srcset="" class="img" title="评价详情" @click="changeCheakIn(4)">
              <img src="@/assets/img/recipe.png" alt="" srcset="" class="img" title="处方详情" @click="changeCheakIn(5)">
            </div>
          <div class="clic_textear">
            <div class="tableB">
              <el-table :data="tableData" style="width: 100%" :lazy="lazy">
                <el-table-column align="center"
                  v-for="(col,index) in cols" header-row-class-name="header"
                  :prop="col.prop" :label="col.label" :key="index" :width="col.width" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                  <!-- 偏差結果 -->
                      <span v-if="col.prop==='status'" >
                        <div v-if="scope.row.status==0" class="img_details cursor">
                          <!-- <img src="@/assets/img/details.png" alt="" srcset="" class="img cursor" >  -->
                          <span>患者详情</span>
                        </div>
                        <div v-if="scope.row.status==1" class="img_details cursor">
                          <!-- <img src="@/assets/img/voice.png" alt="" srcset="" class="img cursor"> -->
                          <span>语音详情</span>
                        </div>
                        <div v-if="scope.row.status==2" class="img_details cursor">
                          <!-- <img src="@/assets/img/evaluate.png" alt="" srcset="" class="img cursor"> -->
                          <span>问诊详情</span>
                        </div>
                        <div v-if="scope.row.status==3" class="img_details cursor">
                          <!-- <img src="@/assets/img/pj.png" alt="" srcset="" class="img cursor"> -->
                          <span>评价详情</span>
                        </div>
                        <span v-if="scope.row.status==4" class="cursor">
                          {{scope.row.code_addtime}}
                        </span>
                        <div v-if="scope.row.status==5" class="img_details cursor">
                          <!-- <img src="@/assets/img/recipe.png" alt="" srcset="" class="img cursor"> -->
                          <span>处方详情</span>
                        </div>
                      </span>
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
                      @click.native.prevent="deleteRow(scope.row)"
                      type="text"
                      size="small">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="height">
                <el-pagination
                  :hide-on-single-page="true"
                  @current-change="handleCurrentChange2"
                  :current-page="page"
                  background
                  layout="prev, pager, next"
                  :total="total">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <!-- 弹出层 -->
        <el-dialog title="删除" :visible.sync="dialogFormVisible">
          是否删除？
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 详情弹出 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible1">
          <el-form ref="form" :model="form">
            <div class="flex_0">
              <!-- {{form.data}} -->
              <div class="flex_0">
                <div>
                  <img class="img_photo" :src="form.user_icon||require('@/assets/img/photo.png')" alt="">
                  <p class="span_">{{form.user_gender=="1"?'男':'女'}}</p>
                </div>
                <div class="pad">
                  <p>{{form.user_nickname}}</p>
                  <p>28岁</p>
                  <p v-if="type==5">{{form2.prescriptionManageBean.department || ''}}</p>
                </div>
                <div class="pad">
                  <p>订单编号:{{json.order_number}}</p>
                  <p v-if="type!=4">订单类别:{{form.order_type=='1'?'图文':form.order_type=='2'?'视频':form.order_type=='3'?'图文会诊':'视频会诊'}}</p>
                  <p v-if="form.order_yytime!=null">预约时间： {{form.order_yytime}}</p>
                  <p v-if="type ==5">处方ID号：{{form2.prescriptionManageBean.p_number}} </p>
                  <p v-if="type ==5">是否有效：{{form2.prescriptionManageBean.p_status=='1'?'有效':'已过期'}}</p>
                  <p style="color:red" v-if="type==5">*本处方仅限怡成网络医院，有效期3天*有效（3天）</p>
                </div>
              </div>
            </div>
          <div class="patient" v-if="type==1">
            <div class="flex_0">
              <div>
                <span>病情描述：</span>
              </div>
              <div class="flex_1">
                <el-input
                  type="textarea"
                  :rows="2"
                  readonly
                  placeholder="无内容"
                  v-model="form.order_problem">
                </el-input>
              </div>
            </div>
            <div class="flex_0" v-if="form.order_pic1!=null&&form.order_pic2!=undefined&&form.order_pic3!=undefined&&form.order_pic4!=undefined&&form.order_pic5!=undefined&&form.order_pic6!=undefined">
              <div>
                <span>图片：</span>
              </div>
              <div class="img_div_">
                <img :src="form.order_pic1" alt="" srcset="" @click="img(form.order_pic1)">
                <img :src="form.order_pic2" alt="" srcset="" @click="img(form.order_pic2)">
                <img :src="form.order_pic3" alt="" srcset="" @click="img(form.order_pic3)">
                <img :src="form.order_pic4" alt="" srcset="" @click="img(form.order_pic4)">
                <img :src="form.order_pic5" alt="" srcset="" @click="img(form.order_pic5)">
                <img :src="form.order_pic6" alt="" srcset="" @click="img(form.order_pic6)">
              </div>
            </div>
            <div class="flex_0">
              <div>
                <span>病史：</span>
              </div>
              <div class="flex_1">
              <el-input
                  readonly
                  type="textarea"
                  placeholder="无内容"
                  v-model="form.user_bs">
                </el-input>
              </div>
            </div>
          </div>
          <div class="voice" v-if="type==2">
            <audio src="" controls></audio>
          </div>
          <div class="voice" v-if="type==3">
            <div class="flex_0">
              <div>
                <span>病情描述：</span>
              </div>
              <div class="flex_1">
                <el-input
                readonly
                  type="textarea"
                  :rows="2"
                  placeholder="无内容"
                  v-model="form2.order_chief_complaint">
                </el-input>
              </div>
            </div>
            <div class="flex_0">
              <div>
                <span>拟诊：</span>
              </div>
              <div class="flex_1">
                <el-input
                readonly
                  type="textarea"
                  :rows="2"
                  placeholder="无内容"
                  v-model="form2.order_quasi_diagnosis">
                </el-input>
              </div>
            </div>
            <div class="flex_0">
              <div>
                <span>医生建议：</span>
              </div>
              <div class="flex_1">
                <el-input
                readonly
                  type="textarea"
                  :rows="2"
                  placeholder="无内容"
                  v-model="form2.order_proposal">
                </el-input>
              </div>
            </div>
            <!-- <div class="flex_0">
              <div>
                <img src="" alt="">
                <span>处方建议：</span>
              </div>
              <div class="flex_1">
                <el-input
                  type="textarea"
                  :rows="2"
                  readonly
                  placeholder="无内容"
                  v-model="textarea">
                </el-input>
              </div>
            </div> -->
          </div>
          <div class="evaluate" v-if="type==4">
            <div class="content_">
              <div :class="form.evaluate_label1=='1'?'light':''">
                《医师专业》
              </div>
              <div :class="form.evaluate_label1=='2'?'light':''">
                《接诊神速》
              </div>
              <div :class="form.evaluate_label1=='3'?'light':''">
                《热情亲切》
              </div>
              <div :class="form.evaluate_label1=='4'?'light':''">
                《经验丰富》 
              </div>
              <div :class="form.evaluate_label1=='5'?'light':''">
                《认真负责》
              </div>
              <div :class="form.evaluate_label1=='6'?'light':''">
                《医疗建议》
              </div>
            </div>
             <div class="evaluate_">
                <div class="evaluate_div">
                  <span class="evaluate_span">评价内容：</span>
                  <div class="flex_1">
                    <el-input
                      type="textarea"
                      :rows="2"
                      readonly
                      placeholder="无内容"
                      v-model="form.evaluate_context">
                    </el-input>
                  </div>
                </div>
                <div class="evaluate_div">
                  <span class="evaluate_span">评价分数：</span>
                  <div class="flex_1">
                    <el-rate
                      v-model="form.evaluate_level"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                  </div>
                </div>
              </div>
          </div>
          <div v-if="type==5">
            <div class="flex_0">
              <div>
                <span>诊断：</span>
              </div>
              <div class="flex_1">
              <el-input
                  type="textarea"
                  placeholder="无内容"
                  disabled
                  v-model="form2.prescriptionManageBean.p_result">
                </el-input>
              </div>
            </div>
            <div class="flex_0">
              <div>
                <span>Rp：</span>
              </div>
              <div class="flex_1 borderColor">
                <div v-for="(item , index) in form2.drugsManageBean" :key= "index">
                  <div style="color:#000;">
                    药品名称:{{item.drugs_name||'无内容'}}
                  </div>
                  <div>
                    开药量:{{item.drugs_dosage||'无内容'}}
                  </div>
                  <div>
                    给药途径:{{item.mode_channel =="1"?'口服':item.mode_channel =="2"?'含服':item.mode_channel =="3"?'嚼服':item.mode_channel =="4"?'外服':'其他'}}
                  </div>
                  <div>
                    用法用量:{{item.mode_consumption||'无内容'}}
                  </div>
                  <div>
                    给药频率:{{item.mode_frequency||'无内容'}}
                  </div>
                </div>
                
              </div>
            </div>
            <div class="flex_0">
              <div>
                <span>补充说明：</span>
              </div>
              <div class="flex_1">
              <el-input
                  type="textarea"
                  disabled
                  placeholder="无内容"
                  v-model="form2.prescriptionManageBean.p_bz">
                </el-input>
              </div>
            </div>
            <div class="flex_0" v-if="form2.prescriptionManageBean.p_c_signature!=null&&form2.prescriptionManageBean.p_doc_signature!=null">
              <div>
                <span>签字盖章：</span>
              </div>
              <div class="flex_1">
                <img :src="form2.prescriptionManageBean.p_c_signature||''" alt="" @click="img('src')" v-if="form2.prescriptionManageBean.p_doc_signature != null">
                <img :src="form2.prescriptionManageBean.p_doc_signature||''" alt="" @click="img('src')" v-if="form2.prescriptionManageBean.p_doc_signature != null">
              </div>
            </div>
          </div>
          </el-form>
        </el-dialog>
        <!-- 图片详情 -->
        <el-dialog title="图片详情" :visible.sync="dialogFormVisible3">
          <img :src="src" alt="" class="src">
        </el-dialog>
                <AnimateFly class="showFly1 animate-bounce-up point" title="点击回退"></AnimateFly>

    </div>
</template>

<script type='text/ecmascript-6'>
    import AnimateFly from '@/components/animate.vue';

  export default {
    data () {
      return {
          input: '',
          value: '',
          lazy:true,
          cols:[
            {prop: 'id', label: '序号'},
            {prop: 'record_from_username', label: '姓名'},
            {prop: 'record_time', label: '发送时间'},
            {prop: 'record_msg', label: '内容'},
          ],
          tableData: [],
          dialogFormVisible:false,
          dialogFormVisible1:false,
          dialogFormVisible3:false,
          src:'',//图片地址
          title:"",
          form:{},//弹出层信息
          form2:{
            prescriptionManageBean:{
              department:'',
              p_result:'',
              drugsManageBean:'',
              p_bz:'',
              p_c_signature:"",
              p_c_signature:'',
            }
          },//弹出层信息
          textarea:'',//病情描述
          textarea2:'',//病史
          type:'',
          evaluateValue:5,//评分
          json:'',
          page:1,
          total:0,
      }
    },components:{
      AnimateFly
    },
    created () {
      this.json = this.$store.state.json ;
      // console.log(this.json ,"json")
      this.axios1(0);
      this.axios();
    },
    methods: {
      handleCurrentChange2(val) {//分页
        this.page = val;
        this.axios1(1);
      },
      axios(){//患者详情
        let data = {
          order_number:this.json.order_number 
        };
        this.$api.userDescribeInfo(data)
          .then(res =>{
              this.form = res.data;
              // this.total =res.total; 
            })
      },
      axios2(){//处方详情
        let data = {
          p_number:this.json.order_number 
        };
        this.$api.userPrescriptionInfo(data)
          .then(res =>{
            // console.log(res,this.form2)
              if(res.code!=403){
                  this.form2 = res.data;
              }
            })
      },
      deleteRow(val){
        this.dialogFormVisible = true ;
      },
      img(src){
        this.dialogFormVisible3 = true ;
        this.src=src;
      },
      axios3(val){//患者详情列表
        let data = {
          order_number:this.json.order_number ,
        };
        this.$api.userEvaluateInfo(data)
          .then(res =>{
              if(res.code!=403){
                this.form = res.data;
              }
            })
      },
      axios4(val){//问诊小节
        let data = {
          order_number:this.json.order_number ,
        };
        this.$api.userSummaryInfo(data)
          .then(res =>{
            // console.log(res,this.form2)
              if(res.code!=403){
                this.form = res.data;
              }
            })
      },
      axios1(val){//患者详情列表
        if(val==0){
          this.page = 1;
        }
        let data = {
          order_number:this.json.order_number ,
          page: this.page 
        };
        this.$api.orderCrManage(data)
          .then(res =>{
            this.tableData = res.data;
            })
      },
      changeCheakIn(item,val){
        this.dialogFormVisible1 = true;
        this.type = item;
        switch (item){
          case 5:
            this.axios2();
            this.title = "处方详情";
            break;
          case 4:
            this.axios3();
            this.title = "评价详情";
            break;
          case 3:
            this.title = "问诊详情";
            this.axios4();
            break;
          case 2:
            this.title = "语音详情";
            break;
          case 1:
            this.axios();
            this.title = "患者详情";
            break;
        }
      }
    }
  }
</script>

<style scoped type='text/css'>
.evaluate_div{
  display: flex;
  margin: 5px;
}
.src{
  width: 100%;
}
.content_ {
  display: flex;
  flex-wrap: wrap;
}
.content_ div{
  border: 1px solid rgb(247, 186, 42);
  padding: 5px 10px;
  margin: 5px 10px;
  border-radius: 15px;
}
/deep/ .el-textarea__inner{
  min-height: 150px!important;
  max-height: 150px!important;
}
.flex_1{
  flex: 1;
}

.img_div_{
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #DCDFE6;
    border-radius: 3px;
    flex: 1;

}
.img_div_ img{
  margin: 5px;
}
.flex_0 span{
  width: 100px;
  display: inline-block;
}
.span_{
  padding:2px 10px;
  display: block;
  text-align: center;
  border: 1px solid rgb(224, 195, 65);
  background: rgb(224, 195, 65);
  border-radius: 15px;
  color: #fff;
  margin-top: -10px;
  position: relative;
  z-index: 1;
}
.pad{
  padding: 0 10px;
}
.img_photo{
  border-radius: 50%;
}
.flex_0 {
  display: flex;
  padding: 10px 0px;
}

.flex_0 img{
  width: 100px;
  height: 100px;
}
.img_details{
  display: flex;
  align-items: center;
}
.img_details SPAN{
  padding-left: 10px;
}
.img{
  width: 60px;
}
.clic_center{
  font-size: 25px;
  margin-top: 0px;
}
.title{
  padding: 10px;
}
.title2{
  font-weight: 700;
    font-size: 25px;
  margin: 20px;
  text-align: left;
  display: block;
}
.clicenDetails2{
  margin-bottom: 20px;
  padding: 40px;
}
.clic_Box{
  display: flex;
  text-align: left;
}
.flex_{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.app{
  width: 100%;
  height: 100%;
}
.app2{
  padding: 40px;
  box-sizing: border-box;
    box-shadow:0px 1px 10px 2px rgba(227,224,224,0.5);
  border-radius:8px;
}
.clicenDetails{
  background: #fff;
}
  .Index_flex_{
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }
    .height{
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cursor{
    cursor: pointer;
  }
.tabar{
  display: flex;
  justify-content: flex-end;
}
.tabar img{
  width: 40px;
  margin: 0px 5px;
}
.borderColor{
  border: 1px solid #DCDFE6;
    border-radius: 3px;
padding: 0.066667rem 0.2rem;
min-height: 100px;
}
.borderColor div{
  padding: 5px 0px;
}
.light{
  background: rgb(247, 186, 42);
  color:#fff;
}
</style>