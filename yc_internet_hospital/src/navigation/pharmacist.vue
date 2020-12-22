<template>
  <div class="app">
    <div class="Index_app-box">
      <div class="Index_flex flexWarp">
        <div class="Index_flex_ display">
          <span class="title">药店名称</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.m_userid"
              :label="item.m_name"
              :value="item.m_userid"
            >
            </el-option>
          </el-select>
        </div>
        <div class="Index_flex_ display">
          <span class="title">状态</span>
          <el-select v-model="status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="Index_flex_">
          <span class="title">药师姓名</span>
          <el-input v-model="pname" placeholder="请输入内容"></el-input>
        </div>
        <div class="Index_flex_">
          <span class="title">手机号</span>
          <el-input v-model="mobile" placeholder="请输入内容"></el-input>
        </div>
        <div class="Index_flex_">
          <span class="title">药师编号</span>
          <el-input v-model="pid" placeholder="请输入内容"></el-input>
        </div>
        <div class="Index_flex_">
          <span class="title">药师类型</span>
          <el-select v-model="pharmacist_type" placeholder="请选择">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="margnleft">
          <el-button type="primary" round @click="axios(0)">查询</el-button>
          <el-button type="success" round @click="deleteRow(0, 2)"
            >新增</el-button
          >
        </div>
      </div>
      <div class="tableB">
        <el-table :data="tableData" style="width: 100%" :lazy="lazy">
          <!-- <el-table-column align="center" type="selection"/> -->
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
              <span v-if="col.prop === 'pharmacist_icon'">
                <img
                  :src="scope.row[col.prop]"
                  alt=""
                  srcset=""
                  class="img"
                  title="图片"
                />
              </span>
              <span v-else-if="col.prop === 'pharmacist_gender'">
                {{
                  scope.row[col.prop] == "1"
                    ? "男"
                    : scope.row[col.prop] == "2"
                    ? "女"
                    : scope.row[col.prop] == "0"
                    ? "未知性别"
                    : "未说明性别"
                }}
              </span>
              <span
                v-else-if="col.prop === 'pharmacist_status'"
                :class="
                  scope.row[col.prop] == 2
                    ? 'redcolor_'
                    : scope.row[col.prop] == 3
                    ? 'blue'
                    : ''
                "
              >
                {{
                  scope.row[col.prop] == "1"
                    ? "已通过"
                    : scope.row[col.prop] == "2"
                    ? "未审核"
                    : "驳回"
                }}
              </span>
              <span
                v-else-if="col.prop === 'pharmacist_type'"
              >
                {{
                  scope.row[col.prop] == "1"
                    ? "审方药师"
                    : "复核药师"
                }}
              </span>
              <!-- 正常的其他列 -->
              <span v-else>{{ scope.row[col.prop] }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.row, 0)"
                type="text"
                size="small"
              >
                {{
                  scope.row.user_status == "1"
                    ? "正常"
                    : scope.row.user_status == "2"
                    ? "封禁"
                    : ""
                }}
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.row, 1)"
                type="text"
                size="small"
              >
                详情
              </el-button>
              <!-- <el-button>
                初审
              </el-button> -->
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
    <!-- 禁用 -->
    <el-dialog title="更改状态" :visible.sync="dialogFormVisible2">
      是否修改状态？
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="change()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import bus from "../components/bus";
export default {
  data() {
    return {
      pharmacist_type: null,
      lazy: true,
      cols: [
        { prop: "id", label: "序号" },
        { prop: "pharmacist_icon", label: "照片" },
        { prop: "pharmacist_nickname", label: "姓名" },
        // { prop: "pharmacist_mid", label: "医师编号" },
        { prop: "pharmacist_gender", label: "性别" },
        { prop: "pharmacist_hospital", label: "所属医院" },
        { prop: "pharmacist_type", label: "药师类型" },
        { prop: "title_name", label: "职称" },
        { prop: "pharmacist_mobile", label: "手机号" },
        { prop: "pharmacist_id", label: "编号" },
        { prop: "pharmacist_status", label: "状态" },
      ],
      tableData: [],
      dialogFormVisible2: false,
      data: "",
      options: [
        {
          value: "1",
          label: "已通过",
        },
        {
          value: "2",
          label: "未审核 ",
        },
        {
          value: "3",
          label: "驳回 ",
        },
      ],
      options2: [],
      options3: [
        {
          value: "1",
          label: "审方药师",
        },
        {
          value: "2",
          label: "复核药师",
        },
        {
          value: "",
          label: "全部",
        },
      ],
      value: "", //药店名称
      status: "", //状态
      pname: "", //药师姓名
      mobile: "", //手机号
      pid: "", //药师编号
      page: 1, //
      total: 0,
    };
  },
  created() {
    this.axios(0);
    this.mInfoList();
  },
  methods: {
    change() {
      let data = {
        userid: this.json_.pharmacist_id,
      };
      this.$api.prohibitUser(data).then((res) => {
        this.dialogFormVisible2 = false;
        this.axios(1);
      });
    },
    axios(val) {
      if (val == 0) {
        this.page = 1;
      }
      let data = {
        mobile: this.mobile,
        status: this.status,
        pname: this.pname,
        pid: this.pid,
        type: this.$store.state.login.user_type,
        page: this.page,
        ptype: this.pharmacist_type,
      };
      if (this.$store.state.login.user_type == "4") {
        data.mid = this.$store.state.login.userid;
        data.type = "4";
      } else if (this.$store.state.login.user_type == "9") {
        data.type = "9";
      }
      this.$api.pManage(data).then((res) => {
        this.tableData = res.data;
        this.total = res.total;
      });
    },
    mInfoList() {
      //药店名称
      let options2 = this.$store.state.mInfoList;
      if (!options2) {
        let data = {};
        this.$api.mInfoList(data).then((res) => {
          this.options2 = res.data;
        });
      } else {
        this.options2 = options2;
      }
    },
    handleCurrentChange(val) {
      //分页
      this.page = val;
      this.axios(1);
    },
    deleteRow(data, val) {
      switch (val) {
        case 1:
          this.$store.commit("type", "0");
          this.$store.dispatch("update", data);
          this.$router.push("/addPhar");
          bus.$emit("path", "/drugstore");
          break;
        case 2:
          this.$store.commit("type", "1");
          this.$router.push("/addPhar");
          bus.$emit("path", "/drugstore");
          break;
        case 0:
          this.json_ = data;
          this.dialogFormVisible2 = true;
          break;
      }
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
  /* background: #fff; */
  margin-bottom: -100px;
}
.Index_flex {
  display: flex;
  padding: 40px;
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
/deep/ .el-dialog__body span {
  font-size: 20px !important;
}
.el-textarea {
  flex: 1;
}
.open .display {
  margin: 10px 0px;
}
.img {
  max-width: 100%;
}
.margnleft {
  margin-left: 10px;
}
.redcolor_ {
  color: #e04f56;
}
.blue {
  color: #409eff;
}
</style>