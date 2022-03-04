<template>
  <div>
    <search-popup :show.sync="show"></search-popup>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-swipe-cell v-for="item in list" :key="item" :title="item">
          <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            class="goods-card"
            thumb="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <template #right>
            <van-button square text="删除" type="danger" class="delete-btn"/>
          </template>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import SearchPopup from '@/components/search-popup/index'
  import bus from '@/utils/eventBus'

  export default {
    name: 'index',
    components: { SearchPopup },
    data() {
      return {
        show: false,  //控制搜索面板的显示隐藏
        list: [],
        loading: false,
        finished: false,
        refreshing: false
      }
    },
    mounted() {
      bus.$on('handleSearch', (searchValue) => {
        //重新加载列表

        this.onRefresh()
      })
    },
    methods: {
      onLoad() {
        setTimeout(() => {
          if (this.refreshing) {
            this.list = []
            this.refreshing = false
          }

          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1)
          }
          this.loading = false

          if (this.list.length >= 40) {
            this.finished = true
          }
        }, 1000)
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false
        this.list = []
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.onLoad()
      }
    },
    beforeDestroy() {
      bus.$off('handleSearch')
    }
  }
</script>

<style lang="less" scoped>
  .delete-btn {
    height: 100%;
  }
</style>