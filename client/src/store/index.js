import Vue from 'vue'
import Vuex from 'vuex'
import routeLoading from './modules/route'
import config from './modules/global-config'
import user from './modules/user'
import project from './modules/project'
import role from './modules/role'
import org from './modules/org'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user,
    role,
    org,
    config,
    routeLoading,
    project
  }
})

export default store
