<template>
   <van-overlay class-name="loading" :show="loading">
      <div class="loading_wrapper">
        <div>
            <van-loading class="loading" type="spinner" />
            <p class="font">{{tip}}</p>
        </div>
      </div>
    </van-overlay>
</template>
<script>

export default {
  name: 'loading',
  props: {
    loading:{
        type:Boolean,
        default:false
    },
    tip:{
      type:String,
      default:'加载中...'
    }
  },
  methods:{
    
  }
}
</script>
<style lang="less" scoped>
/* loading 加载样式 */
.loading {
  background-color: rgba(255, 255, 255, 0.6)
}
.loading_wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .loading {
    text-align: center;
    margin-bottom: 10px;
  } 
  .font{
    font-size: 14px;
    color: #666;
    display: block;
  }
}
</style>

