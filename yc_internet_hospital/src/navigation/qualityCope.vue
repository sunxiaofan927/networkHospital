<template>
  <div class="app">
    <div class="Index_app-box">
      <div class="Index_flex flexWarp">
        <div class="flex_1" v-if="typeV == '1'">
          <span class="title">处方号</span>
          <el-input
            v-model="data_.p_number"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="flex_1" v-if="typeV == '1'">
          <span class="title">用户手机号</span>
          <el-input
            v-model="data_.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </div>
        <div class="flex_1" v-if="typeV == '1'">
          <span class="title">医师</span>
          <el-input v-model="data_.docname" placeholder="请输入内容"></el-input>
        </div>
        <div class="flex_1" v-if="typeV == '1'">
          <span class="title">患者</span>
          <el-input
            v-model="data_.username"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="flex_1" v-if="typeV == '1'">
          <span class="title">所属药店</span>
          <el-select v-model="data_.mid" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.m_userid"
              :label="item.m_name"
              :value="item.m_userid"
            >
            </el-option>
          </el-select>
        </div>
        <div class="flex_1" v-if="typeV == '1'">
          <span class="title">审核状态</span>
          <!-- <span class="title">状态</span> -->
          <el-select v-model="data_.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="flex_1 flex pad_ pad_r Index_flex_">
          <span class="title">日期</span>
          <el-date-picker
            v-model="dataTime"
            type="daterange"
            range-separator="至"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <div v-if="typeV == '1'" class="left_margin">
          <el-button type="primary" round @click="axios(0)">查询</el-button>
          <el-button type="success" round @click="alert">核对使用</el-button>
        </div>
        <div v-if="typeV == '2'">
          <el-button type="primary" round @click="pnStatisticsManage(0)"
            >查询</el-button
          >
        </div>
      </div>
      <div class="Index_flex office_pad flex_office">
        <div
          :class="typeV == '1' ? 'officeBtn_class' : ''"
          @click="changType(1)"
        >
          处方管理
        </div>
        <div
          :class="typeV == '2' ? 'officeBtn_class' : ''"
          @click="changType(2)"
        >
          处方统计
        </div>
      </div>
      <div class="Index_flex relaodP" v-if="typeV == '2'">
        <div class="Index_flex _div relaodP">
          <h4>处方数量</h4>
          :{{ pnCount.number || "*" }}
        </div>
        <div class="Index_flex _div relaodP">
          <h4>处方总金额</h4>
          :{{ pnCount.price || "*" }}
        </div>
      </div>
      <div class="tableB">
        <el-table
          :data="tableData"
          style="width: 100%"
          :lazy="lazy"
          v-loading="loading"
        >
          <!-- v-if="false" -->
          <el-table-column
            header-row-class-name="header"
            v-for="(col, index2) in cols"
            :prop="col.prop"
            :label="col.label"
            :key="index2"
            align="center"
            fixed
            v-if="col.prop == 'p_number'"
            width="250"
          >
          </el-table-column>
          <el-table-column
            align="center"
            v-for="(col, index) in cols"
            header-row-class-name="header"
            :prop="col.prop"
            :label="col.label"
            :key="index"
            :width="col.width"
            :show-overflow-tooltip="true"
            v-if="col.prop != 'p_number'"
          >
            <template slot-scope="scope">
              <!-- 偏差結果 -->
              <span v-if="col.prop === 'p_type'">
                {{ scope.row[col.prop] == "1" ? "普通药方" : "非普通药方" }}
              </span>
              <span v-else-if="col.prop === 'p_timestatus'">
                {{
                  scope.row[col.prop] == "1"
                    ? "有效（未过期）"
                    : "无效（已过期）"
                }}
              </span>
              <span v-else-if="col.prop === 'p_status'">
                {{ scope.row[col.prop] == "1" ? "未使用" : "已使用" }}
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
            v-if="typeV == '1'"
            fixed="right"
            label="操作"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="show(scope.row, 1)"
                type="text"
                size="small"
              >
                查看
              </el-button>
              <el-button
                @click.native.prevent="show(scope.row, 3)"
                type="text"
                size="small"
              >
                打印
              </el-button>
              <el-button type="text" size="small" @click="getPrip(scope.row,userType)">
                <template>
                  <span>
                    {{
                      userType == "1" ? "初审" : userType == "2" ? "复审" : ""
                    }}
                  </span>
                </template>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="height">
          <el-pagination
            :hide-on-single-page="true"
            background
            @current-change="handleCurrentChange"
            :current-page="page"
            layout="prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 弹出层 -->
    <el-dialog title="处方详情" :visible.sync="dialogFormVisible">
      <!-- 折叠面板 -->
      <div class="flex_1">
        <span class="title">处方号</span>
        <el-input
          v-model="p_number"
          placeholder="请输入内容"
          :disabled="disabled"
        ></el-input>
        <el-button
          type="primary"
          class="margin_right"
          @click="show(p_number, 2)"
          v-if="val_ == 2"
          >查询</el-button
        >
      </div>
      <el-collapse v-model="activeNames" @change="handleChange" v-if="list_1">
        <el-collapse-item title="患者" name="1">
          <div class="display">
            <img
              :src="
                details.prescriptionManageBean.user_icon ||
                require('@/assets/img/photo.png')
              "
              alt=""
              srcset=""
              class="img"
            />
            <div class="display flexDe">
              <div v-if="details">
                姓名：{{ details.prescriptionManageBean.user_nickname }}
              </div>
              <div v-if="details">
                性别：{{
                  details.prescriptionManageBean.user_gender == "1"
                    ? "男"
                    : details.prescriptionManageBean.user_gender == "2"
                    ? "女"
                    : details.prescriptionManageBean.user_gender == "0"
                    ? "未知性别"
                    : "未说明性别"
                }}
              </div>
              <div v-if="details">
                年龄：{{ details.prescriptionManageBean.user_age }}
              </div>
              <div v-if="details">
                手机号：{{ details.prescriptionManageBean.user_mobile }}
              </div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="诊断" name="2">
          <div>{{ details.prescriptionManageBean.p_result || "暂无数据" }}</div>
        </el-collapse-item>
        <el-collapse-item title="处方药" name="3">
          <div v-for="(item, index) in details.drugsManageBean" :key="index">
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
          <div>{{ details.prescriptionManageBean.doctor_nickname }}</div>
        </el-collapse-item>
        <el-collapse-item title="处方时间" name="5">
          <div>
            处方审核通过时间：{{
              details.prescriptionManageBean.p_uptime || "暂无数据"
            }}
          </div>
          <div>
            处方是否有效：{{
              details.prescriptionManageBean.p_status == "1"
                ? "有效(未过期)"
                : details.prescriptionManageBean.p_status == "2"
                ? "无效(已过期)"
                : "未审核"
            }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="补充说明" name="6">
          <div>{{ details.prescriptionManageBean.p_bz || "暂无数据" }}</div>
        </el-collapse-item>
        <el-collapse-item title="签章" name="7">
          <!-- <img class="imgup" @click="imgup(details.prescriptionManageBean.h_esign)" :src="'data:image/jpg;base64,'+details.prescriptionManageBean.p_c_signature" alt="" srcset="" title="公司签章"> -->
          <img
            class="imgup"
            @click="imgup(details.prescriptionManageBean.h_esign)"
            :src="
              'data:image/jpg;base64,' + details.prescriptionManageBean.h_esign
            "
            alt=""
            srcset=""
            title="公司签章"
          />
          <img
            class="imgup"
            @click="imgup(details.prescriptionManageBean.d_esign)"
            :src="
              'data:image/jpg;base64,' + details.prescriptionManageBean.d_esign
            "
            alt=""
            srcset=""
            title="医师签章"
          />
          <img
            class="imgup"
            @click="imgup(details.prescriptionManageBean.p_esign)"
            :src="
              'data:image/jpg;base64,' + details.prescriptionManageBean.p_esign
            "
            alt=""
            srcset=""
            title="药师签章"
          />
        </el-collapse-item>
      </el-collapse>
      <div slot="footer" class="dialog-footer" v-if="val_ == 2">
        <el-button @click="dialogFormVisible = false" v-if="list_1"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="changeStatus"
          v-if="list_1 != '' && p_status_ != ''"
          >使用</el-button
        >
      </div>
    </el-dialog>

    <el-dialog title="图片" :visible.sync="dialogTableVisibleImg">
      <div style="text-align: center">
        <img :src="'data:image/jpg;base64,' + imgReload" alt="" srcset="" />
      </div>
    </el-dialog>
    <el-dialog
      title="打印"
      id="addloading"
      :visible.sync="dialogVisibleWEN"
      width="50%"
    >
      <resumeMenu :dataIframe="dataIframe" ref="mychild" class="opacity" />
      <span slot="footer" class="dialog-footer" v-if="show_Print">
        <el-button @click="dialogVisibleWEN = false">取 消</el-button>
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
      dataIframe: {},
      dialogVisibleWEN: false,
      dialogFormVisible: false,
      activeNames: ["1", "2", "3", "4", "5", "6", "7"], //折叠面板
      typeV: "1",
      lazy: true,
      cols: [],
      cols1: [
        { prop: "p_number", label: "处方号", width: "300" },
        { prop: "user_mobile", label: "手机号" },
        { prop: "p_instime", label: "处方时间", width: "" },
        { prop: "p_price", label: "问诊价格", width: "" },
        { prop: "p_status", label: "核销状态", width: "" },
        { prop: "p_state", label: "审核状态", width: "" },
        { prop: "user_nickname", label: "患者", width: "", width: "" },
        { prop: "m_name", label: "所属药店" },
        { prop: "doctor_nickname", label: "开方医师", width: "" },
        { prop: "pharmacist_nickname", label: "审核医师", width: "" },
        { prop: "p_type", label: "类型", width: "" },
      ],
      cols2: [
        { prop: "p_instimeDay", label: "日期" },
        { prop: "number", label: "处方数量" },
        { prop: "price", label: "金额" },
      ],
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
      tableData: [],
      data_: {
        mid: "", //所属药店
        p_number: "", //处方号
        mobile: "", //用户手机号
        docname: "", //医师
        username: "", //患者
        status: "", //审核状态
      },
      dataTime: "",
      p_number: "", //处方号
      p_status_: "", //处方
      details: {
        drugsManageBean: [],
        prescriptionManageBean: {},
      }, //查询处方详情
      disabled: false, //只读
      total: 0,
      page: 1,
      loading: false,
      stoptime: "",
      startime: "",
      pnCount: "",
      options2: [],
      val_: "",
      list_1: false,
      imgReload: "",
      dialogTableVisibleImg: false,
    };
  },
  created() {
    let datac = {};
    this.getData();
    this.axios(0);
    this.mInfoList();
  },
  computed: {
    userType() {
      return sessionStorage.getItem("user_type");
    },
  },
  mounted() {
    console.log(this.$store.state.ID);
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
    imgup(val) {
      this.dialogTableVisibleImg = true;
      this.imgReload = val;
    },
    handleChange(val) {}, //折叠面板
    alert() {
      this.dialogFormVisible = true;
      this.val_ = 2;
      this.p_number = "";
      this.disabled = false;
      this.list_1 = false;
      Object.assign(this.$data.details, this.$options.data().details);
    },
    handleCurrentChange(val) {
      this.page = val;
      if (this.typeV == "1") {
        this.axios(1);
      } else {
        this.pnStatisticsManage(1);
      }
    },
    changType(val) {
      this.loading = true;
      if (val == "1") {
        this.typeV = "1";
        this.dataTime = "";
        this.axios(0);
      } else {
        this.typeV = "2";
        this.getData();
        this.dataTime = "";
        this.pnStatisticsManage(0);
      }
    },
    show(data, val) {
      this.val_ = val;
      if (val == 1) {
        this.disabled = true;
        this.list_1 = true;
        this.p_number = data.p_number;
        this.userPrescriptionInfo(this.p_number);
      } else if (val == 2) {
        this.disabled = false;
        this.list_1 = true;
        this.userPrescriptionInfo(this.p_number);
      } else {
        this.show_Print = false;
        this.dialogVisibleWEN = true;
        this.p_number = data.p_number;
        this.userPrescriptionInfo2(data);
        setTimeout(() => {
          this.show_Print = true;
        }, 2000);
      }
    },
    userPrescriptionInfo(val) {
      let data = {
        p_number: val,
      };
      this.$api.userPrescriptionInfo(data).then((res) => {
        if (res.code == "0") {
          this.details = res.data;
          this.dialogFormVisible = true;
          this.p_status_ = res.data.prescriptionManageBean.p_status;
        }
      });
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
    SendPrescription(val) {
      //药师审核通过发送处方详情
      let data = {
        p_number: val, //处方号
      };
      this.$api.SendPrescription(data);
    },
    axios(val) {
      alert(111)
      this.cols = this.cols1;
      this.loading = true;
      let type = this.$store.state.login.user_type;
      let id = this.$store.state.login.userid;
      let pharmacistsType = sessionStorage.getItem("user_type");
      if (val == 0) {
        this.page = 1;
      }
      // (data.type = type),
      if (type == 9) {
        let data = this.data_;
        data.page = this.page;
        data.starttime = this.dataTime[0] ; 
        data.stoptime  = this.dataTime[1] ;
        data.type = type;
        this.$api.dTmpcnManage(data).then((res) => {

          this.tableData = res.data;
          this.total = res.total;
        });
      } else {
        let data = this.data_;
        if (pharmacistsType == 1) {
          data.pid = this.$store.state.ID.userid;
        } else if (pharmacistsType == 2) {
          data.rid = this.$store.state.ID.userid;
        }
        data.page = this.page;
        data.stattime = this.dataTime[0];
        data.stoptime = this.dataTime[1];
        this.$api.tmpcnManage(data).then((res) => {
          this.tableData = res.data.list;
          this.total = res.total;
        });
      }
      this.setTime();
    },
    setTime() {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    pnStatisticsManage(val) {
      //处方统计信息
      this.loading = true;
      this.cols = this.cols2;
      let type = this.$store.state.login.user_type;
      let id = this.$store.state.login.userid;
      if (val == 0) {
        this.page = 1;
      }
      let data = {
        page: this.page,
        type: type,
        startime: this.startime,
        stoptime: this.stoptime,
      };
      if (type == "3") {
        data.pid = id;
      } else if (type == "4") {
        data.pharmacist_mid = id;
      }
      this.$api.pnStatisticsManage(data).then((res) => {
        this.tableData = res.data.pnStatisticsManage;
        this.pnCount = res.data.pnCount;
        this.total = res.total;
      });
      this.setTime();
    },
    mInfoList() {
      //药店名称
      let option2 = this.$store.state.mInfoList;
      if (!option2) {
        let data = {};
        this.$api.mInfoList(data).then((res) => {
          this.options2 = res.data;
        });
      } else {
        this.option2 = option2;
      }
    },
    getData() {
      let d = new Date();
      let year = d.getFullYear(); //获取完整的年份(4位)
      let mounth = d.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      let date = d.getDate();
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
      d.setDate(d.getDate() - 1);
      this.startime = year + "-" + mounth + "-" + "01";
      this.stoptime = year + "-" + mounth + "-" + date;
    },
    changeStatus() {
      let data = {
        p_number: this.p_number,
        p_mid: this.$store.state.login.userid,
      };
      this.$api.prescriptionStateup(data).then((res) => {
        if (this.$store.state.login.user_type == "4") {
          this.SendPrescription(this.p_number);
        }
        this.axios(1);
        this.dialogFormVisible = false;
      });
    },
    getPrip(row,val) {
      let data = {};
      if (val == 1) {
        data.pid=row.p_pid;
        data.p_number= row.p_number;
      } else if (val == 2) {
        data.rid=row.r_rid;
        data.p_number= row.p_number;
      }
      this.$api.pullPrip(data).then(res =>{
        if (res.code == 0) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  },
};
</script>

<style scoped type='text/css'>
.app {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  margin-bottom: -100px;
}
.Index_flex {
  display: flex;
  padding-top: 40px;
  box-sizing: border-box;
}
.office_pad div {
  /* width: 80px; */
  padding: 10px;
  margin-right: 0px;
  border-radius: 5px;
  margin: 20px 20px 20px 0px;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.officeBtn_class {
  background: #409eff;
  border-color: rgba(0, 0, 0, 0) !important;
  color: #fff;
}
.flex_office {
  display: flex;
  justify-content: left;
  align-items: center;
}

.office_pad {
  padding: 0 20px;
}
.Index_flex_ {
  margin-right: 40px;
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
  padding: 0px 10px;
  display: inline-block;
  text-align: center;
}
.header {
  text-align: center;
}
/deep/ .el-input__inner {
  height: 50px;
}
.flex_1 {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}
h4 {
  padding: 0px;
  margin: 0px 15px;
}
.relaodP {
  padding: 0px;
}
.left_margin {
  margin-left: 10px;
}
.display {
  display: flex;
  align-items: center;
}
.flexDe {
  flex-direction: column;
  padding-left: 10px;
}
.flexDe div {
  width: 100%;
}
.img {
  width: 80px;
}
.margin_right {
  margin-left: 10px;
}
.imgup {
  width: 100px;
}
/deep/ #addloading .el-dialog .el-dialog__body {
  overflow-y: scroll !important;
  height: 100%;
}
</style>