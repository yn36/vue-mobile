<template>
  <div class="titles">
    <van-nav-bar :title="title" left-text="" :left-arrow="leftArrow" @click-left="onClickLeft" @click-right="onClickRight">
      <template #right>
        <van-icon :name="rightText" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
import bus from '@/utils/eventBus'
export default {
  name: 'Header',
  props: {
    title: String,
    rightText: String,
    leftArrow: Boolean
  },
  methods: {
    onClickLeft() {
      // 跳转上一级
      // 这个判断用来解决这种情况，当用户没有上一条路由的历史记录，出现点击返回按钮没有反应时，下面的代码用来判断有没有上一条路由的历史记录   如果没有则返回首页
      if (window.history.length <= 1) {
        this.$router.push({ path: '/home' })
        return false
      } else {
        this.$router.go(-1)
      }
    },
    onClickRight() {
      const e = {
        title: this.title,
        icon: this.rightText
      }
      bus.$emit('handleClick', e)
    }
  },
}
</script>
<style lang="less" scoped>
.titles {
  position: fixed;
  z-index: 9;
  width: 100%;
  top: 0;
  // /deep/.van-nav-bar {
  //   background: linear-gradient(0deg, #00A0E9, #5ECDFF);
  //   height: 50px;
  //   .van-nav-bar__text,
  //   .van-nav-bar__title {
  //     color: #fff;
  //   }
  //   .van-nav-bar__title {
  //     font-size: 18px;
  //   }
  //   .van-nav-bar__arrow + .van-nav-bar__text {
  //     margin-left: -27px;
  //   }
  //   .van-nav-bar__arrow {
  //     font-size: 24px;
  //     color: #fff;
  //   }
  //   .van-nav-bar__left {
  //     left: -7px;
  //   }
  //   .van-nav-bar__right {
  //     i {
  //       font-size: 24px !important;
  //       color: #fff;
  //     }
  //   }
  // }
}
</style>
