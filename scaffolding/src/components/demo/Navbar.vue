<template>
  <div>
      <mt-navbar v-model="active">
          <mt-tab-item id="1">
            <img src="../../assets/html.png" slot="icon">
            HTML5
          </mt-tab-item>
          <mt-tab-item id="2">            
            <img src="../../assets/css.png" slot="icon">
            CSS3
          </mt-tab-item>
          <mt-tab-item id="3">JavaScript</mt-tab-item>
          <mt-tab-item id="4">jQuery</mt-tab-item>
      </mt-navbar>      
      <h1>{{active}}</h1>
  </div>
</template>
<script>
export default {
  data(){
    return {
      active:'1'
    }
  },
  watch:{
    active(){
      console.log('现在在去服务器拿' + this.active + '类的信息了');
    }
  }
}
</script>