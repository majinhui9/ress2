<template>
  <div class="container"
       :style="{width:width + 'px'}">
    <div class="row">
      <div class="calendar"
           @click='calendarclick'>
        <ul class="month">
          <li class="arrows left"
              v-on:click="pickPrey()"> <span class="icon iconfont icon-zhankai"></span></li>
          <li class="mup arrows left"
              v-on:click="pickPre()"> <span class="icon iconfont icon-jiantou-copy-copy-copy"></span></li>
          <li class="year-month">
            <span class="choose-year"
                  v-if="language=='zh-cn'">{{ currentYear }}年{{ currentMonth}}月</span>
            <span class="choose-year"
                  v-else>{{ currentMonth}}/{{ currentYear }}</span>
          </li>
          <li class="mdown arrows right"
              v-on:click="pickNext()"><span class="icon iconfont icon-jiantou-copy-copy-copy"></span></li>
          <li class="arrows right"
              v-on:click="pickNexty()"><span class="icon iconfont icon-zhankai2"></span></li>
        </ul>
        <ul class="weekdays">
          <li v-for='i in week'>{{i}}</li>
        </ul>
        <ul class="days">
          <li v-on:click="pick(day)"
              v-for="day in days">
            <span v-if="day.getMonth()+1 != currentMonth"
                  class="other-month">{{ day.getDate() }}</span>
            <span v-else-if="day.getFullYear() == date.getFullYear() && day.getMonth() == date.getMonth() && day.getDate() == date.getDate()"
                  class="active">{{ day.getDate() }}</span>
            <span v-else>{{ day.getDate() }}</span>
          </li>
        </ul>
        <ul class="times"
            v-if="showtime">
          <li style="float:left;"
              class="timesleft">
            <input type="text"
                   class="hours"
                   v-model="hours"
                   v-on:change="changehours" /><span>:</span>
            <input type="text"
                   class="minutes"
                   v-model="minutes"
                   v-on:change="changeminutes" /><span>:</span>
            <input type="text"
                   class="seconds"
                   v-model="seconds"
                   v-on:change="changeseconds" />
          </li>
          <li style="float:right;"
              class="timesrigth">
            <button class="confirms"
                    v-on:click="nowtime">{{current}}</button>
            <button class="confirms"
                    v-on:click="confirm">{{determine}}</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
var moment = require('moment')
moment().format()
export default {
  name: 'calendar',
  props: {
    language: {
      type: String,
      default: 'zh-cn'
    },
    showtime: {
      // type: Boolean,
      default: false
    },
    hide: {},
    defaultdate: { type: String },
    timesback: {},
    width: {
      type: Number,
      default: 244
    }
  },
  data() {
    return {
      date: '',
      week: [],
      hours: '00',
      minutes: '00',
      seconds: '00',
      current: '当前',
      determine: '确定'
    }
  },
  watch: {
    'timesback.t'(val) {
      this.date = new Date(this.timesback.time.replace(/-/g, '/'))
      this.currentminutes()
      this.currentseconds()
      this.currenthours()
    }
  },
  computed: {
    currentYear() {
      return this.date.getFullYear()
    },
    currentDay() {
      return this.date.getDate()
    },
    currentMonth() {
      const month = this.date.getMonth() + 1
      if (month < 10) {
        return '0' + month
      }
      return month
    },
    currentWeek() {
      return this.date.getDay() + 1
    },
    currentNowWeek() {
      return Math.floor((this.currentDay + 6 - this.currentWeek) / 7)
    },
    days() {
      const dayArray = []
      // 今天是周日，放在第一行第7个位置，前面6个

      const center = this.currentNowWeek * 7 + this.currentWeek - 1
      for (var i = center; i >= 0; i--) {
        var d = new Date(this.date)
        d.setDate(d.getDate() - i)
        dayArray.push(d)
      }
      for (var j = 1; j <= 42 - center - 1; j++) {
        var setDay = new Date(this.date)
        setDay.setDate(setDay.getDate() + j)
        dayArray.push(setDay)
      }
      return dayArray
    }
  },
  methods: {
    pick: function (date) {
      this.date = date
      var test = this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      this.$emit('clicktest', test)
    },
    pickPre: function () {
      var temp = new Date(this.date)
      temp.setMonth(temp.getMonth() - 1)
      temp.setDate(1)
      this.date = temp
    },
    pickNext: function (year, month) {
      var temp = new Date(this.date)
      temp.setMonth(temp.getMonth() + 1)
      temp.setDate(1)
      this.date = temp
    },
    pickPrey: function () {
      var temp = new Date(this.date)
      temp.setFullYear(temp.getFullYear() - 1)
      temp.setDate(1)
      this.date = temp
    },
    pickNexty: function (year, month) {
      var temp = new Date(this.date)
      temp.setFullYear(temp.getFullYear() + 1)
      temp.setDate(1)
      this.date = temp
    },
    changehours: function () {
      if (this.hours >= 0 && this.hours < 24) {
        this.date.setHours(this.hours)
      }
      this.currenthours()
    },
    changeminutes: function () {
      if (this.minutes >= 0 && this.minutes < 60) {
        this.date.setMinutes(this.minutes)
      }
      this.currentminutes()
    },
    changeseconds: function () {
      if (this.seconds >= 0 && this.seconds < 60) {
        this.date.setSeconds(this.seconds)
      }
      this.currentseconds()
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function (year, month, day) {
      var y = year
      var m = month
      if (m < 10) m = '0' + m
      var d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    },
    confirm: function () {
      var time = this.currentYear + '-' + this.currentMonth + '-' + (this.currentDay < 10 ? '0' + this.currentDay : this.currentDay) + ' ' + this.currenthours() + ':' + this.currentminutes() + ':' + this.currentseconds()
      // console.log(time)
      this.$emit('checktimes', { time, f: this.hide.f, t: this.date })
      this.hide.f = false
      return time
    },
    nowtime: function () {
      this.date = new Date()
      this.currentminutes()
      this.currentseconds()
      this.currenthours()
    },
    currenthours() {
      this.hours = this.date.getHours() < 10 ? '0' + this.date.getHours() : this.date.getHours()
      return this.hours
    },
    currentminutes() {
      this.minutes = this.date.getMinutes() < 10 ? '0' + this.date.getMinutes() : this.date.getMinutes()
      return this.minutes
    },
    currentseconds() {
      this.seconds = this.date.getSeconds() < 10 ? '0' + this.date.getSeconds() : this.date.getSeconds()
      return this.seconds
    },
    calendarclick: function (e) {
      e.stopPropagation()
    }
  },
  created: function () {
    if (this.defaultdate) {
      var aa = this.defaultdate
      if (aa.length > 10) {
        this.date = new Date(aa.slice(0, 4), aa.slice(5, 7) - 1, aa.slice(8, 10), aa.slice(11, 13), aa.slice(14, 16), aa.slice(17, 19))
      } else {
        this.date = new Date()
        this.date = new Date(aa.slice(0, 4), aa.slice(5, 7) - 1, aa.slice(8, 10), this.currenthours(),
          this.currentminutes(), this.currentseconds())
      }
    } else {
      this.date = new Date()
    }
    if (this.language === 'zh-cn') {

    } else {
      this.current = 'now',
      this.determine = 'ok'
    }
    moment.locale(this.language)
    this.week = moment.weekdaysMin()
    this.currentminutes()
    this.currentseconds()
    this.currenthours()
  }

}
</script>
<style scoped>
* {
  box-sizing: border-box;
  margin: 0px;
  border: 0px;
  padding: 0px;
}

ul {
  list-style-type: none;
}

body {
  font-family: Verdana, sans-serif;
}

.container {
  width: 230px;
}

.calendar {
  border-radius: 3px;
  border: 1px solid #eee;
  margin: 0;
  padding: 0;
  color: #414141;
  width: 100%;
  height: auto;
  overflow: hidden;
}

.month {
  background: #20a0ff;
  margin: 0;
  padding: 0;
  color: #fff;
  height: 40px;
  font-size: 14px;
}

.year-month {
  flex-direction: column;
  align-items: center;
  cursor: default;
  margin: 0 auto;
  line-height: 38px;
  width: 50%;
  text-align: center;
  float: left;
}

.choose-year {
  color: #fff;
  font-size: 14px;
}

.choose-month {
  text-align: center;
}

.month li {
  color: white;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 12px;
}

.arrows {
  padding: 8px 6px;
  color: #fff;
  cursor: pointer;
  line-height: 24px;
  width: 15%;
  text-align: center;
}

.iconfont {
  font-size: 12px;
}

.arrows.left {
  float: left;
}

.arrows.right {
  float: left;
}

.mup {
  transform: rotate(-90deg);
  padding: 12px 6px 4px 6px;
  width: 10%;
}

.mdown {
  transform: rotate(90deg);
  padding: 10px 6px 4px 6px;
  width: 10%;
}

.weekdays {
  width: 100%;
  margin: 0;
  height: 36px;
  line-height: 36px;
  color: #000000;
  background: #f2f4f7;
}

.weekdays li {
  display: inline-block;
  width: 14.28%;
  text-align: center;
  cursor: default;
  float: left;
  font-size: 12px;
}

.days {
  padding: 0;
  background: #fff;
  margin: 0;
  width: 100%;
  overflow: hidden;
}

.days li {
  width: 14.28%;
  height: 26px;
  text-align: center;
  color: #000;
  font-size: 12px;
  cursor: pointer;
  float: left;
  line-height: 26px;
}

.days li>span {
  /*padding: 5px 2px;*/
  display: inline-block;
  width: 26px;
  height: 26px;
  color: #414141;
  margin: 0 auto;
}

.days li .other-month {
  color: gainsboro;
}

.days li span:hover {
  background: #e5e5e5;
  border-radius: 50%;
}

.days li .active {
  border-radius: 50%;
  background: #20a0ff;
  color: #fff;
  display: inline-block;
}

.days li .active:hover {
  background: #20a0ff;
  color: #fff;
}

.glyphicon {
  font-size: 12px;
  color: #414141;
}

.times {
  background: #e2ebf4;
  height: 34px;
  padding: 5px;
  text-align: center;
}

.timesleft {
  width: 60%;
  float: left;
}

.timesrigth {
  width: 40%;
  float: right;
}

.times input {
  width: 24%;
  height: 24px;
  text-align: center;
}

.times span {
  margin: 0px 3px;
}

.confirms {
  height: 24px;
  width: 40%;
  background: #20a0ff;
  color: #fff;
  font-size: 13px;
  border-radius: 2px;
}
</style>