<template>
    <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex_box">
          <div class="flex-1">
            <div class="photo Index_flex_">
              <img v-if="form.icon" :src="form.icon" class="avatar">
            </div>
            <div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>姓名</span>
                  <el-input v-model="form.nickname" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>手机号</span>
                  <el-input v-model="form.phone" type="number" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>性别</span>
                  <el-select v-model="form.gender" placeholder="请选择" :disabled="changeValue">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>密码</span>
                  <el-input v-model="form.pswd" placeholder="请输入内容"  :readonly="changeValue"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>医师状态</span>
                  <el-select v-model="form.status" placeholder="请选择" :disabled="changeValue">
                    <el-option
                      v-for="item in optionsStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>医师职称</span>
                  <el-select v-model="form.doctor_title" placeholder="请选择" :disabled="changeValue">
                    <el-option
                      v-for="item in optionsTitle"
                      :key="item.id"
                      :label="item.title_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>信用评级</span>
                  <el-input v-model="form.credit_level" placeholder="请输入内容" readonly></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>职业评级</span>
                  <el-input v-model="form.occu_level" placeholder="请输入内容" readonly></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>医师评分（扣分制）</span>
                  <el-input v-model="form.doc_penalty_points" placeholder="请输入内容" readonly></el-input>
                </div>
            </div>
            <div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>医生线下现任职机构名称</span>
                  <el-input v-model="form.hospital" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>执业证书编号</span>
                  <el-input v-model="form.certificate" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>职称证编号</span>
                  <el-input v-model="form.title_no" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>职称证取得时间</span>
                  <el-date-picker
                  type="date"
                    :disabled="changeValue"
                    v-model="form.title_rec_date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>身份证号</span>
                  <el-input v-model="form.idcard" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>所在科室</span>
                  <el-select v-model="department1" placeholder="请选择一级科室" :disabled="changeValue">
                    <el-option
                      v-for="item in firstDepartment"
                      :key="item.id"
                      :label="item.department1_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  <el-select v-model="department2" placeholder="请选择二级科室" :disabled="changeValue">
                    <el-option
                      v-for="item in twoDepartment"
                      :key="item.id"
                      :label="item.department2_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="Index_flex_">
                      <span class="title"><i>*</i>出生日期</span>
                      <el-date-picker
                       :disabled="changeValue"
                      type="date"
                        v-model="form.doctor_bir"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期时间">
                      </el-date-picker>
                </div>
                <div class="Index_flex_ prac">
                      <span class="title"><i>*</i>两个月定期考核</span>
                      <el-select v-model="form.qualify_or_not" :disabled="changeValue">
                      <el-option
                        v-for="item in qualify_or_"
                        :key="item.title"
                        :label="item.name"
                        :value="item.title">
                      </el-option>
                    </el-select>
                </div>
            </div>
            <div style="flex:1;">
                <div class="Index_flex_">
                  <span class="title"><i>*</i> 医师资格证书编号</span>
                  <el-input v-model="form.cert_no" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>资格证取得时间</span>
                      <el-date-picker
                       :disabled="changeValue"
                        v-model="form.cert_rec_date"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期时间">
                      </el-date-picker>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i> 医师执业证号</span>
                  <el-input v-model="form.prac_no" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>执业证取得时间</span>
                      <el-date-picker
                      type="date"
                       :disabled="changeValue"
                        v-model="form.prac_rec_date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期时间">
                      </el-date-picker>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i> 申请多点执业机构</span>
                  <el-input v-model="form.doc_multi_sited" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>多点执业起始时间</span>
                      <el-date-picker
                       :disabled="changeValue"
                      type="date"
                        v-model="form.doc_multi_sited_date_start"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期时间">
                      </el-date-picker>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>多点执业终止时间</span>
                      <el-date-picker
                       :disabled="changeValue"
                        v-model="form.doc_multi_sited_date_end"
                        format="yyyy-MM-dd"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期时间">
                      </el-date-picker>
                </div>
                <div class="Index_flex_ prac">
                  <span class="title"><i>*</i> 医师执业类别</span>
                  <el-select v-model="prac_type" placeholder="请选择" :disabled="changeValue">
                    <el-option
                      v-for="item in optionsprac.title"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="Index_flex_ prac">
                  <span class="title"><i>*</i> 医师执业范围</span>
                  <el-select v-model="prac_scope" placeholder="请选择" :disabled="changeValue">
                    <el-option
                      v-for="item in fanwei"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
            </div>
          </div>
          <div class="Index_flex_2">
              <span class="title alitemSpan autoWidth"><h4><i style="color:red">*</i>擅长</h4></span>
              <el-input
               :readonly="changeValue"
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="form.field">
              </el-input>
          </div>
          <div class="Index_flex_2">
              <span class="title alitemSpan autoWidth"><h4><i style="color:red">*</i>简介</h4></span>
              <el-input
                type="textarea"
                 :readonly="changeValue"
                :rows="6"
                placeholder="请输入内容"
                v-model="form.introduction">
              </el-input>
          </div>
          <div class="Index_flex_2" v-if="reason==3">
              <span class="title alitemSpan autoWidth"><h4><i style="color:red">*</i>驳回原因</h4></span>
              <el-input
                type="textarea"
                :rows="6"
                 :readonly="changeValue"
                placeholder="请输入内容"
                v-model="doctor_reason">
              </el-input>
          </div>
          </div>
          <div class="Index_flex_2 alitem width">
                <span>
                      <h4>  视频问诊 </h4>
                </span>
                <template :aria-disabled="changeValue">
                    <el-radio v-model="form.openvideo" label="1" :disabled="changeValue">开通</el-radio>
                </template>
          </div>
          <div class="Index_flex_2 alitem width">
                <span>
                      <h4>  图文问诊 </h4>
                </span>
                <template >
                    <el-radio v-model="form.opentw" label="1" :disabled="changeValue">开通</el-radio>
                </template>
          </div>
          <div>
                <div class="Index_flex_">
                  <span class="title"> <h4> 图文问诊价格 </h4></span> 
                  <el-input v-model="form.twprice" type="number" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>
                 <div class="Index_flex_">
                  <span class="title"> <h4> 视频问诊价格 </h4></span>
                  <el-input v-model="form.videoprice" type="number" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>  
          </div>
          <div class="Index_flex_2 flexWarp">
                <div class="Index_flex_">
                  <span class="spanWidth"> <h4> 图文价格分配 医师占比 (%)</h4></span> 
                  <el-select v-model="form.proportion1" placeholder="请选择" :disabled="changeValue">
                    <el-option
                      v-for="item in optionsPirce"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                 <div class="Index_flex_">
                  <span class="spanWidth"> <h4> 视频价格分配 医师占比 (%)</h4></span>
                  <el-select v-model="form.proportion2" placeholder="请选择" :disabled="changeValue">
                    <el-option
                      v-for="item in optionsPirce"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div> 
                <div class="Index_flex_">
                  <span class="spanWidth"> <h4> 视频问诊通话时长</h4></span>
                  <el-select v-model="form.doctor_talk_time" placeholder="请选择" :disabled="changeValue">
                    <el-option
                      v-for="item in talk_timeArr"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div> 
          </div>
          <div class="block">
            <span class="spanWidth"> <h4> 视频问诊时间</h4></span> 
            <el-timeline>
              <el-timeline-item :timestamp="item.timestamp" placement="top" v-for="(item,index) in timeline" :key="index">
                <el-card>
                  <div class="Index_flex_ blockMargin">
                    <div class="block Index_flex_ blockMargin">
                      <span class="demonstration"><h4>开始时间</h4></span>
                      <el-time-picker
                       :disabled="changeValue"
                        v-model="item.value1"
                        format="HH:mm"
                        value-format="HH:mm"
                        placeholder="选择日期时间">
                      </el-time-picker>
                    </div>
                    <div class="block Index_flex_ blockMargin">
                      <span class="demonstration"><h4>结束时间</h4></span>
                      <el-time-picker
                       :disabled="changeValue"
                        v-model="item.value2"
                        type="datetime"
                        format="HH:mm"
                        value-format="HH:mm"
                        placeholder="选择日期时间">
                      </el-time-picker>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>

            </el-timeline>
          </div>
          <div class="Index_flex_2"><span class="alitemSpan"> <h4> <i style="color:red">*</i>身份证 </h4></span></div>
          <div class="Index_flex_2 Index_flex_">
                <div class="photo Index_flex_">
                  <img v-if="form.idcard_url1" @click="img_(form.idcard_url1)" :src="form.idcard_url1" class="avatar">
                </div>
                <div class="photo Index_flex_">
                  <img v-if="form.idcard_url2" @click="img_(form.idcard_url2)" :src="form.idcard_url2" class="avatar">
                </div>
          </div>

          <div class="Index_flex_2"> <h4> <span><i style="color:red">*</i>医师资格证书</span> </h4></div>
          <div class="Index_flex_2 Index_flex_">
                <div class="Index_flex_ flexWarp" >
                  <div v-for ='(item , index) in imglist' :key="index" class="upld">
                    <img v-if="item" :src="item" class="avatar blockImg" @click="img_(item)" @mouseenter="change2(index)" @mouseleave="change2(index)">
                  </div>
                </div>
          </div>
          <div class="Index_flex_2">  <h4>  <span><i style="color:red">*</i>医师职称证书</span> </h4></div>
          <div class="Index_flex_2 Index_flex_">
                <div class="Index_flex_ flexWarp" >
                  <div v-for ='(item , index) in imglist2' :key="index" class="upld">
                    <img v-if="item" :src="item" class="avatar blockImg" @mouseenter="change(index)" @mouseleave="change(index)" @click="img_(item)">
                  </div>
                </div>
          </div>
          <div class="div_" v-if="reason=='2'">
            <el-button type="primary" class="btn_save" @click="confirm2('1')">审核通过</el-button>
            <el-button type="success" class="btn_save" @click="reject">驳回</el-button>
          </div>
           <el-dialog title="详情" :visible.sync="dialogFormVisibleIMG">
           <img :src="IMG" alt="" srcset="" class="dialog">
         </el-dialog>
          <resume :dataIframe='iframe' ref="mychild" class="opacity"/>
      </div>
      <!-- 驳回 -->
        <el-dialog title="驳回" :visible.sync="dialogFormVisibleRE">
          <div class="reject">
            <span class="reject_span"><i style="color:red">*</i>驳回原因</span>
            <el-input v-model="form.doctor_reason" rows = "4" type="textarea" placeholder="请输入内容"></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleRE = false">取 消</el-button>
            <el-button type="primary" @click="confirm2('3')">确 定</el-button>
          </div>
        </el-dialog>
        <AnimateFly class="showFly1 animate-bounce-up point" title="点击回退"></AnimateFly>
    </div>
</template>

<script type='text/ecmascript-6'>
import Qs from 'qs';
import resume from '@/navigation/resume.vue'
import AnimateFly from '@/components/animate.vue';
  export default {
    data () {
      return {
        options: [{//性别
          value: '0',
          label: '未知性别'
        },{//性别
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }, {
          value: '9',
          label: '未说明性别'
        }],
        optionsStatus:[
          {value: '1',label: '正常'},
          {value: '2',label: '封禁'},
        ],
        talk_timeArr:[
          {value: '5',label: '5分钟'},
          {value: '10',label: '10分钟'},
          {value: '15',label: '15分钟'},
          {value: '20',label: '20分钟'},
          {value: '25',label: '25分钟'},
          {value: '30',label: '30分钟'},
        ],
        optionsPirce:[
          {value: '0',label: '0'},
          {value: '10',label: '10'},
          {value: '20',label: '20'},
          {value: '30',label: '30'},
          {value: '40',label: '40'},
          {value: '50',label: '50'},
          {value: '60',label: '60'},
          {value: '70',label: '70'},
          {value: '80',label: '80'},
          {value: '90',label: '90'},
          {value: '100',label: '100'},
        ],
        optionsTitle:[],
        firstDepartment:[],
        twoDepartment:[],
        value: '',
        timeline:[{
          timestamp:"星期一",
          value1:'',
          value2:'',
        },{
          timestamp:"星期二",
          value1:'',
          value2:'',
        },{
          timestamp:"星期三",
          value1:'',
          value2:'',
        },{
          timestamp:"星期四",
          value1:'',
          value2:'',
        },{
          timestamp:"星期五",
          value1:'',
          value2:'',
        },{
          timestamp:"星期六",
          item:'',
          value2:'',
        },{
          timestamp:"星期日",
          value1:'',
          value2:'',
        },],
        form:{},
        department1:'',
        department2:"",
        imglist:[],//医师资格证书集合
        imglist11:[],//医师资格证书集合
        imglistBase:[],//医师资格证书集合
        out:1,
        type:false,
        imglist2:[],//教师资格证书
        imglist22:[],//教师资格证书
        out2:1,
        type2:false,
        reason:'',
        changeValue:true,
        iframe:"",
        resumeShow:false,
        optionsprac:[],
        prac_type:'',//leibie
        prac_scope:'',//范围
        fanwei:'',//范围
        qualify_or_:[{
          title:'是',
          name:'合格'
        },{
          title:'否',
          name:'不合格' 
        }],
        IMG:'',
        typeVal:'',//提交还是审核
        dialogFormVisibleRE:false,
        dialogFormVisibleIMG:false
      }
    },created(){
      this.firstDepartmentFun();
      this.titleInfo();
      this.detailsTeacher();
      this.reason = this.$store.state.json.doctor_status;
      if(this.$store.state.json.doctor_status == '1'){
        this.changeValue = true ;
      }
      this.doctor_reason = this.$store.state.json.doctor_reason;
      this.optionspracFun();
    },
    components:{
      resume,AnimateFly
    },
    watch:{
      department1(val){
        this.form.department1= val;
        this.department1 = val;
        this.twoDepartmentFun(val);
      },
      department2(val){
        this.form.department2= val;
        this.department2 = val;
      },
      out(val){
        this.out = val;
      },
      type(val){
        this.out = val;
      },
      out2(val){
        this.out2 = val;
      },
      type2(val){
        this.out2 = val;
      },
    },
    methods:{
      
      reject(){
          this.dialogFormVisibleRE = true;
      },
      img_(val){
        this.dialogFormVisibleIMG = true;
        this.IMG = val;
      },
      confirm2(val){//调用子组件方法
        this.typeVal = val;
        this.$refs.mychild.deleteRow()
      },
      detailsTeacher(){//医师详情
        let data = {
          docid :this.$store.state.json.doctor_id
        }
        this.$api.docInfo(data)
          .then((res)=>{
            this.translate(res.data)
          })
      },
      optionspracFun(){
        this.$axios.get('../../static/range.json')
          .then((res)=>{
            this.optionsprac = res.data.data;
          })
      },
      //转化参数
      translate(val){
          let data = {
            certificate:val.doctor_certificate,
            certificate_url1:val.doctor_certificate_url1,
            certificate_url2:val.doctor_certificate_url2,
            certificate_url3:val.doctor_certificate_url3,
            certificate_url4:val.doctor_certificate_url4,
            certificate_url5:val.doctor_certificate_url5,
            certificate_url6:val.doctor_certificate_url6,
            department1:val.doctor_department1,
            department2:val.doctor_department2,
            field:val.doctor_field,
            reason:val.doctor_reason,
            pswd:val.user_pswd,
            doctor_sunday1:val.doctor_sunday1,
            doctor_sunday2:val.doctor_sunday2,

            doctor_saturday1:val.doctor_saturday1,
            doctor_saturday2:val.doctor_saturday2,

            doctor_friday1:val.doctor_friday1,
            doctor_friday2:val.doctor_friday2,

            doctor_thursdy1:val.doctor_thursdy1,
            doctor_thursdy2:val.doctor_thursdy2,

            doctor_wednesday1:val.doctor_wednesday1,
            doctor_wednesday2:val.doctor_wednesday2,

            doctor_tuesday1:val.doctor_tuesday1,
            doctor_tuesday2:val.doctor_tuesday2,
            
            doctor_friday1:val.doctor_monday1,
            doctor_friday1:val.doctor_monday2,
            
            pswd:val.user_pswd,
            twprice:val.doctor_tw_price,
            videoprice:val.doctor_video_price,
            icon:val.doctor_icon,
            idcard:val.doctor_idcard,
            idcard_url1:val.doctor_idcard_url1,
            idcard_url2:val.doctor_idcard_url2,
            introduction:val.doctor_introduction,
            phone:val.doctor_mobile,
            nickname : val.doctor_nickname,
            department1 : val.doctor_department1,
            department2 : String(val.doctor_department2),
            gender:String(val.doctor_gender),
            doctor_title:String(val.doctor_title),
            status:val.user_status,
            opentw:String(val.doctor_open_tw),
            proportion1:val.doctor_proportion1,
            proportion2:val.doctor_proportion2,
            openvideo:String(val.doctor_open_video),
            hospital:val.doctor_hospital,
            doctor_bir:val.doctor_bir,
            qualify_or_not:val.qualify_or_not,
            cert_no:val.cert_no,
            cert_rec_date :val.cert_rec_date  ,
            prac_no:val.prac_no,
            prac_rec_date:val.prac_rec_date,
            doc_multi_sited:val.doc_multi_sited,
            doc_multi_sited_date_start:val.doc_multi_sited_date_start,
            doc_multi_sited_date_end:val.doc_multi_sited_date_end,
            prac_type:val.prac_type,
            prac_scope:val.prac_scope,
            credit_level:val.credit_level,
            occu_level:val.occu_level,
            doc_penalty_points:val.doc_penalty_points,
            doctor_talk_time:val.doctor_talk_time
          }
          this.prac_type = val.prac_type;
          this.prac_scope = val.prac_scope;
           this.form = data ;
           this.form.docid = val.doctor_id;
           let that = this;
           for(var i = 0; i<6;i++){
                let j = i+1;
                if(val['doctor_qualification_url'+j]!=null){
                    that.imglist[i] = val['doctor_qualification_url'+j];
                }
                that.form['qualification_url'+j] = val['doctor_qualification_url'+j];
           }
           for(var i = 0; i<6;i++){
                let j = i+1;
                if(val['doctor_certificate_url'+j]!=null){
                    that.imglist2[i] = val['doctor_certificate_url'+j];
                }
                that.form['certificate_url'+j] = val['doctor_certificate_url'+j]
           }
            this.timeline[6].value1=val.doctor_sunday1;
            this.timeline[6].value2=val.doctor_sunday2;

            this.timeline[5].value1=val.doctor_saturday1;
            this.timeline[5].value2=val.doctor_saturday2;

            this.timeline[4].value1=val.doctor_friday1;
            this.timeline[4].value2=val.doctor_friday2;

            this.timeline[3].value1=val.doctor_thursdy1;
            this.timeline[3].value2=val.doctor_thursdy2;

            this.timeline[2].value1=val.doctor_wednesday1;
            this.timeline[2].value2=val.doctor_wednesday2;

            this.timeline[1].value1=val.doctor_tuesday1;
            this.timeline[1].value2=val.doctor_tuesday2;
            
            this.timeline[0].value1=val.doctor_monday1;
            this.timeline[0].value2=val.doctor_monday2;

            this.department1 = val.doctor_department1;
            this.department2 = val.doctor_department2;
      },
      change(index){ //
        this.out = index;
      },
      change2(index){ //改面状态
        this.out2 = index;
      },
      submit(res){//审核和驳回
        let data , val = this.typeVal;
        data= {
          docid:this.form.docid,
          type:val,
          doc_multi_sited_lic_record :res
        };
        if(val == '3'){
            data.doctor_reason = this.form.doctor_reason ;
        }
        this.$api.docStatusManageup(data)
          .then((res) => {
            this.dialogFormVisibleT= false;
            setTimeout(()=>{
              this.$router.push('/doctorCheck')
            },1000)
              if(val=='1'){  //更换为手签  添加
                let data = {
                  userId:this.form.docid,//用户ID
                  name:this.form.nickname,//姓名
                  idcard:this.form.idcard,//身份证号
                };
                this.addPersonalAcct(data)
              }
            });
      },
      // submit(photo){ //提交审核
      //   this.examine(photo);
      //   let data = this.iframe;
      //   this.$api.doctorManageIns(data)
      //     .then((res)=>{
      //         setTimeout(()=>{
      //             this.$router.push({
      //                 path: '/informatization',
      //             })
      //             this.addPersonalAcct(data)
      //         },1000)
      //     })
      // },
      addPersonalAcct(val){
        // console.log(val,"123")
        // let deanid = Base64.decode(sessionStorage.getItem(Base64.encode('go')));
        let data = {
          userId:val.userId,
          name:val.name,
          idcard:val.idcard,
          // deanid:deanid,
        };
        this.$api.addPersonalAcct(data)
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
      //封装的话无非多了几个sitch case  或者if else 就没封住就这样吧
      upLoad(file) { //上传身份证正面
        this.getBase64(file.file).then(res => {
            this.form.id_card_1 = res;
            this.axiosUpload(res);
        });
      },
      upLoad_(file) { //上传医生base64编码头像
        this.getBase64(file.file).then(res => {
            this.form.doc_photo = res ;
            this.axiosUpload_(res);
        });
      },
      upLoad1(file) { ////上传解码 身份证反面
        this.getBase64(file.file).then(res => {
            this.form.id_card_2 = res;
            this.axiosUpload1(res);
        });
      },
    
      upLoad5(file){ //上传解码
        this.getBase64(file.file).then(res => {
            this.axiosUpload5(res);
        });
      },
      axiosUpload_(file){//上传图片头像 
        let data ={
            filestr:file,
        }
        this.$api.upLoad(data).then((res) => {
          if (res.code == '200') {
            this.form.icon = res.icon; // 请求成功之后赋给头像的URL
            this.form.doc_photo = file;
          }
        });
      },
      axiosUpload(file){//上传图片身份证正面
        let data ={
            filestr:file,
        }
        this.$api.upLoad(data).then((res) => {
          if (res.code == '200') {
            this.form.idcard_url1 = res.icon; // 请求成功之后赋给头像的URL
            this.form.id_card_1 = file;
          }
        });
      },
      axiosUpload1(file){//上传图片身份证反面
        let data ={
            filestr:file,
        }
        this.$api.upLoad(data).then((res) => {
          if (res.code == '200'  ) {
            this.form.idcard_url2 = res.icon; // 请求成功之后赋给头像的URL
            this.form.id_card_2 = file;
          }
        });
      },
      axiosUpload5(file){//上传图片（修改职称证书）
        let data ={
            filestr:file,
        }
        this.$api.upLoad(data).then((res) => {
          if (res.code == '200') {
              this.imglist2[this.out2]= res.icon; // 请求成功之后赋给头像的URL
              this.type2 = !this.type2 ;
              this.imglist22[this.out2]= file;
          }
        });
      },
      getaddress(){//获取省份
        let data ={
            province :this.user_province
        }
        this.$api.getaddress(data).then((res) => {
          if(this.user_province!=''){
            this.options2= res.data;
          }else{
            this.options1= res.data;
          }
        });
      },
      beforeAvatarUpload(file) {//限制文件大小
       const isLt2M = file.size / 1024 / 1024 < 0.2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      firstDepartmentFun(){//第一科室
        let firstDepartment = this.$store.state.firstDepartment ;
        if(!firstDepartment){
            let data = {};
            this.$api.firstDepartment(data)
                  .then(res => {
                    this.firstDepartment = res.data;
                  })
        }else{
          this.firstDepartment = firstDepartment;
        }
      },
      titleInfo(){//职称
        let type = this.$store.state.login.user_type;
        let titleInfo = this.$store.state.titleInfo ;
        let data = {
          type:"2"
        };
          this.$api.titleInfo(data)
                  .then(res => {
                    this.optionsTitle = res.data;
                  })
      },
      twoDepartmentFun(val){//二级科室
        let data = {
           departId:val
        };
        this.$api.twoDepartment(data)
          .then((res)=>{
              this.twoDepartment = res.data;
          })
      }
    }
  }
</script>

<style scoped type='text/css'>
div{
      box-sizing: border-box;
}
.title{
  width: 200px;
  white-space: nowrap;
  padding: 0px 10px;
  display: inline-block;
  text-align: left;
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
/* padding-bottom: 100px; */
}
.Index_flex{
  display: flex;
    padding: 40px;
  box-sizing: border-box;
}
.Index_flex_box{
  padding-top: 40px;
}
.Index_app-box{
  background:rgba(255,255,255,1);
  box-shadow:0px 1px 10px 2px rgba(227,224,224,0.5);
  border-radius:8px;
    margin-bottom: 20px;
}

/deep/ .el-input__inner{
    height: 50px;
}
.Index_flex_ .el-input{
  flex: 1;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .flex-1{
    display: flex;
    flex-wrap: wrap;
  }
  .Index_flex_{
      display: flex;
      align-items: center;
      margin: 10px 20px;
      padding: 0px 10px;
  }
  .Index_flex_ i{
    padding: 0px 5px;
    color: red;
  }
  .Index_flex_ span{
    text-align: right;
  }
  .photo{
    text-align: center;
    flex-direction: column;
  }
  .Index_flex_2{
    display: flex;
    padding: 10px;
  }
  .Index_flex_2 span{
    text-align: right;
    width: 60px;
  } 
  .autoWidth{
    width: 100px!important;
  }     
.Index_flex_2 .avatar{
  max-width: 180px;
  margin: 0px 10px;

}
.div_{
  display: flex;
  padding: 20px;
  justify-content: flex-end;
}
/deep/.el-button{
  width: 200px!important;
}
.alitem span{
    width: 200px!important;
    margin-right: 20px;
    text-align: left;
}
.alitem{
    display: flex;
    align-items: center;
}
.block{
  padding: 10px;
}
/deep/ .block .el-timeline-item__node{
  background: #45c245!important;
}
.blockMargin{
  margin: 0px!important;
}
.blockMargin span{
  padding: 0px 10px;
}
.width{
  width: 80px;
}
.spanWidth{
  width: auto!important;
  padding: 0px 5px;
}
.upld{
  position: relative;
}
 /deep/ .upld .avatar-uploader{
  position: absolute;
    top: 0px;/*no*/
    left: 3px;/*no*/
    background: rgba(0,0,0,.2);
    z-index: 1;
}
/deep/ .upld i{
  color: #000;
}
.blockImg{
  display: inline;
}
.img_front{
  width: 50px;/*no*/
  border-radius:5px;
}
/deep/ .uploadID .el-upload{
  position: relative!important;
}
/deep/.uploadID .avatar{
  position: absolute;
  z-index: 1;
}
.prac .el-select{
  flex: 1;
}
.opacity{
  position: absolute;
  z-index: -2;
  top: -1000px;
}
.dialog{
  width: 100%;
}
</style>