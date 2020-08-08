<template>
  <div>
    <mt-button type="primary" @click="open">打开加载提示框</mt-button>
  </div>
</template>
<script>
export default {
  methods: {
    open() {
      this.$indicator.open({
        text: "加载中",
        spinnerType: "triple-bounce",
      });
    },
  },
};
</script>