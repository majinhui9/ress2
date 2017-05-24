<template>
  <div id="app-main">
    <nav-menu :navs="this.localNavs"></nav-menu>
    <div class="app-wrapper">
      <x-header ></x-header>
      <div class="app-container" :class="{active: loggedIn}">
        <!-- <router-loading></router-loading> -->
        <router-view></router-view>
      </div>
      <n-progress parent=".app-wrapper"></n-progress>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import Vue from 'vue'
import XHeader from './components/Header'
import NavMenu from './components/NavMenu'
import locales from 'locales/menu'
import NProgress from './components/NProgress'
import ContentModule from './components/ContentModule'
import { mapGetters } from 'vuex'
Vue.component('ContentModule', ContentModule)

export default {
  locales,
  computed: {
    ...mapGetters(['loggedIn', 'navs']),
    localNavs() {
      const locNavs = _.map(this.navs, (nav) => {
        const newNav = _.clone(nav)
        if (!nav.localized) {
          newNav.lable = this.$t(nav.lable)
        }
        return newNav
      })
      console.log(locNavs)
      return locNavs
    }
  },
  components: {
    XHeader,
    NavMenu,
    NProgress
  }
}
</script>
<style lang="stylus">
@import "assets/css/variable"
@import "assets/css/animate"
@import "assets/css/flex"
::-webkit-scrollbar
  width 4px
  height 4px
  background-color $color-gray
::-webkit-scrollbar-button
::-webkit-scrollbar-track
  display none
::-webkit-scrollbar-thumb
  background-color $color-silver-light
::-webkit-scrollbar-thumb:hover
  background-color $color-black-exact-light

html
  font-size 16px
  font-family "Helvetica Neue", Helvetica, Tahoma, Arial, sans-serif
body
  margin 0
  padding 0
  font-size .75rem
  background-color #f0f0f0

a
  text-decoration none
#app-main
  display flex
  width 100%
  height 100vh
  .app-wrapper
    flex 1
    display flex
    flex-flow column
    overflow-x hidden
    .app-container
      position relative
      flex 1
      display flex
      justify-content center
      margin 0
      padding 1rem
      background-color #fff
      overflow auto
      &.active
        margin 1rem

.el-dropdown-link
  cursor pointer
</style>
