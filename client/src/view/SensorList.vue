<template>
  <content-module name="users">
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item to="/dashboard">{{$t('sensor.breadcrumb.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('sensor.breadcrumb.current')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <data-table ref="users" @page-change="fetch">
      <div slot="toolbar">
        <el-button type="primary" icon="plus" @click.native="createUser">{{$t('operation.create')}}</el-button>
      </div>
      <el-table :data="users" border>
        <el-table-column property="_id" label="ID" sortable min-width="120"></el-table-column>
        <el-table-column property="username" :label="$t('sensor.model.username')" sortable min-width="120"></el-table-column>
        <el-table-column property="role" :label="$t('sensor.model.role')" min-width="90"></el-table-column>
        <el-table-column :label="$t('operation.operation')" align="center" width="120">
          <template scope="scope">
            <el-button type="text" @click.native="deleteUser(scope.row)">{{$t('operation.remove')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </data-table>
    <el-dialog :title="$t('sensor.create.title')" v-model="formVisible" @close="cancelForm">
      <el-form :model="form" :rules="rules" ref="form"
        :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form-item :label="$t('sensor.model.username')" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sensor.model.password')" prop="password">
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
import { sensor as sensorRes } from 'resources'
import locales from 'locales/sensors'
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
          required: true, message: this.$t('sensor.rules.username'), trigger: 'blur'
        }],
        password: [{
          required: true, message: this.$t('sensor.rules.password'), trigger: 'blur'
        }]
      },
      formVisible: false,
      users: []
    }
  },
  components: {
    DataTable
  },
  methods: {
    fetch (current = 1) {
      this.$refs.users.query(sensorRes, current, { search: this.search }).then(list => {
        this.users = list
      }).catch(err => {
        console.error(err)
      })
    },
    createUser () {
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
          sensorRes.save(null, this.form).then(() => {
            this.cancelForm()
            this.$message({
              type: 'success',
              message: this.$t('message.created')
            })
            this.fetch()
          }).catch((err) => {
            this.$message({
              type: 'error',
              message: err.status === 422 ? this.$t('sensor.action.sensorExisted') : this.$t('message.createFailed')
            })
          })
        }
      })
    },
    deleteUser (item) {
      this.$confirm(`This action will remove the selected sensor: ${item.username}, still going on?`, this.$t('confirm.title'), {
        type: 'warning'
      }).then(() => {
        sensorRes.delete({ _id: item._id }).then(() => {
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
