<!--
 * @Description: 导航
 * @Version: 1.0
 * @Autor: jiajun wu
 * @Date: 2020-08-17 10:08:54
 * @LastEditors: jiajun wu
 * @LastEditTime: 2020-08-17 10:09:58
-->
<!-- 导航 -->
<template>
  <van-tabbar route>
    <van-tabbar-item replace to="/home" icon="wap-home">首页</van-tabbar-item>
    <van-tabbar-item replace to="/communication" icon="records">通讯录</van-tabbar-item>
    <van-tabbar-item replace to="/mine" icon="manager">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  //方法集合
  methods: {},
  //创建完成 访问当前this实例
  created() {},
  //挂载完成 访问DOM元素
  mounted() {},
}
</script>
<style lang='less' scoped>
</style>