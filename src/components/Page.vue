<template>
  <div id="Page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginations.current"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="paginations.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginations.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Page",
  // 模板引入
  components: {},
  // 数据接收
  props: {
    paginations: {
      type: null,
    },
  },

  // 数据
  data() {
    return {};
  },
  // 方法
  methods: {
    //分页 每页条数
    handleSizeChange(val) {
      this.paginations.pageSize = val;
      this.$emit("changePage", this.paginations);
    },
    // 分页 跳转
    handleCurrentChange(val) {
      this.paginations.current = val;
      this.$emit("changePage", this.paginations);
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
#Page {
  margin: 2rem 0 0;
}
</style>
