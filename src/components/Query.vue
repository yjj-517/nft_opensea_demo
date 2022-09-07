<template>
  <div id="Query">
    <span>名称模糊查询:</span>
    <el-input v-model="nameNft" placeholder="请输入内容" clearable> </el-input>
    <!-- <span>状态：</span>
    <el-select
      v-model="status"
      placeholder="请输入内容"
      multiple
      @change="changeCompanyName"
    >
      <el-option label="待上传" value="1"> </el-option>
      <el-option label="已上传" value="2"> </el-option>
      <el-option label="待铸造" value="3"> </el-option>
      <el-option label="已铸造" value="4"> </el-option>
    </el-select> -->
    <el-button type="primary" @click="onQuery">查询</el-button>
    <el-button type="primary" @click="onReset" plain>重置</el-button>
  </div>
</template>

<script>
export default {
  name: "Query",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      nameNft: "",
    };
  },
  // 方法
  methods: {
    // 查询按钮
    onQuery() {
      this.$emit("onQuerys", this.nameNft);
    },
    // 重置按钮
    onReset() {
      this.nameNft = "";
      this.$emit("onQuerys", this.nameNft);
    },
  },
  // 创建后
  created() {},
  // 挂载后
  mounted() {},
  // 更新后
  updated() {},
};
</script>

<style lang="less" scoped>
#Query {
  display: flex;
  line-height: 3rem;
  height: 3rem;
  span {
    margin: 0 1rem 0;
  }
  .el-input {
    width: 20rem;
  }
  .el-button {
    margin: 0 1rem 0;
  }
}
</style>
