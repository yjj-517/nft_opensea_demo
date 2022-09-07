<template>
  <el-container>
    <!-- 左侧 -->
    <el-aside width="220px">
      <h1>NFT管理系统</h1>
      <!--     :default-active="$route.path"         -->
      <el-menu
        @select="selectMenu"
        :default-active="activePath"
        background-color="#001529"
        text-color="#FFFFFF"
        active-text-color="#1890FF"
        unique-opened
        router
      >
        <div v-for="obj in treelist" :key="obj.index">
          <!-- 可展开的菜单 -->
          <el-submenu v-if="obj.children" :index="obj.index">
            <template slot="title">
              <i :class="obj.i"></i>
              <span>{{ obj.text }}</span>
            </template>

            <!-- 展开的菜单：应该循环当前数据的obj.children数组 -->
            <el-menu-item
              v-for="child in obj.children"
              :key="child.index"
              :index="child.index"
              >{{ child.text }}</el-menu-item
            >
          </el-submenu>
          <!-- 无法展开直接点击的菜单儿子 -->
          <el-menu-item v-else :index="obj.index">
            <i :class="obj.i"></i>
            <span slot="title">{{ obj.text }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>

    <!-- 右侧 -->
    <el-container>
      <!-- 右-头 -->
      <el-header>
        <!-- <h1>Welcome To NFT</h1> -->
        <!-- 面包屑 -->
        <div class="bread">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="bread_01" :to="{ path: '/' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item
              class="bread_01"
              v-for="item in breadList"
              :key="item"
              >{{ item }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
      </el-header>
      <!-- 右-身 -->
      <el-main>
        <el-card>
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      breadList: [], // 面包屑数组
      activePath: "", // 当前激活哈希
      treelist: [
        { index: "/index/Home", i: "el-icon-star-off", text: "Home" },
        {
          index: "3",
          i: "el-icon-goods",
          text: "NFT管理-OpenSea",
          children: [
            {
              index: "/index/OpenseaList/OpenseaUpload",
              text: "OpenSea-已上传",
              bread: ["NFT管理-OpenSea", "OpenSea-已上传"],
            },
            {
              index: "/index/OpenseaList/OpenseaShop",
              text: "OpenSea-已上架",
              bread: ["NFT管理-OpenSea", "OpenSea-已上架"],
            },
            {
              index: "/index/OpenseaList/OpenseaSold",
              text: "OpenSea-已出售",
              bread: ["NFT管理-OpenSea", "OpenSea-已出售"],
            },
          ],
        },
        {
          index: "4",
          i: "el-icon-notebook-2",
          text: "NFT管理-Only",
          children: [
            {
              index: "/index/NFTList/UploadNFT",
              text: "NFT-新建管理",
              bread: ["NFT管理-Only", "NEW-NFT管理"],
            },
            {
              index: "/index/NFTList/IpfsNFT",
              text: "NFT-IPFS管理",
              bread: ["NFT管理-Only", "IPFS-NFT管理"],
            },
            {
              index: "/index/NFTList/WaitNFT",
              text: "NFT-待铸造",
              bread: ["NFT管理-Only", "NFT-待铸造"],
            },
            {
              index: "/index/NFTList/MintNFT",
              text: "NFT-已铸造",
              bread: ["NFT管理-Only", "NFT-已铸造"],
            },
          ],
        },

        {
          index: "/index/Ceshi",
          i: "el-icon-s-check",
          text: "我的主页",
          bread: ["我的主页"],
        },
      ],
    };
  },
  methods: {
    // 选中菜单
    selectMenu(index) {
      let bread = [];
      for (let obj of this.treelist) {
        // 判断是否有children,有则循环儿子
        if (obj.children) {
          for (let child of obj.children) {
            if (child.index == index) {
              bread = child.bread;
            }
          }
        } else {
          // 没有儿子，直接判断索引
          if (obj.index == index) {
            bread = obj.bread;
          }
        }
      }
      this.breadList = bread;
    },
  },
  mounted() {
    this.activePath = this.$route.path;
    this.selectMenu(this.activePath); // 找到当前选项卡的面包屑数组
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  border: 0;
}
.el-container {
  width: 100%;
  height: 100%;
  .el-aside {
    background-color: #002140;
    h1 {
      line-height: 4.3rem;
      color: #fff;
      text-align: center;
    }
  }
  .el-header {
    background-color: #001529;
    h1 {
      line-height: 4.3rem;
      color: #fff;
      text-align: center;
    }
    .bread {
      margin: 1.5rem 0 0;
    }
    .bread_01 /deep/ .el-breadcrumb__inner {
      color: #fff;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
// .el-breadcrumb ::v-deep .el-breadcrumb__inner {
//         color: #fff !important;
// }
</style>
