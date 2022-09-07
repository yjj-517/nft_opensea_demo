<template>
  <div id="UploadNFT">
    <!-- 搜索 -->
    <Query v-on:onQuerys="onQuerys"></Query>
    <!-- 功能按钮 -->
    <div class="butBOX">
      <el-button type="primary" @click="dialogVisible1 = true"
        >新建NFT</el-button
      >
      <el-button type="danger" @click="ondeleteNft">删除</el-button>
      <el-button type="warning" @click="onuploadIpfs">上传至IPFS</el-button>
      <el-button type="warning" @click="onuploadBatch">同步NFT</el-button>
      <!-- 新建弹窗 -->
      <el-dialog title="新建NFT" :visible.sync="dialogVisible1" width="500px">
        <el-button type="primary"
          ><input
            @change.stop="changesData1"
            class="media"
            accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf"
            autocomplete="off"
            ref="file"
            type="file"
            name="file"
            webkitdirectory
        /></el-button>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="uploadNFT">确定</el-button>
        </span>
      </el-dialog>
    </div>
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
            <span v-if="scope.row.status == 1">待上传</span>
            <span v-if="scope.row.status == 2">已上传</span>
            <span v-if="scope.row.status == 3">待铸造</span>
            <span v-if="scope.row.status == 4">已铸造</span>
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
            <el-button type="primary" @click="onEdit(scope.row)"
              >编辑</el-button
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
      <!-- 编辑 -->
      <el-dialog
        class="detailsBox"
        title="编辑NFT"
        :visible.sync="dialogVisible3"
        width="650px"
      >
        <p>
          <span>NFT名称:</span
          ><el-input
            placeholder="请输入内容"
            v-model="nftDetails.name"
            clearable
          ></el-input>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="onChang">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 分页 -->
    <Page :paginations="pagination" v-on:changePage="changePage"></Page>
  </div>
</template>

<script>
import Query from "@/components/Query.vue";
import Page from "@/components/Page.vue";
import {
  getLists,
  changeNFT,
  deleteNft,
  upload,
  uploadBatch,
  uploadIpfs,
} from "@/http/nftsapi.js";
export default {
  name: "UploadNFT",
  // 模板引入
  components: {
    Query,
    Page,
  },
  // 数据
  data() {
    return {
      nft_type: 1, //NFT发行渠道
      status: 1, //状态待上传
      loading: false, //loading加载
      nftList: [], //nft数据
      nameNft: "", //nftname查询
      pagination: {}, //分页数据
      dialogVisible1: false, //新建弹框
      dialogVisible2: false, //查看属性
      dialogVisible3: false, //编辑弹框
      dialogVisible4: false, //查看图片
      nftDetails: [], //单个NFT详情
      manyList: [], //多选数据
      manyListid: [], //多选数据id
      nftStat: [], //nft属性
      fileList: [], //单个/批量上传文件夹
      formData: [], //单个/批量上传文件夹转码
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
      console.log(obj);
      getLists(obj)
        .then((res) => {
          console.log(res);
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
      // console.log(paginations);
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
    // 删除事件
    ondeleteNft() {
      this.changeNFTid();
      if (this.manyListid.length > 0) {
        this.loading = true;
        // 弹框确认
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        })
          .then(() => {
            // 删除
            deleteNft(this.manyListid)
              .then(() => {
                this.getNftList();
                this.loading = false;
                this.$message({
                  message: "删除成功!",
                  type: "success",
                });
              })
              .catch(() => {
                this.getNftList();
                this.loading = false;
                this.$message.error("提交失败,请检查网络或者联系管理人员!");
              });
          })
          .catch(() => {
            // 取消删除
            this.loading = false;
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          message: "请先选择NFT",
          type: "warning",
        });
      }
    },
    // 新建nft
    // 监听上传文件夹事件
    changesData1(e) {
      this.fileList = e.target.files;
    },
    // 将上传文件集体转码
    changeFile() {
      var formData = new FormData();
      for (let i = 0; i < this.fileList.length; i++) {
        let buffer = this.fileList[i];
        formData.append("file", buffer);
      }
      this.formData = formData;
      console.log(this.formData);
    },
    uploadNFT() {
      if (this.fileList.length > 0) {
        this.loading = true;
        this.changeFile();
        upload(this.formData)
          .then(() => {
            // console.log(res);
            this.dialogVisible2 = false;
            this.getNftList();
            this.$message({
              message: "上传成功",
              type: "success",
            });
            this.loading = false;
            this.dialogVisible1 = false;
          })
          .catch(() => {
            // console.log(err);
            this.getNftList();
            this.$message.error("上传失败");
            this.loading = false;
          });
      } else {
        this.$message({
          message: "请先选择文件",
          type: "warning",
        });
      }
    },
    // 上传至IPFS
    onuploadIpfs() {
      this.$confirm("此操作将数据库的NFT文件上传至IPFS, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //同步
          this.loading = true;
          uploadIpfs()
            .then((res) => {
              this.getNftList();
              console.log(res);
              this.loading = false;
              if (res.status == 200) {
                this.$message.success("同步成功");
              } else {
                this.$message.error(res.data.error.message);
              }
            })
            .catch(() => {
              this.getNftList();
              this.$message.error("同步失败");
              this.loading = false;
            });
        })
        .catch(() => {
          // 取消同步
          this.$message.info("已取消上传IPFS");
        });
    },
    // 同步NFT数据库
    async onuploadBatch() {
      this.$confirm("此操作将同步数据库的NFT文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //同步
          this.loading = true;
          await uploadBatch()
            .then((res) => {
              this.getNftList();
              this.loading = false;
              if (res.status == 200) {
                this.$message.success("同步成功");
              } else {
                this.$message.error(res.data.error.message);
              }
            })
            .catch(() => {
              this.getNftList();
              this.$message.error("同步失败");
            });
        })
        .catch(() => {
          // 取消同步
          this.$message({
            type: "info",
            message: "已取消同步文件",
          });
        });
    },
    //编辑
    onEdit(row) {
      this.dialogVisible3 = true;
      //避免引用传递，做一次数据拷贝
      this.nftDetails = JSON.parse(JSON.stringify(row));
    },
    onChang() {
      if (this.nftDetails.name) {
        changeNFT(this.nftDetails.id, { name: this.nftDetails.name })
          .then((res) => {
            // console.log(res);
            this.dialogVisible3 = false;
            this.getNftList();
            this.$message({
              message: "修改成功",
              type: "success",
            });
          })
          .catch(() => {
            this.loading = false;
            this.$message.error("修改失败");
          });
      } else {
        this.$message({
          message: "name不能为空",
          type: "warning",
        });
      }
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
#UploadNFT {
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
