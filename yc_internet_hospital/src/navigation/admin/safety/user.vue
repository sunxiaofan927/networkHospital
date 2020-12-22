<template>
  <div class="admin_user">
    <el-form class="admin_user_top">
      <el-form-item label="用户名:" class="admin_user_input">
        <el-input v-model="user_account"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userList">
      <el-table-column
        align="center"
        v-for="item of userTitle"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="scope">
          <!-- 偏差結果 -->
          <span v-if="item.prop == 'user_status'">
            {{ scope.row[item.prop] == "1" ? "正常" : "封禁" }}
          </span>
          <span v-else-if="item.prop == 'user_type'">
            {{ scope.row[item.prop] == "1" ? "普通用户" : scope.row[item.prop] == "2" ? "医师" : scope.row[item.prop] == "3" ? "药师" : scope.row[item.prop] == "4" ? "机构" : scope.row[item.prop] == "9" ? "院长(医院)" : scope.row[item.prop] == "10" ? "安全管理员" : "审计管理员"}}
          </span>
          <span v-else>{{ scope.row[item.prop] }}</span>
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
      value: "user",
      options: [
        {
          label: "用户名称",
          value: "user",
        },
        {
          label: "用户类型",
          value: "usertype",
        },
      ],
      userTitle: [
        { label: "编号", prop: "id" },
        { label: "用户名", prop: "user_account" },
        { label: "管理员分类", prop: "user_type" },
        { label: "员工姓名", prop: "user_nickname" },
        { label: "创建日期", prop: "user_creattime" },
        { label: "授权状态", prop: "user_status" },
      ],
      userList: [],
      user_account: "",
      page: 1,
      total: 10,
    };
  },
  mounted() {
    this.getUserList();
  },
  computed: {
    user() {
      return this.$store.state.login;
    },
  },
  methods: {
    getUserList() {
      let data = {
        account_id: this.user.userid,
        account_name: this.user_account,
        page: this.page,
      };
      this.$api
        .queryUserInfo(data)
        .then((res) => {
          this.total = res.total;
          this.userList = res.data;
        })
        .catch((res) => {
          this.userList = [];
        });
    },
    query() {
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUserList();
    },
  },
};
</script>

<style scoped lang="scss">
.admin_user {
  padding: 1rem;
  .admin_user_top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0.5rem 0;
    .el-form-item {
      margin: 0;
      display: flex;
      align-items: center;
    }
    .admin_user_input {
      flex-basis: 5rem;
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