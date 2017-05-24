<template>
  <div class="menuView">
      <ul class="nav nav-pills" role="tablist" >
        <li class="navText" role="presentation" v-for="title in menuItems" @click='clickDown(title.tid)'><a href="#">{{title.text}}</a></li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'menuView',
  props: ['menuItems'],
  methods: {
    clickDown: function (mid) {
      this.$emit('menuItemClick', mid)
    }
  }
}
</script>
<style scoped>
.menuView{
    margin:200px;
}
.menuView .nav.nav-pills{
    width:702px;
    background-color: #ccc;
}
.nav.nav-pills li{
    margin:0;
}
/*字体样式*/
.nav.nav-pills li a{
    font-size: 14px;
    color:black;
}
/*点击事件后得到的背景颜色*/
.nav>li>a:hover,.nav>li>a:focus{
    background-color: gold;
}
.nav-pills>li>a{
    border-radius: 0;
}
</style>
