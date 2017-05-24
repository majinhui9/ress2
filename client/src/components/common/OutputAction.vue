<template>
  <div class="outputAction clearfloat">
    <div class="action-box">
      <p class="action-title action-title-left"><span>{{$t('settings.remote.warning.normalAction')}}</span></p>
      <div class="action-body action-body-left">
        <div class="action-body-left-row" v-for="(item,index) in outputAction.normal">
          <label :for="id+'normal'+index" class="checkBox" :class="{'checkBox-checked':item.value,'checkBox-no-checked':!item.value}">
            <input :id="id+'normal'+index" type="checkbox" name="" v-model="item.value">
          </label><span>{{item.title}}</span>
          <div class="action-body-left-row-appose">
            <label :for="id+'normal_appose'+index" v-if="item.apposeTitle?true:false" class="appose checkBox" :class="{'checkBox-checked':item.apposeValue,'checkBox-disable':!item.value,'checkBox-no-checked':!item.apposeValue}">
              <input :id="id+'normal_appose'+index" v-if="item.apposeTitle?true:false" type="checkbox" name="" v-model="item.apposeValue" v-bind:disabled="!item.value">
            </label><span v-if="item.apposeTitle?true:false">{{item.apposeTitle}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="action-box">
      <p class="action-title action-title-right">
        <!--<label :for="id+'localCheck'" class="checkBox"
        :class="{'checkBox-checked':localcheck,'checkBox-no-checked':!localcheck}">
          <input :id="id+'localCheck'" type="checkbox" name="" v-model="localcheck" @change="localall">
        </label>-->
        <span>{{$t('settings.remote.warning.localOutput')}}</span>
      </p>
      <div class="action-body action-body-right">
        <!-- <div class="action-body-right-row" v-for="(item,index) in outputAction.local">
          <label :for="'local'+index" class="checkBox" :class="{'checkBox-checked':item.value,'checkBox-no-checked':!item.value}">
            <input :id="'local'+index" type="checkbox" name="" v-model="item.value" @change="localpart">
          </label><span>{{item.title}}</span>
        </div> -->
        <div class="action-body-right-row">
          <label :for="id+'localTrl'" class="checkBox" :class="{'checkBox-checked':outputAction.local,'checkBox-no-checked':!outputAction.local}">
            <input :id="id+'localTrl'" type="checkbox" name="" v-model="outputAction.local" @change="localpart">
          </label><span>端子1</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      name: 'outputAction',
      props: {
        outputAction: {
          type: Object
        },
        id: ''
      },
      data () {
        return {
          // outputAction: {
          //   normal: [{
          //     title: '网络上传',
          //     value: false,
          //     apposeTitle: '图片附件',
          //     apposeValue: false
          //   }, {
          //     title: '发送邮件',
          //     value: false,
          //     apposeTitle: '图片附件',
          //     apposeValue: false
          //   }, {
          //     title: '声音提示',
          //     value: false
          //   }],
          //   local: false
          // },
          localcheck: false
        }
      },
      watch: {
        outputAction: {
          handler: function (newval, oldval) {
            this.localcheck = newval.local
          },
          deep: true
        }
      },
      methods: {
        localall: function () {
          this.outputAction.local = this.localcheck
        },
        localpart: function () {
          this.localcheck = this.outputAction.local
        }
      }
    }
</script>
<style scoped>
    .outputAction{
      border-top-left-radius:5px;
      border-top-right-radius:5px;
      overflow: hidden;
      border: 1px solid #dedede;
      width:435px;
    }
    .action-box{
      float:left;
      height:200px;
    }
    .outputAction>div:first-child{
      width:50%;
    }
    .outputAction>div:last-child{
      width:50%;
    }
    .action-title{
      height:35px;
      line-height: 35px;
      background-color:#f3f4f8;
      margin-bottom: 0;
    }
    .action-body{
      padding-bottom:2000px;
      margin-bottom:-2000px;
      padding-top:20px;
    }
    .action-title-left{
      text-align: center;
    }
    .action-body-left{
      padding-left:66px;
      border-right: 1px solid #dedede;
    }
    .action-title-right{
      padding-left:66px;
    }
    .action-body-right{
      padding-left:66px;
    }
    .action-body-left-row{
      margin-bottom:10px;
    }
    .action-body-left-row-appose{
      margin-top:10px;
    }
    .action-body-right-row{
      margin-bottom:10px;
    }
    input{
      margin-right:10px;
    }
    .appose{
      margin-left:16px;
    }
    .clearfloat:after{
      display:block;
      clear:both;
      content:"";
      visibility:hidden;
      height:0;
    }
    /*checkbox*/
  .checkBox{
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-bottom: 0;
    margin-right: 5px;
    position: relative;
    top: 2px;
  }
  .checkBox input[type="checkbox"]{
    display: none;
  }
  .checkBox-checked{
    background: url('../../assets/images/choose/checkbox-selected.png') no-repeat;
    background-size: 100% 100%;
  }
  .checkBox-no-checked{
    background: url('../../assets/images/choose/checkbox.png') no-repeat;
    background-size: 100% 100%;
  }
  .checkBox-disable{
    background: url('../../assets/images/choose/checkbox-disable.png') no-repeat;
    background-size: 100% 100%;
    cursor: not-allowed;
  }
  .checkBox-section{
    background: url('../../assets/images/choose/checkbox-section.png') no-repeat;
    background-size: 100% 100%;
  }
</style>
