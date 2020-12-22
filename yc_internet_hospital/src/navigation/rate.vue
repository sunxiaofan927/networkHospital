<template>
  <div class="app">
      <div class="Index_app-box">
        <div class="Index_flex flexWarp">
          <!-- <div class="Index_flex_  display">
              <span class="title">药店名称</span>
               <el-date-picker
                    v-model="m_userid"
                    type="year"
                    placeholder="选择年">
                </el-date-picker>
          </div>
          <div class="marginLeft">
              <el-button type="primary" round @click="axios(1)">查询</el-button>
              <el-button type="primary" round @click="submit" >提交</el-button>
          </div> -->
          <el-button type="primary" round @click="submit" >提交</el-button>
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
                      <span v-if="col.prop==='deduct'">
                            <el-select v-model="form.value1" placeholder="请选择" v-if="scope.row['deduct'] == 1">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                                </el-option>
                            </el-select> 
                            <el-select v-model="form.value2" placeholder="请选择" v-if="scope.row['deduct'] == 2">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :value="item.value">
                                </el-option>
                            </el-select> 
                            <el-select v-model="form.value3" placeholder="请选择" v-if="scope.row['deduct'] == 3">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                                </el-option>
                            </el-select> 
                            <el-select v-model="form.value4" placeholder="请选择" v-if="scope.row['deduct'] == 4">
                                <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                                </el-option>
                            </el-select> 
                            <el-select v-model="form.value5" placeholder="请选择" v-if="scope.row['deduct'] == 5">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                                </el-option>
                            </el-select> 
                            <el-select v-model="form.value6" placeholder="请选择" v-if="scope.row['deduct'] == 6">
                                <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                                </el-option>
                            </el-select> 
                            <el-select v-model="form.value7" placeholder="请选择" v-if="scope.row['deduct'] == 7">
                                <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                                </el-option>
                            </el-select> 
                            <el-select v-model="form.value8" placeholder="请选择" v-if="scope.row['deduct'] == 8">
                                <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select v-model="form.value9" placeholder="请选择" v-if="scope.row['deduct'] == 9">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                                </el-option>
                            </el-select>  
                            <el-select v-model="form.value10" placeholder="请选择" v-if="scope.row['deduct'] == 10">
                                <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                                </el-option>
                            </el-select> 
                            <el-select v-model="form.value11" placeholder="请选择" v-if="scope.row['deduct'] == 11">
                                <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.value"
                                :value="item.value">
                                </el-option>
                            </el-select> 
                      </span>
                  <!-- 正常的其他列 -->
                      <span v-else>{{scope.row[col.prop]}}</span>
                  </template>
              </el-table-column>
            </el-table>
            <div class="option">
                实行百分制，当年度考核低于70分的不给予定级，考核在70 - 80分注册满6个月的评定为初级医师（3级），考核在80 - 90分且注册满1年的评定为中级医师（2级），考核在90分以上且注册满2 年的评定为专家级医师（1级）；医师的信用评级（15分），分为（13-15）优秀，（9-12良好），（5-8）一般，（1-4）较差
            </div>
        </div>
      </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import bus from '../components/bus';
  export default {
    data() {
      return {
        lazy:true,
        form:{
            value1:'0',
            value2:'0',
            value3:'0',

            value4:'0',
            value5:'0',
            value6:'0',

            value7:'0',
            value8:'0',
            value9:'0',

            value10:'0',
            value11:'0',
        },
        cols:[
          {prop: 'id', label: '序号'},
          {prop: 'm_name', label: '主要指标项目'},
          {prop: 'score', label: '分值'},
          {prop: 'criteria', label: '考核标准'},
          {prop: 'deduct', label: '扣分'},
          {prop: 'whether', label: '是否'},
        ],
        m_userid: '',
        tableData: [
            {
                id:'1',
                m_name:'在线咨询及诊疗人数',
                score:'5',
                criteria:'每月在线咨询不低于40 人次，诊疗不低于10 人次',
                deduct:1,
                whether:'是'
            },{
                id:'2',
                m_name:'在线开展学术交流情况',
                score:'5',
                criteria:'每季度不低于1次',
                deduct:2,
                whether:'是'
            },{
                id:'3',
                m_name:'在线参与或开展学科培训方面',
                score:'5',
                criteria:'每季度要参与或开展不少于2次',
                deduct:3,
                whether:'是'
            },{
                id:'4',
                m_name:'在线活跃情况',
                score:'10',
                criteria:'每月在线时间不少于10小时，年度累计时间不少于120小时',
                deduct:4,
                whether:'是'
            },{
                id:'5',
                m_name:'执业医师在线预约诊疗时间的一致性方面',
                score:'5',
                criteria:'预约时间与实际提供咨询或诊疗服务时间偏差小于8小时',
                deduct:5,
                whether:'是'
            },{
                id:'6',
                m_name:'在线咨询回复准确性方面',
                score:'10',
                criteria:'经互联网医院有关职能科室审定，准确性不低于90%',
                deduct:6,
                whether:'是'
            },{
                id:'7',
                m_name:'在线诊疗质量方面',
                score:'15',
                criteria:'复诊的诊断准确性和合理性不低于90%，初诊的诊断准确性和合理性不低于70%，规范治疗率不低于90%，随访好转率不低于80%',
                deduct:7,
                whether:'是'
            },{
                id:'8',
                m_name:'电子处方点评情况',
                score:'15',
                criteria:'每点评周期电子处方合格率不低于90%',
                deduct:8,
                whether:'是'
            },{
                id:'9',
                m_name:'投诉及医疗纠纷情况',
                score:'5',
                criteria:'根据投诉频次及过错方情况',
                deduct:9,
                whether:'是'
            },{
                id:'10',
                m_name:'诚信服务情况',
                score:'15',
                criteria:'根据出现不诚信服务情况和频次',
                deduct:10,
                whether:'是'
            },{
                id:'11',
                m_name:'在线患者满意度评价情况',
                score:'10',
                criteria:'根据互联网医院年度在线患者对执业医师的满意度评价',
                deduct:11,
                whether:'是'
            },{
                id:'12',
                m_name:'总计得分',
                score:'100',
                criteria:'',
                whether:'是'
            }
        ],
        dialogFormVisible2:false,
        options: [
            {
                value:'0',
            },
            {
                value:'1',
            },{
                value:'2',
            },{
                value:'3',
            },{
                value:'4',
            },{
                value:'5',
            },
        ],
        options2: [
            {
                value:'0',
            },
            {
                value:'1',
            },{
                value:'2',
            },{
                value:'3',
            },{
                value:'4',
            },{
                value:'5',
            },{
                value:'6',
            },{
                value:'7',
            },{
                value:'8',
            },{
                value:'9',
            },{
                value:'10',
            },
        ],
        options3: [
            {
                value:'0',
            },
            {
                value:'1',
            },{
                value:'2',
            },{
                value:'3',
            },{
                value:'4',
            },{
                value:'5',
            },{
                value:'6',
            },{
                value:'7',
            },{
                value:'8',
            },{
                value:'9',
            },{
                value:'10',
            },{
                value:'11',
            },{
                value:'12',
            },{
                value:'13',
            },{
                value:'14',
            },{
                value:'15',
            },
        ],
        total:0,
        page:1,
        all:'',
      }
    },
    created(){
    },
    watch:{
    
    },
    methods: {
        submit(){
          let num = Number(this.form.value1)+Number(this.form.value2)+Number(this.form.value3)+Number(this.form.value4)+Number(this.form.value5)+Number(this.form.value6)+Number(this.form.value7)+Number(this.form.value8)+Number(this.form.value9)+Number(this.form.value10)+Number(this.form.value11);
          let data = {
            doc_penalty_points :String(num),
            docid:this.$store.state.json.doctor_id
          };
          console.log(typeof(String(num)))
          this.$api.addPrint(data)
                .then(res => {
                    setTimeout(()=>{
                  this.$router.go(-1)

                    })
                })
        },
        deleteRow(data,val){
         switch (val){
          case 1:
              this.$router.push("/ChangeDrugStore")
              bus.$emit("path","/drugstore")
              this.$store.dispatch("update",data)
              this.$store.dispatch("type",'0')
          break;
          case 0:
              this.dialogFormVisible2 = true ;
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
.option{
   padding: 26px;
    box-sizing: border-box;
    font-size: 16px;
    text-indent:32px;
}

</style>