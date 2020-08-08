<template>
  <div>
    <!-- 顶部导航开始 -->
    <mt-header title="学前端,到学问">
      <div slot="right" class="shortcut" v-if="!this.$store.state.isLogin">
        <router-link to="/register">注册</router-link>
        <router-link to="/login">登录</router-link>
      </div>
      <div slot="right" class="shortcut" v-else>
        <router-link to="/">
           <mt-button type="primary">
             <img src="../assets/logout.png" alt="" slot="icon">
           </mt-button>
        </router-link>
      </div>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 顶部选项卡开始 -->
    <mt-navbar v-model="active">
      <mt-tab-item
        :id="item.id"
        v-for="(item,index) of category"
        :key="index"
      >{{item.category_name}}</mt-tab-item>
    </mt-navbar>
    <!-- 顶部选项卡结束 -->
    <!-- 面板区域开始 -->
    <div
      class="panel"
      infinite-scroll-distance="10"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-immediate-check="true"
    >
      <mt-tab-container v-model="active">
        <mt-tab-container-item :id="item.id" v-for="(item,index) of category" :key="index">
          <!-- 单一文章信息开始 -->
          <div class="InfoItem" v-for="(article,index) of articles" :key="index">
            <!-- 标题信息开始 -->
            <div class="InfoItemHead">
              <router-link :to="`/article/${article.id}`">{{article.subject}}</router-link>
            </div>
            <!-- 标题信息结束 -->
            <!-- 简介与缩略图区域开始 -->
            <div class="InfoItemContent">
              <!-- 简介开始 -->
              <div class="InfoItemDes">
                <router-link :to="`/article/${article.id}`">{{article.description}}</router-link>
              </div>
              <!-- 简介结束 -->
              <!-- 缩略图开始 -->
              <router-link :to="`/article/${article.id}`">
                <img v-lazy="article.image" class="InfoItemImg-s" v-if="article.image != null" />
              </router-link>
              <!-- 缩略图结束 -->
            </div>
            <!-- 简介与缩略图区域结束 -->
          </div>
          <!-- 单一文章信息结束 -->
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <!-- 面板区域结束 -->
    <!-- 底部选项卡开始 -->
    <mt-tabbar v-model="selectedTab" fixed>
      <mt-tab-item id="home">
        首页
        <img src="../assets/home_enable.png" slot="icon" v-if="selectedTab == 'home'" />
        <img src="../assets/home_disable.png" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="cart">
        购物车
        <img src="../assets/cart_enable.png" slot="icon" v-if="selectedTab == 'cart'" />
        <img src="../assets/cart_disable.png" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="center">
        个人中心
        <img src="../assets/me_enable.png" slot="icon" v-if="selectedTab == 'center'" />
        <img src="../assets/me_disable.png" slot="icon" v-else />
      </mt-tab-item>
    </mt-tabbar>
    <!-- 底部选项卡结束 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      //默认被选定的顶部选项卡及面板的ID
      active: 1,
      //默认被选定的底部选项卡
      selectedTab: "home",
      //存储文章分类信息
      category: [],
      //存储文章数据
      articles: [],
      //存储当前页码
      page: 1,
      //存储服务器返回的总页数
      pagecount: 0,
      busy: false,
    };
  },
  methods: {
    //加载数据的函数
    loadData() {
      //代表当前服务器正在处理请求,即使再次进入滚动范围,也不在触发滚动指令
      this.busy = true;
      //显示加载提示框,
      this.$indicator.open("加载中");
      this.axios
        .get("/articles?cid=" + this.active + "&page=" + this.page)
        .then((res) => {
          //获取服务器返回的文章数据
          let data = res.data.articles;
          //将服务器返回的总页数存储到pagecount变量中
          this.pagecount = res.data.pagecount;
          data.forEach((item) => {
            //因为有的文章不存在缩略图，所以无需动态加载
            if (item.image != null) {
              //动态加载缩略图(实际上是动态加载后,属性重新赋值的过程)
              item.image = require("../assets/articles/" + item.image);
            }
            //将item(文章对象,包含id,subject等属性添加到articles数组的未尾)
            this.articles.push(item);
          });
          this.busy = false;
          this.$indicator.close();
        });
    },
    //向下滚动时触发的加载更多数据的函数
    loadMore() {
      //页码累加
      this.page++;
      //如果当前页码在总页数范围内则继续发送请求
      if (this.page <= this.pagecount) {
        //加载数据
        this.loadData();
      }
    },
  },
  watch: {
    //监听顶部选项卡的变化
    active() {
      //切换顶部选项卡时,清空之前存储的文章数据
      this.articles = [];
      //切换顶部选项卡时,页码初始值为1
      this.page = 1;
      //加载数据
      this.loadData();
    },
    //监听底部选项卡的变化
    selectedTab() {
      switch (this.selectedTab) {
        case "home":
          this.$router.push("/");
          break;
        case "cart":
          this.$router.push("/list");
          break;
        case "center":
          this.$router.push("/navbar");
          break;
      }
    },
  },
  //在挂载后发送请求，以获取WEB服务器的数据
  mounted() {
    //获取文章分类信息 -- 决定顶部选项卡
    this.axios.get("/category").then((res) => {
      this.category = res.data.results;
    });
    //加载数据
    this.loadData();
  },
};
</script>
<style scoped>
/* 顶部导航栏右侧的链接 */
.shortcut a {
  display: inline-block;
  margin-left: 5px;
  color: #fff;
  text-decoration: none;
}
/* 面板容器 */
.panel {
  margin-top: 10px;
  margin-bottom: 55px;
}
/* 单一文章信息容器 */
.InfoItem {
  padding: 15px 0 14px;
  margin: 0 15px;
  border-bottom: 0.5px solid #d3d3d3;
}
/* 文章的标题信息 */
.InfoItemHead {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
/* 简介与缩略图容器 */
.InfoItemContent {
  display: -ms-flexbox;
  display: flex;
  padding-top: 11px;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
}
/* 简介 */
.InfoItemDes {
  flex: 1;
  position: relative;
  -webkit-line-clamp: 3;
  height: 63px;
  padding-right: 15px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
  margin: 4px 15px;
  -webkit-box-orient: vertical;
}
/* 缩略图 */
.InfoItemImg-s {
  width: 112px;
  height: 74px;
  border-radius: 5px;
  background: #ccc;
}
.InfoItemHead a {
  text-decoration: none;
  color: #000;
}
.InfoItemDes a {
  text-decoration: none;
  color: #000;
}
</style>