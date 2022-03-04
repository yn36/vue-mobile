<template>
  <div :class="['vouter-view', menuTheme]">
    <!--头部导航-->
    <Header
      v-if="!hiddenHeader"
      :title="title"
      :rightText="rightText"
      :leftArrow="leftArrow"
    />

    <div class="basic-wrapper"
         :class="{'hidden-header':!hiddenHeader,'visible-tabBar':visibleTabBar}"
    >
      <router-view/>
    </div>
    <!--底部菜单-->
    <Tabbar v-if="visibleTabBar"/>
  </div>
</template>

<script>
  import { mixin, mixinDevice } from '@/utils/mixin'
  import Tabbar from '@/components/tabbar'
  import Header from '@/components/header'

  export default {
    name: 'BasicLayout',
    components: {
      Header,
      Tabbar
    },
    mixins: [mixin, mixinDevice],
    computed: {
      title() {
        return this.$route.meta.title
      },
      leftArrow() {
        return this.$route.path === '/home' ? false : true
      },
      rightText() {
        return this.$route.meta.rightText
      },
      hiddenHeader() {
        return this.$route.meta && this.$route.meta.hiddenHeader
      },
      visibleTabBar() {
        return this.$route.meta && this.$route.meta.visibleTabBar
      }
    }
  }
</script>

<style lang="less" scoped>
  .vouter-view {
    height: 100%;
    width: 100vw;
    overflow-y: scroll;

    /*&::-webkit-scrollbar {*/
    /*background-color: transparent;*/
    /*}*/
  }

  .basic-wrapper {
    overflow-y: hidden;

    &.hidden-header {
      margin-top: 46px;
    }

    &.visible-tabBar {
      padding-bottom: 50px;
    }
  }
</style>
