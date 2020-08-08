<template>
  <div>
    <!-- 顶部选项卡开始 -->
    <div>
      <mt-navbar v-model="active"> 
          <mt-tab-item id="1">HTML5</mt-tab-item>
          <mt-tab-item id="2">CSS3</mt-tab-item>
          <mt-tab-item id="3">JavaScript</mt-tab-item>
          <mt-tab-item id="4">jQuery</mt-tab-item>
      </mt-navbar>
    </div>
    <!-- 顶部选项卡结束 -->
    <!-- 面板区域开始 -->
    <div class="panel">
        <mt-tab-container v-model="active">
            <mt-tab-container-item id="1">
                <p>12345</p>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <p>ABCDE</p>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <p>中华人民共和国</p>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <p>This a test</p>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
    <!-- 面板区域结束 -->
  </div>
</template>
<script>
export default {
  data(){
    return {
      active:'1'
    }
  }
}
</script>
<style scoped>
.panel{
  margin-top:10px;
}
</style>