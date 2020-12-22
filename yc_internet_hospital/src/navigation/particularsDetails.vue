<template>
    <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex_box">
          <div class="flex-1">
            <div class="photo Index_flex_">
              <el-upload
                class="avatar-uploader iconPhoto"
                action=""
                :show-file-list="false"
                accept=".jpg,.jpeg,.JPG,.JPEG"
                :http-request="upLoadicon"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.icon" :src="form.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
                <span><i style="color:red">*</i>上传图片</span>
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
                  <span class="title"><i>*</i>医师执业证书编号</span>
                  <el-input v-model="form.certificate" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>
                <div class="Index_flex_">
                  <span class="title"><i>*</i>医师职称证号</span>
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
                  <span class="title"><i>*</i> 多点执业起始时间</span>
                      <!-- <el-date-picker
                       :disabled="changeValue"
                      type="date"
                        v-model="form.doc_multi_sited_date_start"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期时间">
                      </el-date-picker> -->
                      <el-date-picker
                      style="flex:1"
                        v-model="dataTimeDu"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        :start-placeholder="dataTimeDu[0]||'开始日期'"
                        :end-placeholder="dataTimeDu[1]||'开始日期'">
                      </el-date-picker>
                </div>
                <!-- <div class="Index_flex_">
                      <span class="title"><i>*</i>多点执业终止时间</span>
                      <el-date-picker
                       :disabled="changeValue"
                        v-model="form.doc_multi_sited_date_end"
                        format="yyyy-MM-dd"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期时间">
                      </el-date-picker>
                </div> -->
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
                      <h4> <i style="color:red">*</i> 视频问诊 </h4>
                </span>
                <template :aria-disabled="changeValue">
                    <el-radio v-model="form.openvideo" label="1" :disabled="changeValue">开通</el-radio>
                </template>
          </div>
          <div class="Index_flex_2 alitem width">
                <span>
                      <h4>  <i style="color:red">*</i> 图文问诊 </h4>
                </span>
                <template >
                    <el-radio v-model="form.opentw" label="1" :disabled="changeValue">开通</el-radio>
                </template>
          </div>
          <div>
                <div class="Index_flex_">
                  <span class="title"> <h4> <i style="color:red">*</i>图文问诊价格 </h4></span> 
                  <el-input v-model="form.twprice" type="number" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>
                 <div class="Index_flex_">
                  <span class="title"> <h4> <i style="color:red">*</i>视频问诊价格 </h4></span>
                  <el-input v-model="form.videoprice" type="number" placeholder="请输入内容" :readonly="changeValue"></el-input>
                </div>  
          </div>
          <div class="Index_flex_2 flexWarp">
                <div class="Index_flex_">
                  <span class="spanWidth"> <h4> <i style="color:red">*</i>图文价格分配 医师占比 (%)</h4></span> 
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
                  <span class="spanWidth"> <h4> <i style="color:red">*</i>视频价格分配 医师占比 (%)</h4></span>
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
                  <span class="spanWidth"> <h4> <i style="color:red">*</i>视频问诊通话时长</h4></span>
                  <el-select v-model="form.doctor_talk_time" placeholder="请选择" :disabled="changeValue" >
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
            <span class="spanWidth"><h4> <i style="color:red;padding:10px">*</i>在线时间设置</h4></span>
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
          <div class="Index_flex_2"><span class="alitemSpan"> <h4> <i style="color:red;padding:10px">*</i>身份证(正反面[2张]) </h4></span></div>
          <div class="Index_flex_2">
            <el-upload
              class="upload-demo"
              action=""
              drag
              :limit = 2
              :auto-upload="true"
              :http-request="upLoadIdcard"
              :on-remove="handleRemoveIdcard"
              accept=".jpg,.jpeg,.JPG,.JPEG"
              :before-upload="beforeAvatarUpload"
              :file-list="fileListIdcard"
              list-type="picture">
              <i class="el-icon-plus avatar-uploader-icon uploadI" ></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过200kb</div>
              <!-- <el-button  type="primary" class="uploadImg"><i class="el-icon-plus avatar-uploader-icon uploadI" ></i></el-button> -->
            </el-upload>
          </div>
          <div class="Index_flex_2"> <h4> <span><i style="color:red;padding:10px">*</i>医师资格证书[最多6张]</span> </h4></div>
          <div class="Index_flex_2">
            <el-upload
              class="upload-demo"
              action=""
              drag
              :auto-upload="true"
              :http-request="upLoadDoctor"
              :limit = 6
              :on-remove="handleRemoveDoctor"
              accept=".jpg,.jpeg,.JPG,.JPEG"
              :before-upload="beforeAvatarUpload"
              :file-list="fileListDoctor"
              list-type="picture">
              <i class="el-icon-plus avatar-uploader-icon uploadI" ></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过200kb</div>
              <!-- <el-button  type="primary" class="uploadImg"><i class="el-icon-plus avatar-uploader-icon uploadI" ></i></el-button> -->
            </el-upload>
          </div>
          <div class="Index_flex_2">  <h4>  <span><i style="color:red;padding:10px">*</i>医师职称证书[最多6张]</span> </h4></div>
          <div class="Index_flex_2">
            <el-upload
              class="upload-demo"
              action=""
              drag
              :auto-upload="true"
              :http-request="upLoadPosition"
              accept=".jpg,.jpeg,.JPG,.JPEG"
              :limit = 6
              :on-remove="handleRemovePosition"
              :before-upload="beforeAvatarUpload"
              :file-list="fileListPos"
              list-type="picture">
              <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过200kb</div>
              <i class="el-icon-plus avatar-uploader-icon uploadI" ></i>
              <!-- <el-button  type="primary" class="uploadImg"><i class="el-icon-plus avatar-uploader-icon uploadI" ></i></el-button> -->
            </el-upload>
          </div>
          <div class="Index_flex_2">  <h4>  <span><i style="color:red;padding:10px">*</i>医师执业证书[最多6张]</span> </h4></div>
         
          <div class="Index_flex_2">
            <el-upload
              ref='fileListPra'
              class="upload-demo"
              action=""
              drag
              :limit = 6
              :auto-upload="true"
              :on-remove="handleRemovePractice"
              :http-request="upLoadPractice"
              accept=".jpg,.jpeg,.JPG,.JPEG"
              :before-upload="beforeAvatarUpload"
              :file-list="fileListPra"
              list-type="picture">
              <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过200kb [最多6张]</div>
              <i class="el-icon-plus avatar-uploader-icon uploadI" ></i>
            </el-upload>
          </div>

          <div class="Index_flex_2"><span class="alitemSpan"> <h4> <i style="color:red;padding:10px">*</i>互联网医院聘任合同</h4></span></div>
          <div class="Index_flex_2">
            <el-upload
              class="upload-demo"
              action=""
              drag
              :limit = 2
              :auto-upload="true"
              :http-request="upLoadContract"
              :on-remove="handleRemoveContract"
              accept=".jpg,.jpeg,.JPG,.JPEG"
              :before-upload="beforeAvatarUpload"
              :file-list="fileListContract"
              list-type="picture">
              <i class="el-icon-plus avatar-uploader-icon uploadI" ></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过200kb</div>
            </el-upload>
          </div>
          <div class="div_">
              <el-button type="primary" class="btn_save" @click="href">保存</el-button>
              <el-button type="warning" class="btn_save" @click="huizhichange">修改签名</el-button>
          </div>
          <resume :dataIframe='iframe' ref="mychild" class="opacity"/>
      </div>
      <AnimateFly class="showFly1 animate-bounce-up point"  title="点击回退"></AnimateFly>
      <el-dialog
        title="签字"
        :visible.sync="dialogVisiblehuizhi"
        width="100%"
        :before-close="handleClosehuizhi">
      <sign ref="sign"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblehuizhi = false">取 消</el-button>
        <el-button @click="canvasOverflow">重 绘</el-button>
        <el-button type="primary" @click="confim">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script type='text/ecmascript-6'>
  import AnimateFly from '@/components/animate.vue';
  import resume from '@/navigation/resume.vue'
  import sign from '@/navigation/sign.vue'
  export default {
    data () {
      return {
        dialogVisiblehuizhi:false,
        options: [{//性别
          value: '0',
          label: '未说明性别'
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
        talk_timeArr:[
          {value: '5',label: '5分钟'},
          {value: '10',label: '10分钟'},
          {value: '15',label: '15分钟'},
          {value: '20',label: '20分钟'},
          {value: '25',label: '25分钟'},
          {value: '30',label: '30分钟'},
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
        }],
        form:{},
        fileList:[],
        department1:'',
        department2:"",
        reason:'',
        changeValue:false,
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
        fileListIdcard:[],//身份证
        fileListDoctor:[],//医师资格证书
        fileListPos:[],//职称证书
        fileListPra:[],//医师执业证书
        fileListContract:[],//合同
        dataTimeDu:[],
      }
    },created(){
      this.firstDepartmentFun();
      this.titleInfo();
      this.detailsTeacher();
      this.reason = this.$store.state.json.doctor_status;
      if(this.$store.state.json.doctor_status == '1'||this.$store.state.json.doctor_status == '3'){
        this.changeValue = false ;
      }
      this.doctor_reason = this.$store.state.json.doctor_reason;
      this.optionspracFun();
    },
    components:{
      resume,AnimateFly,sign
    },
    watch:{
      department1(val){
        this.form.department1= val;
        this.department1 = val;
         this.department2 = '';
        this.twoDepartmentFun(val);
      },
      department2(val){
        this.form.department2= val;
        this.department2 = val;
      },
      prac_type(val){//类别
        this.form.prac_type = val;
        switch(val){
          case '临床类别':
            this.fanwei = this.optionsprac.content;
          break;
          case '口腔类别':
            this.fanwei = this.optionsprac.content2;
          break;
          case '公共卫生':
            this.fanwei = this.optionsprac.content3;
          break;
          case '中医类别':
            this.fanwei = this.optionsprac.content4;
          break;
        }
      },
      prac_scope(val){//范围
        this.form.prac_scope = val;
      },
    },
    methods:{
      callBackUrl(res){
        this.dialogVisiblehuizhi = false;
        this.form.sxsealData =  res;
      },
      handleClosehuizhi(){
        this.dialogVisiblehuizhi = false;
      },
      confim(){
        this.$refs.sign.downloadResult();
      },
      canvasOverflow(){
        this.$refs.sign.overwrite();
      },
      huizhichange(){
          this.dialogVisiblehuizhi = true;
          this.$refs.sign.overwrite();
      },
      upLoadicon(file){// 头像
        this.getBase64(file.file).then(res => {
            this.axiosUpload(res,"icon");
        });
      },
      upLoadIdcard(file){// 身份证 正反面编码
        this.getBase64(file.file).then(res => {
            let file_ = file.file;
            this.fileListIdcard.push({url:'',name:file_.name,uid:file_.uid,type:file_.type,size:file_.size });
            this.axiosUpload(res,"idcard");
        });
      },
      upLoadDoctor(file){// 医师资格证书 编码
        this.getBase64(file.file).then(res => {
            let file_ = file.file;
            this.fileListDoctor.push({url:'',name:file_.name,uid:file_.uid,type:file_.type,size:file_.size });
            this.axiosUpload(res,"doctor");
        });
      },
      upLoadPosition(file){//  医师职称证书
        this.getBase64(file.file).then(res => {
            let file_ = file.file;
            this.fileListPos.push({url:'',name:file_.name,uid:file_.uid,type:file_.type,size:file_.size });
            this.axiosUpload(res,"Position");
        });
      },
      upLoadPractice(file){//  医师执业证书
              let file_ = file.file;
              this.fileListPra.push({url:'',name:file_.name,uid:file_.uid,type:file_.type,size:file_.size });
              this.getBase64(file.file) 
                  .then(res => {
                    this.axiosUpload(res,"Practice");
                  });
      },
      upLoadContract(file){// 合同
              let file_ = file.file;
              this.fileListContract.push({url:'',name:file_.name,uid:file_.uid,type:file_.type,size:file_.size });
              this.getBase64(file.file) 
                .then(res => {
                  this.axiosUpload(res,"Contract");
                });
      },
      axiosUpload(file,type){//  身份证 上传
        let data ={
            filestr:file,
        }
         this.$api.upLoad(data).then((res) => {
          if (res.code == '200') {
            switch (type){
              case "icon":
                this.form.icon = res.icon;
              break;
              case "idcard":
                this.fileListIdcard[this.fileListIdcard.length-1].url = res.icon;
              break;
              case "doctor":
                this.fileListDoctor[this.fileListDoctor.length-1].url = res.icon;
              break;
              case "Position":
                this.fileListPos[this.fileListPos.length-1].url = res.icon;
              break;
              case "Practice":
                this.fileListPra[this.fileListPra.length-1].url = res.icon;
              break;
              case "Contract":
                this.fileListContract[this.fileListContract.length-1].url = res.icon;
              break;
            }
          }
        });
      },
     
      handleRemoveIdcard(file,fileList){//身份证删除
        this.fileListIdcard = fileList;
      },
      handleRemoveDoctor(file,fileList){//资格证书删除
        this.fileListDoctor = fileList;
      },
      handleRemovePosition(file,fileList){//职称证书删除
        this.fileListPos = fileList;
      },
      handleRemovePractice(file,fileList){//执业证书删除
        this.fileListPra = fileList;
      },
      handleRemoveContract(file,fileList){//合同删除
        this.fileListContract = fileList;
      },
      href(){//调用子组件方法
        let type = this.$store.state.type ;
        if(type=='0'){
          this.$refs.mychild.deleteRow()
        }
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
      //optionsprac
      optionspracFun(){
        this.$axios.get('../../static/range.json')
          .then((res)=>{
            this.optionsprac = res.data.data;
          })
      },
      //转化参数
      translate(val){
          let data = {
            sxsealData:val.sxsealData,
            certificate:val.doctor_certificate,
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
            doc_multi_sited:"怡成互联网医院",
            doc_multi_sited_date_start:val.doc_multi_sited_date_start,
            doc_multi_sited_date_end:val.doc_multi_sited_date_end,
            
            prac_type:val.prac_type,
            prac_scope:val.prac_scope,
            credit_level:val.credit_level,
            occu_level:val.occu_level,
            doc_penalty_points:val.doc_penalty_points,
            title_no : val.title_no,
            title_rec_date :val.title_rec_date,
            doctor_talk_time:val.doctor_talk_time
          }
          this.dataTimeDu[0] = val.doc_multi_sited_date_start;
          this.dataTimeDu[1] = val.doc_multi_sited_date_end;
           this.prac_type = val.prac_type;
           this.prac_scope = val.prac_scope;
           this.form = data ;
           this.form.docid = val.doctor_id;
         
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
            let that = this;
            for(var i = 0 ; i<2;i++){//合同
              if(that.fileListContract.length<2){
                if(i==0){
                  if(val.employ_file_url!='null' && val.employ_file_url!='' && val.employ_file_url!= null){
                      that.fileListContract.push({url:val.employ_file_url,name:'******'})
                  }
                }else{
                  if(val.employ_file_url2!='null' && val.employ_file_url2!='' && val.employ_file_url2!= null){
                      that.fileListContract.push({url:val.employ_file_url2,name:'******'})
                  }
                }
              }
            }
            
            for(var i = 0 ; i<2;i++){//身份证
              if(that.fileListIdcard.length<2){
                if(val["doctor_idcard_url"+(i+1)]!='null' && val["doctor_idcard_url"+(i+1)]!='' && val["doctor_idcard_url"+(i+1)]!= null){
                  that.fileListIdcard.push({url:val["doctor_idcard_url"+(i+1)],name:'******'})
                }
              }
            }
            for(var i = 0 ; i<6;i++){//职称证书
              if(that.fileListDoctor.length<6 &&val["doctor_certificate_url"+(i+1)]!='null' && val.employ_file_url!='' && val["doctor_certificate_url"+(i+1)]!= null){
                that.fileListPos.push({url:val["doctor_certificate_url"+(i+1)],name:'******'})
              }
            }
            for(var i = 0 ; i<6;i++){//资格证书
              if(that.fileListDoctor.length<6 && val["doctor_qualification_url"+(i+1)]!='null' && val.employ_file_url!='' && val["doctor_qualification_url"+(i+1)]!= null){
                that.fileListDoctor.push({url:val["doctor_qualification_url"+(i+1)],name:'******'})
              }
            }
            for(var i = 0 ; i<6;i++){//执业证书
              if(that.fileListPra.length<6 && val["cert_doc_prac"+(i+1)]!='null' && val.employ_file_url!='' && val["cert_doc_prac"+(i+1)]!= null){
                that.fileListPra.push({url:val["cert_doc_prac"+(i+1)],name:'******'})
              }
            }
      },
      examine(photo){
          let data = this.form;
          data.idcard = data.idcard;
          data.phone = data.phone;
          data.pswd = data.pswd;
          data.doctor_monday1 = this.timeline[0].value1;
          data.doctor_monday2 = this.timeline[1].value2;

          data.doctor_tuesday1 = this.timeline[0].value1;
          data.doctor_tuesday2 = this.timeline[1].value2;

          data.doctor_wednesday1 = this.timeline[0].value1;
          data.doctor_wednesday2 = this.timeline[1].value2;

          data.doctor_thursdy1 = this.timeline[0].value1;
          data.doctor_thursdy2 = this.timeline[1].value2;

          data.doctor_friday1 = this.timeline[0].value1;
          data.doctor_friday2 = this.timeline[1].value2;
          
          data.doctor_saturday1 = this.timeline[0].value1;
          data.doctor_saturday2 = this.timeline[1].value2;

          data.doctor_sunday1 = this.timeline[0].value1;
          data.doctor_sunday2 = this.timeline[1].value2;
          data.doc_multi_sited_lic_record = photo ;
          data.title = data.doctor_title;
          let data_ = data,that = this;
          let fileListIdcard = JSON.parse(JSON.stringify(this.fileListIdcard)) ;
          let fileListDoctor = JSON.parse(JSON.stringify(this.fileListDoctor));
          let fileListPos = JSON.parse(JSON.stringify(this.fileListPos)) ; 
          let fileListPra = JSON.parse(JSON.stringify(this.fileListPra)) ;
          let fileListContract = JSON.parse(JSON.stringify(this.fileListContract)) ;
          //身份证
          for(var i = 0 ; i < 2 ;i++){
            if(fileListIdcard[i]!=null){
              data["idcard_url"+(i+1)] = fileListIdcard[i].url;
            }else{
              data["idcard_url"+(i+1)] = 'null';
            }
          }
          //医师资格证书
          for(var i = 0 ; i < 6 ;i++){
            if(fileListDoctor[i]!=null){
              data["qualification_url"+(i+1)] = fileListDoctor[i].url;
            }else{
              data["qualification_url"+(i+1)] = 'null';
            }
          }
          //医师职称证书
          for(var i = 0 ; i < 6 ;i++){
            if(fileListPos[i]!=null){
              data["certificate_url"+(i+1)] = fileListPos[i].url;
            }else{
              data["certificate_url"+(i+1)] = 'null';
            }
          }
          //执业证书
          for(var i = 0 ; i < 6 ;i++){
            if(fileListPra[i]!=null){
              data["cert_doc_prac"+(i+1)] = fileListPra[i].url;
            }else{
              data["cert_doc_prac"+(i+1)] = 'null';
            }
          }
          //合同
          for(var i = 0 ; i < 2 ;i++){
            if(i==0){
              if(fileListContract[0]!=null){
                data_.employ_file_url = fileListContract[0].url;
              }
            }else{
              if(fileListContract[1]!=null){
               data_.employ_file_url2 = fileListContract[1].url;
              }
            }
          }
          
          this.iframe = data_;
      },
      submit(photo){ //提交审核
        this.examine(photo); 
        let data = this.iframe;
        data.doc_multi_sited_date_start = this.dataTimeDu[0];
        data.doc_multi_sited_date_end =this.dataTimeDu[1];
        let test = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/ ;
        let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(!TEL_REGEXP.test(data.phone)){
          this.$message('手机号有误');
          return false;
        }
        if(!test.test(data.idcard)){
          this.$message('身份证号有误');
          return false;
        }
        this.$api.doctorManageup(data)
          .then((res)=>{
             this.addPersonalAcct(data)
                    .then((res)=>{
                      setTimeout(()=>{
                        this.$router.push({
                            path: '/informatization',
                        })
                      },1000)
                    })
          })
      },
      addPersonalAcct(val){
        // let deanid = Base64.decode(sessionStorage.getItem(Base64.encode('go')));
        let data = {
          userId:val.docid,
          name:val.nickname,
          idcard:val.idcard,
          sxsealData:val.sxsealData,
          // deanid : deanid,
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
          this.$message.error('上传头像图片大小不能超过 200k!');
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
      },
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
/* .photo{
    min-width: 178px;
    min-height: 178px;
} */
/deep/ .uploadImg{
  /* width: 100px!important;
  height: 100px; */
  background: none;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  border: 1px dashed #000;
}
.uploadI{
  /* position: absolute;
  left: 0px;
  top: 0px; */
  /* width: 100px;
  height: 100px;
  line-height: 100px; */
}
/* /deep/.upload-demo .el-upload-list--picture{
  width: 450px!important;
} */
/* /deep/ .photoBorder{
  border: 1px dashed #000!important;
  padding: 10px;
} */
/deep/ .iconPhoto{
  border: 1px dashed #cecece;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
}

</style>