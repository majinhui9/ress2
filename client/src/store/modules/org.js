import _ from 'lodash'
// eslint-disable-next-line camelcase
import { getOrgs } from './org.api'
// schema
/*
  name: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String
  },
  agent: String,
  phone: String,

  latlanPos: [Number], // lat/lan of org
  centerPos: [Number], // cernter pos to layout all Orgs lat/lan for org
  ratio: { type: Number, default: 1 },
  parent: { type: String }, // parent org if not empty
  departments: [String]
*/
const state = {
  orgs: []
}

const mutations = {
  SET_ORG(state, orgs) {
    if (_.isArray(orgs)) {
      state.orgs = orgs
    } else if (_.isObject(orgs)) {
      state.orgs.push(orgs)
    }
  },
  // add org
  ADD_ORG(state, org) {
    state.orgs.push(org)
  },
  // after logout
  CLEAR_ORG(state) {
    _.remove(state.orgs, () => { return true })
  }
}

const actions = {
  // get orgs info
  fetchOrgs({ commit, dispatch, state }, url, query) {
    return getOrgs(url, query).then((data) => {
      console.log(data)
      commit('SET_ORG', data.result)
    })
  }
}

const getters = {
  orgs(state) {
    return state.orgs
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
