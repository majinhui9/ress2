<template>
  <content-module name="projects">
    <el-breadcrumb separator="/" style="margin-bottom:.5rem">
      <el-breadcrumb-item to="/dashboard">{{$t('project.breadcrumb.home')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('project.breadcrumb.current')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-bottom:.5rem">
      <el-button type="primary" icon="plus" @click.native="createproject">{{$t('operation.create')}}</el-button>
    </div>
    <div>
      <el-card class="box-card" v-for="project in projects">
        <div slot="header" class="clearfix">
          <span>{{project.name}}</span>
          <i class="el-icon-delete icon" @click="deleteproject(project)"></i>
          <i class="el-icon-edit icon" @click="editproject(project)"></i>
        </div>
        <p>
          {{project.displayName}}
        </p>
      </el-card>
    </div>
    <el-dialog :title="form._id ? $t('project.edit.update') : $t('project.edit.create')" v-model="formVisible">
      <el-form :model="form" :rules="rules" ref="project">
        <el-form-item :label="$t('project.model.name')" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.model.description')">
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
import locales from 'locales/project'
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
        name: [{ required: true, message: this.$t('project.rules.name'), trigger: 'blur' }]
      },
      apiUrl: '/api/project{/:proj}'
    }
  },
  computed: {
    ...mapGetters(['projects'])
  },
  methods: {
    ...mapActions(['fetchProjects']),
    fetch () {
      console.log('Projects fetch path: ' + this.$route.path)
      this.fetchProjects(this.$route.path, {}).catch(err => {
        console.error('fetchProjects: error ' + err)
      })
    },
    createproject () {
      this.formVisible = true
    },
    cancelForm () {
      this.form._id = ''
      this.form.name = ''
      this.form.info = ''
      this.formVisible = false
    },
    saveForm () {
      const projectRes = this.$resource(this.apiUrl)
      this.$refs.project.validate(valid => {
        if (valid) {
          let promise
          if (this.form._id) {
            promise = projectRes.update({ _id: this.form._id }, this.form)
          } else {
            promise = projectRes.save({}, {
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
    editproject (project) {
      this.form = _.clone(project)
      // Object.assign(this.form, project)
      this.formVisible = true
    },
    deleteproject (project) {
      this.$confirm(`This action will remove the selected project: ${project.name} forever, still going on?`, this.$t('confirm.title'), {
        type: 'warning'
      }).then(() => {
        const projectRes = this.$resource(this.apiUrl)
        projectRes.delete({ _id: project._id }).then(() => {
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
