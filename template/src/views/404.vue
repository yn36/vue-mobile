<template>
  <div class="exception">
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在或仍在开发中</div>
      <div class="action">
        <van-row>
          <van-col span="12">
            <van-button type="info" @click="handleToHome">返回首页</van-button>
          </van-col>
          <van-col span="12"><van-button type="info" @click="handleLogout">重新登录</van-button></van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { mapActions } from 'vuex'

export default {
  name: 'PageNotFound',
  props: {
    type: {
      type: String,
      default: '404',
    },
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout() {
      Dialog.confirm({
        title: '提示',
        message: '真的要注销登录吗 ?',
      })
        .then(() => {
          this.Logout().then((res) => {
            this.$router.push({ path: '/login' })
          })
        })
        .catch((err) => console.log(err.message))
    },
    handleToHome() {
      this.$router.push({ path: '/' })
    },
  },
}
</script>


<style lang="less" scoped>
.exception {
  /*min-height: 500px;*/
  height: 80%;
  align-items: center;
  text-align: center;
  /*margin-top: 150px;*/
  .img {
    display: inline-block;
    padding-right: 52px;
    zoom: 1;
    img {
      height: 360px;
      max-width: 430px;
    }
  }
  .content {
    display: inline-block;
    flex: auto;
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}

.mobile {
  .exception {
    margin-top: 30px;
    .img {
      padding-right: unset;

      img {
        height: 40%;
        max-width: 80%;
      }
    }
  }
}
</style>
