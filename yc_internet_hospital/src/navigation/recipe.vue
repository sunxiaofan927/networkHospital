<template>
  <div class="app">
    <div class="Index_app-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="处方目录  " name="first">
          <div class="Index_flex flexWarp">
            <div class="Index_flex_ display">
              <span class="title">处方号</span>
              <el-input
                v-model="form.p_number"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="Index_flex_ display">
              <span class="title">用户手机号</span>
              <el-input
                v-model="form.mobile"
                placeholder="请输入手机号"
                type="munber"
              ></el-input>
            </div>
            <div class="Index_flex_ display">
              <span class="title">审核医师</span>
              <el-input
                v-model="form.docname"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="Index_flex_ display">
              <span class="title">患者</span>
              <el-input
                v-model="form.username"
                placeholder="请输入内容"
              ></el-input>
            </div>
            <div class="Index_flex_ display">
              <span class="title">状态</span>
              <el-select v-model="form.status" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="Index_flex_ display">
              <span class="title">日期</span>
              <el-date-picker
                v-model="time"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
            <div class="marginLeft">
              <el-button type="primary" round @click="search">查询</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="处方统计" name="second">
          <div class="Index_flex">
            <div class="Index_flex _div">
              <h4>处方数量</h4>
              :{{ pnCount.number || "*" }}
            </div>
            <div class="Index_flex _div">
              <h4>处方总金额</h4>
              :{{ pnCount.price || "*" }}
            </div>
          </div>
          <div class="Index_flex flexWarp">
            <div class="Index_flex_ display">
              <span class="title">日期</span>
              <el-date-picker
                v-model="time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
            <div class="marginLeft">
              <el-button type="primary" round @click="search">查询</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="tableB">
        <el-table
          :data="tableData"
          style="width: 100%"
          :lazy="lazy"
          v-loading="loading"
        >
          <!-- <el-table-column align="center" type="selection"/> -->
          <el-table-column
            prop=""
            width="300px"
            align="center"
            label="处方号"
            v-if="false"
          >
          </el-table-column>
          <el-table-column
            align="center"
            tooltip-effect="dark"
            v-for="(col, index) in cols"
            header-row-class-name="header"
            :prop="col.prop"
            :label="col.label"
            :key="index"
            :width="col.width"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <!-- 偏差結果 -->
              <span v-if="col.prop === 'p_looking'">
                {{ scope.row[col.prop] == "1" ? "已读" : "未读" }}
              </span>
              <span v-else-if="col.prop === 'p_type'">
                {{ scope.row[col.prop] == "1" ? "普通药方" : "非普通药方" }}
              </span>
              <span v-else-if="col.prop === 'p_timestatus'">
                {{
                  scope.row[col.prop] == "1"
                    ? "有效（未过期）"
                    : scope.row[col.prop] == "2"
                    ? "无效（已过期）"
                    : ""
                }}
              </span>
              <span v-else-if="col.prop === 'p_state'">
                {{
                  scope.row[col.prop] == "1"
                    ? "已通过"
                    : scope.row[col.prop] == "2"
                    ? "未通过"
                    : scope.row[col.prop] == "3"
                    ? "待审核"
                    : scope.row[col.prop] == "4"
                    ? "审方药师审核中"
                    : "复核药师审核中"
                }}
              </span>
              <span v-else>{{ scope.row[col.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            width="100"
            v-if="activeName == 'first'"
            label="操作"
          >
            <template slot-scope="scope">
              <!-- <el-button
                      @click.native.prevent="dele(scope.$index, tableData)"
                      type="text"
                      size="small">
                      移除
                    </el-button> -->
              <el-button
                @click.native.prevent="axios3(scope.row)"
                type="text"
                size="small"
              >
                {{
                  scope.row.p_state == "1"
                    ? "已通过"
                    : scope.row.p_state == "2"
                    ? "未通过"
                    : scope.row.p_state == "3"
                    ? "待审核"
                    : scope.row.p_state == "4"
                    ? "审方药师审核中"
                    : "复核药师审核中"
                }}
              </el-button>
              <el-button
                @click.native.prevent="show(scope.row)"
                type="text"
                size="small"
              >
                打印
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
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 删除 -->
    <!-- <el-dialog :title="title" :visible.sync="dialogFormVisible2">
          是否删除？
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="dele()">确 定</el-button>
          </div>
        </el-dialog> -->
    <!-- 驳回 -->
    <el-dialog title="驳回" :visible.sync="dialogFormVisible3">
      <div class="Index_flex_ display">
        <span class="title">驳回原因</span>
        <el-input
          v-model="rejectReason"
          type="textarea"
          rows="4"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary"  @click="reject()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出层 -->
    <el-dialog title="处方详情" :visible.sync="dialogFormVisible">
      <!-- 折叠面板 -->
      <div class="flex_1">
        <span class="title">处方号</span>
        <el-input
          v-model="p_number"
          placeholder="请输入内容"
          disabled
        ></el-input>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="患者" name="1">
          <div class="display">
            <img
              :src="
                json.prescriptionManageBean.user_icon ||
                require('@/assets/img/photo.png')
              "
              alt=""
              srcset=""
              class="img"
            />
            <div class="display flexDe">
              <div v-if="json">
                姓名：{{ json.prescriptionManageBean.user_nickname }}
              </div>
              <div v-if="json">
                性别：{{
                  json.prescriptionManageBean.user_gender == "1"
                    ? "男"
                    : json.prescriptionManageBean.user_gender == "2"
                    ? "女"
                    : json.prescriptionManageBean.user_gender == "0"
                    ? "未知性别"
                    : "未说明性别"
                }}
              </div>
              <div v-if="json">
                年龄：{{ json.prescriptionManageBean.user_age }}
              </div>
              <div v-if="json">
                手机号：{{ json.prescriptionManageBean.user_mobile }}
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="诊断" name="2">
          <div>{{ json.prescriptionManageBean.p_result || "暂无数据" }}</div>
        </el-collapse-item>
        <el-collapse-item title="处方药" name="3">
          <div v-for="(item, index) in json.drugsManageBean" :key="index">
            <div>
              <h4 style="margin: 0px auto">药品名称：{{ item.drugs_name }}</h4>
            </div>
            <div>
              给药途径：{{
                item.mode_channel == "1"
                  ? "口服"
                  : item.mode_channel == "2"
                  ? "含服"
                  : item.mode_channel == "3"
                  ? "嚼服"
                  : item.mode_channel == "4"
                  ? "外服"
                  : "其他"
              }}
            </div>
            <div>用法用量：{{ item.mode_consumption }}</div>
            <div>给药频率：{{ item.mode_frequency }}</div>
            <div>开药量：{{ item.drugs_dosage }}</div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="医师" name="4">
          <div>{{ json.prescriptionManageBean.doctor_nickname }}</div>
        </el-collapse-item>
        <el-collapse-item title="处方时间" name="5">
          <div>
            处方审核通过时间：{{ json.prescriptionManageBean.p_uptime }}
          </div>
          <div>
            处方是否有效：{{
              json.prescriptionManageBean.p_status == "1"
                ? "有效(未过期)"
                : json.prescriptionManageBean.p_status == "2"
                ? "无效(已过期)"
                : "未审核"
            }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="补充说明" name="6">
          <div>{{ json.prescriptionManageBean.p_bz }}</div>
        </el-collapse-item>
        <el-collapse-item title="签章" name="7">
          <div class="sealContainer">
            <span>公司签章:</span>
            <div>
              <img
                class="imgup"
                @click="imgup(json.prescriptionManageBean.h_esign)"
                :src="
                  'data:image/jpg;base64,' + json.prescriptionManageBean.h_esign
                "
                alt=""
                srcset=""
                title="公司签章"
              />
            </div>
          </div>
          <div class="sealContainer">
            <span>医师签章:</span>
            <div class="sealList">
              <!-- <img
                class="imgup"
                @click="imgup(json.prescriptionManageBean.d_esign)"
                :src="
                  'data:image/jpg;base64,' + json.prescriptionManageBean.d_esign
                "
                alt=""
                srcset=""
                title="医师签章"
              /> -->
              <img
                class="imgup"
                @click="imgup(json.prescriptionManageBean.sh_doc_esign)"
                :src="
                  'data:image/jpg;base64,' +
                  json.prescriptionManageBean.sh_doc_esign
                "
                alt=""
                srcset=""
                title="医师签章"
              />
            </div>
          </div>
          <div class="sealContainer" v-show="this.isImage">
            <span>审方药师:</span>
            <div class="sealList">
              <!-- <img
                class="imgup"
                @click="imgup(json.prescriptionManageBean.p_esign)"
                :src="
                  'data:image/jpg;base64,' + json.prescriptionManageBean.p_esign
                "
                alt=""
                srcset=""
                title="药师签章"
              /> -->
              <img
                class="imgup"
                @click="imgup(json.prescriptionManageBean.sh_p_esign)"
                :src="
                  'data:image/jpg;base64,' +
                  json.prescriptionManageBean.sh_p_esign
                "
                alt=""
                srcset=""
                title="审方药师"
              />
            </div>
          </div>
          <div class="sealContainer" v-show="this.R_Image">
            <span>复核药师:</span>
            <div class="sealList">
              <!-- <img
                class="imgup"
                @click="imgup(json.prescriptionManageBean.r_esign_sealData)"
                :src="
                  'data:image/jpg;base64,' +
                  json.prescriptionManageBean.r_esign_sealData
                "
                alt=""
                srcset=""
                title="药师签章"
              /> -->
              <img
                class="imgup"
                @click="imgup(json.prescriptionManageBean.r_esign_sxsealData)"
                :src="
                  'data:image/jpg;base64,' +
                  json.prescriptionManageBean.r_esign_sxsealData
                "
                alt=""
                srcset=""
                title="复核药师"
              />
            </div>
          </div>
          <!-- <div class="sealContainer" v-show="this.R_Image">
            <span>复核药师:</span>
            
          </div> -->
        </el-collapse-item>
      </el-collapse>
      <div
        slot="footer"
        class="dialog-footer"
        v-show="
          (this.userType == 1 && !this.isImage && this.btnShow != 2) ||
          (this.userType == 2 && !this.R_Image && this.btnShow != 2)  
        "
      >
        <el-button @click="reject1">驳回</el-button>
        <el-button type="primary" v-loading.fullscreen.lock="loading" @click="check">审核通过</el-button>
      </div>
    </el-dialog>
    <el-dialog title="图片" :visible.sync="dialogTableVisibleImg">
      <div style="text-align: center">
        <img
          style="width: 4rem"
          :src="'data:image/jpg;base64,' + imgReload"
          alt=""
          srcset=""
        />
      </div>
    </el-dialog>
    <el-dialog
      title="打印"
      id="addloading"
      :visible.sync="dialogVisibleWEN"
      width="50%"
    >
      <resumeMenu :dataIframe="dataIframe" ref="mychild" class="opacity" />
      <span slot="footer" class="dialog-footer" v-show="show_Print">
        <el-button @click="dialogVisibleWEN = false" style="margin-top: 100px"
          >取 消</el-button
        >
        <el-button type="primary" @click="clickPrint" v-print="pringObj"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import resumeMenu from "@/navigation/resumeMenu.vue";

export default {
  data() {
    return {
      loading: false,
      dialogVisibleWEN: false,
      show_Print: false,
      pringObj: {
        id: "#pringObj",
        popTitle: "怡成互联网医院处方笺",
        standard: "HTML5",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
        debug: false,
        importCSS: true,
        importStyle: true,
        printContainer: true,
        removeInline: true,
      },
      lazy: true,
      isImage: false,
      R_Image: false,
      cols: [],
      cols2: [
        { prop: "p_instimeDay", label: "时间", width: "300" },
        { prop: "number", label: "处方数量" },
        { prop: "price", label: "金额" },
      ],
      cols1: [
        { prop: "p_number", label: "处方号", width: "300" },
        { prop: "user_mobile", label: "手机号" },
        { prop: "p_uptime", label: "审核通过时间", width: "150" },
        { prop: "p_price", label: "处方价格" },
        { prop: "p_state", label: "审核状态" },
        { prop: "user_nickname", label: "患者" },
        { prop: "doctor_nickname", label: "开方医师" },
        { prop: "p_instime", label: "审核时间" },
        { prop: "p_r_nickname", label: "审核药师" },
        { prop: "p_type", label: "类型" },
        { prop: "p_timestatus", label: "处方是否过期" },
      ],
      btnShow: "",
      tableData: [],
      activeName: "first",
      title: "添加",
      dialogFormVisible: false,
      // dialogFormVisible2:false,
      dialogFormVisible3: false,
      loading: true,
      type: 0,
      activeNames: ["1", "2", "3", "4", "5", "6", "7"], //折叠面板
      number: "", //数量
      price: "", //价格
      stattime: "", //开始时间
      stoptime: "", //结束时间
      time: "",
      pnCount: "",
      code: "",
      options: [
        {
          value: "1",
          label: "已通过",
        },
        {
          value: "2",
          label: "未通过",
        },
        {
          value: "3",
          label: "待审核",
        },
        {
          value: "4",
          label: "审方药师审核中",
        },
        {
          value: "5",
          label: "复核药师审核中",
        },
      ],
      page: 1,
      total: 0,
      input: "", //驳回原因
      stattime: "", //开始时间
      stoptime: "", //结束时间
      form: {
        p_number: "", //处方号
        mobile: "", //手机号码
        docname: "", //医师
        username: "", //患者
        status: "", //状态
      },
      value_: "",
      p_number: "",
      json: {
        prescriptionManageBean: {},
        drugsManageBean: [],
      },
      parm: "",
      formJSON: "", //临时存储文件
      rejectReason: "", //驳回原因
      imgReload: "",
      dialogTableVisibleImg: false,
      dataIframe: {},
    };
  },
  watch: {
    time(val) {
      this.stattime = this.time[0];
      this.stoptime = this.time[1];
    },
  },
  created() {
    this.cols = this.cols1;
    this.setTime();
    // this.getData();
    this.axios2(0);
  },
  computed: {
    userType() {
      return sessionStorage.getItem("user_type");
    },
  },
  components: {
    resumeMenu,
  },
  methods: {
    clickPrint() {
      this.show_ = !this.show_;
      this.dialogVisibleWEN = false;
      this.$refs.mychild.chufan(
        this.dataIframe.prescriptionManageBean.p_number
      );
    },
    show(data) {
      let type = this.$store.state.login.user_type;
      if ((type == 3 && this.userType == 2 && data.p_state == 1) || type == 9) {
        this.dialogVisibleWEN = true;
        this.show_Print = true;
        this.p_number = data.p_number;
        this.userPrescriptionInfo2(data);
        setTimeout(() => {
          this.show_Print = true;
        }, 1000);
      } else {
        this.$message.error("请先审核完毕在进行打印");
      }
    },
    userPrescriptionInfo2(val) {
      let data = {
        p_number: val.p_number,
      };
      this.$api.userPrescriptionInfo(data).then((res) => {
        if (res.code == "0") {
          this.dataIframe = res.data;
          this.dataIframe.status_ = val.p_status;
        }
      });
    },
    imgup(val) {
      this.dialogTableVisibleImg = true;
      this.imgReload = val;
    },
    reject1() {
      //驳回
      this.dialogFormVisible3 = true;
    },
    reject() {
      // this.loading = true;
      let data = {
        p_number: this.formJSON.p_number, //处方号
        pid: this.$store.state.login.userid, //药师唯一id
        type: "2", //type
        reason: this.rejectReason, //驳回原因
        // p_reason: this.rejectReason, //驳回原因
      };
      if (this.userType == 2) {
        data = {
          p_number: this.formJSON.p_number, //处方号
          rid: this.$store.state.login.userid, //药师唯一id
          type: "2", //type
          reason: this.rejectReason, //驳回原因
          // p_reason: this.rejectReason, //驳回原因
        };
      }
      this.$api.pnStatusManageup(data).then((res) => {
        this.dialogFormVisible = false;
        this.dialogFormVisible3 = false;
        this.$message.success(res.msg);
        this.axios2();
      });
    },
    check() {
      //审核通过
      this.loading = true;
      let data = {};
      if (this.userType == 1) {
        data = {
          p_number: this.formJSON.p_number, //处方号
          pid: this.$store.state.login.userid, //药师唯一id
          type: "5", //type
        };
        this.$api.pnStatusManageup(data).then((res) => {
          let data = {
            pharId: this.$store.state.login.userid,
            orderId: this.formJSON.p_order_number,
          };
          this.$api
            .pharSign(data) //药师签名
            .then((res) => {
              this.dialogFormVisible = false;
              this.$message.success(res.msg);
              this.loading = false
              this.axios2(1);
            }).catch(res =>{
              this.dialogFormVisible = false;
              this.loading = false;
              this.axios2(1);
            });
        });
      } else {
        data = {
          p_number: this.formJSON.p_number, //处方号
          rid: this.$store.state.login.userid, //药师唯一id
          type: "1", //type
        };
        this.$api.pnStatusManageup(data).then((res) => {
          let data = {
            r_pharId: this.$store.state.login.userid,
            orderId: this.formJSON.p_order_number,
          };
          this.$api
            .RharSign(data) //药师签名
            .then((res) => {
              this.dialogFormVisible = false;
              this.$message.success(res.msg);
              this.loading = false
              this.axios2(1);
            }).catch(res =>{
              this.dialogFormVisible = false;
              this.loading = false;
              this.axios2(1);
            });
        });
      }
    },
    // SendPrescription(){//药师审核通过发送处方详情
    //     let data = {
    //         p_number:this.formJSON.p_number,//处方号
    //     };
    //     this.$api.SendPrescriconsole.log(val)ption(data)
    // },
    axios3(val) {
      //处方详情

      this.parm = val.p_state;
      this.p_number = val.p_number;
      this.formJSON = val;
      let data = {
        p_number: val.p_number,
      };
      // let type = this.$store.state.login.user_type;
      // type == 3 && this.userType == 1 && (this.parm == 5 || this.parm == 1)
      //   ? (this.isImage = true)
      //   : (this.isImage = false);
      // type == 3 && this.userType == 2 && this.parm == 1
      //   ? (this.R_Image = true)
      //   : (this.R_Image = false);
      // if (type == 3 && this.userType == 2) {
      //   this.isImage = true;
      // }
      this.$api.userPrescriptionInfo(data).then((res) => {
        if (res.code == 0) {
          this.btnShow = res.data.prescriptionManageBean.p_state;
          let p_state = res.data.prescriptionManageBean.p_state;
          if (p_state == 1) {
            this.R_Image = true;
            this.isImage = true;
          } else if (p_state == 5) {
            this.R_Image = false;
            this.isImage = true;
          } else {
            this.R_Image = false;
            this.isImage = false;
          }
          this.json = res.data;
          this.addClick();
        } else {
          // alert(11)
          this.$message.error(res.message);
        }
      });
    },
    axios(val) {
      //处方统计
      if (val == 0) {
        this.page = 1;
      }
      let type = this.$store.state.login.user_type;
      let data = {
        startime: this.stattime,
        stoptime: this.stoptime,
        type: type,
        page: this.page,
      };
      if (type == "4") {
        data.pharmacist_mid = this.$store.state.login.userid;
      } else if (type == "3") {
        data.pid = this.$store.state.login.userid;
      }
      this.$api.pnStatisticsManage(data).then((res) => {
        this.tableData = res.data.pnStatisticsManage;
        this.pnCount = res.data.pnCount;
        this.total = res.total;
      });
    },
    axios2(val) {
      //处方目录
      if (val == 0) {
        this.page = 1;
      }
      let type = this.$store.state.login.user_type;
      let data = {
        p_number: this.form.p_number,
        page: this.page,
        status: this.form.status,
        mobile: this.form.mobile,
        stattime: this.stattime,
        stoptime: this.stoptime,
        username: this.form.username,
        docname: this.form.docname,
      };
      // if(type=='4'){
      //   data.pharmacist_mid = this.$store.state.login.userid;
      // }else if(type=='3'){
      //   data.pid = this.$store.state.login.userid ;
      // }
      if (this.userType == 1) {
        data.pid = this.$store.state.ID.userid;
      } else if (this.userType == 2) {
        data.rid = this.$store.state.ID.userid;
      }
      this.$api
        .tmpcnManage(data)
        .then((res) => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch((res) => {
          if (res.data.code != 0) {
            // this.$message.error(res.data.msg)
            this.tableData = [];
          }
        });
    },
    search() {
      let value_ = this.value_;
      if (value_ == 0) {
        this.axios2(0);
      } else {
        this.axios(0);
      }
    },
    handleClick(tab, event) {
      this.loading = true;
      this.type = tab.index;
      if (tab.index == 0) {
        this.cols = this.cols1;
        this.value_ = 0;
        this.axios2(0);
      } else {
        this.cols = this.cols2;
        this.value_ = 1;
        this.axios(0);
      }
      this.setTime();
    },
    handleCurrentChange(val) {
      //分页
      this.page = val;
      this.axios2(1);
    },
    addClick(type, event_) {
      this.dialogFormVisible = true;
    },
    deleteRow() {
      this.dialogFormVisible = true;
    },
    // dele(val,item){
    //   this.dialogFormVisible2 =  true;
    // },
    setTime() {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    getData() {
      let d = new Date();
      let year = d.getFullYear(); //获取完整的年份(4位)
      let mounth = d.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      let date = d.getDate() + 1;
      if (String(mounth).length < 2) {
        mounth = "0" + mounth;
      }
      if (String(date).length < 2) {
        date = "0" + date;
      }
      // 将日期设置为下月一号
      d.setMonth(d.getMonth() + 1);
      d.setDate("1");
      // 获取本月最后一天
      d.setDate(d.getDate() - 2);
      this.stattime = year + "-" + mounth + "-" + "01";
      this.stoptime = year + "-" + mounth + "-" + date;
    },
  },
};
</script>

<style scoped type='text/css'>
.medi_ {
  display: inline-block;
  width: 200px;
}
/deep/ .pad_right {
  margin-left: 10px;
}
.app {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  /* background: #fff; */
  margin-bottom: -100px;
}
.Index_flex {
  display: flex;
  padding: 10px;
  box-sizing: border-box;
}
.Index_flex_ {
  margin-bottom: 10px;
}
.Index_app-box {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 10px 2px rgba(227, 224, 224, 0.5);
  border-radius: 8px;
}
.bg {
  background: #d3d5ff;
}
.el-table .success-row {
  background: #f0f9eb;
}
.height {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-table thead {
  background: #d3d5ff !important;
}
.display {
  display: flex;
  align-items: center;
}
.tableB {
  width: 100%;
  flex: 1;
}
.el-table /deep/ {
  flex: 1;
  overflow: hidden;
  max-width: 100%;
}
.flexWarp {
  flex-wrap: wrap;
}
.title {
  display: inline-block;
  text-align: left;
  padding: 0px 10px;
}
.header {
  text-align: center;
}
.el-checkbox__inner {
  width: 20px !important;
  height: 20px !important;
}
/deep/ .el-input {
  width: auto;
}
/deep/ .el-input__inner {
  width: 250px;
  height: 50px;
}
/deep/ .el-tabs__header {
  padding: 20px !important;
  box-sizing: border-box;
}
.marginLeft {
  margin-left: 10px;
}
._div h4 {
  margin: 0px;
}
._div {
  padding: 0px 10px;
  align-items: center;
}
/* .img {
  width: 80px;
  height: 80px;
} */
.display {
  display: flex;
}
.flexDe {
  flex-direction: column;
  padding-left: 10px;
}
.flexDe div {
  width: 100%;
}
.imgup {
  width: 100px;
  /* height: 80px; */
}
</style>

<style scoped lang="scss">
.sealContainer {
  display: flex;
  align-items: center;
  span {
    // background: red;
    width: 10%;
  }
  @media screen and (max-width: 1000px) {
    span {
      width: 20%;
    }
  }
  .sealList {
    display: flex;
    align-items: center;
  }
  // & >>> .dialog-footer{
  //   .el-button{
  //     margin-top: 500px;
  //   }
  // }
}
</style>