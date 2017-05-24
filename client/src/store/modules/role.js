'use strict'
import _ from 'lodash'

const OPERS = ['a', 'r', 'c', 'u', 'd']
const WILD_MATCH = '*'
const ALL_OPER = 'a'
const READ_OPER = 'r'
const CREATE_OPER = 'c'
const UPDATE_OPER = 'u'
const DELETE_OPER = 'd'

module.exports.OPERS = OPERS
module.exports.WILD_MATCH = WILD_MATCH
module.exports.ALL_OPER = ALL_OPER
module.exports.READ_OPER = READ_OPER
module.exports.CREATE_OPER = CREATE_OPER
module.exports.UPDATE_OPER = UPDATE_OPER
module.exports.DELETE_OPER = DELETE_OPER

module.exports.RESOURCE_NAME = 'role'

module.exports.hasAccessTo = (accesses, resourceUriComp, oper) => {
  const index = _.findIndex(accesses, function(accessItem) {
    if (accessItem.item !== WILD_MATCH && accessItem.item !== resourceUriComp) return false
    if (accessItem[ALL_OPER] && accessItem[ALL_OPER] !== 0) return true
    if (accessItem[oper] && accessItem[oper] !== 0) return true
    if (_.findIndex(accessItem.opers, oper) !== -1) return true
    return false
  })
  const re = index !== -1
  if (re) console.log('isAuthorized passed by index:' + index)
  return re
}

// eslint-disable-next-line camelcase
import { getRoles } from './role.api'
// schema
/*
 role: String,
 access: [AccessSchma]
*/
/*
 AccessSchema = new Schema({
  item: String,
  a: Number,
  r: Number,
  c: Number,
  u: Number,
  d: Number,
  opers: [String]
})
*/
const state = {
  roles: []
}

const mutations = {
  SET_ROLE(state, roles) {
    if (_.isArray(roles)) {
      state.roles = roles
    } else if (_.isObject(roles)) {
      state.roles.push(roles)
    }
  },
  // add role
  ADD_ROLE(state, role) {
    state.roles.push(role)
  },
  // after logout
  CLEAR_ROLE(state) {
    _.remove(state.roles, () => { return true })
  }
}

const actions = {
  // get roles info
  fetchRoles({ commit, dispatch, state }, url, query) {
    return getRoles(url, query).then((data) => {
      console.log(data)
      commit('SET_ROLE', data.result)
    })
  }
}

const getters = {
  roles(state) {
    return state.roles
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
