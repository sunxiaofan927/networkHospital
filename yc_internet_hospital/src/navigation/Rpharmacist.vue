<template>
  <div class="prescription">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="处方目录" name="first">
        <el-form :model="formInline" class="leftFrom">
          <el-form-item label="处方号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="用户手机号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="审核医师">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="患者">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="dataTime"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button>查询</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="处方统计" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataTime: "",
      activeName: "",
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style scoped lang="scss">
.prescription {
  .leftFrom {
    display: flex;
    flex-flow: row wrap;
    .el-form-item {
      display: flex;
      justify-content: space-around;
      flex-flow: row nowrap;
      align-items: center;
      width: 25%;
      & >>> .el-form-item__label {
        width: 30%;
      }
      & >>> .el-form-item__content {
        width: 60%;
        .el-date-editor--daterange{
          // background: red;
          width: 100%;
        }
      }
    }
    & > :last-child {
      flex-grow: 2;
      & >>> .el-form-item__content {
        width: 93%;
        text-align: right;
      }
    }
  }
}
</style>
