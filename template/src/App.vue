<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view>
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    <router-view v-else>
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </div>
</template>

<script>
import { AppDeviceEnquire } from '@/utils/mixin'
import '@/assets/fonts/aifa/iconfont.css'
import { mapState, mapActions } from 'vuex'
import { axios } from '@/utils/request'

export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {
      // height: null,
    }
  },
  mounted() {
    // var height = window.screen.height //获取当前屏幕的高度
    // this.height = height
    // document.querySelector('body').setAttribute('style', 'min-height:'+height+'px')
  },
  methods: {
    ...mapActions(['setPermis']),
    onChange(index) {},
  },
}
</script>
<style lang="less">
//注释默认全局样式
// @import url('./components/global.less');
html,
body {
  padding: 0;
  margin: 0;
}
#app {
  background-color: #eee;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
