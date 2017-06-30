<template>
    <div class="app">
        <v-header></v-header>
        <div class="tab border-1px">
          <div class="tab-item">
            <router-link to="/goods">商品</router-link>
          </div>
          <div class="tab-item">
            <router-link to="/ratings">评论</router-link>
          </div>
          <div class="tab-item">
            <router-link to="/seller">商家</router-link>
          </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
  </div>
</template>

<script>
    import header from './components/header/header.vue';
    import {mapState, mapGetters, mapActions} from "Vuex";
    export default {
        name: 'app',
        computed: {
          ...mapState({
            seller: state => state.seller
          })
        },
        components: {
          'v-header': header,
        },
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" >
  @import './common/stylus/mixin.styl';
    .tab
        display: flex
        width: 100%
        height: 40px
        line-height: 40px
        border-1px(rgba(7, 17, 21, 0.1))
        position: relative
        .tab-item
            flex: 1
            text-align: center
            a
                display: block
                font-size: 14px
                color: rgb(77,85,93)
                &.active
                  color: rgb(240,20,20)
</style>

