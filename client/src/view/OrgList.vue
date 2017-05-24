<template>
  <content-module name="orgs">
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item to="/dashboard">{{$t('org.breadcrumb.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('org.breadcrumb.current')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-bottom:.5rem">
      <el-button type="primary" icon="plus" @click.native="createorg">{{$t('operation.create')}}</el-button>
    </div>
    <div>
      <el-card class="box-card" v-for="org in orgs">
        <div slot="header" class="clearfix">
          <span>{{org.name}}</span>
          <i class="el-icon-delete icon" @click="deleteorg(org)"></i>
          <i class="el-icon-edit icon" @click="editorg(org)"></i>
        </div>
        <p>
          {{org.displayName}}
        </p>
      </el-card>
    </div>
    <el-dialog :title="form._id ? $t('org.edit.update') : $t('org.edit.create')" v-model="formVisible">
      <el-form :model="form" :rules="rules" ref="org">
        <el-form-item :label="$t('org.model.name')" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('org.model.description')">
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
import locales from 'locales/org'
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
        name: [{ required: true, message: this.$t('org.rules.name'), trigger: 'blur' }]
      },
      apiUrl: '/api/org{/:proj}'
    }
  },
  computed: {
    ...mapGetters(['orgs'])
  },
  methods: {
    ...mapActions(['fetchOrgs']),
    fetch () {
      console.log('Org fetch path: ' + this.$route.path)
      this.fetchOrgs(this.$route.path, {}).catch(err => {
        console.error('fetchOrgs: error ' + err)
      })
    },
    createorg () {
      this.formVisible = true
    },
    cancelForm () {
      this.form._id = ''
      this.form.name = ''
      this.form.info = ''
      this.formVisible = false
    },
    saveForm () {
      const orgRes = this.$resource(this.apiUrl)
      this.$refs.org.validate(valid => {
        if (valid) {
          let promise
          if (this.form._id) {
            promise = orgRes.update({ _id: this.form._id }, this.form)
          } else {
            promise = orgRes.save({}, {
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
    editorg (org) {
      this.form = _.clone(org)
      // Object.assign(this.form, org)
      this.formVisible = true
    },
    deleteorg (org) {
      this.$confirm(`This action will remove the selected org: ${org.name} forever, still going on?`, this.$t('confirm.title'), {
        type: 'warning'
      }).then(() => {
        const orgRes = this.$resource(this.apiUrl)
        orgRes.delete({ _id: org._id }).then(() => {
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
