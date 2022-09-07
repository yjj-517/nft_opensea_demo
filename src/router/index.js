import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/index/Home'
  },
  {
    path: "/Login",
    name: "/Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/Index.vue"),
    //嵌套二级路由
    children: [
      {
        path: "/index/Home",
        name: "/index/Home",
        component: () => import("../views/modules/Home.vue")
      },
      // opensea
      {
        path: "/index/OpenseaList/OpenseaUpload",
        name: "/index/OpenseaList/OpenseaUpload",
        component: () => import("../views/modules/OpenseaList/OpenseaUpload.vue")
      },
      {
        path: "/index/OpenseaList/OpenseaShop",
        name: "/index/OpenseaList/OpenseaShop",
        component: () => import("../views/modules/OpenseaList/OpenseaShop.vue")
      },
      {
        path: "/index/OpenseaList/OpenseaSold",
        name: "/index/OpenseaList/OpenseaSold",
        component: () => import("../views/modules/OpenseaList/OpenseaSold.vue")
      },
      // 合约
      {
        path: "/index/NFTlist/UploadNFT",
        name: "/index/NFTlist/UploadNFT",
        component: () => import("../views/modules/NFTList/UploadNFT.vue")
      },
      {
        path: "/index/NFTlist/IpfsNFT",
        name: "/index/NFTlist/IpfsNFT",
        component: () => import("../views/modules/NFTList/IpfsNFT.vue")
      },
      {
        path: "/index/NFTlist/WaitNFT",
        name: "/index/NFTlist/WaitNFT",
        component: () => import("../views/modules/NFTList/WaitNFT.vue")
      },
      {
        path: "/index/NFTlist/MintNFT",
        name: "/index/NFTlist/MintNFT",
        component: () => import("../views/modules/NFTList/MintNFT.vue")
      },

      {
        path: "/index/Ceshi",
        name: "/index/Ceshi",
        component: () => import("../views/modules/Ceshi.vue")
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
