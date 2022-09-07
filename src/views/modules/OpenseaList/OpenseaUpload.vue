<template>
  <div id="OpenseaUpload">
    <!-- 搜索 -->
    <Query v-on:onQuerys="onQuerys"></Query>
    <!-- 功能按钮 -->
    <div class="butBOX"></div>
    <!-- 表格展示 -->
    <div v-loading="loading">
      <el-table
        :data="nftList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="name" label="名称(编号)"> </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 3">已上传</span>
            <span v-if="scope.row.status == 4">已上架</span>
            <span v-if="scope.row.status == 5">已出售</span>
          </template>
        </el-table-column>
        <el-table-column prop="preview_image" label="文件主图" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.preview_image"
              ><el-image
                :src="scope.row.preview_image"
                style="width: 100px; height: 100px"
                @click="onImg(scope.row)"
              ></el-image
            ></span>
            <span v-if="!scope.row.preview_image"> 显示错误,联系管理员 </span>
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="创建时间" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.updated_at">
              {{ new Date(scope.row.updated_at * 1000).toLocaleString() }}
            </span>
            <span v-if="!scope.row.updated_at"> 显示错误,联系管理员 </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="编辑" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="onView(scope.row)"
              >查看属性</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 查看图片 -->
      <el-dialog
        title="NFT图片展示"
        :visible.sync="dialogVisible4"
        width="650px"
      >
        <el-image
          :src="nftDetails.preview_image"
          style="width: 600px; height: 600px"
          lazy
        ></el-image>
      </el-dialog>
      <!-- 查看属性 -->
      <el-dialog
        title="查看NFT属性"
        class="statdialog"
        :visible.sync="dialogVisible2"
        width="80%"
      >
        <div class="stat_box">
          <p>
            <span>background:</span><span>{{ nftStat.background_id }}</span>
          </p>
          <p>
            <span>rare_score_sum:</span
            ><span>{{ nftStat.rare_score_sum }}</span>
          </p>
        </div>
        <el-table border :data="nftStat.attributes" style="width: 100%">
          <el-table-column prop="part" label="part" align="center">
          </el-table-column>
          <el-table-column prop="part_name" label="name" align="center">
          </el-table-column>
          <el-table-column prop="interior_Id" label="Id" align="center">
          </el-table-column>
          <el-table-column prop="rare_level" label="rare_level" align="center">
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <!-- 分页 -->
    <Page :paginations="pagination" v-on:changePage="changePage"></Page>
  </div>
</template>

<script>
import Query from "@/components/Query.vue";
import Page from "@/components/Page.vue";
import { getLists } from "@/http/nftsapi.js";
export default {
  name: "OpenseaUpload",
  // 模板引入
  components: {
    Query,
    Page,
  },
  // 数据
  data() {
    return {
      nft_type: 2, //NFT发行渠道
      status: 3, //状态待上传
      loading: false, //loading加载
      nftList: [], //nft数据
      nameNft: "", //nftname查询
      pagination: {}, //分页数据
      dialogVisible2: false, //查看弹框
      dialogVisible4: false, //查看图片
      nftDetails: [], //单个NFT详情
      manyList: [], //多选数据
      manyListid: [], //多选数据id
      nftStat: [], //nft属性
    };
  },
  // 方法
  methods: {
    // 获取所有参数
    getNftList() {
      this.loading = true;
      let obj = {
        nft_type: this.nft_type, //发行渠道
        status: this.status, //状态
        current: this.pagination.current, //分页当前页数
        pageSize: this.pagination.pageSize, //分页条数
        name: this.nameNft, //nftname
      };
      // console.log(obj);
      getLists(obj)
        .then((res) => {
          this.pagination = res.pagination;
          // 数据处理
          res.list.forEach((i, k) => {
            i.preview_image = i.local_uri + "/" + i.preview_image;
          });
          this.nftList = res.list;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$alert("请检查网络或者联系管理员!", "请求错误", {
            confirmButtonText: "确定",
          });
        });
    },
    // 获取分页数据
    changePage(paginations) {
      this.pagination = paginations;
      this.getNftList();
    },
    //查询/重置
    onQuerys(nameNft) {
      // 查询名字赋值
      this.nameNft = nameNft;
      this.pagination.current = 1; //分页页数
      this.pagination.pageSize = 10; //分页条数
      this.getNftList();
    },
    //多选chang事件
    handleSelectionChange(val) {
      this.manyList = val;
    },
    // 获取多选事件中id
    changeNFTid() {
      let arr = [];
      this.manyList.map((i, k) => {
        arr.push(i.id);
      });
      this.manyListid = arr;
    },
    // 查看NFT属性
    onView(row) {
      this.nftStat = row.model_infos;
      this.dialogVisible2 = true;
    },
    // 查看图片
    onImg(row) {
      this.nftDetails = row;
      this.dialogVisible4 = true;
    },
  },
  // 创建后
  created() {
    this.getNftList();
  },
  // 挂载后
  mounted() {},
  // 更新后
  updated() {},
};
</script>

<style lang="less" scoped>
#OpenseaUpload {
  // 功能按钮
  .butBOX {
    margin: 2rem 0;
    .el-button {
      margin: 0 1rem;
    }
  }
  .detailsBox {
    p {
      display: flex;
      line-height: 3rem;
      span {
        width: 8rem;
      }
      .el-input {
        width: 30rem;
      }
    }
  }
  .statdialog {
    .stat_box {
      display: flex;
      p {
        margin: 0 1rem 1rem 0;
        span:nth-child(2n-1) {
          display: inline-block;
          margin: 0 0.2rem 0 0;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
