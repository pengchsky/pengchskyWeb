<template>
  <div class="index-layout">
    <img src="../assets/images/bg.jpg">
    <div class="copyright">
      Copyright © 十月飞鱼 版权所有
      <a href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2024041506号-1</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "introduce"
}
</script>

<style scoped lang="less">
.index-layout {
  width: 750px;
  height: 100vh;
  margin: 0 auto;
  background-color: #ce4241;
  img {
    width: 100%;
    height: auto;
  }
  .copyright {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 750px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #FFFFFF;
    background-color: rgba(0,0,0,0.5);
    a {
      color: #FFFFFF;
    }
  }
}
</style>
