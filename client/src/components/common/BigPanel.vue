<template>
  <div class="panel">
    <div class="panel-header"
         v-if="!custom"
         :style="{backgroundColor:color}">
      <div class="title">
        <p>{{ title }}</p>
      </div>
      <div class="btncollapse icon iconfont"
           :class="{'icon-xiangshangjiantouarrowup':!contentState,'icon-xiangxiajiantou1':contentState}"
           v-if="foldable"
           @click="clicked"></div>
    </div>
    <div class="panel-content clearfloat"
         :style="{borderTop:isBorderTop,height:height,padding: contentState?'':'0'}">
      <slot v-if="contentState"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    foldable: {
      type: Boolean,
      default: false
    },
    title: { type: String },
    custom: { type: Boolean },
    color: { type: String },
    height: { type: String },
    isShow: {
      type: Boolean,
      default: true
    },
    value: { type: Boolean, default: undefined }
  },
  data() {
    return {
      contentState: true,
      isShowClick: true
    }
  },
  created() {
    if (!this.foldable) {
      this.contentState = true
      return
    }
    if (this.value !== undefined) {
      this.contentState = this.value
    } else {
      this.contentState = this.isShow
    }
  },
  methods: {
    clicked() {
      this.contentState = !this.contentState
      this.$emit('input', this.contentState)
      this.$emit('clicked')
    }
  },
  computed: {
    isBorderTop: function () {
      return !this.custom ? '1px solid #ddd' : ''
    }
  },
  watch: {
    value(newValue) {
      this.contentState = newValue
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.panel {
  background-color: transparent;
  width: 100%;
  margin-bottom: 0;
  border-radius: 0;
  border: 0;
  box-shadow: 0 0 0;
}

.panel .panel-header {
  height: 40px;
  text-align: left;
}

.panel-content {
  padding: 20px 10px;
  text-align: left;
  border: 0;
  box-shadow: 0;
}

.panel .title {
  font-weight: normal;
  height: 46px;
  line-height: 40px;
  float: left;
  font-size: 14px;
}

.panel:hover .title {
  color: #FC822F;
}

.panel .btncollapse {
  float: right;
  margin-right: 20px;
  height: 46px;
  line-height: 46px;
}

.borderTop {
  border-top: 1px solid #ddd;
}

.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
</style>
