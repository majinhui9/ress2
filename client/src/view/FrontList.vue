<template>
  <content-module name="fronts">
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item to="/dashboard">{{$t('front.breadcrumb.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('front.breadcrumb.current')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <data-table ref="fronts" @page-change="fetch">
      <div slot="toolbar">
        <el-button type="primary" icon="plus" @click.native="createFront">{{$t('operation.create')}}</el-button>
      </div>
      <el-table :data="fronts" border>
        <el-table-column property="_id" label="ID" sortable min-width="120"></el-table-column>
        <el-table-column property="username" :label="$t('front.model.username')" sortable min-width="120"></el-table-column>
        <el-table-column property="role" :label="$t('front.model.role')" min-width="90"></el-table-column>
        <el-table-column :label="$t('operation.operation')" align="center" width="120">
          <template scope="scope">
            <el-button type="text" @click.native="deleteFront(scope.row)">{{$t('operation.remove')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </data-table>
    <el-dialog :title="$t('front.create.title')" v-model="formVisible" @close="cancelForm">
      <el-form :model="form" :rules="rules" ref="form"
        :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form-item :label="$t('front.model.username')" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('front.model.password')" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="formVisible=false">{{$t('confirm.cancel')}}</el-button>
        <el-button type="primary" @click.native="saveForm">{{$t('confirm.ok')}}</el-button>
      </span>
    </el-dialog>
  </content-module>
</template>
<script>
import DataTable from 'components/DataTable'
import { front as frontRes } from 'resources'
import locales from 'locales/fronts'
export default {
  locales,
  data () {
    return {
      search: {
      },
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true, message: this.$t('front.rules.username'), trigger: 'blur'
        }],
        password: [{
          required: true, message: this.$t('front.rules.password'), trigger: 'blur'
        }]
      },
      formVisible: false,
      fronts: []
    }
  },
  components: {
    DataTable
  },
  methods: {
    fetch (current = 1) {
      this.$refs.fronts.query(frontRes, current, { search: this.search }).then(list => {
        this.fronts = list
      }).catch(err => {
        console.error(err)
      })
    },
    createFront () {
      this.formVisible = true
    },
    cancelForm () {
      this.form.username = ''
      this.form.password = ''
      this.formVisible = false
    },
    saveForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          frontRes.save(null, this.form).then(() => {
            this.cancelForm()
            this.$message({
              type: 'success',
              message: this.$t('message.created')
            })
            this.fetch()
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: err.status === 422 ? this.$t('front.action.existed') : this.$t('message.createFailed')
            })
          })
        }
      })
    },
    deleteFront (item) {
      this.$confirm(`This action will remove the selected front: ${item.username} forever, still going on?`, this.$t('confirm.title'), {
        type: 'warning'
      }).then(() => {
        frontRes.delete({ _id: item._id }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('message.removed')
          })
          this.fetch()
        })
      }).catch(() => {})
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.fetch()
    })
  }
}
</script>
