<template>
  <div class="audit">
    <div class="audit_top">
      <el-input placeholder="请输入用户名" v-model="account"></el-input>
      <el-button @click="polling">查询</el-button>
    </div>
    <el-table :data="userData">
      <el-table-column
        v-for="item of table_title"
        :label="item.label"
        :key="item.prop"
        :prop="item.prop"
        align="center"
      >
        <template slot-scope="scope">
          <!-- 偏差結果 -->
          <span v-if="item.prop == 'login_type'">
            {{ scope.row[item.prop] == "1" ? "成功" : "失败" }}
          </span>
           <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      table_title: [
        { label: "编号", prop: "id" },
        { label: "用户名", prop: "user_account" },
        { label: "用户姓名", prop: "user_name" },
        { label: "登录IP", prop: "login_ip" },
        { label: "登录时间", prop: "login_time" },
        { label: "登录状态", prop: "login_type" },
        { label: "失败原因", prop: "login_fail_cause" },
        { label: "退出时间", prop: "login_exit_time" },
      ],
      userData: [],
      account: "",
      total: 10,
      page: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.login;
    },
  },
  mounted() {
    this.getAccount();
  },
  methods: {
    getAccount() {
      let data = {
        account_id: this.user.userid,
        user_account: this.account,
        page: this.page,
      };
      this.$api.getAllAuditsByAccount(data).then((res) => {
        this.total = res.data.total;
        this.userData = res.data.list;
      });
    },
    polling() {
      this.getAccount();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getAccount();
    },
  },
};
</script>

<style scoped lang="scss">
.audit {
  padding: 1rem;
  .audit_top {
    width: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    .el-input {
      width: 3rem;
    }
  }
  .page {
    display: flex;
    justify-content: flex-end;
    .el-pagination {
      display: flex;
      justify-content: flex-end;
      margin-top: 0.3rem;
      width: 6rem;
    }
  }
}
</style>