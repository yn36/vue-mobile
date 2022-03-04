<template>
  <div id="loginLaout">
    <div class="login-container">
      <img src="@/assets/login-wrapper.png" />
      <h3>智能科技移动端</h3>
      <div class="login-wrapper">
        <van-form @submit="onSubmit" validate-trigger="onChange">
          <div class="van-field-wrapper">
            <van-field
              v-model="loginForm.username"
              name="username"
              left-icon="contact"
              placeholder="admin"
              :rules="[{ required: false, message: '请填写用户名' }]"
            />
            <van-field
              v-model="loginForm.password"
              type="password"
              name="password"
              left-icon="comment-o"
              placeholder="123"
              :rules="[{ required: false, message: '请填写密码' }]"
            />
            <van-field
              v-model="loginForm.captcha"
              name="captcha"
              placeholder="请输入验证码"
              :rules="[{ required: false, message: '请输入验证码' }]"
            >
              <template #button>
                <!--demo验证码-->
                <img :src="captcha" @click="refreshCaptcha" />
                <!-- <img
                  src="data:image/jpeg;base64,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"
                /> -->
              </template>
            </van-field>
          </div>
          <!-- <div class="login-action">
            <div class="remember">
              <van-checkbox
                v-model="loginForm.rememberMe"
                @change="checkChange"
                icon-size="18px"
                slot="input"
                shape="square"
                >记住密码
              </van-checkbox>
            </div>
            <span>忘记密码</span>
          </div> -->
          <div class="submit">
            <van-button :loading="loading" block type="info" native-type="submit"> 登录 </van-button>
            <!-- <van-button plain type="info" >
              注册
            </van-button> -->
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import base64 from 'base-64'
import { mixinDevice } from '@/utils/mixin'
import { mapActions } from 'vuex'
import { Toast } from 'vant'

export default {
  mixins: [mixinDevice],
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        captcha: '',
        rememberMe: false,
      },
      captcha: '',
      loading: false,
    }
  },
  mounted() {
    this.refreshCaptcha()
  },
  methods: {
    ...mapActions(['Login', 'isAuthed']),
    checkChange(check) {
      let inpUser = this.loginForm.username
      let passwordUser = this.loginForm.password
    },
    onSubmit(values) {
      this.loading = true
      const loginParams = { ...values }

      loginParams.password = base64.encode(md5(values.password))
      this.Login(loginParams)
        .then((result) => {
          if (result.success) {
            Toast.success('登录成功')
            this.$router.push({ path: '/home' })
          } else {
            Toast.fail(result.message)
            this.refreshCaptcha()
          }
        })
        .finally((res) => {
          this.loading = false
        })
    },
    requestFailed(err) {
      Toast.fail(err)
      this.getCaptcha()
    },

    /**
     * 刷新验证码
     */
    refreshCaptcha() {
      this.captcha = './login/captcha?t=' + new Date().getTime()
    },
  },
}
</script>

<style lang="less" scoped>
#loginLaout {
  height: 100vh;
  background: white;

  .login-container {
    img {
      width: 100%;
    }

    h3 {
      margin: 0px;
      font-size: 20px;
      color: #188ffe;
      line-height: 35px;
      padding: 5px 12px;
      text-align: center;
      letter-spacing: 0.5px;
      font-weight: 600;
    }
  }

  .login-wrapper {
    margin-top: 15px;

    .van-field-wrapper {
      box-sizing: border-box;
      background: #ffff;
      padding: 0px 12px;
    }

    /deep/ .van-cell {
      border-bottom: 1px solid #eee;
      padding: 10px 5px 0px 5px;

      .van-field__left-icon {
        line-height: 39px;
      }

      .van-icon {
        font-size: 23px;
        color: #188ffe;
      }

      .van-cell__title {
        display: inline-block;
      }

      .van-field__label {
        font-size: 0.3rem;
        color: #000;
        width: 2rem;
      }

      .van-cell__value {
        padding: 7px 0px;

        input {
          font-size: 15px;
          background-color: #fff !important;
          padding: 2px 0px;
        }
      }
    }

    .login-action {
      display: flex;
      margin: 20px 20px;

      a {
        display: inline-flex;
        color: #000;
      }

      .remember {
        /deep/ .van-checkbox__label {
          font-size: 15px;
        }

        /deep/ .van-icon {
          border-radius: 3px;
        }
      }

      span {
        font-size: 15px;
        flex: 1;
        color: #888;
        letter-spacing: 0.5px;
        text-align: right;
      }
    }

    .submit {
      margin-top: 30px;

      button {
        display: block;
        border-radius: 50px;
        width: 94%;
        margin: auto;
        font-size: 17px;
        letter-spacing: 10px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
