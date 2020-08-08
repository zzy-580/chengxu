<template>
  <div> 
    <mt-tabbar v-model="selectedTab" fixed>
        <mt-tab-item id="home">
            首页
            <img src="../../assets/home_enable.png" slot="icon" v-if="selectedTab == 'home'">
            <img src="../../assets/home_disable.png" slot="icon" v-else>
        </mt-tab-item>
        <mt-tab-item id="cart">
            购物车
            <img src="../../assets/cart_enable.png" slot="icon" v-if="selectedTab == 'cart'">
            <img src="../../assets/cart_disable.png" slot="icon" v-else>
        </mt-tab-item>
        <mt-tab-item id="center">
            个人中心
            <img src="../../assets/me_enable.png" slot="icon" v-if="selectedTab == 'center'">
            <img src="../../assets/me_disable.png" slot="icon" v-else>
        </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data(){
    return {
      selectedTab:'home'
    }
  },
  watch:{
    selectedTab(){
       switch(this.selectedTab){
          case 'home':
            this.$router.push('/');
            break;
          case 'cart':
            this.$router.push('/list');
            break;
          case 'center':
            this.$router.push('/navbar');
            break;
       }
    }
  }
}
</script>