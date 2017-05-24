<template>
  <div class="calendarinputgroup">
    <div class="starttime">
      <span>开始时间</span>
      <div class="checkdate">
        <input type="text"
               class="timebox form-control"
               v-model='checktime1'
               v-on:focus='clicks'
               v-on:change='changecheck1'
               @click='calendarclick' />
        <label class="icon iconfont icon-rili"
               @click='clicks'></label>
        <calendar v-show='hide1.f'
                  showtime=true
                  class='calendars'
                  @checktimes="get1"
                  :hide='hide1'
                  :defaultdate='defaultdate1'
                  :language='language'
                  :width='width'
                  :timesback='timesback1'
                  @click='calendarclick'></calendar>
      </div>
    </div>
    <div class="endtime">
      <span>结束时间</span>
      <div class="checkdate">
        <input type="text"
               class="timebox form-control"
               v-model='checktime2'
               v-on:focus='clicks1'
               v-on:change='changecheck2'
               @click='calendarclick' />
        <label class="icon iconfont icon-rili"
               @click='clicks1'></label>
        <calendar v-show='hide2.f'
                  showtime=true
                  class='calendars'
                  @checktimes="get2"
                  :hide='hide2'
                  :defaultdate='defaultdate2'
                  :language='language'
                  :width='width'
                  :timesback='timesback2'
                  @click='calendarclick'></calendar>
      </div>
    </div>
  </div>
</template>

<script>
import calendar from './Calendar.vue'
export default {
  name: 'calendarinputgroup',
  components: {
    calendar
  },
  props: {
    language: {
      type: String,
      default: 'zh-cn'
    },
    defaultdate1: { type: String },
    defaultdate2: { type: String },
    width: {
      default: 244
    }
  },
  data() {
    return {
      checktime1: '请选择',
      checktime2: '请选择',
      hide1: { f: false },
      hide2: { f: false },
      timestamp1: '',
      timestamp2: '',
      timesback1: { time: '', t: '' },
      timesback2: { time: '', t: '' }
    }
  },
  methods: {
    get1(msg) {
      this.checktime1 = msg.time
      this.hide1.f = msg.f
      this.timestamp1 = msg.t.getTime()
      if (this.timestamp2 < this.timestamp1 && this.timestamp2 !== '') {
        this.checktime2 = this.checktime1
        this.timesback2.time = this.checktime1
        this.timesback2.t = new Date()
      }
      this.$emit('starendtime', { start: this.checktime1, end: this.checktime2 })
    },
    get2(msg) {
      this.checktime2 = msg.time
      this.hide2.f = msg.f
      this.timestamp2 = msg.t.getTime()
      if (this.timestamp2 < this.timestamp1 && this.timestamp1 !== '') {
        this.checktime1 = this.checktime2
        this.timesback1.time = this.checktime2
        this.timesback1.t = new Date()
      }
      this.$emit('starendtime', { start: this.checktime1, end: this.checktime2 })
    },
    changecheck1: function () {
      this.hide1.f = false
    },
    changecheck2: function () {
      this.hide2.f = false
    },
    clicks: function (e) {
      e.stopPropagation()
      this.hide1.f = true
      this.hide2.f = false
    },
    clicks1: function (e) {
      e.stopPropagation()
      this.hide2.f = true
      this.hide1.f = false
    },
    calendarclick: function (e) {
      e.stopPropagation()
    }
  },
  created: function () {
    if (this.defaultdate1) {
      this.checktime1 = this.defaultdate1
      this.timestamp1 = new Date(this.defaultdate1.replace(/-/g, '/'))
    }
    if (this.defaultdate2) {
      this.checktime2 = this.defaultdate2
      this.timestamp2 = new Date(this.defaultdate2.replace(/-/g, '/'))
    }
  },
  mounted: function () {
    document.querySelector('body').onclick = function (e) {
      if (this.hide1.f) {
        this.hide1.f = false
        this.timesback1.time = this.checktime1
        this.timesback1.t = new Date()
      }
      if (this.hide2.f) {
        this.hide2.f = false
        this.timesback2.time = this.checktime2
        this.timesback2.t = new Date()
      }
    }.bind(this)
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

.calendarinputgroup {
  height: 26px;
  width: 800px;
  margin-top: 8px;
}

.checkdate {
  width: 230px;
  position: relative;
  height: 26px;
  font-size: 14px;
  float: right;
}

.checkdate label {
  position: absolute;
  color: #bbb;
  font-size: 18px;
  right: 4px;
  top: 2px;
}

.timebox {
  width: 230px;
  height: 26px;
  padding: 0 10px;
  color: #414141;
  border-radius: 2px;
  font-size: 12px;
}

.calendars {
  position: absolute;
  left: 0;
  top: 27px;
}

.starttime,
.endtime {
  float: left;
  font-size: 12px;
  width: 350px;
  height: 26px;
  color: #414141;
}

.starttime>span,
.endtime>span {
  display: inline-block;
  line-height: 26px;
}

.starttime {
  margin-right: 70px;
  margin-left: 4px;
}
</style>