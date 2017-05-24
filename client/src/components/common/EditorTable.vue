<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>全选</th>
                <th>用户名</th>
                <th>年龄</th>
                <th>毕业学校</th>
                <th>备注</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in list">
                <td style="width:20%"><input type="checkbox" /></td>
                <td style="width:20%" @dblclick="editable($event,'name',user)">{{user['Name']}}</td>
                <td style="width:20%" @dblclick="editable($event,'data',user)">{{user['Age']}}</td>
                <td style="width:20%" @dblclick="editable($event,'name',user)">{{user['School']}}</td>
                <td><button>删除</button></td>
                <td><button>测试</button></td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import Vue from 'vue'
import VueEditable from '../assets/js/vue-editable.js'
Vue.use(VueEditable)
export default {
  props: {
    list: Array
  },
  methods: {
    editable: function (e, field, user) {
      var that = this
      that.$editable(e, function (value) {
        console.log('内容改变')
      })
    }
  }
}
</script>
<style scoped>
    .table-bordered {
        border: 1px solid #dddddd;
        border-left: 0;
    }
    
    .table th,
    .table td {
        padding: 8px;
        line-height: 20px;
        text-align: center;
        border-top: 1px solid #dddddd;
    }
    
    .table-bordered th,
    .table-bordered td {
        border-left: 1px solid #dddddd;
    }
    .table thead {
        background: #e2eaf4;
    }
    .table tbody tr:hover {
        background: #f2f2f2;
    }
</style>