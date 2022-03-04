<!--
 * @Descripttion: 搜索面板<search-popup :show.sync="show" />
 * @version: v1.0
 * @Author: haohong ma
 * @Date: 2020-11-19 09:27:16
 * @LastEditors: haohong ma
 * @LastEditTime: 2020-11-19 09:32:40
-->

<template>
  <div>
    <van-popup v-model="show" position="right" class="search-popup">
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <van-search slot="title" v-model="searchValue" placeholder="请输入搜索关键词" left-icon="" @search="onSearch()">
          <van-icon class="search-right-icon" slot="right-icon" name="search" @click="onSearch()"/>
        </van-search>
      </van-nav-bar>
      <div class="search-history">
        <div class="title">
          <span>历史搜索</span>
          <span><van-icon name="delete" @click="CLEAR_HISTORY"/></span>
        </div>
        <van-tag
          v-for="(item,index) in searchHistory"
          :key="index"
          closeable
          round
          plain
          size="large"
          @close="DELETE_HISTORY(item)"
          @click="onSearchForHistory(item)"
        >
          {{item}}
        </van-tag>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import bus from '@/utils/eventBus'
  import { mapMutations, mapState } from 'vuex'

  export default {
    data() {
      return {
        searchValue: ''
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState({
        //取最近6个记录
        searchHistory: state => state.history.history.slice(-10)
      })
    },
    mounted() {
      bus.$on('handleClick', () => {
        this.$emit('update:show', true)
      })
    },
    methods: {
      ...mapMutations('history', ['SET_HISTORY', 'DELETE_HISTORY', 'CLEAR_HISTORY']),
      onClickLeft() {
        this.$emit('update:show', false)
      },
      onSearch() {
        //搜索记录保存
        if (this.searchValue.trim()) {
          this.SET_HISTORY(this.searchValue)
        }
        bus.$emit('handleSearch', this.searchValue)
        this.$emit('update:show', false)
      },
      //历史记录搜索
      onSearchForHistory(record) {
        this.searchValue = record
        bus.$emit('handleSearch', this.searchValue)
        this.$emit('update:show', false)
      }
    },
    beforeDestroy() {
      bus.$off('handleClick')
    }
  }
</script>

<style lang='less' scoped>
  .search-popup {
    width: 100%;
    height: 100%;

    /deep/ .van-nav-bar {
      /*border-bottom: 18px solid #eee;*/

      .van-nav-bar__title {
        max-width: 80%;
        width: 80%;

        .van-search {
          padding: 0;
        }
      }

      .van-nav-bar__content {
        height: 60px;

        .van-nav-bar__left {
          padding: 0;

          .van-nav-bar__arrow {
            font-size: 20px;
            padding: 0 5px;
          }
        }

        .van-icon-search {
          font-size: 22px;
          color: @gray-8;
        }
      }
    }

    .search-history {
      .title {
        display: flex;
        color: #aaa;
        font-size: 14px;
        justify-content: space-between;
        padding: 8px 20px 8px 10px;

        .van-icon {
          font-size: 16px;
        }
      }

      .van-tag--plain {
        margin: 5px;
        background-color: #efefef;
        padding: 5px 10px;

        &::before {
          border: none;

        }
      }
    }
  }
</style>
