<template>
  <content-module name="roles">
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item to="/dashboard">{{$t('role.breadcrumb.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('role.breadcrumb.current')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-bottom:.5rem">
      <el-button type="primary" icon="plus" @click.native="createrole">{{$t('operation.create')}}</el-button>
    </div>
    <div>
      <el-card class="box-card" v-for="role in roles">
        <div slot="header" class="clearfix">
          <span>{{role.name}}</span>
          <i class="el-icon-delete icon" @click="deleterole(role)"></i>
          <i class="el-icon-edit icon" @click="editrole(role)"></i>
        </div>
        <p>
          {{role.displayName}}
        </p>
      </el-card>
    </div>
    <el-dialog :title="form._id ? $t('role.edit.update') : $t('role.edit.create')" v-model="formVisible">
      <el-form :model="form" :rules="rules" ref="role">
        <el-form-item :label="$t('role.model.name')" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('role.model.description')">
          <el-input v-model="form.info"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click.native="cancelForm">{{$t('confirm.cancel')}}</el-button>
        <el-button type="primary" @click.native="saveForm">{{$t('confirm.ok')}}</el-button>
      </span>
    </el-dialog>
  </content-module>
</template>
<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import locales from 'locales/role'
export default {
  locales,
  data () {
    return {
      formVisible: false,
      form: {
        _id: '',
        name: '',
        info: ''
      },
      rules: {
        name: [{ required: true, message: this.$t('role.rules.name'), trigger: 'blur' }]
      },
      apiUrl: '/api/role{/:proj}'
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  methods: {
    ...mapActions(['fetchRoles']),
    fetch () {
      console.log('Role fetch path: ' + this.$route.path)
      this.fetchRoles(this.$route.path, {}).catch(err => {
        console.error('fetchRoles: error ' + err)
      })
    },
    createrole () {
      this.formVisible = true
    },
    cancelForm () {
      this.form._id = ''
      this.form.name = ''
      this.form.info = ''
      this.formVisible = false
    },
    saveForm () {
      const roleRes = this.$resource(this.apiUrl)
      this.$refs.role.validate(valid => {
        if (valid) {
          let promise
          if (this.form._id) {
            promise = roleRes.update({ _id: this.form._id }, this.form)
          } else {
            promise = roleRes.save({}, {
              name: this.form.name,
              info: this.form.info
            })
          }
          promise.then(() => {
            this.cancelForm()
            this.$message({
              type: 'success',
              message: this.form._id ? this.$t('message.updated') : this.$t('message.created')
            })
            this.fetch()
          }).catch(() => {})
        }
      })
    },
    editrole (role) {
      this.form = _.clone(role)
      // Object.assign(this.form, role)
      this.formVisible = true
    },
    deleterole (role) {
      this.$confirm(`This action will remove the selected role: ${role.name} forever, still going on?`, this.$t('confirm.title'), {
        type: 'warning'
      }).then(() => {
        const roleRes = this.$resource(this.apiUrl)
        roleRes.delete({ _id: role._id }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('message.removed')
          })
          this.fetch()
        })
      }).catch(() => {})
    }
  },
  created () {
    this.fetch()
  }
}
</script>
<style lang="stylus" scoped>
@import "../assets/css/variable"
.box-card
  display inline-block
  width 20rem
  height 15rem
  margin .5rem
  .icon
    float right
    margin-left .5rem
    color $color-silver
    cursor pointer
    &:hover
      color $color-primary
</style>
