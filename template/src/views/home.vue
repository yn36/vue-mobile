<template>
  <div class="home">
    <!--<a style="color: black" href="https://youzan.github.io/vant/next/#/zh-CN/home" target="_balnk">-->
    <!--vant开发文档-->
    <!--</a>-->

      <van-grid clickable :column-num="2">
        <van-grid-item icon="todo-list-o" text="列表含搜索" to="/search-list" />
        <van-grid-item icon="question-o" text="相关文档" url="https://youzan.github.io/vant/next/#/zh-CN/home" />
      </van-grid>
  </div>
</template>
<style lang="less" scoped>
  .home {

  }
</style>
